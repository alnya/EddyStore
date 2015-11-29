define(['knockout', 'moment', 'webApiClient', 'validation'],
function (ko, moment, api) {

	"use strict";

	var reportVm = ko.validatedObservable({

    EntityName: "Report",
    Url: "/Report",
    Name: ko.observable().extend({required: true}),
    Status: ko.observable('New'),
    id: ko.observable(),
    CanDeleteEntity: true,

    Station: ko.observable(),
    DataList: ko.observableArray([]),
    Data: ko.observable().extend({required: true}),
    SetData: null,
    DataObject: ko.observable(),
    StatisticalAnalysis: ko.observable(),
    SpectralCorrection: ko.observable(),
    ProcessingOption: ko.observable(),
    Output: ko.observable(),

    Missing_Samples_Allowance: ko.observable(10).extend({number: true}),
    Flux_Averaging_Interval:  ko.observable(30).extend({number: true}),
    North_Reference: ko.observable(),

    Master_Anemometer: ko.observable(),
    Cross_Wind_Correction_Applied_By_Anemometer: ko.observable(true),

    Stations: ko.observableArray([]),
    Anemometers: ko.observableArray([]),
    DataColumns: ko.observableArray([]),
    Variables: ko.observableArray([]),
    ReportFlags: ko.observableArray([]),
    ReportVariables: ko.observableArray([]),
    StatisticalAnalysisList: ko.observableArray(),
    SpectralCorrectionList: ko.observableArray(),
    ProcessingOptionList: ko.observableArray(),
    OutputList: ko.observableArray(),

    NewReportVariable: function() {
      return {
        id: ko.observable(),
        Name: ko.observable(),
        Variable: ko.observable(),
        DataColumn:ko.observable()
      }
    },

    NewReportFlag: function() {
      return {
        id: ko.observable(),
        Variable: ko.observable(''),
        Threshold:ko.observable(-9999),
        Unit:ko.observable(),
        Discard_If:ko.observable('Below Threshold')
      }
    },

    SetModel: function(objFromServer) {
			var self = this;
			if (!objFromServer) return;

      self.id(objFromServer.id);
      self.Name(objFromServer.Name);
      if (objFromServer.Data != null) {
        self.Station(objFromServer.Data.Name);
        self.SetData = (objFromServer.Data.id);
      }
      self.Status(objFromServer.Status);
      self.Missing_Samples_Allowance(objFromServer.Missing_Samples_Allowance);
      self.Flux_Averaging_Interval(objFromServer.Flux_Averaging_Interval);
      self.North_Reference(objFromServer.North_Reference);
      self.Master_Anemometer(objFromServer.Master_Anemometer ? objFromServer.Master_Anemometer.id : null);
      self.Cross_Wind_Correction_Applied_By_Anemometer(objFromServer.Cross_Wind_Correction_Applied_By_Anemometer);

      self.StatisticalAnalysis(objFromServer.StatisticalAnalysis ? objFromServer.StatisticalAnalysis.id : null);
      self.SpectralCorrection(objFromServer.SpectralCorrection ? objFromServer.SpectralCorrection.id : null);
      self.ProcessingOption(objFromServer.ProcessingOption ? objFromServer.ProcessingOption.id : null);

      self.ReportFlags([]);
      ko.utils.arrayForEach(objFromServer.Flags, function(objFlag) {
        var flag = self.NewReportFlag();
        flag.id(objFlag.id);
        flag.Variable(objFlag.Variable);
        flag.Threshold(objFlag.Threshold);
        flag.Unit(objFlag.Unit);
        flag.Discard_If(objFlag.Discard_If);
        self.ReportFlags.push(flag);
      });

      self.ReportVariables([]);
      ko.utils.arrayForEach(objFromServer.Variables, function(objVariable) {
        var variable = self.NewReportVariable();
        variable.id(objVariable.id);
        variable.Variable(objVariable.Variable);
        var thisVar = ko.utils.arrayFirst(self.Variables(), function(v) {
          return v.id == objVariable.Variable;
        });
        variable.Name(thisVar.Name);
        variable.DataColumn(objVariable.DataColumn);
        self.ReportVariables.push(variable);
      });
    },

    Initialise: function() {
      var self = this;
      var flags = [];
      for(var x = 1; x< 10; x++) {
        flags.push(self.NewReportFlag());
      }
      self.ReportFlags(flags);

      self.Station.subscribe(self.GetStationData, self);
      self.Data.subscribe(self.GetData, self);

      api.ajaxGet("/Variable", null, null, function(data, method){
        self.Variables(data.items);
        // add report variables
          ko.utils.arrayForEach(data.items, function(item) {
            var reportVariable = self.NewReportVariable();
            reportVariable.Variable = item.id;
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
      api.ajaxGet("/Output", null, null, function(data, method) {
        self.OutputList(data.items);
      });
    },

    GetStationData: function(station) {
      var self = this;

      if (!station)
        return;

      api.ajaxGet("/Data/available?station=" + station, null, null, function(data, method){
        self.DataList([]);
        ko.utils.arrayForEach(data.items, function(item) {
          self.DataList.push({
            id:item.id,
            Name:item.Date_From + " - " + item.Date_To
          });
        });
        if (self.SetData) {
          self.Data(self.SetData);
          self.SetData = null;
        }
      });
    },

    GetData: function(data) {
      var self = this;

      if (!data)
        return;

      self.Anemometers([]);

      api.ajaxGet("/Data/" + data, null, null, function (data, method) {
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
        self.DataColumns([]);
        ko.utils.arrayForEach(data.Columns, function(col) {
          if (col.Variable)
            self.DataColumns.push({
              id: col.id,
              Name: col.Variable
            });
        });
      });
    },

    RequestReport: function() {
      var self = this;
      if (confirm("This will run Eddy Pro and generate the output data. Are you sure?")) {
        api.ajaxGet("/Report/Request/" + self.EntityViewModel.id(), null, null, null);
      }
    },

		GetEntityModel: function () {
			var self = this;

			var model= {
        Name : self.Name(),
        Status : self.Status(),
        Data : self.Data(),
        Missing_Samples_Allowance : self.Missing_Samples_Allowance(),
        Flux_Averaging_Interval : self.Flux_Averaging_Interval(),
        North_Reference : self.North_Reference(),
        Master_Anemometer : self.Master_Anemometer(),
        Cross_Wind_Correction_Applied_By_Anemometer : self.Cross_Wind_Correction_Applied_By_Anemometer(),
        Flags: self.ReportFlags(),
        Variables: self.ReportVariables(),
        StatisticalAnalysis: self.StatisticalAnalysis(),
        SpectralCorrection: self.SpectralCorrection(),
        ProcessingOption: self.ProcessingOption()
			};

      return model;
		},

		Panels: []

  });

	return reportVm;
});

