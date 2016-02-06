var fs = require('fs');
var exec = require('child_process').exec;
var AdmZip = require('adm-zip');

/**
 * ReportController
 *
 * @description :: Server-side logic for managing reports
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  eddypro: function (req, res) {
    if (!req.param('id')) {
      return res.badRequest('ID Missing');
    }

    Report.findOne(req.param('id'))
      .populate('StatisticalAnalysis')
      .populate('SpectralCorrection')
      .populate('ProcessingOption')
      .populate('Output')
      .populate('Master_Anemometer')
      .populate('Flags')
      .populate('Variables')
      .exec(function (err, thisReport) {
        if (err) return err;
        if (!thisReport) return res.notFound();

        console.log("Found report " + thisReport.id);

        Data.findOne(thisReport.Data)
          .populate('Instruments')
          .populate('Columns')
          .exec(function (err, thisData) {
            if (err) return err;
            if (!thisData) return res.notFound();

            return res.send(EddyPro.getReport(thisReport, thisData));
          });
      });
  },

  request: function (req, res) {
    if (!req.param('id')) {
      return res.badRequest('ID Missing');
    }
    Report.findOne(req.param('id'))
      .populate('StatisticalAnalysis')
      .populate('SpectralCorrection')
      .populate('ProcessingOption')
      .populate('Output')
      .populate('Master_Anemometer')
      .populate('Flags')
      .populate('Variables')
      .exec(function (err, thisReport) {
      if (err) return err;
      if (!thisReport) return res.notFound();

      console.log("Found report " + thisReport.id);

        thisReport.Status = "Requested";
        thisReport.save();

      Data.findOne(thisReport.Data)
      .populate('Instruments')
      .populate('Columns')
      .exec(function (err, thisData) {
          if (err) return err;
          if (!thisData) return res.notFound();

          var metadata = EddyPro.getMetadata(thisData);
          var report = EddyPro.getReport(thisReport, thisData);

          // build metadata
          var metadataPath = EddyPro.getMetadataFilePath(thisData.id);
          fs.writeFile(metadataPath, metadata, function (err) {
            if (err) {
              thisReport.Status = "Error";
              thisReport.save();
              res.json({'error': 'Failed to write ' + metadataPath});
            }
          });
          console.log("Metadata saved to " + metadataPath);

          // build project file
          var projectPath = EddyPro.getEddyProFilePath(thisData.id);
          fs.writeFile(projectPath, report, function (err) {
            if (err) {
              thisReport.Status = "Error";
              thisReport.save();
              res.json({'error': 'Failed to write ' + projectPath});
            }
          });
          console.log("Project saved to " + projectPath);

          var workingDirectory = EddyPro.getWorkingFolder(thisData.id);

          var cmd = sails.config.eddyProConfig.cmdPath + "-e " + workingDirectory;
          console.log("Executing " + cmd);

          // run Eddy Pro command
          exec(cmd, function(error, stdout, stderr) {

            console.log(stdout);

            // write to zip file
            var outputFolder = EddyPro.getOutputFolder(thisData.id);
            var zipFile = workingDirectory + thisReport.id + '.zip';

            console.log("Zipping Output Folder " + outputFolder);

            var zip = new AdmZip();
            zip.addLocalFolder(outputFolder);

            console.log("Zipping To " + zipFile);

            zip.writeZip(zipFile);

            // save report, ready for download
            thisReport.Status = "Available";
            thisReport.save();
          });

          return res.ok();
      });
    });
  }
};

