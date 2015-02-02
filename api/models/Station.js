/**
* Metadata.js
*
* @description :: Metadata model - used to describe submitted data formats
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    User: {model: 'User'},

    Name: {type: 'string'},
    Timestamp_Refers_To: {type: 'string', enum: ['start', 'end']},
    File_Duration: {type: 'integer'},
    Acquisition_Frequency: {type: 'integer'},
    Canopy_Height: {type: 'float'},
    Displacement_Height: {type: 'float'},
    Roughness_Length: {type: 'float'},
    Altitude: {type: 'float'},
    Latitude: {type: 'float'},
    Longitude: {type: 'float'},

    Instruments: {
      collection: 'StationInstrument',
      via: 'Station'
    }
  }
};

