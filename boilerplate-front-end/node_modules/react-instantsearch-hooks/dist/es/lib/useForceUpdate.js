import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { useReducer } from 'react';
/**
 * Forces a React update that triggers a rerender.
 * @link https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
 */

export function useForceUpdate() {
  var _useReducer = useReducer(function (x) {
    return x + 1;
  }, 0),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      forceUpdate = _useReducer2[1];

  return forceUpdate;
}