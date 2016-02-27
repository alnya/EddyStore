define(['knockout', 'webApiClient'],
    function (ko, webApiClient) {

    "use strict";

    var dashboardViewModel = ko.validatedObservable({
        RecentProjects: ko.observableArray([]),
        RecentDownloads: ko.observableArray([]),

        init: function() {
          var self = this;
          webApiClient.ajaxGet("/Report?limit=5&sort=updatedAt DESC", null, null, function(data, method){
            self.RecentProjects(data.items);
          });
          webApiClient.ajaxGet("/Report?Status=Available&limit=5&sort=updatedAt DESC", null, null, function(data, method){
            self.RecentDownloads(data.items);
          });
        }
    });

    return dashboardViewModel;
});
