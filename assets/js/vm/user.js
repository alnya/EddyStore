define(['knockout', 'moment', 'webApiClient', 'validation'],
function (ko, moment, api) {

	"use strict";

	var userVm = ko.validatedObservable({

    EntityName: "User",
    Url: "/User",
    Name: ko.observable().extend({required: true}),
    Email: ko.observable().extend({email:true, required: true}),
    Password: ko.observable(),

    SetModel: function(objFromServer) {
			var self = this;
			if (!objFromServer) return;

      self.Name(objFromServer.Name);
      self.Email(objFromServer.Email);
      self.Password();
    },

    GetEntityModel: function () {
      var self = this;

      var model= {
        Name : self.Name(),
        Email : self.Email(),
        Password : self.Password()
      };

      return model;
    },

		Panels: []

  });

	return userVm;
});

