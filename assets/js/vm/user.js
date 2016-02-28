define(['knockout', 'moment', 'webApiClient', 'validation'],
function (ko, moment, api) {

	"use strict";

	var userVm = ko.validatedObservable({

    EntityName: "User",
    Url: "/User",
    Name: ko.observable().extend({required: true}),
    Email: ko.observable().extend({email:true, required: true}),
    Password: ko.observable(),
    PasswordConfirm: ko.observable(),
    Role_Uploader: ko.observable(),
    Role_Admin: ko.observable(),

    SetModel: function(objFromServer) {
			var self = this;
			if (!objFromServer) return;

      self.Name(objFromServer.Name);
      self.Email(objFromServer.Email);
      self.Role_Uploader(objFromServer.Role_Uploader);
      self.Role_Admin(objFromServer.Role_Admin);
      self.Password();
    },

    GetEntityModel: function () {
      var self = this;

      var model= {
        Name : self.Name(),
        Email : self.Email(),
        Password : self.Password(),
        Role_Uploader : self.Role_Uploader(),
        Role_Admin : self.Role_Admin()
      };

      return model;
    },

		Panels: []

  });

  userVm().PasswordConfirm = ko.observable().extend({equal: userVm().Password});


  return userVm;
});

