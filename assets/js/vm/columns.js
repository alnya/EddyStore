require(['knockout', 'moment', 'baseTable', 'messageBox', 'jquery'],
    function (ko, moment, baseTable, messageBox, $) {

   "use strict";

    var metadataListViewModel = new function() {
        this.tableViewModel = new baseTable.GridViewModel({
          uploadId: 1,
          columns: [
                { name: "Name", value: "Name", template: "nameCellTemplate" }
            ],
            sortable: false,
            filterMode: 'none',
            pageSize: 10,
            emptyRowMessage: "No Raw Data Columns found",
            url: "/DataColumn?where={Data:" + this.uploadId + "}",
            successCallback: function(model) {
                messageBox.Hide();
            },
            errorCallback: function(errorResponse) {
                messageBox.ShowError("Error retrieving Columns.");
            }
        });
    };

    ko.applyBindings(metadataListViewModel, $("#columnsList")[0]);
    return metadataListViewModel;
});
