"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registTouchEvent = registTouchEvent;

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var df = function df() {};

function registTouchEvent(_ref) {
  var el = _ref.el,
      _ref$touchStart = _ref.touchStart,
      touchStart = _ref$touchStart === void 0 ? df : _ref$touchStart,
      _ref$touchMove = _ref.touchMove,
      touchMove = _ref$touchMove === void 0 ? df : _ref$touchMove,
      _ref$touchEnd = _ref.touchEnd,
      touchEnd = _ref$touchEnd === void 0 ? df : _ref$touchEnd;

  if (isMobile()) {
    _index["default"].query(el).on({
      'touchstart': touchStart,
      'touchmove': touchMove,
      'touchend': touchEnd
    });

    document.body.addEventListener('touchmove', function (e) {
      e.preventDefault(); // 阻止默认的处理方式(阻止下拉滑动的效果)
    }, {
      passive: false
    });
  } else {
    var isMouseDown = false;

    _index["default"].query(el).on({
      'mousedown': function mousedown(e) {
        isMouseDown = true;
        touchStart(buildTouchWithMouse(e, 'touchstart'));
      }
    });

    _index["default"].query(document.body).on({
      'mousemove': function mousemove(e) {
        e.preventDefault(); // 阻止默认的处理方式(防止拖拽选中效果)

        if (isMouseDown) {
          touchMove(buildTouchWithMouse(e, 'touchmove'));
        }
      },
      'mouseup': function mouseup(e) {
        if (isMouseDown) {
          isMouseDown = false;
          touchEnd(buildTouchWithMouse(e, 'touchend'));
        }
      }
    });
  }
}

function isMobile() {
  return /Android|iPad|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
}

function buildTouchWithMouse(event, type) {
  var es = [{
    clientX: event.clientX,
    clientY: event.clientY,
    force: 1,
    identifier: 0,
    pageX: event.pageX,
    pageY: event.pageY,
    radiusX: 11.5,
    radiusY: 11.5,
    rotationAngle: 0,
    screenX: event.screenX,
    screenY: event.screenY,
    target: event.target,
    type: type
  }];

  if (type !== 'touchend') {
    event.touches = es;
  }

  event.changedTouches = es;
  return event;
}