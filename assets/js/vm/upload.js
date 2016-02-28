define(['knockout', 'moment', 'webApiClient','column', 'instrument', 'messageBox', 'validation'],
function (ko, moment, api, column, instrument, messageBox) {

	"use strict";

	var uploadViewModel = ko.validatedObservable({

    EntityName: "Upload", // name of this entity
    Url: "/Data",  // url to call to load / save / delete
    id: ko.observable().extend(),
    Folder_Path: ko.observable().extend(),
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
    AccessLevel: ko.observable(1),
    Instruments: ko.observableArray(),
    InstrumentsForColumns: ko.observableArray(),

    Variables: ko.observableArray(),

    Columns: ko.observableArray(),

    GasManufacturers: ko.observableArray(),

    AnemometerManufacturers: ko.observableArray(),

    Models: ko.observableArray(),

    TransferTo: ko.observable(),

    getInstrumentName: function(instrument) {
      var self = this;
      var shortList = self.Instruments().filter(function (item) { return item.Model == instrument.Model; });
      for(var i = 0; i < shortList.length; i += 1) {
        if (shortList[i].id === instrument.id) {
          return instrument.Model() + "_" + (i + 1);
        }
      }
    },

    // Set view model from server JSON object
		SetModel: function(objFromServer) {
			var self = this;
			if (!objFromServer) return;

      self.id(objFromServer.id);

      self.Folder_Path(objFromServer.Folder_Path);
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
      self.AccessLevel(objFromServer.AccessLevel);
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
          self.InstrumentsForColumns.push({id: i.id, Name: self.getInstrumentName(i)});
        });
      }

      self.Columns([]);
      if (objFromServer.Columns) {
        ko.utils.arrayForEach(objFromServer.Columns, function(objColumn) {
          var c = new column();
          c.SetModel(objColumn);
          self.Columns.push(c);
        });
      }
    },

		// Create JSON object to send to save
		GetEntityModel: function () {
			var self = this;

			var result= {
        Folder_Path: self.Folder_Path(),
        AccessLevel: self.AccessLevel(),
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
      self.InstrumentsForColumns.push({id: i.Number, Name: self.getInstrumentName(i)});
    },

    RemoveInstrument: function(i) {
      var self = this;
      if (confirm("This will remove this instrument.  Are you sure?")) {
        var x = self.InstrumentsForColumns.find(function(item) {return item.id == i.id || item.id == i.Number});
        self.InstrumentsForColumns.remove(x);
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

    UploadFile: function(file) {
      var self = this;
      messageBox.Hide();
      api.ajaxUploadZip("/Data/upload/" + self.id(), file,
        function(model) {
          messageBox.ShowSuccess("Upload Successful!");
        },
        function(errorResponse) {
          messageBox.ShowError("Upload Failed: " + errorResponse);
        });
    },

    TransferUser: function() {
      var self = this;
      if (confirm("This will transfer ownership to this user.  Are you sure?")) {
        api.ajaxPost("/Data/transfer", ko.toJSON({id: self.id(), email: self.TransferTo()}), null, function (model) {
            messageBox.ShowSuccess("Ownership transferred successfully");
          },
          function (errorResponse) {
            messageBox.ShowError(errorResponse.responseText);
          });
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

