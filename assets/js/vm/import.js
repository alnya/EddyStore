define(['knockout', 'webApiClient', 'messageBox'],
    function (ko, api, messageBox) {

    "use strict";

    var importViewModel = ko.validatedObservable({
      UploadMetaDataFile: function(file) {
        var self = this;
        messageBox.Hide();
        api.ajaxUploadZip("/Data/import", file,
          function(model) {
            messageBox.ShowSuccess("Metadata Import Successful!");
          },
          function(errorResponse) {
            messageBox.ShowError(errorResponse);
          });
      },

      UploadProjectFile: function(file) {
        var self = this;
        messageBox.Hide();
        api.ajaxUploadZip("/Report/import", file,
          function(model) {
            messageBox.ShowSuccess("Project Import Successful!");
          },
          function(errorResponse) {
            messageBox.ShowError(errorResponse);
          });
      }

    });

    return importViewModel;
});
