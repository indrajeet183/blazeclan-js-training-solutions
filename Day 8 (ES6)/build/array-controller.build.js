"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var products = [{
  ProductId: "100",
  ProductName: "Dell Latitude 3301",
  CategoryName: 'Laptop',
  Manufacturer: 'Dell',
  Price: '50000'
}, {
  ProductId: "210",
  ProductName: "Asus Zenbook Z1",
  CategoryName: 'Laptop',
  Manufacturer: 'Asus',
  Price: '45000'
}, {
  ProductId: "310",
  ProductName: "Samsung M41",
  CategoryName: 'Mobile',
  Manufacturer: 'Samsung',
  Price: '21000'
}, {
  ProductId: "351",
  ProductName: "One Plus 9T",
  CategoryName: 'Mobile',
  Manufacturer: 'One Plus',
  Price: '45000'
}, {
  ProductId: "151",
  ProductName: "Samsung G20",
  CategoryName: 'Mobile',
  Manufacturer: 'Samsung',
  Price: '90000'
}, {
  ProductId: "751",
  ProductName: "Dell Inspiron 15",
  CategoryName: 'Laptop',
  Manufacturer: 'Dell',
  Price: '65000'
}, {
  ProductId: "321",
  ProductName: "Asus Duo D2",
  CategoryName: 'Laptop',
  Manufacturer: 'Asus',
  Price: '75000'
}, {
  ProductId: "151",
  ProductName: "Samsung G20",
  CategoryName: 'Mobile',
  Manufacturer: 'Samsung',
  Price: '90000'
}, {
  ProductId: "210",
  ProductName: "Asus Zenbook Z1",
  CategoryName: 'Laptop',
  Manufacturer: 'Asus',
  Price: '45000'
}, {
  ProductId: "134",
  ProductName: "Fujifilm X-T200",
  CategoryName: 'Camera',
  Manufacturer: 'Fujifilm',
  Price: '72000'
}, {
  ProductId: "981",
  ProductName: "Sony Alpha 6400M",
  CategoryName: 'Camera',
  Manufacturer: 'Sony',
  Price: '84000'
}];

window.onload = function () {
  document.getElementById('product-load').addEventListener('click', onHandleLoadTalbe, false);
  document.getElementById('product-filter').addEventListener('click', onHandleSearchByFilter, false);
  document.getElementById('product-remove-dup').addEventListener('click', onHandleRemoveDuplicate, false);
  document.getElementById('product-group').addEventListener('click', onHandleGroupBy, false);
};

var onHandleLoadTalbe = function onHandleLoadTalbe() {
  loadTable(products);
};

var loadTable = function loadTable(products) {
  var productsTable = getTable(products);
  document.getElementById('product-data').innerHTML = productsTable;
};

var onHandleRemoveDuplicate = function onHandleRemoveDuplicate() {
  var duplicateResult = products.reduce(function (result, currentProduct) {
    if (!result.hasOwnProperty(currentProduct.ProductName)) {
      result[currentProduct.ProductId] = currentProduct;
    }

    return result;
  }, {});
  console.log(duplicateResult);
  var result = [];
  Object.keys(duplicateResult).forEach(function (key) {
    console.log(key);
    result = [].concat(_toConsumableArray(result), [duplicateResult[key]]);
  });
  loadTable(result);
};

var onHandleSearchByFilter = function onHandleSearchByFilter() {
  var searchKeyword = document.getElementById('filter-input').value;

  if (searchKeyword.length) {
    var filterResult = products.filter(function (product) {
      var result = Object.keys(product).map(function (e) {
        return product[e].toLowerCase().includes(searchKeyword.toLowerCase());
      });
      return result.includes(true);
    });
    loadTable(filterResult);
  } else {
    loadTable(products);
  }
};

var onHandleGroupBy = function onHandleGroupBy() {
  var selectedGroup = document.getElementById('product-group-select').value; //console.log(selectedGroup)

  var groupByResult = products.reduce(function (result, product) {
    console.log(product);

    if (result.hasOwnProperty(product[selectedGroup])) {
      result[product[selectedGroup]].push(product);
    } else {
      result[product[selectedGroup]] = [];
      result[product[selectedGroup]].push(product);
    }

    return result;
  }, {});
  var result = [];
  Object.keys(groupByResult).forEach(function (key) {
    result = [].concat(_toConsumableArray(result), _toConsumableArray(groupByResult[key]));
  });
  loadTable(result);
};
