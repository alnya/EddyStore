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

    Day_Bottom_Gain:  ko.observable(0.944).extend({number:true}),
    Day_Bottom_Offset:  ko.observable(2.57).extend({number:true}),
    Day_Top_Gain:  ko.observable(1.005).extend({number:true}),
    Day_Top_Offset:  ko.observable(0.24).extend({number:true}),
    Day_Spar_Gain:  ko.observable(1.010).extend({number:true}),
    Day_Spar_Offset:  ko.observable(0.36).extend({number:true}),

    Night_Bottom_Gain:  ko.observable(0.883).extend({number:true}),
    Night_Bottom_Offset:  ko.observable(2.17).extend({number:true}),
    Night_Top_Gain:  ko.observable(1.008).extend({number:true}),
    Night_Top_Offset:  ko.observable(-0.41).extend({number:true}),
    Night_Spar_Gain:  ko.observable(1.010).extend({number:true}),
    Night_Spar_Offset:  ko.observable(-0.17).extend({number:true}),

    Day_Bottom_1:  ko.observable(2.8).extend({number:true}),
    Day_Bottom_2:  ko.observable(-0.0681).extend({number:true}),
    Day_Bottom_3:  ko.observable(0.0021).extend({number:true}),
    Day_Bottom_4:  ko.observable(-0.334).extend({number:true}),
    Day_Top_1:  ko.observable(-0.1).extend({number:true}),
    Day_Top_2:  ko.observable(-0.0044).extend({number:true}),
    Day_Top_3:  ko.observable(0.0011).extend({number:true}),
    Day_Top_4:  ko.observable(-0.022).extend({number:true}),
    Day_Spar_1:  ko.observable(0.3).extend({number:true}),
    Day_Spar_2:  ko.observable(-0.0007).extend({number:true}),
    Day_Spar_3:  ko.observable(0.0006).extend({number:true}),
    Day_Spar_4:  ko.observable(-0.044).extend({number:true}),

    Night_Bottom_1:  ko.observable(0.5).extend({number:true}),
    Night_Bottom_2:  ko.observable(-0.1160).extend({number:true}),
    Night_Bottom_3:  ko.observable(0.0087).extend({number:true}),
    Night_Bottom_4:  ko.observable(-0.206).extend({number:true}),
    Night_Top_1:  ko.observable(-1.7).extend({number:true}),
    Night_Top_2:  ko.observable(-0.0160).extend({number:true}),
    Night_Top_3:  ko.observable(0.0051).extend({number:true}),
    Night_Top_4:  ko.observable(-0.029).extend({number:true}),
    Night_Spar_1:  ko.observable(-2.1).extend({number:true}),
    Night_Spar_2:  ko.observable(-0.0200).extend({number:true}),
    Night_Spar_3:  ko.observable(0.0070).extend({number:true}),
    Night_Spar_4:  ko.observable(-0.026).extend({number:true}),

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

      self.Day_Bottom_Gain(objFromServer.Day_Bottom_Gain);
      self.Day_Bottom_Offset(objFromServer.Day_Bottom_Offset);
      self.Day_Top_Gain(objFromServer.Day_Top_Gain);
      self.Day_Top_Offset(objFromServer.Day_Top_Offset);
      self.Day_Spar_Gain(objFromServer.Day_Spar_Gain);
      self.Day_Spar_Offset(objFromServer.Day_Spar_Offset);

      self.Night_Bottom_Gain(objFromServer.Night_Bottom_Gain);
      self.Night_Bottom_Offset(objFromServer.Night_Bottom_Offset);
      self.Night_Top_Gain(objFromServer.Night_Top_Gain);
      self.Night_Top_Offset(objFromServer.Night_Top_Offset);
      self.Night_Spar_Gain(objFromServer.Night_Spar_Gain);
      self.Night_Spar_Offset(objFromServer.Night_Spar_Offset);

      self.Day_Bottom_1(objFromServer.Day_Bottom_1);
      self.Day_Bottom_2(objFromServer.Day_Bottom_2);
      self.Day_Bottom_3(objFromServer.Day_Bottom_3);
      self.Day_Bottom_4(objFromServer.Day_Bottom_4);
      self.Day_Top_1(objFromServer.Day_Top_1);
      self.Day_Top_2(objFromServer.Day_Top_2);
      self.Day_Top_3(objFromServer.Day_Top_3);
      self.Day_Top_4(objFromServer.Day_Top_4);
      self.Day_Spar_1(objFromServer.Day_Spar_1);
      self.Day_Spar_2(objFromServer.Day_Spar_2);
      self.Day_Spar_3(objFromServer.Day_Spar_3);
      self.Day_Spar_4(objFromServer.Day_Spar_4);

      self.Night_Bottom_1(objFromServer.Night_Bottom_1);
      self.Night_Bottom_2(objFromServer.Night_Bottom_2);
      self.Night_Bottom_3(objFromServer.Night_Bottom_3);
      self.Night_Bottom_4(objFromServer.Night_Bottom_4);
      self.Night_Top_1(objFromServer.Night_Top_1);
      self.Night_Top_2(objFromServer.Night_Top_2);
      self.Night_Top_3(objFromServer.Night_Top_3);
      self.Night_Top_4(objFromServer.Night_Top_4);
      self.Night_Spar_1(objFromServer.Night_Spar_1);
      self.Night_Spar_2(objFromServer.Night_Spar_2);
      self.Night_Spar_3(objFromServer.Night_Spar_3);
      self.Night_Spar_4(objFromServer.Night_Spar_4);

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

        Day_Bottom_Gain: self.Day_Bottom_Gain(),
        Day_Bottom_Offset: self.Day_Bottom_Offset(),
        Day_Top_Gain: self.Day_Top_Gain(),
        Day_Top_Offset: self.Day_Top_Offset(),
        Day_Spar_Gain: self.Day_Spar_Gain(),
        Day_Spar_Offset: self.Day_Spar_Offset(),

        Night_Bottom_Gain: self.Night_Bottom_Gain(),
        Night_Bottom_Offset: self.Night_Bottom_Offset(),
        Night_Top_Gain: self.Night_Top_Gain(),
        Night_Top_Offset: self.Night_Top_Offset(),
        Night_Spar_Gain: self.Night_Spar_Gain(),
        Night_Spar_Offset: self.Night_Spar_Offset(),

        Day_Bottom_1: self.Day_Bottom_1(),
        Day_Bottom_2: self.Day_Bottom_2(),
        Day_Bottom_3: self.Day_Bottom_3(),
        Day_Bottom_4: self.Day_Bottom_4(),
        Day_Top_1: self.Day_Top_1(),
        Day_Top_2: self.Day_Top_2(),
        Day_Top_3: self.Day_Top_3(),
        Day_Top_4: self.Day_Top_4(),
        Day_Spar_1: self.Day_Spar_1(),
        Day_Spar_2: self.Day_Spar_2(),
        Day_Spar_3: self.Day_Spar_3(),
        Day_Spar_4: self.Day_Spar_4(),

        Night_Bottom_1: self.Night_Bottom_1(),
        Night_Bottom_2: self.Night_Bottom_2(),
        Night_Bottom_3: self.Night_Bottom_3(),
        Night_Bottom_4: self.Night_Bottom_4(),
        Night_Top_1: self.Night_Top_1(),
        Night_Top_2: self.Night_Top_2(),
        Night_Top_3: self.Night_Top_3(),
        Night_Top_4: self.Night_Top_4(),
        Night_Spar_1: self.Night_Spar_1(),
        Night_Spar_2: self.Night_Spar_2(),
        Night_Spar_3: self.Night_Spar_3(),
        Night_Spar_4: self.Night_Spar_4(),

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

