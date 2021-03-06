﻿requirejs.config({
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
      'modalDialog': 'js/modalDialog',
      'baseTable': 'js/baseTable',
      'validation': 'js/validation',
      'page': 'js/vm/page',
      'messageBox': 'js/vm/messageBox',
      // View Models
      'login': 'js/vm/login',
      'dashboard': 'js/vm/dashboard',
      'upload': 'js/vm/upload',
      'column': 'js/vm/column',
      'instrument': 'js/vm/instrument',
      'option': 'js/vm/option',
      'correction': 'js/vm/correction',
      'analysis': 'js/vm/statisticalanalysis',
      'report': 'js/vm/report',
      'user': 'js/vm/user',
      'output': 'js/vm/output',
      'import': 'js/vm/import'
    },
    shim: {
        "bootstrap": {
            deps: ["jquery"]
        }
    },
    //urlArgs: "v=" +  (new Date()).getTime()
});

require(['jquery', 'knockout', 'common','page','knockout.validation', 'bootstrap'], function ($, ko, common, page) {

    $.ajaxSetup({
        beforeSend: function () {
            $('.progress-spinner').addClass('active');
        },
        complete: function () {
            $('.progress-spinner').removeClass('active');
        }
    });
});
