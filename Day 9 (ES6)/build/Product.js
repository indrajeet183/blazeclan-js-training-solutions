"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _productsMapping = new WeakMap();

var _categoryReferences = new WeakMap();

var ProductMapping = /*#__PURE__*/function () {
  function ProductMapping() {
    _classCallCheck(this, ProductMapping);

    _productsMapping.set(this, {
      writable: true,
      value: null
    });

    _categoryReferences.set(this, {
      writable: true,
      value: []
    });

    _classPrivateFieldSet(this, _productsMapping, new WeakMap());
  }

  _createClass(ProductMapping, [{
    key: "addProduct",
    value: function addProduct(product) {
      var productCategoryId = product.ProductCategory; //console.log(product)

      var isAdded = false;
      var msg = "";
      var ref = this.getKeyReferenceByCategoryId(productCategoryId);

      if (ref !== false) {
        if (!this.checkIfProductExists(product.ProductId, productCategoryId)) {
          _classPrivateFieldGet(this, _productsMapping).set(ref, [].concat(_toConsumableArray(_classPrivateFieldGet(this, _productsMapping).get(ref)), [product]));

          isAdded = true;
        } else {
          msg = "Product already exist with id ".concat(product.ProductId);
        }
      } else {
        msg = "Error while adding product for Category ".concat(productCategoryId, " ref doest not exist!");
      }

      if (!isAdded) {
        throw new Error(msg);
      }
    }
  }, {
    key: "addCategory",
    value: function addCategory(category) {
      if (_classPrivateFieldGet(this, _categoryReferences).length > 0) {
        category.CategoryId = "C".concat(_classPrivateFieldGet(this, _categoryReferences).length + 1);

        _classPrivateFieldGet(this, _categoryReferences).push(category);

        _classPrivateFieldGet(this, _productsMapping).set(category, []);
      } else {
        category.CategoryId = 'C1';

        _classPrivateFieldGet(this, _categoryReferences).push(category);

        _classPrivateFieldGet(this, _productsMapping).set(category, []);
      }
    }
  }, {
    key: "getProducts",
    value: function getProducts() {
      var _this = this;

      var result = [];

      _classPrivateFieldGet(this, _categoryReferences).forEach(function (ref) {
        _classPrivateFieldGet(_this, _productsMapping).get(ref).forEach(function (product) {
          return result.push(product);
        });
      }); // console.log(result)


      return result;
    }
  }, {
    key: "getCategories",
    value: function getCategories() {
      return _classPrivateFieldGet(this, _categoryReferences);
    }
  }, {
    key: "checkIfCateogryExist",
    value: function checkIfCateogryExist(categoryId) {
      var result = _classPrivateFieldGet(this, _categoryReferences).filter(function (e) {
        return e.CategoryId === categoryId;
      });

      if (result.length) throw new Error("CategoryID ".concat(categoryId, " already exist!"));else return true;
    }
  }, {
    key: "checkIfProductExists",
    value: function checkIfProductExists(productId, categoryId) {
      console.log(productId, categoryId);
      var filteredProducts = this.getProductsByCategoryId(categoryId);
      var isExist = false;

      if (filteredProducts.length > 0) {
        var result = filteredProducts.filter(function (e) {
          return e.ProductId === productId;
        });
        if (result.length > 0) isExist = true;
      }

      return isExist;
    }
  }, {
    key: "getWholeMap",
    value: function getWholeMap() {
      return _classPrivateFieldGet(this, _productsMapping);
    }
  }, {
    key: "getProductsByCategoryId",
    value: function getProductsByCategoryId(categoryId) {
      var _this2 = this;

      console.log(categoryId);
      var result = [];

      _classPrivateFieldGet(this, _categoryReferences).forEach(function (ref) {
        if (categoryId === ref.CategoryId) {
          _classPrivateFieldGet(_this2, _productsMapping).get(ref).forEach(function (product) {
            return result.push(product);
          });
        }
      });

      return result;
    }
  }, {
    key: "getKeyReferenceByCategoryId",
    value: function getKeyReferenceByCategoryId(categoryId) {
      var reference = false;

      _classPrivateFieldGet(this, _categoryReferences).forEach(function (e) {
        if (e.CategoryId === categoryId) reference = e;
      });

      console.log(reference);
      return reference;
    }
  }]);

  return ProductMapping;
}();