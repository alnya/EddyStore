/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    Name: 'string',
    Email: {
      type: 'email',
      unique: true
    },
    Password: {
      type: 'string',
      required: true
    }
  },

  beforeCreate: function (attrs, next) {
    var bcrypt = require('bcrypt');

    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(attrs.Password, salt, function(err, hash) {
        if (err) return next(err);

        attrs.Password = hash;
        next();
      });
    });
  },
  beforeUpdate: function(values, next) {
    if(values.Password) {
      var bcrypt = require('bcrypt');

      bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(values.Password, salt, function(err, hash) {
          if (err) return next(err);

          values.Password = hash;
          next();
        });
      });
    } else {
      next();
    }
  },

  seedData:[
    {
      Name: 'Administrator',
      Email: 'rory.wilson@gmail.com',
      Password: 'password'
    }
  ]
};

