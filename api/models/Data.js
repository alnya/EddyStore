/**
* Data.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    User: { model: 'User' },

    Folder_Path: {type: 'string'},
    Number_Of_Rows: {type: 'integer'},
    Date_From: {type: 'datetime'},
    Date_To: {type: 'datetime'},
    Field_Separator_Character: {type: 'string'},
    Number_Of_Header_Rows: {type: 'integer'},
    File_Format: {type: 'string'},
    Name: {type: 'string'},
    Timestamp_Refers_To: {type: 'string'},
    File_Duration: {type: 'integer'},
    Acquisition_Frequency: {type: 'integer'},
    Canopy_Height: {type: 'float'},
    Displacement_Height: {type: 'float'},
    Roughness_Length: {type: 'float'},
    Altitude: {type: 'float'},
    Latitude: {type: 'float'},
    Longitude: {type: 'float'},
    AccessLevel: {type: 'integer'},

    Instruments: {
      collection: 'StationInstrument',
      via: 'Data'
    },

    Columns: {
      collection: 'DataColumn',
      via: 'Data'
    }
  }
};

