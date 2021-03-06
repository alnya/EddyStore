﻿define(['jquery', 'knockout', 'webApiClient', 'moment', 'daterangepicker'], function ($, ko, webApiClient, moment) {

    return {
        parseQueryString: function(queryString) {
            var params = {}, queries, temp, i, l;

            queries = queryString.split("&");

            for (i = 0, l = queries.length; i < l; i++) {
                temp = queries[i].split('=');
                params[temp[0]] = temp[1];
            };

            return params;
        },

        getId: function() {
          var pathArray = window.location.pathname.split( '/' );
          return pathArray[pathArray.length-1];
        },

        localRepository: new function () {
            return {
                saveJson: function (key, value) {
                    if (value) {
                        localStorage[key] = ko.toJSON(value);
                    }
                },
                saveValue: function (key, value) {
                    if (value) {
                        localStorage[key] = value;
                    }
                },
                getJson: function (key) {
                    var value = localStorage[key];

                    if (value) {
                        return $.parseJSON(value);
                    } else {
                        return {};
                    }
                },
                getValue: function (key) {
                    return localStorage[key];
                }
            }
        },

        loadSelectionData: function(fields, onSuccess) {

            var selectionData = [];

            for (var c = 0; c < fields.length; c++) {
                var field = fields[c];

                if (field.dataType == 'EntityList' || field.Type == 'EntityList') {
                    if (field.Options == null || !ko.isObservable(field.Options)) {
                        field.Options = ko.observableArray();
                    }
                    var url = ko.isObservable(field.LookupUrl) ? field.LookupUrl() : field.LookupUrl;
                    if (url != null && url != "") {
                        selectionData[url] = selectionData[url] || [];
                        selectionData[url].push(field);
                    }
                }
            }

            for (var lookupUrl in selectionData) {
                webApiClient.ajaxGet(lookupUrl, null, null, function(data, method) {
                    if (data && data.Results) {
                        for (var i = 0; i < selectionData[method].length; i++) {
                            selectionData[method][i].Options(data.Results);
                            if (onSuccess) {
                                onSuccess();
                            }
                        }
                    }
                });
            }
        },

      setupDatePicker: function (element, value) {
        $(element).daterangepicker({ singleDatePicker: true },
          function (start, end) { $(element).find('input').val(start.format('D MMM YYYY')).change(); });
        if (value) {
          var date = moment(value);
          if (date.isValid()) {
            $(element).data('daterangepicker').setStartDate(date);
            $(element).data('daterangepicker').setEndDate(date);
          }
        }
      }
    }
});
