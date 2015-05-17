/**
* StatisticalAnalysis.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    User: { model: 'User' },
    Name: {type: 'string'},

    Spike_count: {type: 'boolean'},
    Amplitude_resolution: {type: 'boolean'},
    Drop_outs: {type: 'boolean'},
    Absolute_limits: {type: 'boolean'},
    Skewness_Kurtosis: {type: 'boolean'},
    Discontinuities: {type: 'boolean'},
    Time_lags: {type: 'boolean'},
    Angle_of_attack: {type: 'boolean'},
    Steadiness_of_horizontal_wind: {type: 'boolean'},

    Max_consecutive_outliers: {type: 'float'},
    Accepted_spikes: {type: 'float'},
    Replace_spikes_linear_interpolation: {type: 'boolean'},
    Plausibility_ranges_W: {type: 'float'},
    Plausibility_ranges_CO2: {type: 'float'},
    Plausibility_ranges_H20: {type: 'float'},
    Plausibility_ranges_CH4: {type: 'float'},
    Plausibility_ranges_4th: {type: 'float'},
    Plausibility_ranges_Other: {type: 'float'},

    Range_of_variation: {type: 'float'},
    Number_of_bins: {type: 'float'},
    Accepted_empty_bins: {type: 'float'},

    Percentile_defining_extreme_bins: {type: 'float'},
    Accepted_central_dropouts: {type: 'float'},
    Accepted_extreme_dropouts: {type: 'float'},

    Absolute_limits_min_U: {type: 'float'},
    Absolute_limits_min_W: {type: 'float'},
    Absolute_limits_min_TS: {type: 'float'},
    Absolute_limits_min_C02: {type: 'float'},
    Absolute_limits_min_H20: {type: 'float'},
    Absolute_limits_min_CH4: {type: 'float'},
    Absolute_limits_min_4th: {type: 'float'},

    Absolute_limits_max_U: {type: 'float'},
    Absolute_limits_max_W: {type: 'float'},
    Absolute_limits_max_TS: {type: 'float'},
    Absolute_limits_max_C02: {type: 'float'},
    Absolute_limits_max_H20: {type: 'float'},
    Absolute_limits_max_CH4: {type: 'float'},
    Absolute_limits_max_4th: {type: 'float'},

    Filter_outrange_values: {type: 'boolean'},

    Hard_skewness_lower_limit: {type: 'float'},
    Hard_skewness_upper_limit: {type: 'float'},
    Hard_kurtosis_lower_limit: {type: 'float'},
    Hard_kurtosis_upper_limit: {type: 'float'},

    Soft_skewness_lower_limit: {type: 'float'},
    Soft_Skewness_upper_limit: {type: 'float'},
    Soft_Kurtosis_lower_limit: {type: 'float'},
    Soft_Kurtosis_upper_limit: {type: 'float'},

    Hard_discontinuities_U: {type: 'float'},
    Hard_discontinuities_W: {type: 'float'},
    Hard_discontinuities_TS: {type: 'float'},
    Hard_discontinuities_C02: {type: 'float'},
    Hard_discontinuities_H20: {type: 'float'},
    Hard_discontinuities_CH4: {type: 'float'},
    Hard_discontinuities_4th: {type: 'float'},
    Hard_discontinuities_Variances: {type: 'float'},

    Soft_discontinuities_U: {type: 'float'},
    Soft_discontinuities_W: {type: 'float'},
    Soft_discontinuities_TS: {type: 'float'},
    Soft_discontinuities_C02: {type: 'float'},
    Soft_discontinuities_H20: {type: 'float'},
    Soft_discontinuities_CH4: {type: 'float'},
    Soft_discontinuities_4th: {type: 'float'},
    Soft_discontinuities_Variances: {type: 'float'},

    Accepted_covariance_difference_hard: {type: 'float'},
    Accepted_covariance_difference_soft: {type: 'float'},
    Nominal_CO2_time_lag: {type: 'float'},
    Nominal_H20_time_lag: {type: 'float'},
    Nominal_CH4_time_lag: {type: 'float'},
    Nominal_4th_time_lag: {type: 'float'},

    Minimum_angle_of_attack: {type: 'float'},
    Maximum_angle_of_attack: {type: 'float'},
    Accepted_amount_outliers: {type: 'float'},

    Accepted_wind_relative_instationarity: {type: 'float'},

    Random_uncertainty_estimation: {type: 'boolean'},
    Random_uncertainty_estimation_method: {type: 'string'},
    Integral_turbulence_scale: {type: 'string'},
    Maximum_correlation_period: {type: 'float'}
  }
};

