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
      return res.view("page/upload", {title:"Data Upload", vm: "upload"});
    }
    return res.view("page/list", {title:"Data Uploads", vm: "uploads"});
  },
  options: function (req, res) {
    if (req.param('id') != null) {
      return res.view("page/option", {title:"Processing Options", vm: "option"});
    }
    return res.view("page/list", {title:"Processing Options", vm: "options"});
  },
  corrections: function (req, res) {
    if (req.param('id') != null) {
      return res.view("page/correction", {title:"Spectral Correction", vm: "correction"});
    }
    return res.view("page/list", {title:"Spectral Corrections", vm: "corrections"});
  },
  analysis: function (req, res) {
    if (req.param('id') != null) {
      return res.view("page/analysis", {title:"Statistical Analysis", vm: "statisticalanalysis"});
    }
    return res.view("page/list", {title:"Statistical Analysis", vm: "analysis"});
  },
  reports: function (req, res) {
    if (req.param('id') != null) {
      return res.view("page/report", {title:"Report", vm: "report"});
    }
    return res.view("page/list", {title:"Reports", vm: "reports"});
  }
};

