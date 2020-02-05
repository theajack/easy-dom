"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classPrefix = classPrefix;
exports.clearClassPrefix = clearClassPrefix;
exports.checkDom = checkDom;
exports.query = _query;
exports.create = create;
exports.Ele = void 0;

var _parseTag = _interopRequireDefault(require("./parseTag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var class_prefix = '';

function classPrefix(pf, func) {
  class_prefix = pf;

  if (typeof func === 'function') {
    func(clearClassPrefix);
    clearClassPrefix();
  }
}

function clearClassPrefix() {
  class_prefix = '';
}

function checkPrefix(cls) {
  return class_prefix + cls;
}

var Ele =
/*#__PURE__*/
function () {
  function Ele(_ref) {
    var tag = _ref.tag,
        ele = _ref.ele;

    _classCallCheck(this, Ele);

    if (ele) {
      this.el = ele;
    } else {
      var res = (0, _parseTag["default"])(tag);
      this.el = document.createElement(res.tag);

      if (res.cls) {
        this.cls(res.cls);
      }

      if (res.attr) {
        this.attr(res.attr);
      }

      if (res.id) {
        this.id(res.id);
      }
    }
  }

  _createClass(Ele, [{
    key: "dom",
    value: function dom() {
      return this.el;
    }
  }, {
    key: "cls",
    value: function cls(_cls) {
      if (typeof _cls === 'undefined') {
        return this.el.className;
      }

      if (class_prefix !== '') {
        this.el.className = _cls.split(' ').map(function (item) {
          return checkPrefix(item);
        }).join(' ');
      } else {
        this.el.className = _cls;
      }

      return this;
    }
  }, {
    key: "id",
    value: function id(_id) {
      if (typeof _id === 'undefined') {
        return this.attr('id');
      }

      return this.attr('id', _id);
    }
  }, {
    key: "attr",
    value: function attr(name, value) {
      if (_typeof(name) === 'object') {
        for (var k in name) {
          this.el.setAttribute(k, name[k]);
        }

        return this;
      }

      if (typeof value === 'undefined') {
        return this.el.getAttribute(name);
      }

      if (value === null) {
        this.el.removeAttribute(name);
      } else {
        this.el.setAttribute(name, value);
      }

      return this;
    }
  }, {
    key: "hasAttr",
    value: function hasAttr(name) {
      return this.el.hasAttribute(name);
    }
  }, {
    key: "rmAttr",
    value: function rmAttr(name) {
      this.el.removeAttribute(name);
      return this;
    }
  }, {
    key: "style",
    value: function style(name, value) {
      var _this = this;

      if (typeof value === 'undefined') {
        if (name instanceof Array) {
          // 根据数组批量获取样式
          var style = {};
          name.forEach(function (item) {
            style[item] = _this.style(item);
          });
          return style;
        } else if (_typeof(name) === 'object') {
          // 根据json设置样式
          for (var key in name) {
            this.style(key, name[key]);
          }

          return this;
        } else {
          return getComputedStyle(this.el)[name]; // 返回查询到的样式
        }
      } else {
        // 根据name value 设置样式
        if (typeof value === 'string' && value.indexOf('!important') !== -1) {
          this.el.style.setProperty(name, checkCssValue(this.el, name, value.substring(0, value.indexOf('!important'))), 'important');
        } else {
          this.el.style.setProperty(name, checkCssValue(this.el, name, value));
        }

        return this;
      }
    }
  }, {
    key: "text",
    value: function text(_text) {
      if (typeof _text === 'undefined') {
        return this.el.innerText;
      }

      this.el.innerText = _text;
      return this;
    }
  }, {
    key: "value",
    value: function value(val) {
      if (typeof val === 'undefined') {
        return this.el.value;
      }

      this.el.value = val;
      return this;
    }
  }, {
    key: "html",
    value: function html(_html) {
      if (typeof _html === 'undefined') {
        return this.el.innerHTML;
      }

      this.el.innerHTML = _html;
      return this;
    }
  }, {
    key: "click",
    value: function click(func, useCapture) {
      return this.on('click', func, useCapture);
    }
  }, {
    key: "on",
    value: function on(name, func) {
      var useCapture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (_typeof(name) === 'object') {
        for (var k in name) {
          this.on(k, name[k]);
        }

        return this;
      }

      if (typeof func !== 'function') {
        throw new Error('事件类型应该为 function');
      }

      this.el.addEventListener(name, func, useCapture);
      return this;
    }
  }, {
    key: "addClass",
    value: function addClass(cls) {
      cls = checkPrefix(cls);

      if (!this.hasClass(cls)) {
        if (this.el.className === '') {
          this.el.className = cls;
        } else {
          this.el.className += ' ' + cls;
        }
      }

      return this;
    }
  }, {
    key: "hasClass",
    value: function hasClass(cls) {
      cls = checkPrefix(cls);
      return getRegExp(cls).test(this.el.className);
    }
  }, {
    key: "rmClass",
    value: function rmClass(cls) {
      cls = checkPrefix(cls);

      if (this.hasClass(cls)) {
        this.el.className = this.el.className.replace(getRegExp(cls), ' ').trim();
      }

      return this;
    }
  }, {
    key: "replaceClass",
    value: function replaceClass(a, b) {
      a = checkPrefix(a);
      b = checkPrefix(b);

      if (this.hasClass(a)) {
        this.el.className = this.el.className.replace(getRegExp(a), ' ' + b + ' ').trim();
      } else {
        this.addClass(b);
      }

      return this;
    }
  }, {
    key: "toggleClass",
    value: function toggleClass(name) {
      return this.hasClass(name) ? this.rmClass(name) : this.addClass(name);
    }
  }, {
    key: "append",
    value: function append() {
      var _this2 = this;

      for (var _len = arguments.length, eles = new Array(_len), _key = 0; _key < _len; _key++) {
        eles[_key] = arguments[_key];
      }

      if (eles[0] instanceof Array) {
        eles = eles[0];
      }

      eles.forEach(function (el) {
        _this2.el.appendChild(checkDom(el));
      });
      return this;
    }
  }, {
    key: "insert",
    value: function insert() {
      var _this3 = this;

      for (var _len2 = arguments.length, eles = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        eles[_key2] = arguments[_key2];
      }

      var index = eles.shift();

      if (eles[0] instanceof Array) {
        eles = eles[0];
      }

      var el = this.child(index);

      if (el) {
        eles.forEach(function (ele) {
          _this3.el.insertBefore(checkDom(ele), el.el);
        });
      } else {
        this.append.apply(this, _toConsumableArray(eles));
      }

      return this;
    }
  }, {
    key: "prepend",
    value: function prepend() {
      for (var _len3 = arguments.length, eles = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        eles[_key3] = arguments[_key3];
      }

      return this.insert.apply(this, [0].concat(eles));
    }
  }, {
    key: "before",
    value: function before() {
      var _this$parent;

      for (var _len4 = arguments.length, eles = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        eles[_key4] = arguments[_key4];
      }

      return (_this$parent = this.parent()).insert.apply(_this$parent, [this.index()].concat(eles));
    }
  }, {
    key: "after",
    value: function after() {
      var _this$parent2;

      for (var _len5 = arguments.length, eles = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        eles[_key5] = arguments[_key5];
      }

      return (_this$parent2 = this.parent()).insert.apply(_this$parent2, [this.index() + 1].concat(eles));
    }
  }, {
    key: "remove",
    value: function remove(arg) {
      if (typeof arg === 'undefined') {
        this.parent().remove(this);
        return;
      }

      if (typeof arg === 'number') {
        this.el.removeChild(this.el.children[arg]);
      } else {
        this.el.removeChild(arg.dom());
      }

      return this;
    }
  }, {
    key: "empty",
    value: function empty() {
      return this.html('');
    }
  }, {
    key: "parent",
    value: function parent(index) {
      if (typeof index === 'number') {
        if (index < 1) {
          return null;
        }

        ;
        var parent = this;

        for (var i = 0; i < index; i++) {
          parent = parent.parent();

          if (!parent) {
            return null;
          }
        }

        return parent;
      } else {
        if (this.el.parentElement) {
          return new Ele({
            ele: this.el.parentElement
          });
        }

        return null;
      }
    }
  }, {
    key: "data",
    value: function data(name, value) {
      if (typeof this.el._ed_data === 'undefined') {
        this.el._ed_data = {};
      }

      var data = this.el._ed_data;

      if (typeof name === 'undefined') {
        return data;
      }

      if (_typeof(name) === 'object') {
        if (name === null) {
          data = {};
        } else {
          for (var k in name) {
            this.data(k, name[k]);
          }
        }
      } else {
        if (value === null) {
          delete data[name];
        } else if (typeof value === 'undefined') {
          return data[name];
        } else {
          data[name] = value;
        }
      }

      return this;
    }
  }, {
    key: "index",
    value: function index() {
      var a = this.parent().child();

      for (var i = 0; i < a.length; i++) {
        if (a[i].el == this.el) {
          return i;
        }
      }

      return -1;
    }
  }, {
    key: "next",
    value: function next() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return this.parent().child(this.index() + i);
    }
  }, {
    key: "prev",
    value: function prev() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return this.next(-i);
    }
  }, {
    key: "child",
    value: function child(i) {
      if (typeof i === 'number') {
        if (i >= this.el.children.length || i < 0) {
          return null;
        }

        return new Ele({
          ele: this.el.children[i]
        });
      }

      return Array.prototype.slice.apply(this.el.children).map(function (dom) {
        return new Ele({
          ele: dom
        });
      });
    }
  }, {
    key: "brother",
    value: function brother(i) {
      if (typeof i === 'number') {
        return this.parent().child(i);
      }

      return this.parent().child();
    }
  }, {
    key: "exe",
    value: function exe(cb) {
      cb.call(this, this.dom());
      return this;
    }
  }, {
    key: "src",
    value: function src(v) {
      this.dom().src = v;
      return this;
    }
  }, {
    key: "render",
    value: function render(_ref2) {
      var html = _ref2.html,
          _ref2$method = _ref2.method,
          method = _ref2$method === void 0 ? {} : _ref2$method,
          _ref2$result = _ref2.result,
          result = _ref2$result === void 0 ? null : _ref2$result;
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
            method: method
          }].concat(_toConsumableArray(res.args))));
        }
      }

      return this;
    }
  }, {
    key: "query",
    value: function query(selector) {
      var list = this.el.querySelectorAll(selector);
      var res = [];

      for (var i = 0; i < list.length; i++) {
        res.push(_query(list[i]));
      }

      return res;
    }
  }]);

  return Ele;
}();

exports.Ele = Ele;

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

function getRegExp(name) {
  return new RegExp('(^| )' + name + '($| )');
}

function checkCssValue(a, c, d) {
  if (typeof d === 'string' && (d.indexOf('-=') !== -1 || d.indexOf('+=') !== -1)) {
    var e = getCssNumberValue(d.substring(d.indexOf('=') + 1));

    if (d.indexOf('-=') !== -1) {
      e[0] = -e[0];
    }

    var b;

    if (d.indexOf('%') !== -1) {
      b = getCssNumberValue(a.style[c]);
    } else {
      b = getCssNumberValue(getComputedStyle(a)[c]);
    }

    return e[0] + b[0] + e[1];
  }

  return d;
}

;

function getCssNumberValue(a, b) {
  if (a == '' || a == undefined) {
    a = '0%';
  }

  if (b == undefined) {
    if (a.has('px')) {
      b = 'px';
    } else if (a.has('%')) {
      b = '%';
    } else if (a.has('em')) {
      b = 'em';
    } else {
      return [parseFloat(a), 'px'];
    }
  }

  return [parseFloat(a.substring(0, a.indexOf(b))), b];
}

;

function zipHtml(html) {
  return html.replace(new RegExp('\\n *', 'g'), '').replace(new RegExp('<!--(.|\\n)*?-->', 'g'), '').trim();
}

function checkDom(el) {
  if (el instanceof HTMLElement) {
    return el;
  } else if (typeof el === 'string') {
    return document.querySelector(el);
  } else {
    return el.el;
  }
}

function _query(selector, all) {
  if (selector instanceof HTMLElement) {
    return new Ele({
      ele: selector
    });
  }

  if (_typeof(selector) === 'object') {
    return selector;
  }

  if (all === true) {
    return document.querySelectorAll(selector);
  }

  var ele = document.querySelector(selector);

  if (!ele) {
    return null;
  }

  return new Ele({
    ele: ele
  });
}

function create() {
  var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
  return new Ele({
    tag: tag
  });
}