/**
 * ProcessingOptionController
 *
 * @description :: Server-side logic for managing Processingoptions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  summary: function (req, res) {

    ProcessingOption.find({ User: req.session.user }).exec(function(err, items) {
      if (err) return res(err);
      var response = [];
      items.forEach(function(item) {
        response.push({
          id: item.id,
          Name:item.Name
        });
      });
      res.ok({items: response});
    });
  }
};

