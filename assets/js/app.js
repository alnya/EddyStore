requirejs.config({
    baseUrl: '/',
    paths: {
        'jquery': 'js/dependencies/jquery.min',
        'daterangepicker': 'js/dependencies/daterangepicker',
        'bootstrap': 'js/dependencies/bootstrap.min',
        'knockout': 'js/dependencies/knockout-3.2.0',
        'knockout.validation': 'js/dependencies/knockout-validation.min',
        'moment': 'js/dependencies/moment.min',
        'webApiClient': 'js/webApiClient',
        'common': 'js/common',
        'baseForm': 'js/baseForm',
        'baseTable': 'js/baseTable',
        // View Models
        'messageBox': 'js/vm/messageBox',
        'login': 'js/vm/login'
    },
    shim: {
        "bootstrap": {
            deps: ["jquery"]
        }
    }
});

require(['jquery', 'knockout', 'common','knockout.validation', 'bootstrap'], function ($, ko) {

    $.ajaxSetup({
        beforeSend: function () {
            $('.progress-spinner').addClass('active');
        },
        complete: function () {
            $('.progress-spinner').removeClass('active');
        }
    });
});
