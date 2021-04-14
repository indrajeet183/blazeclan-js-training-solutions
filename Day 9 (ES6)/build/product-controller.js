"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var productMapping;

window.onload = function () {
  document.getElementById('category-add').addEventListener('click', onHandleAddCategory, false);
  productMapping = new ProductMapping(); //console.log(productMapping)

  document.getElementById('product-add').addEventListener('click', onHandleAddProduct, false);
};

var onHandleAddCategory = function onHandleAddCategory() {
  // const categoryId = document.getElementById('category-id').value
  var categoryName = document.getElementById('category-name').value;
  productMapping.addCategory({
    CategoryName: categoryName
  });
  clearCategoryInputs();
  generateProductCategories();
  generateCategoryTable();
};

var onHandleAddProduct = function onHandleAddProduct() {
  console.log('clicked');
  var productId = document.getElementById('product-id').value;
  var productName = document.getElementById('product-name').value;
  var productCategory = document.getElementById('category-select').value;
  productMapping.addProduct({
    ProductId: productId,
    ProductName: productName,
    ProductCategory: productCategory
  });
  clearProductInputs();
  generateProductsTable(false);
};

var clearCategoryInputs = function clearCategoryInputs() {
  // document.getElementById('category-id').value = ""
  document.getElementById('category-name').value = "";
};

var clearProductInputs = function clearProductInputs() {
  document.getElementById('product-id').value = "";
  document.getElementById('product-name').value = "";
  document.getElementById('category-select').value = "";
};

var generateProductCategories = function generateProductCategories() {
  //console.log(productMapping.getCategories())
  var categoryHTML = generateOptions(productMapping.getCategories(), 'category-select');
  document.getElementById('category-select-data').innerHTML = categoryHTML;
};

var generateCategoryTable = function generateCategoryTable() {
  var categoryTableHTML = generateTable(productMapping.getCategories());
  document.getElementById('category-data').innerHTML = categoryTableHTML;
  addHandleTdClick();
};

var generateProductsTable = function generateProductsTable() {
  var result = productMapping.getProducts(); //console.log(result)

  var productsTableHTML = generateTable(result);
  document.getElementById('product-data').innerHTML = productsTableHTML;
};

var generateProductsFilteredTable = function generateProductsFilteredTable(result) {
  var productsTableHTML = generateTable(result);
  document.getElementById('product-data').innerHTML = productsTableHTML;
};

var generateTable = function generateTable(data) {
  return UI.generateTable(data);
};

var generateOptions = function generateOptions(data, id) {
  return UI.generateSelect(data, id);
};

var addHandleTdClick = function addHandleTdClick() {
  var tds = document.getElementById('category-data');

  var _iterator = _createForOfIteratorHelper(tds.getElementsByTagName('td')),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var td = _step.value;
      td.addEventListener('click', onHandleTdClick, false);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};

var onHandleTdClick = function onHandleTdClick(e) {
  console.log('inside td event');
  var categoryId = e.target.innerText;
  var products = productMapping.getProductsByCategoryId(categoryId); //console.log(products)

  generateProductsFilteredTable(products);
};