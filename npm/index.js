"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ele = require("./ele");

var _style = require("./style");

var _touchEvent = require("./touchEvent");

var _version = _interopRequireDefault(require("./version"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 主要用来操作dom的工具方法
 */
// 获取浏览器窗口大小 window.innerWidth 在某些情况下有误
function windowSize() {
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  };
}

var _default = {
  query: _ele.query,
  create: _ele.create,
  classPrefix: _ele.classPrefix,
  clearClassPrefix: _ele.clearClassPrefix,
  checkDom: _ele.checkDom,
  reportStyle: _style.reportStyle,
  addCommonStyle: _style.addCommonStyle,
  initStylePool: _style.initStylePool,
  registTouchEvent: _touchEvent.registTouchEvent,
  windowSize: windowSize,
  version: _version["default"]
};
exports["default"] = _default;