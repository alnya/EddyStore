/**
* InstrumentManufacturer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    Instrument_Type: {type: 'string'},
    Name: {type: 'string'},
    Label: {type: 'string'}
  },

  seedData:[
    { Instrument_Type: 'Anemometer', Name: 'Gill Instruments, Ltd.', Label: 'gill' },
    { Instrument_Type: 'Anemometer', Name: 'Campbell Scientific®, Inc.', Label: 'csi' },
    { Instrument_Type: 'Anemometer', Name: 'Metek GmbH', Label: 'metek' },
    { Instrument_Type: 'Anemometer', Name: 'R. M. Young', Label: 'young' },
    { Instrument_Type: 'Anemometer', Name: 'Others', Label: 'other_sonic' },
    { Instrument_Type: 'Gas', Name: 'LI-COR, Inc.', Label: 'licor' },
    { Instrument_Type: 'Gas', Name: 'Others', Label: 'other' }
  ]
};
