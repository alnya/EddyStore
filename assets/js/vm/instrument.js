define(['knockout', 'moment'],
function (ko, moment) {

	"use strict";

	var detailViewModel = ko.validatedObservable({

    EntityName: "Instrument", // name of this entity
    Url: "/StationInstrument/",  // url to call to load / save / delete

    Station:  ko.observable().extend(),

    Instrument_Type:  ko.observable('Anemometer').extend({ required: true }),
    Manufacturer:  ko.observable().extend({ required: true }),
    Model:  ko.observable().extend({ required: true }),
    Software_Version: ko.observable().extend(),
    Instrument_Id:  ko.observable().extend(),
    Height:  ko.observable().extend({ required: true }),
    Wind_Data_Format:  ko.observable().extend(),
    North_Alignment:  ko.observable().extend(),
    North_Offset:  ko.observable().extend(),
    Northward_Separation: ko.observable().extend(),
    Eastward_Separation:  ko.observable().extend(),
    Vertical_Separation: ko.observable().extend(),
    Longitudinal_Path_Length:  ko.observable().extend(),
    Transversal_Path_Length:  ko.observable().extend(),
    Tube_Length:  ko.observable().extend(),
    Tube_Inner_Diameter: ko.observable().extend(),
    Nominal_Tube_Flow_Rate: ko.observable().extend(),
    Time_Response: ko.observable().extend(),
    Extinction_Coefficient_In_Water_KW:  ko.observable().extend(),
    Extinction_Coefficient_In_Water_KO:  ko.observable().extend(),

		// Set view model from server JSON object
		SetModel: function(objFromServer) {
      var self = this;
      if (!objFromServer) return;

      self.Station(objFromServer.Station);

      self.Instrument_Type(objFromServer.Instrument_Type);
      self.Manufacturer(objFromServer.Manufacturer);
      self.Model(objFromServer.Model);
      self.Software_Version(objFromServer.Software_Version);
      self.Instrument_Id(objFromServer.Instrument_Id);
      self.Height(objFromServer.Height);
      self.Wind_Data_Format(objFromServer.Wind_Data_Format);
      self.North_Alignment(objFromServer.North_Alignment);
      self.North_Offset(objFromServer.North_Offset);
      self.Northward_Separation(objFromServer.Northward_Separation);
      self.Eastward_Separation(objFromServer.Eastward_Separation);
      self.Vertical_Separation(objFromServer.Vertical_Separation);
      self.Longitudinal_Path_Length(objFromServer.Longitudinal_Path_Length);
      self.Transversal_Path_Length(objFromServer.Transversal_Path_Length);
      self.Tube_Length(objFromServer.Tube_Length);
      self.Tube_Inner_Diameter(objFromServer.Tube_Inner_Diameter);
      self.Nominal_Tube_Flow_Rate(objFromServer.Nominal_Tube_Flow_Rate);
      self.Time_Response(objFromServer.Time_Response);
      self.Extinction_Coefficient_In_Water_KW(objFromServer.Extinction_Coefficient_In_Water_KW);
      self.Extinction_Coefficient_In_Water_KO(objFromServer.Extinction_Coefficient_In_Water_KO);
    },

		// Create JSON object to send to save
		GetEntityModel: function () {
			var self = this;

			return {
        Instrument_Type: self.Instrument_Type,
        Manufacturer: self.Manufacturer,
        Model: self.Model,
        Software_Version: self.Software_Version,
        Instrument_Id: self.Instrument_Id,
        Height: self.Height,
        Wind_Data_Format: self.Wind_Data_Format,
        North_Alignment: self.North_Alignment,
        North_Offset: self.North_Offset,
        Northward_Separation: self.Northward_Separation,
        Eastward_Separation: self.Eastward_Separation,
        Vertical_Separation: self.Vertical_Separation,
        Longitudinal_Path_Length: self.Longitudinal_Path_Length,
        Transversal_Path_Length: self.Transversal_Path_Length,
        Tube_Length: self.Tube_Length,
        Tube_Inner_Diameter: self.Tube_Inner_Diameter,
        Nominal_Tube_Flow_Rate: self.Nominal_Tube_Flow_Rate,
        Time_Response: self.Time_Response,
        Extinction_Coefficient_In_Water_KW: self.Extinction_Coefficient_In_Water_KW,
        Extinction_Coefficient_In_Water_KO: self.Extinction_Coefficient_In_Water_KO
      };
		},

    IsAnemometer: function() {  var self = this;  return self.Instrument_Type() == "Anemometer";},

		Panels: [
        {
            Title: "Instrument Details",
            Columns: [
                {
                    Fields: [
                      { Name: "Manufacturer", Property: "Manufacturer", Type: "EntityList", Caption:'Select', LookupUrl: "/InstrumentManufacturer", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Model", Property: "Model", Type: "List", Caption:'Select', LookupUrl: "/InstrumentModel", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Software Version", Property: "Software_Version", Type: "String", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Instrument Id", Property: "Instrument_Id", Type: "String", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Height", Property: "Height", Type: "Number", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Wind Data Format", Property: "Wind_Data_Format", Type: "Number", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "North Alignment", Property: "North_Alignment", Type: "Number", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "North Offset", Property: "North_Offset", Type: "Number", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Northward Separation", Property: "Northward_Separation", Type: "Number", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Eastward Separation", Property: "Eastward_Separation", Type: "Number", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Vertical Separation", Property: "Vertical_Separation", Type: "Number", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Longitudinal Path Length", Property: "Longitudinal_Path_Length", Type: "Number", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Transversal Path Length", Property: "Transversal_Path_Length", Type: "Number", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Tube Length", Property: "Tube_Length", Type: "Number", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Tube Inner Diameter", Property: "Tube_Inner_Diameter", Type: "Number", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Nominal Tube Flow Rate", Property: "Nominal_Tube_Flow_Rate", Type: "Number", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Time Response", Property: "Time_Response", Type: "Number", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Extinction Coefficient In Water (KW)", Property: "Extinction_Coefficient_In_Water_KW", Type: "Number", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Extinction Coefficient In Water (KO)", Property: "Extinction_Coefficient_In_Water_KO", Type: "Number", Permissions: ["VIEW", "ADD", "EDIT"] }
                    ]
                }
            ]
        }]
    });

	return detailViewModel;
});

