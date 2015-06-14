define(['knockout', 'moment', 'webApiClient', 'validation'],
function (ko, moment, api) {

	"use strict";

	var spectralCorrectionViewModel = ko.validatedObservable({

    EntityName: "Spectral Correction", // name of this entity
    Url: "/SpectralCorrection",  // url to call to load / save / delete

    Name: ko.observable().extend({required: true}),
    Analytic_Correction_Of_High_Pass_Filtering_Effects: ko.observable(true).extend(),
    Correction_Of_Low_Pass_Filtering_Effects: ko.observable(true).extend(),
    Correction_Of_Low_Pass_Filtering_Effects_Method: ko.observable('Moncrieff et al. (1997) – Fully analytic').extend(),
    Correction_For_Instruments_Separation: ko.observable().extend(),
    Correction_For_Instruments_Separation_Method: ko.observable().extend(),
    Subperiod_Start: ko.observable().extend({date:true}),
    Subperiod_End: ko.observable().extend({date:true}),
    Minimum_Number_Of_Spectra: ko.observable().extend({number:true}),
    Minimum_CO2_Flux: ko.observable().extend({number:true}),
    Minimum_CH4_Flux: ko.observable().extend({number:true}),
    Minimum_Gas_Flux: ko.observable().extend({number:true}),
    Minimum_Latent_Heat_Flux: ko.observable().extend({number:true}),
    Minimum_Sensible_Heat_Flux: ko.observable().extend({number:true}),
    Lowest_Frequency_CO2: ko.observable().extend({number:true}),
    Lowest_Frequency_H20: ko.observable().extend({number:true}),
    Lowest_Frequency_CH4: ko.observable().extend({number:true}),
    Lowest_Frequency_Gas: ko.observable().extend({number:true}),
    Highest_Frequency_CO2: ko.observable().extend({number:true}),
    Highest_Frequency_H20: ko.observable().extend({number:true}),
    Highest_Frequency_CH4: ko.observable().extend({number:true}),
    Highest_Frequency_Gas: ko.observable().extend({number:true}),
    Lowest_Noise_Frequency_CO2: ko.observable().extend({number:true}),
    Lowest_Noise_Frequency_H20: ko.observable().extend({number:true}),
    Lowest_Noise_Frequency_CH4: ko.observable().extend({number:true}),
    Lowest_Noise_Frequency_Gas: ko.observable().extend({number:true}),
    Threshold_Flux_CO2: ko.observable().extend({number:true}),
    Threshold_Flux_Gas: ko.observable().extend({number:true}),
    Threshold_Flux_CH4: ko.observable().extend({number:true}),
    Threshold_Latent_Heat: ko.observable().extend({number:true}),
    Threshold_Sensible_Heat: ko.observable().extend({number:true}),

    // Set view model from server JSON object
		SetModel: function(objFromServer) {
			var self = this;
			if (!objFromServer) return;

      self.Name(objFromServer.Name);
      self.Analytic_Correction_Of_High_Pass_Filtering_Effects(objFromServer.Analytic_Correction_Of_High_Pass_Filtering_Effects);
      self.Correction_Of_Low_Pass_Filtering_Effects(objFromServer.Correction_Of_Low_Pass_Filtering_Effects);
      self.Correction_Of_Low_Pass_Filtering_Effects_Method(objFromServer.Correction_Of_Low_Pass_Filtering_Effects_Method);
      self.Correction_For_Instruments_Separation(objFromServer.Correction_For_Instruments_Separation);
      self.Correction_For_Instruments_Separation_Method(objFromServer.Correction_For_Instruments_Separation_Method);

      self.Subperiod_Start(moment(objFromServer.Subperiod_Start).format("D MMM YYYY"));
      self.Subperiod_End(moment(objFromServer.Subperiod_End).format("D MMM YYYY"));

      self.Minimum_Number_Of_Spectra(objFromServer.Minimum_Number_Of_Spectra);
      self.Minimum_CO2_Flux(objFromServer.Minimum_CO2_Flux);
      self.Minimum_CH4_Flux(objFromServer.Minimum_CH4_Flux);
      self.Minimum_Gas_Flux(objFromServer.Minimum_Gas_Flux);
      self.Minimum_Latent_Heat_Flux(objFromServer.Minimum_Latent_Heat_Flux);
      self.Minimum_Sensible_Heat_Flux(objFromServer.Minimum_Sensible_Heat_Flux);
      self.Lowest_Frequency_CO2(objFromServer.Lowest_Frequency_CO2);
      self.Lowest_Frequency_H20(objFromServer.Lowest_Frequency_H20);
      self.Lowest_Frequency_CH4(objFromServer.Lowest_Frequency_CH4);
      self.Lowest_Frequency_Gas(objFromServer.Lowest_Frequency_Gas);
      self.Highest_Frequency_CO2(objFromServer.Highest_Frequency_CO2);
      self.Highest_Frequency_H20(objFromServer.Highest_Frequency_H20);
      self.Highest_Frequency_CH4(objFromServer.Highest_Frequency_CH4);
      self.Highest_Frequency_Gas(objFromServer.Highest_Frequency_Gas);
      self.Lowest_Noise_Frequency_CO2(objFromServer.Lowest_Noise_Frequency_CO2);
      self.Lowest_Noise_Frequency_H20(objFromServer.Lowest_Noise_Frequency_H20);
      self.Lowest_Noise_Frequency_CH4(objFromServer.Lowest_Noise_Frequency_CH4);
      self.Lowest_Noise_Frequency_Gas(objFromServer.Lowest_Noise_Frequency_Gas);
      self.Threshold_Flux_CO2(objFromServer.Threshold_Flux_CO2);
      self.Threshold_Flux_Gas(objFromServer.Threshold_Flux_Gas);
      self.Threshold_Flux_CH4(objFromServer.Threshold_Flux_CH4);
      self.Threshold_Latent_Heat(objFromServer.Threshold_Latent_Heat);
      self.Threshold_Sensible_Heat(objFromServer.Threshold_Sensible_Heat);
    },

		// Create JSON object to send to save
		GetEntityModel: function () {
			var self = this;

			var result= {
        Name: self.Name(),
        Analytic_Correction_Of_High_Pass_Filtering_Effects: self.Analytic_Correction_Of_High_Pass_Filtering_Effects(),
        Correction_Of_Low_Pass_Filtering_Effects: self.Correction_Of_Low_Pass_Filtering_Effects(),
        Correction_Of_Low_Pass_Filtering_Effects_Method: self.Correction_Of_Low_Pass_Filtering_Effects_Method(),
        Correction_For_Instruments_Separation: self.Correction_For_Instruments_Separation(),
        Correction_For_Instruments_Separation_Method: self.Correction_For_Instruments_Separation_Method(),
        Subperiod_Start: self.Subperiod_Start(),
        Subperiod_End: self.Subperiod_End(),
        Minimum_Number_Of_Spectra: self.Minimum_Number_Of_Spectra(),
        Minimum_CO2_Flux: self.Minimum_CO2_Flux(),
        Minimum_CH4_Flux: self.Minimum_CH4_Flux(),
        Minimum_Gas_Flux: self.Minimum_Gas_Flux(),
        Minimum_Latent_Heat_Flux: self.Minimum_Latent_Heat_Flux(),
        Minimum_Sensible_Heat_Flux: self.Minimum_Sensible_Heat_Flux(),
        Lowest_Frequency_CO2: self.Lowest_Frequency_CO2(),
        Lowest_Frequency_H20: self.Lowest_Frequency_H20(),
        Lowest_Frequency_CH4: self.Lowest_Frequency_CH4(),
        Lowest_Frequency_Gas: self.Lowest_Frequency_Gas(),
        Highest_Frequency_CO2: self.Highest_Frequency_CO2(),
        Highest_Frequency_H20: self.Highest_Frequency_H20(),
        Highest_Frequency_CH4: self.Highest_Frequency_CH4(),
        Highest_Frequency_Gas: self.Highest_Frequency_Gas(),
        Lowest_Noise_Frequency_CO2: self.Lowest_Noise_Frequency_CO2(),
        Lowest_Noise_Frequency_H20: self.Lowest_Noise_Frequency_H20(),
        Lowest_Noise_Frequency_CH4: self.Lowest_Noise_Frequency_CH4(),
        Lowest_Noise_Frequency_Gas: self.Lowest_Noise_Frequency_Gas(),
        Threshold_Flux_CO2: self.Threshold_Flux_CO2(),
        Threshold_Flux_Gas: self.Threshold_Flux_Gas(),
        Threshold_Flux_CH4: self.Threshold_Flux_CH4(),
        Threshold_Latent_Heat: self.Threshold_Latent_Heat(),
        Threshold_Sensible_Heat: self.Threshold_Sensible_Heat()
			};

      return result;
		},

		Panels: []

  });

  spectralCorrectionViewModel().FieldsEnabled = ko.computed(function() {
    return spectralCorrectionViewModel().Correction_Of_Low_Pass_Filtering_Effects_Method() !=
     'Moncrieff et al. (1997) – Fully analytic' &&
      spectralCorrectionViewModel().Correction_Of_Low_Pass_Filtering_Effects_Method() !=
      'Massmann (2000, 2001) – Fully analytic';

  });

	return spectralCorrectionViewModel;
});

