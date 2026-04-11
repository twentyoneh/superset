function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
import { buildQueryContext } from '@superset-ui/core';
export default function buildQuery(formData) {
  var phoneColumn = formData.phone_column;
  var labelColumn = formData.label_column;
  var columns = [phoneColumn, labelColumn].filter(Boolean);
  return buildQueryContext(formData, baseQueryObject => [_extends({}, baseQueryObject, {
    columns
  })]);
}