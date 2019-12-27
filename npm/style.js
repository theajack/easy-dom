"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCommonStyle = addCommonStyle;
exports.initStylePool = initStylePool;
exports.reportStyle = reportStyle;

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var commonStyle = {};
var stylePool = {};

function addCommonStyle(name, value) {
  if (_typeof(name) === 'object') {
    for (var k in name) {
      addCommonStyle(k, name[k]);
    }

    return;
  }

  if (typeof commonStyle[name] === 'undefined') {
    commonStyle[name] = value;
  } else {
    console.warn('addCommonStyle 存在重名变量：' + name);
  }
}

function initStylePool() {
  for (var id in stylePool) {
    reportStyle({
      func: stylePool[id],
      id: id
    });
  }

  stylePool = {};
}

function reportStyle(_ref) {
  var func = _ref.func,
      _ref$id = _ref.id,
      id = _ref$id === void 0 ? 'el-style' : _ref$id,
      _ref$pool = _ref.pool,
      pool = _ref$pool === void 0 ? false : _ref$pool;

  if (typeof func === 'function' && func.hasReport) {
    return;
  }

  if (pool) {
    var _css = func(commonStyle);

    func.hasReport = true;

    if (stylePool[id]) {
      stylePool[id] += _css;
    } else {
      stylePool[id] = _css;
    }

    return;
  }

  var css = '';

  if (typeof func === 'string') {
    css = func;
  } else {
    func.hasReport = true;
    css = func(commonStyle);
  }

  css = zipCss(css);

  var styleEl = _["default"].query('#' + id);

  if (!styleEl) {
    styleEl = _["default"].create('style').id(id);

    _["default"].query(document.head).append(styleEl);
  }

  styleEl.html(styleEl.html() + css);
}

function zipCss(css) {
  return css.replace(new RegExp('\\n *', 'g'), '').replace(new RegExp(' *\\{', 'g'), '{').replace(new RegExp('\\/\\*(.|\\n)*?\\*\\/', 'g'), '').trim();
}