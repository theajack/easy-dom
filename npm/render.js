"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// for Ele.render method
function render(_ref) {
  var html = _ref.html,
      _ref$method = _ref.method,
      method = _ref$method === void 0 ? {} : _ref$method,
      _ref$result = _ref.result,
      result = _ref$result === void 0 ? null : _ref$result;
  this.html(zipHtml(html));
  var el = {};

  if (typeof result === 'function') {
    var els = this.query('[\\@el]');

    for (var i = 0; i < els.length; i++) {
      var item = els[i];
      el[item.attr('@el')] = item;
      item.attr('@el', null);
    }

    result.call({
      el: this,
      method: method
    }, el);
  }

  var list = this.query('[\\@event]');

  for (var _i = 0; _i < list.length; _i++) {
    var _item = list[_i];
    var res = buildEventResult(_item);

    if (method[res.name]) {
      var _method$res$name;

      _item.on(res.event, (_method$res$name = method[res.name]).bind.apply(_method$res$name, [{
        el: this,
        bindEl: el,
        self: _item,
        method: method // event: res.event

      }].concat(_toConsumableArray(res.args))));
    }
  }

  return this;
}

function buildEventResult(item) {
  var arr = item.attr('@event').split(':');
  item.attr('@event', null);
  var event = 'click',
      name,
      args = [];

  if (arr.length === 1) {
    name = arr[0];
  } else {
    event = arr[0];
    name = arr[1];
  }

  if (name.indexOf('(') !== -1) {
    var arg = name.match(/\(.*\)/);

    if (arg !== null) {
      var str = arg[0].replace(/'/g, '"');
      str = "[".concat(str.substr(1, str.length - 2), "]");
      args = JSON.parse(str);
    }

    name = name.substr(0, name.indexOf('('));
  }

  return {
    event: event,
    name: name,
    args: args
  };
}

function zipHtml(html) {
  return html.replace(new RegExp('\\n *', 'g'), '').replace(new RegExp('<!--(.|\\n)*?-->', 'g'), '').trim();
}