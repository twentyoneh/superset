"use strict";

exports.__esModule = true;
exports.default = buildQuery;
var _core = require("@superset-ui/core");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function buildQuery(formData) {
  var phoneColumn = formData.phone_column;
  var labelColumn = formData.label_column;
  var columns = [phoneColumn, labelColumn].filter(Boolean);
  return (0, _core.buildQueryContext)(formData, baseQueryObject => [_extends({}, baseQueryObject, {
    columns
  })]);
}