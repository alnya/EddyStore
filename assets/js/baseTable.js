/**
 * Knockout bootstrap pageable and sortable data table
 * Based on: https://github.com/labory/knockout-bootstrap-sortable-data-table
 */
define(['knockout', 'common', 'webApiClient'], function(ko, common, webApiClient) {

  function TableColumn(column) {
    var self = this;

    self.name = column.name || "";
    self.value = column.value;
    self.sortValue = column.sortValue || column.value;
    self.template = column.template;
    self.sortable = column.sortable
    self.filterable = column.filterable;
    self.dataType = column.dataType || "String";
    self.filterValues = ko.observableArray(column.filterValues || []);
    self.width = column.width;
    self.sortDescending = ko.observable(column.sortDescending);
    self.filterValue = ko.observable(column.filterValue);
    self.filterKey = column.filterKey || column.value;
    self.labelText = column.labelText || "";
    self.LookupUrl = column.LookupUrl || "";
  };

  var gridViewModel = function(config) {
    var self = this;

    self.bindFilterToQuery = (typeof config.bindFilterToQuery === 'undefined') ? true : config.bindFilterToQuery;
    self.sortable = config.sortable || false;
    self.filterMode = config.filterMode || 'none';
    self.items = ko.observableArray(config.items || []);
    self.emptyRowMessage = config.emptyRowMessage;
    self.emptyRowText = ko.observable("");
    self.columns = [];
    self.nonTableFilterableFields = [];
    self.allFilterableFields = [];
    self.sortColumn = ko.observable(null);
    self.url = config.url;
    self.successCallback = config.successCallback;
    self.errorCallback = config.errorCallback;
    self.totalPages = ko.observable();
    self.pageIndex = ko.observable(0);
    self.pageSize = ko.observable(config.pageSize || 10);
    self.pageRadius = ko.observable(config.pageRadius || 2);
    self.isFirstPage = ko.pureComputed(function() { return self.pageIndex() === 0; });
    self.isLastPage = ko.pureComputed(function () { return self.pageIndex() === self.totalPages() - 1; });
    self.downloadEnabled = config.downloadEnabled || false;
    self.downloadUrl = ko.observable();

    var queryParams = common.parseQueryString(location.search.substring(1));

    if (self.bindFilterToQuery && queryParams["Page"]) {
      self.pageIndex(queryParams["Page"] - 1);
    }

    if (self.bindFilterToQuery && queryParams["Pagesize"]) {
      self.pageSize(queryParams["Pagesize"]);
    };

    var filterTimer;

    ko.utils.arrayForEach(config.columns, function(column) {

      column.sortable = (typeof column.sortable === 'undefined') ? true : column.sortable;
      column.sortable = column.sortable && self.sortable;
      column.filterable = (typeof column.filterable === 'undefined') ? true : column.filterable;

      if (self.bindFilterToQuery && queryParams["SortBy"] && queryParams["SortBy"] == column.sortValue) {
        column.sortDescending = (queryParams["SortDescending"] === 'true');
      };

      if (self.bindFilterToQuery && queryParams[column.value]) {
        column.filterValue = queryParams[column.value];
      };

      var tableColumn = new TableColumn(column);

      self.columns.push(tableColumn);

      if (tableColumn.sortDescending() != null) {
        self.sortColumn(tableColumn);
      }

      if (tableColumn.filterable) {
        tableColumn.filterValue.subscribe(function() {
          if (self.filterMode == 'filter') {
            clearTimeout(filterTimer);
            filterTimer = setTimeout(function() {
              self.reload();
            }, 1000);
          }
        });
      };
    });

    if (config.nonTableFilterableFields) {
      ko.utils.arrayForEach(config.nonTableFilterableFields, function(field) {

        if (self.bindFilterToQuery && queryParams[field.value]) {
          field.filterValue = queryParams[field.value];
        };

        var filterField = new TableColumn(field);
        self.nonTableFilterableFields.push(filterField);
      });
    }

    ko.utils.arrayForEach(self.columns, function(field) {
      if (field.filterable) {
        self.allFilterableFields.push(field);
      };
    });

    self.allFilterableFields = self.allFilterableFields.concat(self.nonTableFilterableFields);

    var getSearchParams = function () {
      var params = "skip=" + (self.pageIndex() * self.pageSize()) + "&limit=" + self.pageSize();
      var sortColumn = self.sortColumn();

      if ((sortColumn != null && sortColumn.sortDescending() != null)) {
        params += "&sort=" + sortColumn.sortValue + "%20" + (sortColumn.sortDescending() ? "DESC" : "ASC");
      }
      var filter = "";
      ko.utils.arrayForEach(self.filterTerms(), function (term) {
        if (term.filterValue !== "") {
          if (filter != "") filter+=",";
          filter += term.fieldName + ":" + term.filterValue;
        }
      });

      if (filter != "") {
        params += "&where={" + filter + "}";
      }

      return params;
    }

    // TODO - standard comparison on type
    self.comparator = config.comparator || function(a, b) {
      return a && b && a.id && b.id ? a.id === b.id : a === b;
    };

    common.loadSelectionData(self.columns);

    self.pages = ko.pureComputed(function() {
      var pages = [];
      var page, elem, last;
      for (page = 1; page <= self.totalPages(); page++) {
        var activePage = self.pageIndex() + 1;
        var totalPage = self.totalPages();
        var radius = self.pageRadius();
        if (page == 1 || page == totalPage) {
          elem = page;
        } else if (activePage < 2 * radius + 1) {
          elem = (page <= 2 * radius + 1) ? page : "ellipsis";
        } else if (activePage > totalPage - 2 * radius) {
          elem = (totalPage - 2 * radius <= page) ? page : "ellipsis";
        } else {
          elem = (Math.abs(activePage - page) <= radius ? page : "ellipsis");
        }
        if (elem != "ellipsis" || last != "ellipsis") {
          pages.push(elem);
        }
        last = elem;
      }
      return pages;
    });

    self.prevPage = function() {
      if (self.pageIndex() > 0) {
        self.pageIndex(self.pageIndex() - 1);
      }
    };

    self.nextPage = function() {
      if (self.pageIndex() < self.totalPages() - 1) {
        self.pageIndex(self.pageIndex() + 1);
      }
    };

    self.moveToPage = function(index) {
      self.pageIndex(index - 1);
    };

    self.reload = function() {
      self.emptyRowText("Loading Data");

      var params = getSearchParams();

      webApiClient.ajaxGet(self.url, null, params,
        function(data) {
          if (data) {
            if (self.bindFilterToQuery) {
              history.replaceState(null, "Replace grid parameters", " ?" + params);
            }

            self.items(data.items);
            self.emptyRowText(self.emptyRowMessage);

            self.totalPages(data.info.total/self.pageSize());
            self.pageIndex(Math.min(self.pageIndex(), self.totalPages() - 1));
            self.filterApplied(self.filterTerms().length > 0);

            self.downloadUrl(webApiClient.baseUrl + self.url + '.csv?' + params);

            if (self.successCallback != null) {
              self.successCallback(data);
            }
          }
        },
        function(errorResponse) {
          if (self.errorCallback != null) {
            self.errorCallback(errorResponse);
          }
        });
    };

    var sortTimer;
    self.sort = function(column) {
      clearTimeout(sortTimer);
      column.sortDescending(column.sortDescending() || false);

      if (self.sortColumn() === column) {
        column.sortDescending(!column.sortDescending());
      }

      self.sortColumn(column);

      sortTimer = setTimeout(function() {
        self.reload();
      }, 250);
    };

    self.filterApplied = ko.observable(false);

    self.filterTerms = function() {
      var terms = [];
      ko.utils.arrayForEach(self.allFilterableFields, function (column) {

        if (column.filterable && column.filterValue() !== "" && (typeof column.filterValue() !== 'undefined')) {
          terms.push({
            dataType: column.dataType,
            fieldName: column.filterKey,
            filterValue: column.filterValue()
          });
        }
      });

      return terms;
    };

    self.clearFilter = function() {
      ko.utils.arrayForEach(self.allFilterableFields, function (column) {
        column.filterValue(undefined);
      });

      self.reload();
    };

    self.pageIndex.subscribe(function() { self.reload(); });
    self.pageSize.subscribe(function() { self.reload(); });
    self.reload();
  }

  var templateEngine = new ko.nativeTemplateEngine();

  ko.bindingHandlers.dataTable = {
    init: function(element, valueAccessor) {
      return { 'controlsDescendantBindings': true };
    },
    update: function(element, valueAccessor, allBindingsAccessor) {
      var viewModel = valueAccessor();
      ko.renderTemplate("ko-table-template", viewModel, { templateEngine: templateEngine }, element, "replaceNode");
    }
  };

  return { GridViewModel: gridViewModel };
});
