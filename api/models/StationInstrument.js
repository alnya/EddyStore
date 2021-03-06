/**
* MetadataInstrument.js
*
* @description :: Instrument used in the capture of data
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    Data: {model: 'Data'},

    Instrument_Type: {type: 'string', enum: ['Anemometer', 'Gas']},
    Manufacturer: {type: 'string'},
    Model: {type: 'string'},
    Software_Version: {type:'String'},
    Instrument_Id: {type: 'string'},
    Height: {type: 'float'},
    Wind_Data_Format: {type: 'string'},
    North_Alignment: {type: 'string'},
    North_Offset: {type: 'float'},
    Northward_Separation: {type: 'float'},
    Eastward_Separation: {type: 'float'},
    Vertical_Separation: {type: 'float'},
    Longitudinal_Path_Length: {type: 'float'},
    Transversal_Path_Length: {type: 'float'},
    Tube_Length: {type: 'float'},
    Tube_Inner_Diameter: {type: 'float'},
    Nominal_Tube_Flow_Rate: {type: 'string'},
    Time_Response: {type: 'string'},
    Extinction_Coefficient_In_Water_KW: {type: 'string'},
    Extinction_Coefficient_In_Water_KO: {type: 'string'}
  }
};

