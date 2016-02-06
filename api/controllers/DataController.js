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
    // TODO: Only allow validated data
    Data.find({ Status: 'New' }).exec(function(err, stations) {
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
    Data.find({ Name: req.param('station') }).exec(function(err, uploads) {
      if (err) return res(err);
      var response = [];
      uploads.forEach(function(upload) {
          response.push({
            id: upload.id,
            Date_From:upload.Date_From,
            Date_To: upload.Date_To
          });
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

