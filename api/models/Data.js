/**
* Data.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    Station: {model: 'Station'},
    User: { model: 'User' },
    Folder_Path: {type: 'string'},
    Status: {type: 'string', enum: ['new', 'inprogress','complete']},
    Number_Of_Rows: {type: 'integer'},
    Date_From: {type: 'datetime'},
    Date_To: {type: 'datetime'},
    Field_Separator_Character: {type: 'string'},
    Number_Of_Header_Rows: {type: 'integer'},
    Columns: {
      collection: 'DataColumn',
      via: 'Data'
    }
  }
};

