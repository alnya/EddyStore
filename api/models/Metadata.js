/**
* Metadata.js
*
* @description :: Metadata model - used to describe submitted data formats
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    Timestamp_Refers_To: {type: 'string', enum: ['start', 'end']},
    File_Duration: {type: 'integer'},
    Acquisition_Frequency: {type: 'integer'},
    Canopy_Height: {type: 'float'},
    Displacement_Height: {type: 'float'},
    Roughness_Length: {type: 'float'},
    Altitude: {type: 'float'},
    Latitude: {type: 'float'},
    Longitude: {type: 'float'},
    Field_Separator_Character: {type: 'string'},
    Number_Of_Header_Rows: {type: 'integer'},

    Instruments: {
      collection: 'MetadataInstrument',
      via: 'Metadata'
    },

    Columns: {
      collection: 'MetadataColumn',
      via: 'Metadata'
    },

    user: {
      model: 'User'
    }
  }
};

