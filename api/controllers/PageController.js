/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  dashboard: function (req, res) {
    return res.view({title:"Dashboard"});
  },
  metadata: function (req, res) {
    if (req.param('id') != null) {
      return res.view("page/detail", {title:"Metadata", vm: "metadata"});
    }
    return res.view("page/list", {title:"Metadata", vm: "metadataList"});
  }
};

