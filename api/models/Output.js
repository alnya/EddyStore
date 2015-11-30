/**
* Output.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    User: { model: 'User' },
    Name: {type: 'string'},

    Full_Output: {type:'boolean', defaultsTo: 'true'},
    Output_Format: {type:'string'},
    Continuous_Dataset: {type:'boolean', defaultsTo: 'true'},
    Error_Label: {type:'float', defaultsTo: '-9999'},

    AmeriFlux: {type:'boolean', defaultsTo: 'false'},
    GHG_Europe: {type:'boolean', defaultsTo: 'false'},
    Biomet_Measurements: {type:'boolean', defaultsTo: 'true'},
    Steady_State: {type:'boolean', defaultsTo: 'false'},
    Metadata: {type:'boolean', defaultsTo: 'true'},

    Spectral_Output_All: {type:'boolean', defaultsTo: 'true'},
    Spectral_Output_All_Ogives: {type:'boolean', defaultsTo: 'true'},
    Spectral_Output_Averaged_Spectra: {type:'boolean', defaultsTo: 'true'},
    Spectral_Output_Averaged_Cospectra: {type:'boolean', defaultsTo: 'true'},

    Spectral_Output_U: {type:'boolean', defaultsTo: 'false'},
    Spectral_Output_V: {type:'boolean'}, defaultsTo: 'false',
    Spectral_Output_W: {type:'boolean', defaultsTo: 'false'},
    Spectral_Output_TS: {type:'boolean', defaultsTo: 'false'},
    Spectral_Output_CO2: {type:'boolean', defaultsTo: 'false'},
    Spectral_Output_H20: {type:'boolean', defaultsTo: 'false'},
    Spectral_Output_CH4: {type:'boolean', defaultsTo: 'false'},
    Spectral_Output_4th_Gas: {type:'boolean', defaultsTo: 'false'},

    Spectral_Output_WU: {type:'boolean', defaultsTo: 'false'},
    Spectral_Output_WV: {type:'boolean', defaultsTo: 'false'},
    Spectral_Output_WTS: {type:'boolean', defaultsTo: 'true'},
    Spectral_Output_WC02: {type:'boolean', defaultsTo: 'false'},
    Spectral_Output_WH20: {type:'boolean', defaultsTo: 'false'},
    Spectral_Output_WCH4: {type:'boolean', defaultsTo: 'false'},
    Spectral_Output_W4th_Gas: {type:'boolean', defaultsTo: 'false'},

    Process_Stats_1: {type:'boolean', defaultsTo: 'true'},
    Process_Stats_2: {type:'boolean', defaultsTo: 'true'},
    Process_Stats_3: {type:'boolean', defaultsTo: 'true'},
    Process_Stats_4: {type:'boolean', defaultsTo: 'true'},
    Process_Stats_5: {type:'boolean', defaultsTo: 'true'},
    Process_Stats_6: {type:'boolean', defaultsTo: 'true'},
    Process_Stats_7: {type:'boolean', defaultsTo: 'true'},

    Process_Time_1: {type:'boolean', defaultsTo: 'false'},
    Process_Time_2: {type:'boolean', defaultsTo: 'false'},
    Process_Time_3: {type:'boolean', defaultsTo: 'false'},
    Process_Time_4: {type:'boolean', defaultsTo: 'false'},
    Process_Time_5: {type:'boolean', defaultsTo: 'false'},
    Process_Time_6: {type:'boolean', defaultsTo: 'false'},
    Process_Time_7: {type:'boolean', defaultsTo: 'false'},

    Process_Time_U: {type:'boolean', defaultsTo: 'false'},
    Process_Time_V: {type:'boolean', defaultsTo: 'false'},
    Process_Time_W: {type:'boolean', defaultsTo: 'false'},
    Process_Time_TS: {type:'boolean', defaultsTo: 'false'},
    Process_Time_CO2: {type:'boolean', defaultsTo: 'false'},
    Process_Time_H20: {type:'boolean', defaultsTo: 'false'},
    Process_Time_CH4: {type:'boolean', defaultsTo: 'false'},
    Process_Time_4th: {type:'boolean', defaultsTo: 'false'},
    Process_Time_T: {type:'boolean', defaultsTo: 'false'},
    Process_Time_P: {type:'boolean', defaultsTo: 'false'}

  }
};

