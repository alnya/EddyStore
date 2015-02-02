require(['knockout', 'moment', 'baseTable', 'messageBox', 'jquery'],
    function (ko, moment, baseTable, messageBox, $) {

   "use strict";

    var metadataListViewModel = new function() {
        this.tableViewModel = new baseTable.GridViewModel({
            columns: [
                { name: "Name", value: "Name", sortDescending: false, template: "nameCellTemplate" }
            ],
            sortable: false,
            filterMode: 'search',
            pageSize: 10,
            emptyRowMessage: "No Stations found",
            url: "/Station/",
            successCallback: function(model) {
                messageBox.Hide();
            },
            errorCallback: function(errorResponse) {
                messageBox.ShowError("Error retrieving Stations.");
            }
        });
    };

    ko.applyBindings(metadataListViewModel, $("#listView")[0]);
    return metadataListViewModel;
});
