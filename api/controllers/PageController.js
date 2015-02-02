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
  uploads: function (req, res) {
    if (req.param('id') != null) {
      return res.view("page/detail", {title:"Data Upload", vm: "upload"});
    }
    return res.view("page/list", {title:"Data Uploads", vm: "uploadList"});
  },
  station: function (req, res) {
    if (req.param('id') != null) {
      return res.view("page/detail", {title:"Station", vm: "station"});
    }
    return res.view("page/list", {title:"Stations", vm: "stationList"});
  }
};

