define(['page','knockout', 'common', 'webApiClient', 'messageBox', 'jquery', 'modalDialog'],
    function (page, ko, common, webApiClient, messageBox, $, modalDialog) {

    "use strict";

    var baseForm = new function () {

        var self = this;

        self.entityId = common.getId();

        self.Initialise = function (entityViewModel) {

            self.EntityViewModel = entityViewModel;

            if (entityViewModel.Initialise != null)
            {
              entityViewModel.Initialise();
            }
            self.GetEntity();
            ko.applyBindings(self, $("#entityForm")[0]);
        };

        self.formFields = function () {

            var formFields = [];

            for (var p = 0; p < self.EntityViewModel.Panels.length; p++) {
                var panel = self.EntityViewModel.Panels[p];

                for (var c = 0; c < panel.Columns.length; c++) {
                    var column = panel.Columns[c];

                    for (var f = 0; f < column.Fields.length; f++) {
                        formFields.push(column.Fields[f]);
                    }
                }
            }

            return formFields;
        }

        self.GetEditSuccessMessage = function () {

            if (self.EntityViewModel.GetEditSuccessMessage) {
                return self.EntityViewModel.GetEditSuccessMessage();
            }

            return self.EntityViewModel.EntityName + " saved successfully.";
        };

        self.GetAddSuccessMessage = function () {

            if (self.EntityViewModel.GetAddSuccessMessage) {
                return self.EntityViewModel.GetAddSuccessMessage();
            }

            return self.EntityViewModel.EntityName + " saved successfully.";
        };

        self.GetDeleteSuccessMessage = function () {

            if (self.EntityViewModel.GetDeleteSuccessMessage) {
                return self.EntityViewModel.GetDeleteSuccessMessage();
            }

            return self.EntityViewModel.EntityName + " deleted successfully.";
        };

        self.GetUpdateErrorMessage = function (errorResponse) {

            if (errorResponse.responseJSON && self.EntityViewModel.GetUpdateErrorMessage) {
                return self.EntityViewModel.GetUpdateErrorMessage(errorResponse);
            }
            return "Error updating " + self.EntityViewModel.EntityName + " details.";
        };

        self.GetAddErrorMessage = function (errorResponse) {

            if (errorResponse.responseJSON && self.EntityViewModel.GetAddErrorMessage) {
                return self.EntityViewModel.GetAddErrorMessage(errorResponse);
            }

            return "Error creating " + self.EntityViewModel.EntityName + ".";
        };

        self.IsLoaded = ko.observable(false);
        self.EntityViewModel = ko.observable();
        self.Mode = ko.observable('VIEW');
        self.ModeText = ko.observable("");
        self.OriginalModel = "";

        self.IsInMode = function (mode) { return self.Mode() == mode; };

        self.SetAddMode = function() {
            self.Mode("ADD");
            self.ModeText("Add a new " + self.EntityViewModel.EntityName);
            self.OriginalModel = self.EntityViewModel.GetEntityModel();
        };

        self.SetEditMode = function() {
            self.Mode("EDIT");
            self.ModeText("Edit a " + self.EntityViewModel.EntityName);
        };

        self.SetReadOnlyMode = function() {
            self.Mode("VIEW");
            self.ModeText("View a " + self.EntityViewModel.EntityName);
            self.OriginalModel = self.EntityViewModel.GetEntityModel();
        };

        self.SetDeletedMode = function () {
            self.Mode("DELETED");
            self.ModeText("Deleted " + self.EntityViewModel.EntityName);
        };

        self.CanDeleteEntity = function () {

            if (self.IsInMode('VIEW') && self.EntityViewModel.CanDeleteEntity) {
                return self.EntityViewModel.CanDeleteEntity;
            }

            return false;
        };

        self.CanEditEntity = function () {

            if (self.IsInMode('VIEW')) {
                if (self.EntityViewModel.CanEditEntity != null) {
                    return self.EntityViewModel.CanEditEntity;
                }

                return true;
            }

            return false;
        };

        if (modalDialog != null) {
          modalDialog.DoAction.subscribe(function (action) {
            if (action.indexOf("CANCEL") === 0) {
              self.GetEntity();
            } else if (action.indexOf("DELETE") === 0) {
              self.DeleteEntity();
            }
          });
        }

        self.ShowCancelModalDialog = function () {

          if (self.IsDirty()) {
            modalDialog.ShowModalDialogOkCancel("Cancel", "Are you sure you want to cancel this edit?", "CANCEL");
            return;
          }

          self.GetEntity();
        };

        self.ShowDeleteModalDialog = function () {

          modalDialog.ShowModalDialogOkCancel("Delete", "Are you sure you want to delete this record?", "DELETE");
        };

        self.DisplayForm = ko.computed(function() {
            return (self.Mode() != 'DELETED' && self.IsLoaded());
        });

        self.getProperty = function (prop, options) {
            if (self.EntityViewModel.hasOwnProperty(prop) && !ko.isComputed(self.EntityViewModel[prop])) {
                var value = self.EntityViewModel[prop];
                if (options != null && ko.isObservable(options) && value() != null) {
                    var selectedItem = ko.utils.arrayFilter(options(), function (option) {
                        return option.id == value();
                    });
                    if (selectedItem != null && selectedItem.length == 1) { return selectedItem[0].Name; }
                };
                return value;
            }

            return null;
        };

        self.controlIsVisible = function (permissions) {
            var permission = $.inArray(self.Mode(), permissions) !== -1;
            if (!permission && self.Mode() == "EDIT") {
                // special case that in edit we also want to see view fields
                permission = $.inArray("VIEW", permissions) !== -1;
            }
            return permission;
        };

        self.controlIsReadOnly = function (permissions) {

            if (self.Mode() == "VIEW") {
                return $.inArray(self.Mode(), permissions) !== -1;
            }
            if (self.Mode() == "EDIT" || self.Mode() == "ADD") {
                var permission = $.inArray(self.Mode(), permissions) !== -1;
                if (permission) {
                    return false;
                }
            }
            return true;
        };

        self.IsDirty = function () {
          var origModel = self.OriginalModel;
          var currentModel = self.EntityViewModel.GetEntityModel();
          var changesMade = JSON.stringify(origModel, self.stringifyReplacer) !== JSON.stringify(currentModel, self.stringifyReplacer);
          return changesMade;
        };

      self.stringifyReplacer = function (key, value) {
        if (value === undefined) {
          return null;
        }
        return value;
      };

        window.onbeforeunload = function (e) {
            if (self.IsDirty()) {
                return "You have made changes to the '" + self.EntityViewModel.EntityName + "'.";
            }

            return null;
        };

        self.Submit = function() {
            messageBox.Hide();
            if (!self.EntityViewModel.isValid()) {
                messageBox.ShowError("Please correct the following errors");
                self.EntityViewModel.errors.showAllMessages();
            } else {

                var entityId = self.entityId;
                var entityModel = self.EntityViewModel.GetEntityModel();

                if (entityId != 'add') {
                    webApiClient.ajaxPut(self.EntityViewModel.Url, entityId, ko.toJSON(entityModel), function (model) {
                            if (model) {
                                messageBox.ShowSuccess(self.GetAddSuccessMessage());
                                self.GetEntity();
                            }
                        },
                        function (errorResponse) {
                            messageBox.ShowError(self.GetUpdateErrorMessage(errorResponse));
                        });
                } else {
                    webApiClient.ajaxPost(self.EntityViewModel.Url, ko.toJSON(entityModel), null, function (model) {
                            if (model) {
                                self.entityId = model.id;
                                messageBox.ShowSuccess(self.GetAddSuccessMessage());
                                self.GetEntity();
                            }
                        },
                        function (errorResponse) {
                            messageBox.ShowError(self.GetAddErrorMessage(errorResponse));
                        });
                }
            }
        };

        self.GetEntity = function() {

          var entityId = self.entityId;

          if (entityId != 'add') {

              webApiClient.ajaxGet(self.EntityViewModel.Url + "/" + entityId, null, null, function (model) {
                      if (model) {

                          self.EntityViewModel.SetModel(model);
                          self.SetReadOnlyMode();
                          self.IsLoaded(true);
                      }
                  },
                  function(errorResponse) {
                      messageBox.ShowError("Error retrieving " + self.EntityViewModel.EntityName + ".");
                  });
          } else {
              self.SetAddMode();
              self.IsLoaded(true);
          }
        }

        self.DeleteEntity = function () {

            var entityId = self.entityId;

            if (entityId != null) {

                webApiClient.ajaxDelete(self.EntityViewModel.Url, entityId,
                    function (model) {
                        messageBox.ShowSuccess(self.GetDeleteSuccessMessage());
                        self.SetDeletedMode();
                    },
                    function(errorResponse) {
                        messageBox.ShowError("Error deleting " + self.EntityViewModel.EntityName + ".");
                    });

            } else {
                messageBox.ShowError("Error deleting " + self.EntityViewModel.EntityName + ".");
            }
        }
    };

      ko.bindingHandlers.datePicker = {

        init: function (element, valueAccessor) {

          common.setupDatePicker($(element).parent());

          ko.utils.registerEventHandler(element, "change", function () {

            var observable = valueAccessor();

            observable($(element).val());

          });

        },

        update: function (element, valueAccessor) {

          var value = ko.utils.unwrapObservable(valueAccessor());

          $(element).val(value);

          common.setupDatePicker($(element).parent(), value);

        }

      };

      return baseForm;
});
