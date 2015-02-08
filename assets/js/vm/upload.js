define(['knockout', 'moment', 'webApiClient','validation'],
function (ko, moment, api) {

	"use strict";

	var detailViewModel = ko.validatedObservable({

    EntityName: "Upload", // name of this entity
    Url: "/Data/",  // url to call to load / save / delete

    Folder_Path: ko.observable().extend(),
    Status: ko.observable('New').extend(),
    Number_Of_Rows: ko.observable().extend({numeric:true}),
    Date_From: ko.observable().extend({date: true}),
    Date_To: ko.observable().extend({date: true}),
    Field_Separator_Character: ko.observable(',').extend(),
    Number_Of_Header_Rows: ko.observable(1).extend({nullableInt: true, numeric:true}),

    // station
    Name: ko.observable().extend({required: true}),
    Timestamp_Refers_To: ko.observable().extend(),
    File_Duration: ko.observable().extend({numeric:true}),
    Acquisition_Frequency: ko.observable().extend({numeric:true}),
    Canopy_Height: ko.observable().extend({numeric:true}),
    Displacement_Height: ko.observable().extend({numeric:true}),
    Roughness_Length: ko.observable().extend({numeric:true}),
    Altitude: ko.observable().extend({numeric:true}),
    Latitude: ko.observable().extend({numeric:true}),
    Longitude: ko.observable().extend({numeric:true}),

    Instruments: ko.observableArray(),

    Columns: ko.observableArray(),

    GasManufacturers: ko.observableArray(),

    AnemometerManufacturers: ko.observableArray(),

    Models: ko.observableArray(),


    // Set view model from server JSON object
		SetModel: function(objFromServer) {
			var self = this;
			if (!objFromServer) return;

      self.Folder_Path(objFromServer.Folder_Path);
      self.Status(objFromServer.Status);
      self.Number_Of_Rows(objFromServer.Number_Of_Rows);
      if (objFromServer.Date_From) {
        self.Date_From(moment(objFromServer.Date_From).format("D MMM YYYY"));
      }
      if (objFromServer.Date_To) {
        self.Date_To(moment(objFromServer.Date_To).format("D MMM YYYY"));
      }
      self.Field_Separator_Character(objFromServer.Field_Separator_Character);
      self.Number_Of_Header_Rows(objFromServer.Number_Of_Header_Rows);

      self.Name(objFromServer.Name);
      self.Timestamp_Refers_To(objFromServer.Timestamp_Refers_To);
      self.File_Duration(objFromServer.File_Duration);
      self.Acquisition_Frequency(objFromServer.Acquisition_Frequency);
      self.Canopy_Height(objFromServer.Canopy_Height);
      self.Displacement_Height(objFromServer.Displacement_Height);
      self.Roughness_Length(objFromServer.Roughness_Length);
      self.Altitude(objFromServer.Altitude);
      self.Latitude(objFromServer.Latitude);
      self.Longitude(objFromServer.Longitude);

      if (objFromServer.Columns) {
        self.Columns(objFromServer.Columns);
      }
      if (objFromServer.Instruments) {
        self.Instruments(objFromServer.Instruments);
      }
    },

		// Create JSON object to send to save
		GetEntityModel: function () {
			var self = this;

			var result= {
        Status: self.Status(),
        Number_Of_Rows: self.Number_Of_Rows(),
        Date_From: self.Date_From(),
        Date_To: self.Date_To(),
        Field_Separator_Character: self.Field_Separator_Character(),
        Number_Of_Header_Rows: self.Number_Of_Header_Rows(),

        Name: self.Name(),
        Timestamp_Refers_To: self.Timestamp_Refers_To(),
        File_Duration: self.File_Duration(),
        Acquisition_Frequency: self.Acquisition_Frequency(),
        Canopy_Height: self.Canopy_Height(),
        Displacement_Height: self.Displacement_Height(),
        Roughness_Length: self.Roughness_Length(),
        Altitude: self.Altitude(),
        Latitude: self.Latitude(),
        Longitude: self.Longitude(),
        Instruments: [],
        Columns: []
			};

      ko.utils.arrayForEach(this.Columns(), function(column) {
        result.Columns.push({
          Id: column.Id,
          Instrument: column.Instrument(),
          Column_Number: column.Column_Number,
          Ignore: column.Ignore(),
          Numeric: column.Numeric(),
          Variable: column.Variable(),
          Measurement_Type: column.Measurement_Type(),
          Input_Unit: column.Input_Unit(),
          Linear_Scaling: column.Linear_Scaling(),
          Output_Unit: column.Output_Unit(),
          Gain_Value: column.Gain_Value(),
          Offset_Value: column.Offset_Value(),
          Nominal_Time_Lag: column.Nominal_Time_Lag(),
          Minimum_Time_Lag: column.Minimum_Time_Lag(),
          Maximum_Time_Lag: column.Maximum_Time_Lag()
        })
      });

      ko.utils.arrayForEach(this.Instruments(), function(instrument) {
        result.Instruments.push({
          Id: instrument.Id,
          Instrument_Type: instrument.Instrument_Type,
          Manufacturer: instrument.Manufacturer,
          Model: instrument.Model,
          Software_Version: instrument.Software_Version,
          Instrument_Id: instrument.Instrument_Id,
          Height: instrument.Height,
          Wind_Data_Format: instrument.Wind_Data_Format,
          North_Alignment: instrument.North_Alignment,
          North_Offset: instrument.North_Offset,
          Northward_Separation: instrument.Northward_Separation,
          Eastward_Separation: instrument.Eastward_Separation,
          Vertical_Separation: instrument.Vertical_Separation,
          Longitudinal_Path_Length: instrument.Longitudinal_Path_Length,
          Transversal_Path_Length: instrument.Transversal_Path_Length,
          Tube_Length: instrument.Tube_Length,
          Tube_Inner_Diameter: instrument.Tube_Inner_Diameter,
          Nominal_Tube_Flow_Rate: instrument.Nominal_Tube_Flow_Rate,
          Time_Response: instrument.Time_Response,
          Extinction_Coefficient_In_Water_KW: instrument.Extinction_Coefficient_In_Water_KW,
          Extinction_Coefficient_In_Water_KO: instrument.Extinction_Coefficient_In_Water_KO
        })
      });

      return result;
		},

		Panels: [],

    AddAnemometer: function() {
      var self = this;

      var instrument = {
        Instrument_Type: "Anemometer",
        Manufacturer: ko.observable().extend({required: true}),
        Model: ko.observable().extend({required: true}),
        Instrument_Id: ko.observable().extend(),
        Height:ko.observable().extend({required: true, numeric:true}),
        Wind_Data_Format: ko.observable().extend(),
        North_Alignment: ko.observable().extend(),
        North_Offset: ko.observable().extend(),
        Northward_Separation: ko.observable().extend(),
        Eastward_Separation: ko.observable().extend(),
        Vertical_Separation: ko.observable().extend(),
        Longitudinal_Path_Length: ko.observable().extend(),
        Transversal_Path_Length: ko.observable().extend(),
        Time_Response: ko.observable().extend()
      };

      instrument.Models = ko.computed(function() {
        if (instrument.Manufacturer()) {
          return (ko.utils.arrayFilter(self.Models(), function(model) {
            return model.Manufacturer == instrument.Manufacturer();
          }));
        } else {
          return [];
        }
      });

      self.Instruments.push(instrument);
    },

    AddGasAnalyzer: function() {
      var self = this;
      var instrument = {
        Instrument_Type: "Gas",
        Manufacturer: ko.observable().extend({required: true}),
        Model: ko.observable().extend({required: true}),
        Software_Version: ko.observable().extend(),
        Instrument_Id: ko.observable().extend(),
        Height:ko.observable().extend({required: true}),
        Tube_Length: ko.observable().extend(),
        Tube_Inner_Diameter: ko.observable().extend(),
        Nominal_Tube_Flow_Rate: ko.observable().extend(),
        Northward_Separation: ko.observable().extend(),
        Eastward_Separation: ko.observable().extend(),
        Vertical_Separation: ko.observable().extend(),
        Longitudinal_Path_Length: ko.observable().extend(),
        Transversal_Path_Length: ko.observable().extend(),
        Time_Response: ko.observable().extend(),
        Extinction_Coefficient_In_Water_KW: ko.observable().extend(),
        Extinction_Coefficient_In_Water_KO: ko.observable().extend(),
        Models: ko.observableArray()
      };

      instrument.Models = ko.computed(function() {
        if (instrument.Manufacturer()) {
          return (ko.utils.arrayFilter(self.Models(), function(model) {
            return model.Manufacturer == instrument.Manufacturer();
          }));
        } else {
          return [];
        }
      });

      self.Instruments.push(instrument);
    },

    RemoveInstrument: function(instrument) {
      var self = this;
      if (confirm("This will remove this instrument.  Are you sure?")) {
        self.Instruments.remove(instrument);
      }
    },

    AddColumn: function() {
      var self = this;
      self.Columns.push({
        Instrument: ko.observable().extend(),
        Column_Number: (self.Columns().length + 1),
        Ignore: ko.observable().extend(),
        Numeric: ko.observable().extend(),
        Variable: ko.observable().extend(),
        Measurement_Type: ko.observable().extend(),
        Input_Unit: ko.observable().extend(),
        Linear_Scaling: ko.observable().extend(),
        Output_Unit: ko.observable().extend(),
        Gain_Value: ko.observable().extend(),
        Offset_Value: ko.observable().extend(),
        Nominal_Time_Lag: ko.observable({numeric:true}).extend(),
        Minimum_Time_Lag: ko.observable({numeric:true}).extend(),
        Maximum_Time_Lag: ko.observable({numeric:true}).extend()
      });
    },

    RemoveColumn: function(column) {
      var self = this;
      if (confirm("This will remove this column.  Are you sure?")) {
        self.Columns.remove(column);
      }
    }

  });

  api.ajaxGet("/InstrumentManufacturer", null, null, function(data, method) {
    detailViewModel().GasManufacturers(ko.utils.arrayFilter(data.items, function(item) {
      return item.Instrument_Type == "Gas";
    }));
    detailViewModel().AnemometerManufacturers(ko.utils.arrayFilter(data.items, function(item) {
      return item.Instrument_Type == "Anemometer";
    }));
  });
  api.ajaxGet("/InstrumentModel", null, null, function(data, method) {
    detailViewModel().Models(data.items);
  });

	return detailViewModel;
});

