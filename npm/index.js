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
// 获取浏览器窗口大小 window.innerWidth  在某些情况下有误
// window.innerWidth： 包含滚动条 在ios safari 下准确
// document.documentElement.clientWidth 不包滚动条，但是在ios safari下 document.documentElement.clientHeight 不准
// 移动端一般没有滚动条，所以默认在pc上使用document.documentElement，移动端使用window.innerWidth
function windowSize(useInner) {
  if (useInner === true) {
    return _wiSize();
  }

  return isMobile() !== false ? _wiSize() : _deSize();
}

function _deSize() {
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  };
}

function _wiSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

function isMobile() {
  var ua = navigator.userAgent.toLowerCase();
  var agents = new Array('android', 'iphone', 'symbianos', 'windows phone', 'ipad', 'ipod');

  for (var v = 0; v < agents.length; v++) {
    if (ua.indexOf(agents[v]) > 0) {
      return agents[v] === 'iphone' ? 'ios' : agents[v];
    }
  }

  return false;
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
  isMobile: isMobile,
  version: _version["default"]
};
exports["default"] = _default;