require(['knockout', 'moment', 'baseTable', 'messageBox', 'jquery'],
    function (ko, moment, baseTable, messageBox, $) {

   "use strict";

    var userListViewModel = new function() {
        this.tableViewModel = new baseTable.GridViewModel({
            columns: [
              { name: 'Name', value: 'name', template: "nameCellTemplate"},
              { name: "Email", value: "Email"  }
            ],
            sortable: true,
            filterMode: 'search',
            pageSize: 10,
            emptyRowMessage: "No users found",
            url: "/User/",
            successCallback: function(model) {
                messageBox.Hide();
            },
            errorCallback: function(errorResponse) {
                messageBox.ShowError("Error retrieving users.");
            }
        });
    };

    ko.applyBindings(userListViewModel, $("#listView")[0]);
    return userListViewModel;
});
