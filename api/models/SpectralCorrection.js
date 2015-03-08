/**
* SpectralCorrection.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    User: { model: 'User' },
    Name: {type: 'string'},
    Analytic_Correction_Of_High_Pass_Filtering_Effects: {type: 'boolean'},
    Correction_Of_Low_Pass_Filtering_Effects: {type: 'boolean'},
    Correction_Of_Low_Pass_Filtering_Effects_Method: {type: 'string'},
    Correction_For_Instruments_Separation: {type: 'boolean'},
    Correction_For_Instruments_Separation_Method: {type: 'string'},
    Subperiod_Start: {type: 'datetime'},
    Subperiod_End: {type: 'datetime'},
    Minimum_Number_Of_Spectra: {type: 'float'},
    Minimum_CO2_Flux: {type: 'float'},
    Minimum_CH4_Flux: {type: 'float'},
    Minimum_Gas_Flux: {type: 'float'},
    Minimum_Latent_Heat_Flux: {type: 'float'},
    Minimum_Sensible_Heat_Flux: {type: 'float'},
    Lowest_Frequency_CO2: {type: 'float'},
    Lowest_Frequency_H20: {type: 'float'},
    Lowest_Frequency_CH4: {type: 'float'},
    Lowest_Frequency_Gas: {type: 'float'},
    Highest_Frequency_CO2: {type: 'float'},
    Highest_Frequency_H20: {type: 'float'},
    Highest_Frequency_CH4: {type: 'float'},
    Highest_Frequency_Gas: {type: 'float'},
    Lowest_Noise_Frequency_CO2: {type: 'float'},
    Lowest_Noise_Frequency_H20: {type: 'float'},
    Lowest_Noise_Frequency_CH4: {type: 'float'},
    Lowest_Noise_Frequency_Gas: {type: 'float'},
    Threshold_Flux_CO2: {type: 'float'},
    Threshold_Flux_Gas: {type: 'float'},
    Threshold_Flux_CH4: {type: 'float'},
    Threshold_Latent_Heat: {type: 'float'},
    Threshold_Sensible_Heat: {type: 'float'}
  }
};

