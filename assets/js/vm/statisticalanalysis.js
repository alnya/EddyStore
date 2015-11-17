define(['knockout', 'moment', 'webApiClient', 'validation'],
function (ko, moment, api) {

	"use strict";

	var statisticalAnalysisViewModel = ko.validatedObservable({

    EntityName: "Statistical Analysis", // name of this entity
    Url: "/statisticalanalysis",  // url to call to load / save / delete
    CanDeleteEntity: true,

    Name: ko.observable().extend({required: true}),
    All_Tests:ko.observable(false).extend(),
    Spike_count: ko.observable(false).extend(),
    Amplitude_resolution: ko.observable(false).extend(),
    Drop_outs: ko.observable(false).extend(),
    Absolute_limits: ko.observable(false).extend(),
    Skewness_Kurtosis: ko.observable(false).extend(),
    Discontinuities: ko.observable(false).extend(),
    Time_lags: ko.observable(false).extend(),
    Angle_of_attack: ko.observable(false).extend(),
    Steadiness_of_horizontal_wind: ko.observable(false).extend(),

    Max_consecutive_outliers: ko.observable(3).extend({number:true, min:0, max:3000}),
    Accepted_spikes: ko.observable(1).extend({number:true, min:0, max:100}),
    Replace_spikes_linear_interpolation: ko.observable(true).extend(),
    Plausibility_ranges_W: ko.observable(5.0).extend({number:true, min:0, max:12}),
    Plausibility_ranges_CO2: ko.observable(3.5).extend({number:true, min:0, max:12}),
    Plausibility_ranges_H20: ko.observable(3.5).extend({number:true, min:0, max:12}),
    Plausibility_ranges_CH4: ko.observable(8.0).extend({number:true, min:0, max:12}),
    Plausibility_ranges_4th: ko.observable(8.0).extend({number:true, min:0, max:12}),
    Plausibility_ranges_Other: ko.observable(3.5).extend({number:true, min:0, max:12}),

    Range_of_variation: ko.observable(7).extend({number:true, min:0, max:20}),
    Number_of_bins: ko.observable(100).extend({number:true, min:50, max:150}),
    Accepted_empty_bins: ko.observable(70).extend({number:true, min:0, max:100}),

    Percentile_defining_extreme_bins: ko.observable(10).extend({number:true, min:0, max:100}),
    Accepted_central_dropouts: ko.observable(10).extend({number:true}),
    Accepted_extreme_dropouts: ko.observable(6).extend({number:true, min:0, max:100}),

    Absolute_limits_min_U: ko.observable(-30).extend({number:true, min:-50, max:0}),
    Absolute_limits_min_W: ko.observable(-5).extend({number:true, min:-10, max:0}),
    Absolute_limits_min_TS: ko.observable(-20).extend({number:true, min:-100, max:-20}),
    Absolute_limits_min_C02: ko.observable(200).extend({number:true, min:100, max:100000}),
    Absolute_limits_min_H20: ko.observable(0).extend({number:true, min:0, max:1000}),
    Absolute_limits_min_CH4: ko.observable(0.170).extend({number:true, min:0, max:1000}),
    Absolute_limits_min_4th: ko.observable(0.03).extend({number:true, min:0, max:1000}),

    Absolute_limits_max_U: ko.observable(30).extend({number:true, min:1, max:50}),
    Absolute_limits_max_W: ko.observable(5).extend({number:true, min:1, max:10}),
    Absolute_limits_max_TS: ko.observable(50).extend({number:true, min:-20, max:100}),
    Absolute_limits_max_C02: ko.observable(600).extend({number:true, min:100, max:100000}),
    Absolute_limits_max_H20: ko.observable(40).extend({number:true, min:0, max:1000}),
    Absolute_limits_max_CH4: ko.observable(1000).extend({number:true, min:0, max:1000}),
    Absolute_limits_max_4th: ko.observable(1000).extend({number:true, min:0, max:1000}),

    Filter_outrange_values: ko.observable(true).extend(),

    Hard_skewness_lower_limit: ko.observable(-2.0).extend({number:true, min:-3, max:0}),
    Hard_skewness_upper_limit: ko.observable(2.0).extend({number:true, min:0, max:3}),
    Hard_kurtosis_lower_limit: ko.observable(1.0).extend({number:true, min:0, max:3}),
    Hard_kurtosis_upper_limit: ko.observable(8.0).extend({number:true, min:3, max:10}),

    Soft_skewness_lower_limit: ko.observable(-1.0).extend({number:true, min:-3, max:0}),
    Soft_Skewness_upper_limit: ko.observable(1.0).extend({number:true, min:0, max:3}),
    Soft_Kurtosis_lower_limit: ko.observable(2.0).extend({number:true, min:0, max:3}),
    Soft_Kurtosis_upper_limit: ko.observable(5.0).extend({number:true, min:3, max:10}),

    Hard_discontinuities_U: ko.observable(4.0).extend({number:true, min:0, max:50}),
    Hard_discontinuities_W: ko.observable(2.0).extend({number:true, min:0, max:50}),
    Hard_discontinuities_TS: ko.observable(4.0).extend({number:true, min:0, max:50}),
    Hard_discontinuities_C02: ko.observable(40.0).extend({number:true, min:0, max:50}),
    Hard_discontinuities_H20: ko.observable(3.26).extend({number:true, min:0, max:50}),
    Hard_discontinuities_CH4: ko.observable(40.0).extend({number:true, min:0, max:50}),
    Hard_discontinuities_4th: ko.observable(40.0).extend({number:true, min:0, max:50}),
    Hard_discontinuities_Variances: ko.observable(3.0).extend({number:true, min:0, max:50}),

    Soft_discontinuities_U: ko.observable(2.70).extend({number:true, min:0, max:50}),
    Soft_discontinuities_W: ko.observable(1.30).extend({number:true, min:0, max:50}),
    Soft_discontinuities_TS: ko.observable(2.70).extend({number:true, min:0, max:50}),
    Soft_discontinuities_C02: ko.observable(27.00).extend({number:true, min:0, max:50}),
    Soft_discontinuities_H20: ko.observable(2.20).extend({number:true, min:0, max:50}),
    Soft_discontinuities_CH4: ko.observable(30.0).extend({number:true, min:0, max:50}),
    Soft_discontinuities_4th: ko.observable(30.0).extend({number:true, min:0, max:50}),
    Soft_discontinuities_Variances: ko.observable(2.0).extend({number:true, min:0, max:50}),

    Accepted_covariance_difference_hard: ko.observable(20).extend({number:true, min:0, max:100}),
    Accepted_covariance_difference_soft: ko.observable(10).extend({number:true, min:0, max:100}),
    Nominal_CO2_time_lag: ko.observable(3.5).extend({number:true, min:0, max:100}),
    Nominal_H20_time_lag: ko.observable(2.5).extend({number:true, min:0, max:100}),
    Nominal_CH4_time_lag: ko.observable(3.5).extend({number:true, min:0, max:100}),
    Nominal_4th_time_lag: ko.observable(3.5).extend({number:true, min:0, max:100}),

    Minimum_angle_of_attack: ko.observable(-30).extend({number:true, min:-90, max:0}),
    Maximum_angle_of_attack: ko.observable(30).extend({number:true, min:0, max:90}),
    Accepted_amount_outliers: ko.observable(10).extend({number:true, min:0, max:100}),

    Accepted_wind_relative_instationarity: ko.observable(0.5).extend({number:true, min:0, max:50}),

    Random_uncertainty_estimation: ko.observable(false).extend(),
    Random_uncertainty_estimation_method: ko.observable(),
    Integral_turbulence_scale: ko.observable(),
    Maximum_correlation_period: ko.observable(10).extend({number:true}),

    // Set view model from server JSON object
		SetModel: function(objFromServer) {
			var self = this;
			if (!objFromServer) return;

      self.Name(objFromServer.Name);
      self.Spike_count(objFromServer.Spike_count);
      self.Amplitude_resolution(objFromServer.Amplitude_resolution);
      self.Drop_outs(objFromServer.Drop_outs);
      self.Absolute_limits(objFromServer.Absolute_limits);
      self.Skewness_Kurtosis(objFromServer.Skewness_Kurtosis);
      self.Discontinuities(objFromServer.Discontinuities);
      self.Time_lags(objFromServer.Time_lags);
      self.Angle_of_attack(objFromServer.Angle_of_attack);
      self.Steadiness_of_horizontal_wind(objFromServer.Steadiness_of_horizontal_wind);

      self.Max_consecutive_outliers(objFromServer.Max_consecutive_outliers);
      self.Accepted_spikes(objFromServer.Accepted_spikes);
      self.Replace_spikes_linear_interpolation(objFromServer.Replace_spikes_linear_interpolation);
      self.Plausibility_ranges_W(objFromServer.Plausibility_ranges_W);
      self.Plausibility_ranges_CO2(objFromServer.Plausibility_ranges_CO2);
      self.Plausibility_ranges_H20(objFromServer.Plausibility_ranges_H20);
      self.Plausibility_ranges_CH4(objFromServer.Plausibility_ranges_CH4);
      self.Plausibility_ranges_4th(objFromServer.Plausibility_ranges_4th);
      self.Plausibility_ranges_Other(objFromServer.Plausibility_ranges_Other);

      self.Range_of_variation(objFromServer.Range_of_variation);
      self.Number_of_bins(objFromServer.Number_of_bins);
      self.Accepted_empty_bins(objFromServer.Accepted_empty_bins);

      self.Percentile_defining_extreme_bins(objFromServer.Percentile_defining_extreme_bins);
      self.Accepted_central_dropouts(objFromServer.Accepted_central_dropouts);
      self.Accepted_extreme_dropouts(objFromServer.Accepted_extreme_dropouts);

      self.Absolute_limits_min_U(objFromServer.Absolute_limits_min_U);
      self.Absolute_limits_min_W(objFromServer.Absolute_limits_min_W);
      self.Absolute_limits_min_TS(objFromServer.Absolute_limits_min_TS);
      self.Absolute_limits_min_C02(objFromServer.Absolute_limits_min_C02);
      self.Absolute_limits_min_H20(objFromServer.Absolute_limits_min_H20);
      self.Absolute_limits_min_CH4(objFromServer.Absolute_limits_min_CH4);
      self.Absolute_limits_min_4th(objFromServer.Absolute_limits_min_4th);

      self.Absolute_limits_max_U(objFromServer.Absolute_limits_max_U);
      self.Absolute_limits_max_W(objFromServer.Absolute_limits_max_W);
      self.Absolute_limits_max_TS(objFromServer.Absolute_limits_max_TS);
      self.Absolute_limits_max_C02(objFromServer.Absolute_limits_max_C02);
      self.Absolute_limits_max_H20(objFromServer.Absolute_limits_max_H20);
      self.Absolute_limits_max_CH4(objFromServer.Absolute_limits_max_CH4);
      self.Absolute_limits_max_4th(objFromServer.Absolute_limits_max_4th);

      self.Filter_outrange_values(objFromServer.Filter_outrange_values);

      self.Hard_skewness_lower_limit(objFromServer.Hard_skewness_lower_limit);
      self.Hard_skewness_upper_limit(objFromServer.Hard_skewness_upper_limit);
      self.Hard_kurtosis_lower_limit(objFromServer.Hard_kurtosis_lower_limit);
      self.Hard_kurtosis_upper_limit(objFromServer.Hard_kurtosis_upper_limit);

      self.Soft_skewness_lower_limit(objFromServer.Soft_skewness_lower_limit);
      self.Soft_Skewness_upper_limit(objFromServer.Soft_Skewness_upper_limit);
      self.Soft_Kurtosis_lower_limit(objFromServer.Soft_Kurtosis_lower_limit);
      self.Soft_Kurtosis_upper_limit(objFromServer.Soft_Kurtosis_upper_limit);

      self.Hard_discontinuities_U(objFromServer.Hard_discontinuities_U);
      self.Hard_discontinuities_W(objFromServer.Hard_discontinuities_W);
      self.Hard_discontinuities_TS(objFromServer.Hard_discontinuities_TS);
      self.Hard_discontinuities_C02(objFromServer.Hard_discontinuities_C02);
      self.Hard_discontinuities_H20(objFromServer.Hard_discontinuities_H20);
      self.Hard_discontinuities_CH4(objFromServer.Hard_discontinuities_CH4);
      self.Hard_discontinuities_4th(objFromServer.Hard_discontinuities_4th);
      self.Hard_discontinuities_Variances(objFromServer.Hard_discontinuities_Variances);

      self.Soft_discontinuities_U(objFromServer.Soft_discontinuities_U);
      self.Soft_discontinuities_W(objFromServer.Soft_discontinuities_W);
      self.Soft_discontinuities_TS(objFromServer.Soft_discontinuities_TS);
      self.Soft_discontinuities_C02(objFromServer.Soft_discontinuities_C02);
      self.Soft_discontinuities_H20(objFromServer.Soft_discontinuities_H20);
      self.Soft_discontinuities_CH4(objFromServer.Soft_discontinuities_CH4);
      self.Soft_discontinuities_4th(objFromServer.Soft_discontinuities_4th);
      self.Soft_discontinuities_Variances(objFromServer.Soft_discontinuities_Variances);

      self.Accepted_covariance_difference_hard(objFromServer.Accepted_covariance_difference_hard);
      self.Accepted_covariance_difference_soft(objFromServer.Accepted_covariance_difference_soft);
      self.Nominal_CO2_time_lag(objFromServer.Nominal_CO2_time_lag);
      self.Nominal_H20_time_lag(objFromServer.Nominal_H20_time_lag);
      self.Nominal_CH4_time_lag(objFromServer.Nominal_CH4_time_lag);
      self.Nominal_4th_time_lag(objFromServer.Nominal_4th_time_lag);

      self.Minimum_angle_of_attack(objFromServer.Minimum_angle_of_attack);
      self.Maximum_angle_of_attack(objFromServer.Maximum_angle_of_attack);
      self.Accepted_amount_outliers(objFromServer.Accepted_amount_outliers);

      self.Accepted_wind_relative_instationarity(objFromServer.Accepted_wind_relative_instationarity);

      self.Random_uncertainty_estimation(objFromServer.Random_uncertainty_estimation);
      self.Random_uncertainty_estimation_method(objFromServer.Random_uncertainty_estimation_method);
      self.Integral_turbulence_scale(objFromServer.Integral_turbulence_scale);
      self.Maximum_correlation_period(objFromServer.Maximum_correlation_period);
    },

		// Create JSON object to send to save
		GetEntityModel: function () {
			var self = this;

			var result= {
        Name: self.Name(),
        Spike_count: self.Spike_count(),
        Amplitude_resolution: self.Amplitude_resolution(),
        Drop_outs: self.Drop_outs(),
        Absolute_limits: self.Absolute_limits(),
        Skewness_Kurtosis: self.Skewness_Kurtosis(),
        Discontinuities: self.Discontinuities(),
        Time_lags: self.Time_lags(),
        Angle_of_attack: self.Angle_of_attack(),
        Steadiness_of_horizontal_wind: self.Steadiness_of_horizontal_wind(),

        Max_consecutive_outliers: self.Max_consecutive_outliers(),
        Accepted_spikes: self.Accepted_spikes(),
        Replace_spikes_linear_interpolation: self.Replace_spikes_linear_interpolation(),
        Plausibility_ranges_W: self.Plausibility_ranges_W(),
        Plausibility_ranges_CO2: self.Plausibility_ranges_CO2(),
        Plausibility_ranges_H20: self.Plausibility_ranges_H20(),
        Plausibility_ranges_CH4: self.Plausibility_ranges_CH4(),
        Plausibility_ranges_4th: self.Plausibility_ranges_4th(),
        Plausibility_ranges_Other: self.Plausibility_ranges_Other(),

        Range_of_variation: self.Range_of_variation(),
        Number_of_bins: self.Number_of_bins(),
        Accepted_empty_bins: self.Accepted_empty_bins(),

        Percentile_defining_extreme_bins: self.Percentile_defining_extreme_bins(),
        Accepted_central_dropouts: self.Accepted_central_dropouts(),
        Accepted_extreme_dropouts: self.Accepted_extreme_dropouts(),

        Absolute_limits_min_U: self.Absolute_limits_min_U(),
        Absolute_limits_min_W: self.Absolute_limits_min_W(),
        Absolute_limits_min_TS: self.Absolute_limits_min_TS(),
        Absolute_limits_min_C02: self.Absolute_limits_min_C02(),
        Absolute_limits_min_H20: self.Absolute_limits_min_H20(),
        Absolute_limits_min_CH4: self.Absolute_limits_min_CH4(),
        Absolute_limits_min_4th: self.Absolute_limits_min_4th(),

        Absolute_limits_max_U: self.Absolute_limits_max_U(),
        Absolute_limits_max_W: self.Absolute_limits_max_W(),
        Absolute_limits_max_TS: self.Absolute_limits_max_TS(),
        Absolute_limits_max_C02: self.Absolute_limits_max_C02(),
        Absolute_limits_max_H20: self.Absolute_limits_max_H20(),
        Absolute_limits_max_CH4: self.Absolute_limits_max_CH4(),
        Absolute_limits_max_4th: self.Absolute_limits_max_4th(),

        Filter_outrange_values: self.Filter_outrange_values(),

        Hard_skewness_lower_limit: self.Hard_skewness_lower_limit(),
        Hard_skewness_upper_limit: self.Hard_skewness_upper_limit(),
        Hard_kurtosis_lower_limit: self.Hard_kurtosis_lower_limit(),
        Hard_kurtosis_upper_limit: self.Hard_kurtosis_upper_limit(),

        Soft_skewness_lower_limit: self.Soft_skewness_lower_limit(),
        Soft_Skewness_upper_limit: self.Soft_Skewness_upper_limit(),
        Soft_Kurtosis_lower_limit: self.Soft_Kurtosis_lower_limit(),
        Soft_Kurtosis_upper_limit: self.Soft_Kurtosis_upper_limit(),

        Hard_discontinuities_U: self.Hard_discontinuities_U(),
        Hard_discontinuities_W: self.Hard_discontinuities_W(),
        Hard_discontinuities_TS: self.Hard_discontinuities_TS(),
        Hard_discontinuities_C02: self.Hard_discontinuities_C02(),
        Hard_discontinuities_H20: self.Hard_discontinuities_H20(),
        Hard_discontinuities_CH4: self.Hard_discontinuities_CH4(),
        Hard_discontinuities_4th: self.Hard_discontinuities_4th(),
        Hard_discontinuities_Variances: self.Hard_discontinuities_Variances(),

        Soft_discontinuities_U: self.Soft_discontinuities_U(),
        Soft_discontinuities_W: self.Soft_discontinuities_W(),
        Soft_discontinuities_TS: self.Soft_discontinuities_TS(),
        Soft_discontinuities_C02: self.Soft_discontinuities_C02(),
        Soft_discontinuities_H20: self.Soft_discontinuities_H20(),
        Soft_discontinuities_CH4: self.Soft_discontinuities_CH4(),
        Soft_discontinuities_4th: self.Soft_discontinuities_4th(),
        Soft_discontinuities_Variances: self.Soft_discontinuities_Variances(),

        Accepted_covariance_difference_hard: self.Accepted_covariance_difference_hard(),
        Accepted_covariance_difference_soft: self.Accepted_covariance_difference_soft(),
        Nominal_CO2_time_lag: self.Nominal_CO2_time_lag(),
        Nominal_H20_time_lag: self.Nominal_H20_time_lag(),
        Nominal_CH4_time_lag: self.Nominal_CH4_time_lag(),
        Nominal_4th_time_lag: self.Nominal_4th_time_lag(),

        Minimum_angle_of_attack: self.Minimum_angle_of_attack(),
        Maximum_angle_of_attack: self.Maximum_angle_of_attack(),
        Accepted_amount_outliers: self.Accepted_amount_outliers(),

        Accepted_wind_relative_instationarity: self.Accepted_wind_relative_instationarity(),

        Random_uncertainty_estimation: self.Random_uncertainty_estimation(),
        Random_uncertainty_estimation_method: self.Random_uncertainty_estimation_method(),
        Integral_turbulence_scale: self.Integral_turbulence_scale(),
        Maximum_correlation_period: self.Maximum_correlation_period()
			};

      return result;
		},

		Panels: []

  });

  statisticalAnalysisViewModel().All_Tests.subscribe(function(newValue) {
      statisticalAnalysisViewModel().Spike_count(newValue);
      statisticalAnalysisViewModel().Amplitude_resolution(newValue);
      statisticalAnalysisViewModel().Drop_outs(newValue);
      statisticalAnalysisViewModel().Absolute_limits(newValue);
      statisticalAnalysisViewModel().Skewness_Kurtosis(newValue);
      statisticalAnalysisViewModel().Discontinuities(newValue);
      statisticalAnalysisViewModel().Time_lags(newValue);
      statisticalAnalysisViewModel().Angle_of_attack(newValue);
      statisticalAnalysisViewModel().Steadiness_of_horizontal_wind(newValue);
  });

	return statisticalAnalysisViewModel;
});

