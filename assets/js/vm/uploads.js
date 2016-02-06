require(['knockout', 'moment', 'baseTable', 'messageBox', 'jquery'],
    function (ko, moment, baseTable, messageBox, $) {

   "use strict";

    var uploadListViewModel = new function() {
        this.tableViewModel = new baseTable.GridViewModel({
            columns: [
              { name: 'Station', value: 'Name', filterable: true, template: "nameCellTemplate"},
              { name: "From", value: "Date_From", dataType: "Date", filterable: false  },
              { name: "To", value: "Date_To", dataType: "Date", filterable: false },
              { name: "Status", value: "Status", dataType: "List", filterValues: ['New', 'InProgress','Processed']}
            ],
            sortable: false,
            filterMode: 'search',
            pageSize: 10,
            emptyRowMessage: "No uploads found",
            url: "/Data/",
            successCallback: function(model) {
                messageBox.Hide();
            },
            errorCallback: function(errorResponse) {
                messageBox.ShowError("Error retrieving data uploads.");
            }
        });
    };

    ko.applyBindings(uploadListViewModel, $("#listView")[0]);
    return uploadListViewModel;
});
