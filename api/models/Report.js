/**
* Report.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    User: { model: 'User' },
    Name: {type: 'string'},
    Status: {type: 'string'},

    Data: {model: 'Data'},
    StatisticalAnalysis: {model: 'StatisticalAnalysis'},
    SpectralCorrection: {model: 'SpectralCorrection'},
    ProcessingOption: {model: 'ProcessingOption'},
    Output: {model: 'Output'},

    Missing_Samples_Allowance: {type: 'float'},
    Flux_Averaging_Interval: {type: 'float'},
    North_Reference: {type:'string'},

    Master_Anemometer: {type:'string'},
    Cross_Wind_Correction_Applied_By_Anemometer: {type:'boolean'},
    ProcessLog: {type: 'text'},

    Molecular_Weight: {type: 'float'},
    Molecular_Diffusivity_In_Air: {type: 'float'},

    Flags: {
      collection: 'ReportFlag',
      via: 'Report'
    },

    Variables: {
      collection: 'ReportVariable',
      via: 'Report'
    }
  }
};

