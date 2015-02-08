/**
* MetadataColumn.js
*
* @description :: A description of a column of data captured
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    Data: {model: 'Data'},
    Instrument: {model: 'StationInstrument'},

    Column_Number: {type: 'integer'},
    Ignore: {type: 'boolean'},
    Numeric: {type: 'boolean'},
    Variable: {type: 'string'},
    Measurement_Type: {type: 'string'},
    Input_Unit: {type: 'string'},
    Linear_Scaling: {type: 'string'},
    Output_Unit: {type: 'string'},
    Gain_Value: {type: 'string'},
    Offset_Value: {type: 'string'},
    Nominal_Time_Lag: {type: 'float'},
    Minimum_Time_Lag: {type: 'float'},
    Maximum_Time_Lag: {type: 'float'}
  }
};

