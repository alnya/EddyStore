/**
 * DataController
 *
 * @description :: Server-side logic for managing data
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs');
var AdmZip = require('adm-zip');

function fileExtension(fileName) {
  return fileName.split('.').slice(-1);
}

module.exports = {
  transfer: function (req, res) {
    if (!req.param('id')) {
      return res.badRequest('ID Missing');
    }
    if (!req.param('email')) {
      return res.badRequest('Email Missing');
    }

    Data.findOne(req.param('id'))
      .exec(function (err, thisData) {
        if (err) return err;
        if (!thisData) return res.notFound();

        var userQuery = User.find();
        userQuery.where({'Email':req.param('email')});
        userQuery.exec(function callBack(err,users) {
          if (err) return err;
          if (!users || users.length == 0)
            return res.badRequest('Could not find an active user with email address ' + req.param('email'));

          Data.update({id:req.param('id')},{User:users[0].id}).exec(function afterwards(err, updated){
            if (err) return err;
            return res.ok();
          });
        });
      });
  },

  adduser: function (req, res) {
    if (!req.param('email')) {
      return res.badRequest('Email Missing');
    }

    var userQuery = User.find();
    userQuery.where({'Email':req.param('email')});
    userQuery.exec(function callBack(err,users) {
      if (err) return err;
      if (!users || users.length == 0)
        return res.badRequest('Could not find an active user with email address ' + req.param('email'));
      return res.ok(users[0]);
    });
  },

  uploadMetaData: function (req, res) {
    var file = req.files.metadata;

    fs.readFile(file.path, function (err, data) {
      if (err) {
        res.json({'error': 'could not read file'});
      } else {
        // TODO: import metadata
      }
    });
  },

  upload: function(req, res) {
    if (!req.param('id')) {
      return res.badRequest('ID Missing');
    }
    req.file('data').upload({
      dirname: require('path').resolve(sails.config.appPath, '/assets')
    },function whenDone(err, uploadedFiles) {
      if (err) {
        console.log(err);
        return res.negotiate(err);
      }
      console.log("Got File" + uploadedFiles[0].fd);

      var zip = new AdmZip(uploadedFiles[0].fd);

      var id = req.param('id');

      EddyPro.buildFolderStructure(id);

      var path = EddyPro.getDataFolder(id);

      console.log("Extracting to " + path);

      zip.extractAllTo(path, true);

      return res.ok();
    });
  },

  stations: function (req, res) {
    Data.find().exec(function(err, stations) {
      if (err) return res(err);
      var response = [];
      stations.forEach(function(station) {
        if (response.indexOf(station.Name) < 0)
        {
          response.push(station.Name);
        }
      });
      res.ok({items: response});
    });
  },

  available: function (req, res) {
    if (!req.param('station')) {
      return res.badRequest('station Missing');
    }
    Data.find({ Name: req.param('station') }).populate('Users').exec(function(err, uploads) {
      if (err) return res(err);
      var response = [];
      uploads.forEach(function(upload) {
        var authorized = false;
        if (upload.AccessLevel == 1) {
          authorized = true;
        } else {
          if (upload.Users.filter(function (u) { return u.id == req.session.user}).length > 0) {
            authorized = true;
          }
        }

        if (authorized) {
          response.push({
            id: upload.id,
            Date_From: upload.Date_From,
            Date_To: upload.Date_To
          });
        }
      });
      res.ok({items: response});
    });
  },

  metadata: function (req, res) {
    if (!req.param('id')) {
      return res.badRequest('ID Missing');
    }
    Data.findOne(req.param('id'))
      .populate('Instruments')
      .populate('Columns')
      .exec(function (err, thisData) {
      if (err) return err;
      if (!thisData) return res.notFound();
      return res.send(EddyPro.getMetadata(thisData));
    });
  }

};

