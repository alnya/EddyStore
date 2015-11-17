require(['knockout', 'moment', 'baseTable', 'messageBox', 'jquery'],
    function (ko, moment, baseTable, messageBox, $) {

   "use strict";

    var reportListViewModel = new function() {
        this.tableViewModel = new baseTable.GridViewModel({
            columns: [
              { name: 'Name', value: 'Name', filterable: true, template: "nameCellTemplate"},
              { name: 'Status', value: 'Status', filterable: true, dataType: "List", filterValues: ["New", "Requested", "Available"]}
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

    ko.applyBindings(reportListViewModel, $("#listView")[0]);
    return reportListViewModel;
});
