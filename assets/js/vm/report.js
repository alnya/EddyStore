define(['knockout', 'moment', 'webApiClient', 'validation'],
function (ko, moment, api) {

	"use strict";

	var reportVm = ko.validatedObservable({

    EntityName: "Report",
    Url: "/Report",
    Name: ko.observable().extend({required: true}),
    Status: ko.observable('New'),

    Station: ko.observable(),
    DataList: ko.observableArray([]),
    Data: ko.observable().extend({required: true}),
    DataObject: ko.observable(),
    StatisticalAnalysis: ko.observable(),
    SpectralCorrection: ko.observable(),
    ProcessingOption: ko.observable(),

    Missing_Samples_Allowance: ko.observable(10).extend({number: true}),
    Flux_Averaging_Interval:  ko.observable(30).extend({number: true}),
    North_Reference: ko.observable(),

    Master_Anemometer: ko.observable(),
    Cross_Wind_Correction_Applied_By_Anemometer: ko.observable(true),

    Stations: ko.observableArray([]),
    Anemometers: ko.observableArray([]),
    Variables: ko.observableArray([]),
    ReportFlags: ko.observableArray([]),
    ReportVariables: ko.observableArray([]),
    StatisticalAnalysisList: ko.observableArray(),
    SpectralCorrectionList: ko.observableArray(),
    ProcessingOptionList: ko.observableArray(),

    SetModel: function(objFromServer) {
			var self = this;
			if (!objFromServer) return;

      self.Name(objFromServer.Name);
      self.Data(objFromServer.Data);
      self.Status(objFromServer.Status);
      self.Missing_Samples_Allowance(objFromServer.Missing_Samples_Allowance);
      self.Flux_Averaging_Interval(objFromServer.Flux_Averaging_Interval);
      self.North_Reference(objFromServer.North_Reference);
      self.Master_Anemometer(objFromServer.Master_Anemometer);
      self.Cross_Wind_Correction_Applied_By_Anemometer(objFromServer.Cross_Wind_Correction_Applied_By_Anemometer);
      self.ReportFlags(objFromServer.ReportFlags);
      self.ReportVariables(objFromServer.ReportVariables);
    },

    NewReportVariable: function() {
      return {
        Name: ko.observable(),
        DataColumn:ko.observable()
      }
    },

    NewReportFlag: function() {
      return {
        Variable: ko.observable(''),
        Theshold:ko.observable(-9999),
        Unit:ko.observable(),
        Discard_If:ko.observable('Below Threshold')
      }
    },

    Initialise: function() {
      var self = this;
      var flags = [];
      for(var x = 1; x< 10; x++) {
        flags.push(self.NewReportFlag());
      }
      self.ReportFlags(flags);

      api.ajaxGet("/Variable", null, null, function(data, method){
        self.Variables(data.items);
        // add report variables
          ko.utils.arrayForEach(data.items, function(item) {
            var reportVariable = self.NewReportVariable();
            reportVariable.Name = item.Name;
            self.ReportVariables.push(reportVariable);
          });
      });
      api.ajaxGet("/Data/stations", null, null, function(data, method){
        self.Stations(data.items);
      });
      api.ajaxGet("/statisticalanalysis/summary", null, null, function(data, method){
        self.StatisticalAnalysisList(data.items);
      });
      api.ajaxGet("/ProcessingOption/summary", null, null, function(data, method){
        self.ProcessingOptionList(data.items);
      });
      api.ajaxGet("/SpectralCorrection/summary", null, null, function(data, method){
        self.SpectralCorrectionList(data.items);
      });

      self.Station.subscribe(self.GetStationData, self);
      self.Data.subscribe(self.GetData, self);
    },

    GetStationData: function(station) {
      var self = this;

      api.ajaxGet("/Data/available?station=" + station, null, null, function(data, method){
        self.DataList([]);
        ko.utils.arrayForEach(data.items, function(item) {
          self.DataList.push({
            id:item.id, Name:'banana'
            //Name:item.Date_From + " - " + item.Date_To
          });
        });
      });
    },

    GetData: function() {
      var self = this;

      self.Anemometers([]);

      api.ajaxGet("/Data/" + self.Data(), null, null, function (data, method) {
        self.DataObject(data);

        // get anemometers
        var i = 1;
        ko.utils.arrayForEach(data.Instruments, function(instrument) {
          if (instrument.Instrument_Type == 'Anemometer')
          self.Anemometers.push({
            id: instrument.id,
            Name: 'Anemometer ' + i
          });
          i++;
        });

        // get columns with variables defined
      });
    },

		GetEntityModel: function () {
			var self = this;

			var model= {
          Name : self.Name(),
          Status : self.Status(),
          Missing_Samples_Allowance : self.Missing_Samples_Allowance(),
          Flux_Averaging_Interval : self.Flux_Averaging_Interval(),
          North_Reference : self.North_Reference(),
          Master_Anemometer : self.Master_Anemometer(),
          Cross_Wind_Correction_Applied_By_Anemometer : self.Cross_Wind_Correction_Applied_By_Anemometer(),
          Flags: self.ReportFlags(),
          Variables: self.ReportVariables()
			};

      return model;
		},

		Panels: []

  });

	return reportVm;
});

