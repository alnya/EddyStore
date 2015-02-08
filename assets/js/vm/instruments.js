require(['knockout', 'moment', 'baseTable', 'messageBox', 'jquery', 'modalDialog', 'instrument', 'baseForm'],
    function (ko, moment, baseTable, messageBox, $, modalDialog, instrumentVM, baseForm) {

   "use strict";

    var metadataListViewModel = new function() {
        this.tableViewModel = new baseTable.GridViewModel({
            stationId: 1,
            columns: [
              { name: "Type", value: "Instrument_Type" },
              { name: "Manufacturer", value: "Manufacturer", template: "instrumentCellTemplate" },
              { name: "Model", value: "Model" }
            ],
            sortable: false,
            filterMode: 'none',
            pageSize: 10,
            emptyRowMessage: "No Instruments found",
            url: "/StationInstrument?where={Station:" + this.stationId + "}",
            successCallback: function(model) {
                messageBox.Hide();
            },
            errorCallback: function(errorResponse) {
                messageBox.ShowError("Error retrieving Instruments.");
            }
        });

      this.AddInstrument = function() {
        modalDialog.ShowModalDialogSaveCancel("Instrument", "instrumentTemplate", baseForm, "AdjustValueType");
        baseForm.Initialise(instrumentVM, '#instrumentForm');
      };
    };

    ko.applyBindings(metadataListViewModel, $("#instrumentsList")[0]);
    return metadataListViewModel;
});
