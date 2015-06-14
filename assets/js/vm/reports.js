require(['knockout', 'moment', 'baseTable', 'messageBox', 'jquery'],
    function (ko, moment, baseTable, messageBox, $) {

   "use strict";

    var reportListViewModel = new function() {
        this.tableViewModel = new baseTable.GridViewModel({
            columns: [
              { name: 'Name', value: 'Name', filterable: false, template: "nameCellTemplate"}
            ],
            sortable: false,
            filterMode: 'search',
            pageSize: 10,
            emptyRowMessage: "No reports found",
            url: "/Report/",
            successCallback: function(model) {
                messageBox.Hide();
            },
            errorCallback: function(errorResponse) {
                messageBox.ShowError("Error retrieving reports.");
            }
        });
    };

    ko.applyBindings(uploadListViewModel, $("#listView")[0]);
    return reportListViewModel;
});
