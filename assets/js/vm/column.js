define(['knockout', 'moment'],
function (ko, moment) {

	"use strict";

	var detailViewModel = ko.validatedObservable({

    EntityName: "Raw Data Column", // name of this entity
    Url: "/DataColumn/",  // url to call to load / save / delete

    Data: {model: 'Data'},

    Instrument: ko.observable().extend(),
    Station: ko.observable().extend(),

    Column_Number: ko.observable().extend(),
    Ignore: ko.observable().extend(),
    Numeric: ko.observable().extend(),
    Variable: ko.observable().extend(),
    Measurement_Type: ko.observable().extend(),
    Input_Unit: ko.observable().extend(),
    Linear_Scaling: ko.observable().extend(),
    Output_Unit: ko.observable().extend(),
    Gain_Value: ko.observable().extend(),
    Offset_Value: ko.observable().extend(),
    Nominal_Time_Lag: ko.observable().extend(),
    Minimum_Time_Lag: ko.observable().extend(),
    Maximum_Time_Lag: ko.observable().extend(),

		// Set view model from server JSON object
		SetModel: function(objFromServer) {
			var self = this;
			if (!objFromServer) return;

      self.Data(objFromServer.Data);
      self.Instrument(objFromServer.Instrument);
      self.Column_Number(objFromServer.Column_Number);
      self.Ignore(objFromServer.Ignore);
      self.Numeric(objFromServer.Numeric);
      self.Variable(objFromServer.Variable);
      self.Measurement_Type(objFromServer.Measurement_Type);
      self.Input_Unit(objFromServer.Input_Unit);
      self.Linear_Scaling(objFromServer.Linear_Scaling);
      self.Output_Unit(objFromServer.Output_Unit);
      self.Gain_Value(objFromServer.Gain_Value);
      self.Offset_Value(objFromServer.Offset_Value);
      self.Nominal_Time_Lag(objFromServer.Nominal_Time_Lag);
      self.Minimum_Time_Lag(objFromServer.Minimum_Time_Lag);
      self.Maximum_Time_Lag(objFromServer.Maximum_Time_Lag);
		},

		// Create JSON object to send to save
		GetEntityModel: function () {
			var self = this;

			return {
        Data: self.Data(),
        Instrument: self.Instrument(),
        Column_Number: self.Column_Number(),
        Ignore: self.Ignore(),
        Numeric: self.Numeric(),
        Variable: self.Variable(),
        Measurement_Type: self.Measurement_Type(),
        Input_Unit: self.Input_Unit(),
        Linear_Scaling: self.Linear_Scaling(),
        Output_Unit: self.Output_Unit(),
        Gain_Value: self.Gain_Value(),
        Offset_Value: self.Offset_Value(),
        Nominal_Time_Lag: self.Nominal_Time_Lag(),
        Minimum_Time_Lag: self.Minimum_Time_Lag(),
        Maximum_Time_Lag: self.Maximum_Time_Lag()
			};
		},

		Panels: [
        {
            Title: "Data Columns",
            Columns: [
                {
                    Fields: [
                      { Name: "Ignore", Property: "Ignore", Type: "Checkbox", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Numeric", Property: "Numeric", Type: "Checkbox", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Instrument", Property: "Instrument", Type: "EntityList", LookupUrl: "/StationInstrument?where={Station: " + this.Station() + "}", Caption: "Select Instrument", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Variable", Property: "Variable", Type: "String", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Measurement Type", Property: "Measurement_Type", ype: "List", Caption:'Select', Options: ['Molar/Mass density','Mole fraction','Mixing Ratio','Other'], Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Input Unit", Property: "Input_Unit", Type: "String", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Linear Scaling", Property: "Linear_Scaling", Type: "String", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Output Unit", Property: "Output_Unit", Type: "String", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Gain Value", Property: "Gain_Value", Type: "Number", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Offset Value", Property: "Offset_Value", Type: "Number", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Nominal Time Lag", Property: "Nominal_Time_Lag", Type: "String", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Minimum Time Lag", Property: "Minimum_Time_Lag", Type: "String", Permissions: ["VIEW", "ADD", "EDIT"] },
                      { Name: "Maximum Time Lag", Property: "Maximum_Time_Lag", Type: "String", Permissions: ["VIEW", "ADD", "EDIT"] }
                    ]
                }
            ]
        }]
    });

	return detailViewModel;
});

