define(['knockout', 'moment'],
function (ko, moment) {

	"use strict";

	var detailViewModel = ko.validatedObservable({

    EntityName: "Metadata", // name of this entity
    Url: "/Metadata",  // url to call to load / save / delete

    Name: ko.observable().extend({maxLength: 40, required: true}),

		// Set view model from server JSON object
		SetModel: function(objFromServer) {
			var self = this;
			if (!objFromServer) return;

			self.Name(objFromServer.Name);
		},

		// Create JSON object to send to save
		GetEntityModel: function () {
			var self = this;

			return {
				Name: self.Name()
			};
		},

		Panels: [
        {
            Title: "Metadata Detail",
            Columns: [
                {
                    Fields: [
			                { Name: "Name", Property: "Name", Type: "String", Permissions: ["VIEW", "ADD", "EDIT"] },
                    ]
                }
            ]
        }]
    });

	return detailViewModel;
});

