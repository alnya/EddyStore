define(['knockout', 'moment'],
function (ko, moment) {

	"use strict";

	var detailViewModel = ko.validatedObservable({

    EntityName: "Station", // name of this entity
    Url: "/Station/",  // url to call to load / save / delete

    Timestamp_Refers_To: ko.observable().extend(),
    File_Duration: ko.observable().extend(),
    Acquisition_Frequency: ko.observable().extend(),
    Canopy_Height: ko.observable().extend(),
    Displacement_Height: ko.observable().extend(),
    Roughness_Length: ko.observable().extend(),
    Altitude: ko.observable().extend(),
    Latitude: ko.observable().extend(),
    Longitude: ko.observable().extend(),

		// Set view model from server JSON object
		SetModel: function(objFromServer) {
			var self = this;
			if (!objFromServer) return;

      self.Timestamp_Refers_To(objFromServer.Timestamp_Refers_To);
      self.File_Duration(objFromServer.File_Duration);
      self.Acquisition_Frequency(objFromServer.Acquisition_Frequency);
      self.Canopy_Height(objFromServer.Canopy_Height);
      self.Displacement_Height(objFromServer.Displacement_Height);
      self.Roughness_Length(objFromServer.Roughness_Length);
      self.Altitude(objFromServer.Altitude);
      self.Latitude(objFromServer.Latitude);
      self.Longitude(objFromServer.Longitude);

		},

		// Create JSON object to send to save
		GetEntityModel: function () {
			var self = this;

			return {
        Timestamp_Refers_To: self.Timestamp_Refers_To(),
        File_Duration: self.File_Duration(),
        Acquisition_Frequency: self.Acquisition_Frequency(),
        Canopy_Height: self.Canopy_Height(),
        Displacement_Height: self.Displacement_Height(),
        Roughness_Length: self.Roughness_Length(),
        Altitude: self.Altitude(),
        Latitude: self.Latitude(),
        Longitude: self.Longitude()
			};
		},

		Panels: [
        {
            Title: "Station Detail",
            Columns: [
                {
                    Fields: [
                      { Name: "Timestamp Refers To", Property: "Timestamp_Refers_To", Type: "List", Caption:'Select', Options: ['Beginning of averaging period', 'End of averaging period'], Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "File Duration", Property: "File_Duration", Type: "String", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Acquisition Frequency", Property: "Acquisition_Frequency", Type: "Number", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Canopy Height", Property: "Canopy_Height", Type: "Number", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Displacement Height", Property: "Displacement_Height", Type: "Number", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Roughness Length", Property: "Roughness_Length", Type: "Number", Permissions: ["VIEW", "ADD", "EDIT"] }
                    ]
                },
              {
                Fields: [
                  { Name: "Altitude", Property: "Altitude", Type: "Number", Permissions: ["VIEW", "ADD", "EDIT"] },
                  { Name: "Latitude", Property: "Latitude", Type: "Number", Permissions: ["VIEW", "ADD", "EDIT"] },
                  { Name: "Longitude", Property: "Longitude", Type: "Number", Permissions: ["VIEW", "ADD", "EDIT"] }
                ]
              }
            ]
        }]
    });

	return detailViewModel;
});

