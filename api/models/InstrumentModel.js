/**
* InstrumentModel.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    Manufacturer: {type: 'string'},
    Name: {type: 'string'},
    Label: {type: 'string'}
  },

  seedData:[
    { Manufacturer: 'gill', Name: 'Gill R2', Label: 't2' },
    { Manufacturer: 'gill', Name: 'Gill R3-50', Label: 'r3_50' },
    { Manufacturer: 'gill', Name: 'Gill R3-100', Label: 'r3_100' },
    { Manufacturer: 'gill', Name: 'Gill R3A-100', Label: 'r3a_100' },
    { Manufacturer: 'gill', Name: 'Gill HS-50', Label: 'hs_50' },
    { Manufacturer: 'gill', Name: 'Gill HS-100', Label: 'hs_100' },
    { Manufacturer: 'gill', Name: 'Gill WindMaster®', Label: 'wm' },
    { Manufacturer: 'gill', Name: 'Gill WindMaster Pro', Label: 'wmpro' },
    { Manufacturer: 'metek', Name: 'Metek USA-1', Label: 'usa1_standard' },
    { Manufacturer: 'metek', Name: 'Metek USA-1 fast', Label: 'usa1_fast' },
    { Manufacturer: 'csi', Name: 'Campbell Scientific® CSAT3', Label: 'csat3' },
    { Manufacturer: 'young', Name: 'R. M. Young', Label: '810000' },
    { Manufacturer: 'other_sonic', Name: 'Others', Label: 'generic_sonic' },
    { Manufacturer: 'licor', Name: 'LI-COR LI-6262', Label: 'li6262' },
    { Manufacturer: 'licor', Name: 'LI-COR LI-7000', Label: 'li7000' },
    { Manufacturer: 'licor', Name: 'LI-COR LI-7500', Label: 'li7500' },
    { Manufacturer: 'licor', Name: 'LI-COR LI-7500A', Label: 'li7500a' },
    { Manufacturer: 'licor', Name: 'LI-COR LI-7200', Label: 'li7200' },
    { Manufacturer: 'licor', Name: 'LI-COR LI-7700', Label: 'li7700' },
    { Manufacturer: 'other', Name: 'Generic Open Path', Label: 'generic_open_ path' },
    { Manufacturer: 'other', Name: 'Generic Closed Path', Label: 'generic_ closed_path' },
    { Manufacturer: 'other', Name: 'Open Path Krypton Hygrometer', Label: 'open_path_ krypton' },
    { Manufacturer: 'other', Name: 'Close Path Krypton Hygrometer', Label: 'closed_path_ krypton' }
  ]
};
