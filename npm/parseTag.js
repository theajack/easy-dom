"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parseTag;

function parseTag(tag) {
  if (tag.match(/[#\.\[]/) === null) {
    return {
      tag: tag
    };
  }

  var res = {};
  res.tag = cut(tag.match(/^(\S*?)(#|\.|\[)/g)[0], 0);

  if (tag.indexOf('#') !== -1) {
    res.id = cut(tag.match(/(#)(\S*?)(\.|\[|$)/g)[0]);
  }

  if (tag.indexOf('.') !== -1) {
    res.cls = cut(tag.match(/(\.)(\S*?)(#|\[|$)/g)[0]).split('.').join(' ').trim();
  }

  if (tag.indexOf('[') !== -1) {
    res.attr = {};
    tag.match(/(\[)(\S*?)(\])/g).map(function (item) {
      return cut(item).split('=');
    }).forEach(function (item) {
      res.attr[item[0]] = item[1] || '';
    });
  }

  return res;
}

function cut(str) {
  var head = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var tail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  if ('.#[]'.indexOf(str[str.length - 1]) === -1) {
    tail = 0;
  }

  return str.substring(head, str.length - tail);
}