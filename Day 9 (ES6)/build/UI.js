"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UI = function UI() {
  _classCallCheck(this, UI);
};

_defineProperty(UI, "generateTable", function (data) {
  console.log(data);
  var table = "<table><thead>";

  if (data.length > 0) {
    var header = UI.generateHeader(Object.keys(data[0]));
    table += "".concat(header, "</thead><tbody>");
    table += data.map(function (product) {
      var tds = Object.keys(product).map(function (key) {
        return "<td>".concat(product[key], "</td>");
      }).join('');
      return "<tr>".concat(tds, "</tr>");
    }).join('');
  } else {
    table = 'No data data!';
  }

  table += "</tbody></table>";
  return table;
});

_defineProperty(UI, "generateSelect", function (data, id) {
  var selectHTML = "<select id=\"".concat(id, "\">");

  if (data.length) {
    selectHTML += data.map(function (e) {
      return "<option value=\"".concat(e['CategoryId'], "\">").concat(e['CategoryName'], "</option>");
    });
    selectHTML += '</select>';
  } else {
    selectHTML = "No Data found!";
  }

  return selectHTML;
});

_defineProperty(UI, "generateHeader", function (headers) {
  var headerResult = "";

  if (headers.length) {
    headerResult = headers.map(function (header) {
      return "<th>".concat(header, "</th>");
    }).join("");
    headerResult = "<tr>".concat(headerResult, "</tr>");
  } else {
    headerResult = 'No headers data!';
  }

  return headerResult;
});