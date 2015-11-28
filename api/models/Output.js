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

    Full_Output: {type:'boolean'},
    Output_Format: {type:'string'},
    Continuous_Dataset: {type:'boolean'},
    Error_Label: {type:'float'},

    AmeriFlux: {type:'boolean'},
    GHG_Europe: {type:'boolean'},
    Biomet_Measurements: {type:'boolean'},
    Steady_State: {type:'boolean'},
    Metadata: {type:'boolean'},

    Spectral_Output_All: {type:'boolean'},
    Spectral_Output_All_Ogives: {type:'boolean'},
    Spectral_Output_Averaged_Spectra: {type:'boolean'},
    Spectral_Output_Averaged_Cospectra: {type:'boolean'},

    Spectral_Output_U: {type:'boolean'},
    Spectral_Output_V: {type:'boolean'},
    Spectral_Output_W: {type:'boolean'},
    Spectral_Output_TS: {type:'boolean'},
    Spectral_Output_CO2: {type:'boolean'},
    Spectral_Output_H20: {type:'boolean'},
    Spectral_Output_CH4: {type:'boolean'},
    Spectral_Output_4th_Gas: {type:'boolean'},

    Spectral_Output_WU: {type:'boolean'},
    Spectral_Output_WV: {type:'boolean'},
    Spectral_Output_WTS: {type:'boolean'},
    Spectral_Output_WC02: {type:'boolean'},
    Spectral_Output_WH20: {type:'boolean'},
    Spectral_Output_WCH4: {type:'boolean'},
    Spectral_Output_W4th_Gas: {type:'boolean'},

    Process_Stats_1: {type:'boolean'},
    Process_Stats_2: {type:'boolean'},
    Process_Stats_3: {type:'boolean'},
    Process_Stats_4: {type:'boolean'},
    Process_Stats_5: {type:'boolean'},
    Process_Stats_6: {type:'boolean'},
    Process_Stats_7: {type:'boolean'},

    Process_Time_1: {type:'boolean'},
    Process_Time_2: {type:'boolean'},
    Process_Time_3: {type:'boolean'},
    Process_Time_4: {type:'boolean'},
    Process_Time_5: {type:'boolean'},
    Process_Time_6: {type:'boolean'},
    Process_Time_7: {type:'boolean'},

    Process_Time_U: {type:'boolean'},
    Process_Time_V: {type:'boolean'},
    Process_Time_W: {type:'boolean'},
    Process_Time_TS: {type:'boolean'},
    Process_Time_CO2: {type:'boolean'},
    Process_Time_H20: {type:'boolean'},
    Process_Time_CH4: {type:'boolean'},
    Process_Time_4th: {type:'boolean'},
    Process_Time_T: {type:'boolean'},
    Process_Time_P: {type:'boolean'}

  }
};

