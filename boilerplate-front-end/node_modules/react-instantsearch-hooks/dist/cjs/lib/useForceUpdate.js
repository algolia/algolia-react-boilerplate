"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useForceUpdate = useForceUpdate;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

/**
 * Forces a React update that triggers a rerender.
 * @link https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
 */
function useForceUpdate() {
  var _useReducer = (0, _react.useReducer)(function (x) {
    return x + 1;
  }, 0),
      _useReducer2 = (0, _slicedToArray2.default)(_useReducer, 2),
      forceUpdate = _useReducer2[1];

  return forceUpdate;
}