require(['knockout', 'moment', 'baseTable', 'messageBox', 'jquery'],
    function (ko, moment, baseTable, messageBox, $) {

   "use strict";

    var uploadListViewModel = new function() {
        this.tableViewModel = new baseTable.GridViewModel({
            columns: [
              { name: 'Name', value: 'Name', template: "nameCellTemplate"},
            ],
            sortable: true,
            filterMode: 'search',
            pageSize: 10,
            emptyRowMessage: "No output file options found",
            url: "/Output/",
            successCallback: function(model) {
                messageBox.Hide();
            },
            errorCallback: function(errorResponse) {
                messageBox.ShowError("Error retrieving data.");
            }
        });
    };

    ko.applyBindings(uploadListViewModel, $("#listView")[0]);
    return uploadListViewModel;
});
