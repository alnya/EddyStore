define(['knockout', 'moment', 'validation'],
function (ko, moment) {

	"use strict";

	var processingOptionViewModel = ko.validatedObservable({

    EntityName: "Processing Option", // name of this entity
    Url: "/ProcessingOption",  // url to call to load / save / delete
    PieUrl: ko.observable(),
    CanDeleteEntity: true,

    Name: ko.observable().extend({required: true}),
    U: ko.observable().extend({number:true}),
    V: ko.observable().extend({number:true}),
    W: ko.observable().extend({number:true}),
    Angle_Of_Attack_Correction_For_Wind_Components: ko.observable().extend(),
    Angle_Of_Attach_Method: ko.observable().extend(),
    Axis_Rotation_For_Tilt_Correction: ko.observable().extend(),
    Rotation_Method: ko.observable('Double rotation').extend(),
    Detrend_Method: ko.observable('Block average').extend(),
    Turbulent_Fluctuations_Time_Constant: ko.observable().extend({number:true}),
    Time_Lag_Compensation: ko.observable(true).extend(),
    Time_Lag_Method: ko.observable('Covariance maximization').extend(),
    Compensate_Density_Fluctuations: ko.observable(true).extend(),
    Compensate_Density_Fluctuations_Method: ko.observable('Use/convert to mixing ration, if possible(Burba et al. 2012)').extend(),
    Add_Instrument_Sensible_Heat_Components: ko.observable().extend(),
    Surface_Temperature_Estimations: ko.observable().extend(),

    Tapering_Window:ko.observable('Hamming').extend(),
    Frequency_Bins: ko.observable(50).extend({number:true}),
    Power_Of_Two_Samples: ko.observable().extend(),

    Quality_Check: ko.observable(true).extend(),
    Quality_Check_Flagging_Policy:ko.observable('Mauder and Foken (2004) (0-1-2 system)').extend(),
    Footprint_Estimation: ko.observable(true).extend(),
    Footprint_Method:ko.observable().extend('Kljun et al. (2004)'),

    Time_Lag_Start: ko.observable().extend({required: true, date: true}),
    Time_Lag_End: ko.observable().extend({required: true, date: true}),
    Time_Lag_Plausibility_Range_Around_Median_Value: ko.observable().extend({number:true}),
    Time_Lag_RH_Classes: ko.observable().extend({number:true}),
    Time_Lag_Minimum_Heat_Flux: ko.observable().extend({number:true}),
    Time_Lag_Minimum_C02_Flux: ko.observable().extend({number:true}),
    Time_Lag_Minimum_CH4_Flux: ko.observable().extend({number:true}),
    Time_Lag_Minimum_Gas_Flux: ko.observable().extend({number:true}),

    Time_Lag_Searching_C02_Min: ko.observable().extend({number:true}),
    Time_Lag_Searching_C02_Max: ko.observable().extend({number:true}),
    Time_Lag_Searching_H20_Min: ko.observable().extend({number:true}),
    Time_Lag_Searching_H20_Max: ko.observable().extend({number:true}),
    Time_Lag_Searching_CH4_Min: ko.observable().extend({number:true}),
    Time_Lag_Searching_CH4_Max: ko.observable().extend({number:true}),
    Time_Lag_Searching_Gas_Min: ko.observable().extend({number:true}),
    Time_Lag_Searching_Gas_Max: ko.observable().extend({number:true}),

    Planar_Start: ko.observable().extend({required: true, date: true}),
    Planar_End: ko.observable().extend({required: true, date: true}),
    Planar_Elements_Per_Sector: ko.observable().extend({number:true}),
    Planar_Max_Mean_Verticle_Wind_Component: ko.observable().extend({number:true}),
    Planar_Min_Mean_Horizontal_Wind_Component: ko.observable().extend({number:true}),
    Planar_Calculations_Fail:ko.observable().extend(),
    Planar_North_Offset_First_Sector:ko.observable().extend({number:true}),
    Planar_Wind_Sectors:ko.observableArray(),

    // Set view model from server JSON object
		SetModel: function(objFromServer) {
			var self = this;
			if (!objFromServer) return;

      self.Name(objFromServer.Name);
      self.U(objFromServer.U);
      self.V(objFromServer.V);
      self.W(objFromServer.W);
      self.Angle_Of_Attack_Correction_For_Wind_Components(objFromServer.Angle_Of_Attack_Correction_For_Wind_Components);
      self.Angle_Of_Attach_Method(objFromServer.Angle_Of_Attach_Method);
      self.Axis_Rotation_For_Tilt_Correction(objFromServer.Axis_Rotation_For_Tilt_Correction);
      self.Rotation_Method(objFromServer.Rotation_Method);
      self.Detrend_Method(objFromServer.Detrend_Method);
      self.Turbulent_Fluctuations_Time_Constant(objFromServer.Turbulent_Fluctuations_Time_Constant);
      self.Time_Lag_Compensation(objFromServer.Time_Lag_Compensation);
      self.Time_Lag_Method(objFromServer.Time_Lag_Method);
      self.Compensate_Density_Fluctuations(objFromServer.Compensate_Density_Fluctuations);
      self.Compensate_Density_Fluctuations_Method(objFromServer.Compensate_Density_Fluctuations_Method);
      self.Add_Instrument_Sensible_Heat_Components(objFromServer.Add_Instrument_Sensible_Heat_Components);
      self.Surface_Temperature_Estimations(objFromServer.Surface_Temperature_Estimations);
      self.Tapering_Window(objFromServer.Tapering_Window);
      self.Frequency_Bins(objFromServer.Frequency_Bins);

      self.Power_Of_Two_Samples(objFromServer.Power_Of_Two_Samples);
      self.Quality_Check(objFromServer.Quality_Check);
      self.Quality_Check_Flagging_Policy(objFromServer.Quality_Check_Flagging_Policy);
      self.Footprint_Estimation(objFromServer.Footprint_Estimation);
      self.Footprint_Method(objFromServer.Footprint_Method);

      self.Time_Lag_Start(moment(objFromServer.Time_Lag_Start).format("D MMM YYYY"));
      self.Time_Lag_End(moment(objFromServer.Time_Lag_End).format("D MMM YYYY"));

      self.Time_Lag_Plausibility_Range_Around_Median_Value(objFromServer.Time_Lag_Plausibility_Range_Around_Median_Value);
      self.Time_Lag_RH_Classes(objFromServer.Time_Lag_RH_Classes);
      self.Time_Lag_Minimum_Heat_Flux(objFromServer.Time_Lag_Minimum_Heat_Flux);
      self.Time_Lag_Minimum_C02_Flux(objFromServer.Time_Lag_Minimum_C02_Flux);
      self.Time_Lag_Minimum_CH4_Flux(objFromServer.Time_Lag_Minimum_CH4_Flux);
      self.Time_Lag_Minimum_Gas_Flux(objFromServer.Time_Lag_Minimum_Gas_Flux);

      self.Time_Lag_Searching_C02_Min(objFromServer.Time_Lag_Searching_C02_Min);
      self.Time_Lag_Searching_C02_Max(objFromServer.Time_Lag_Searching_C02_Max);
      self.Time_Lag_Searching_H20_Min(objFromServer.Time_Lag_Searching_H20_Min);
      self.Time_Lag_Searching_H20_Max(objFromServer.Time_Lag_Searching_H20_Max);
      self.Time_Lag_Searching_CH4_Min(objFromServer.Time_Lag_Searching_CH4_Min);
      self.Time_Lag_Searching_CH4_Max(objFromServer.Time_Lag_Searching_CH4_Max);
      self.Time_Lag_Searching_Gas_Min(objFromServer.Time_Lag_Searching_Gas_Min);
      self.Time_Lag_Searching_Gas_Max(objFromServer.Time_Lag_Searching_Gas_Max);

      self.Planar_Start(moment(objFromServer.Planar_Start).format("D MMM YYYY"));
      self.Planar_End(moment(objFromServer.Planar_End).format("D MMM YYYY"));
      self.Planar_Elements_Per_Sector(objFromServer.Planar_Elements_Per_Sector);
      self.Planar_Max_Mean_Verticle_Wind_Component(objFromServer.Planar_Max_Mean_Verticle_Wind_Component);
      self.Planar_Min_Mean_Horizontal_Wind_Component(objFromServer.Planar_Min_Mean_Horizontal_Wind_Component);
      self.Planar_Calculations_Fail(objFromServer.Planar_Calculations_Fail);
      self.Planar_North_Offset_First_Sector(objFromServer.Planar_North_Offset_First_Sector);

      self.Planar_Wind_Sectors([]);
      if (objFromServer.Planar_Wind_Sectors) {
        ko.utils.arrayForEach(objFromServer.Planar_Wind_Sectors, function(objSector) {
          var sector = {
            Id: ko.observable(objSector.Id),
            Degrees: ko.observable(objSector.Degrees).extend({number:true, min:0, max:360})
          };
          sector.Degrees.subscribe(function() {
            self.UpdatePie();
          });
          self.Planar_Wind_Sectors.push(sector);
        });
      }
    },

		// Create JSON object to send to save
		GetEntityModel: function () {
			var self = this;

			var result= {
        Name: self.Name(),
        U: self.U(),
        V: self.V(),
        W: self.W(),
        Angle_Of_Attack_Correction_For_Wind_Components: self.Angle_Of_Attack_Correction_For_Wind_Components(),
        Angle_Of_Attach_Method: self.Angle_Of_Attach_Method(),
        Axis_Rotation_For_Tilt_Correction: self.Axis_Rotation_For_Tilt_Correction(),
        Rotation_Method: self.Rotation_Method(),
        Detrend_Method: self.Detrend_Method(),
        Turbulent_Fluctuations_Time_Constant: self.Turbulent_Fluctuations_Time_Constant(),
        Time_Lag_Compensation: self.Time_Lag_Compensation(),
        Time_Lag_Method: self.Time_Lag_Method(),
        Compensate_Density_Fluctuations: self.Compensate_Density_Fluctuations(),
        Compensate_Density_Fluctuations_Method: self.Compensate_Density_Fluctuations_Method(),
        Add_Instrument_Sensible_Heat_Components: self.Add_Instrument_Sensible_Heat_Components(),
        Surface_Temperature_Estimations: self.Surface_Temperature_Estimations(),
        Tapering_Window:self.Tapering_Window(),
        Frequency_Bins: self.Frequency_Bins(),

        Power_Of_Two_Samples: self.Power_Of_Two_Samples(),
        Quality_Check: self.Quality_Check(),
        Quality_Check_Flagging_Policy:self.Quality_Check_Flagging_Policy(),
        Footprint_Estimation: self.Footprint_Estimation(),
        Footprint_Method:self.Footprint_Method(),

        Time_Lag_Start: self.Time_Lag_Start(),
        Time_Lag_End: self.Time_Lag_End(),
        Time_Lag_Plausibility_Range_Around_Median_Value: self.Time_Lag_Plausibility_Range_Around_Median_Value(),
        Time_Lag_RH_Classes: self.Time_Lag_RH_Classes(),
        Time_Lag_Minimum_Heat_Flux: self.Time_Lag_Minimum_Heat_Flux(),
        Time_Lag_Minimum_C02_Flux: self.Time_Lag_Minimum_C02_Flux(),
        Time_Lag_Minimum_CH4_Flux: self.Time_Lag_Minimum_CH4_Flux(),
        Time_Lag_Minimum_Gas_Flux: self.Time_Lag_Minimum_Gas_Flux(),

        Time_Lag_Searching_C02_Min: self.Time_Lag_Searching_C02_Min(),
        Time_Lag_Searching_C02_Max: self.Time_Lag_Searching_C02_Max(),
        Time_Lag_Searching_H20_Min: self.Time_Lag_Searching_H20_Min(),
        Time_Lag_Searching_H20_Max: self.Time_Lag_Searching_H20_Max(),
        Time_Lag_Searching_CH4_Min: self.Time_Lag_Searching_CH4_Min(),
        Time_Lag_Searching_CH4_Max: self.Time_Lag_Searching_CH4_Max(),
        Time_Lag_Searching_Gas_Min: self.Time_Lag_Searching_Gas_Min(),
        Time_Lag_Searching_Gas_Max: self.Time_Lag_Searching_Gas_Max(),

        Planar_Start: self.Planar_Start(),
        Planar_End: self.Planar_End(),
        Planar_Elements_Per_Sector: self.Planar_Elements_Per_Sector(),
        Planar_Max_Mean_Verticle_Wind_Component: self.Planar_Max_Mean_Verticle_Wind_Component(),
        Planar_Min_Mean_Horizontal_Wind_Component: self.Planar_Min_Mean_Horizontal_Wind_Component(),
        Planar_Calculations_Fail:self.Planar_Calculations_Fail(),
        Planar_North_Offset_First_Sector:self.Planar_North_Offset_First_Sector(),
        Planar_Wind_Sectors : []
			};

      ko.utils.arrayForEach(this.Planar_Wind_Sectors(), function(sector) {
        result.Planar_Wind_Sectors.push({
          id: self.Id(),
          Instrument: self.Degrees()
        });
      });

      return result;
		},

    AddSector: function() {
      var self = this;
      var sector = {
        Id: ko.observable(),
        Degrees: ko.observable().extend({number:true, min:0, max:360})
      };
      sector.Degrees.subscribe(function() {
        self.UpdatePie();
      });
      self.Planar_Wind_Sectors.push(sector);
      self.SpaceSectors();
    },

    RemoveSector: function(sector) {
      var self = this;
      self.Planar_Wind_Sectors.remove(sector);
      self.SpaceSectors();
    },

    SpaceSectors: function() {
      var self = this;
      var degrees = 360 / self.Planar_Wind_Sectors().length;
      ko.utils.arrayForEach(self.Planar_Wind_Sectors(), function(sector) {
        sector.Degrees(degrees);
      });
      self.UpdatePie();
    },

    UpdatePie: function() {
      var self = this;

      var degrees = [];
      ko.utils.arrayForEach(self.Planar_Wind_Sectors(), function(sector) {
        if (sector.Degrees() != null) {
          degrees.push(sector.Degrees());
        }
      });

      self.PieUrl("https://chart.googleapis.com/chart?cht=p&chs=300x300&chd=t:" + degrees.join(","));
    },

		Panels: []

  });

	return processingOptionViewModel;
});

