define(['knockout', 'moment', 'webApiClient','column', 'instrument', 'validation'],
function (ko, moment, api, column, instrument) {

	"use strict";

	var uploadViewModel = ko.validatedObservable({

    EntityName: "Upload", // name of this entity
    Url: "/Data",  // url to call to load / save / delete

    Folder_Path: ko.observable().extend(),
    Status: ko.observable('New').extend(),
    Number_Of_Rows: ko.observable().extend({digit:true}),
    Date_From: ko.observable().extend({date: true}),
    Date_To: ko.observable().extend({date: true}),
    Field_Separator_Character: ko.observable(',').extend(),
    Number_Of_Header_Rows: ko.observable(1).extend({digit: true}),
    File_Format: ko.observable().extend(),
    // station
    Name: ko.observable().extend({required: true}),
    Timestamp_Refers_To: ko.observable().extend(),
    File_Duration: ko.observable().extend({number:true}),
    Acquisition_Frequency: ko.observable().extend({number:true}),
    Canopy_Height: ko.observable().extend({number:true}),
    Displacement_Height: ko.observable().extend({number:true}),
    Roughness_Length: ko.observable().extend({number:true}),
    Altitude: ko.observable().extend({number:true}),
    Latitude: ko.observable().extend({number:true}),
    Longitude: ko.observable().extend({number:true}),

    Instruments: ko.observableArray(),

    Variables: ko.observableArray(),

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
      self.File_Format(objFromServer.File_Format);

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

      self.Columns([]);
      if (objFromServer.Columns) {
        ko.utils.arrayForEach(objFromServer.Columns, function(objColumn) {
          var c = new column();
          c.SetModel(objColumn);
          self.Columns.push(c);
        });
      }

      self.Instruments([]);
      if (objFromServer.Instruments) {
        ko.utils.arrayForEach(objFromServer.Instruments, function(objInstrument) {
          var i = new instrument();
          i.SetModel(objInstrument);

          i.Number = ko.utils.arrayFilter(self.Instruments(), function(instrument) {
            return instrument.Instrument_Type == i.Instrument_Type;}).length + 1;

          i.Models = ko.computed(function() {
            if (i.Manufacturer()) {
              return (ko.utils.arrayFilter(self.Models(), function(model) {
                return model.Manufacturer == i.Manufacturer();
              }));
            } else {
              return [];
            }
          });
          self.Instruments.push(i);
        });
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
        File_Format: self.File_Format(),
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

      ko.utils.arrayForEach(this.Columns(), function(c) {
        result.Columns.push(c.GetEntityModel());
      });

      ko.utils.arrayForEach(this.Instruments(), function(i) {
        result.Instruments.push(i.GetEntityModel())
      });

      return result;
		},

		Panels: [],

    AddAnemometer: function() {
      var self = this;
      self.addInstrument('Anemometer');
    },

    AddGasAnalyzer: function() {
      var self = this;
      self.addInstrument('Gas');
    },

    addInstrument: function (type) {
      var self = this;
      var i = new instrument();
      i.Instrument_Type = type;

      i.Number = ko.utils.arrayFilter(self.Instruments(), function(instrument) {
        return instrument.Instrument_Type == type;}).length + 1;

      i.Models = ko.computed(function() {
        if (i.Manufacturer()) {
          return (ko.utils.arrayFilter(self.Models(), function(model) {
            return model.Manufacturer == i.Manufacturer();
          }));
        } else {
          return [];
        }
      });

      self.Instruments.push(i);
    },

    RemoveInstrument: function(i) {
      var self = this;
      if (confirm("This will remove this instrument.  Are you sure?")) {
        self.Instruments.remove(i);
      }
    },

    AddColumn: function() {
      var self = this;
      var c = new column();
      c.Column_Number = (self.Columns().length + 1);
      self.Columns.push(c);
    },

    RemoveColumn: function(c) {
      var self = this;
      if (confirm("This will remove this column.  Are you sure?")) {
        self.Columns.remove(c);
      }
    },

    Initialise: function() {
      var self = this;
      api.ajaxGet("/InstrumentManufacturer", null, null, function(data, method) {
        self.GasManufacturers(ko.utils.arrayFilter(data.items, function(item) {
          return item.Instrument_Type == "Gas";
        }));
        self.AnemometerManufacturers(ko.utils.arrayFilter(data.items, function(item) {
          return item.Instrument_Type == "Anemometer";
        }));

      });
      api.ajaxGet("/InstrumentModel", null, null, function(data, method) {
        self.Models(data.items);
      });
      api.ajaxGet("/Variable", null, null, function(data, method){
        self.Variables(data.items);
      });
    }

  });

	return uploadViewModel;
});

