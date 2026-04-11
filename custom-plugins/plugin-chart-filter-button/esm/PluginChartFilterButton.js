var _templateObject;
function _taggedTemplateLiteralLoose(e, t) { return t || (t = e.slice(0)), e.raw = t, e; }
import React, { useEffect, createRef } from 'react';
import { styled } from '@superset-ui/core';
var Styles = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n  background: transparent;\n  padding: ", "px 0;\n  border-radius: 0;\n  height: ", "px;\n  width: ", "px;\n\n  h3 {\n    margin-top: 0;\n    margin-bottom: ", "px;\n    font-size: ", "px;\n    font-weight: ", ";\n    color: #1f2937;\n  }\n\n  .button-grid {\n    display: flex;\n    flex-wrap: wrap;\n    gap: ", "px;\n  }\n\n  .phone-button {\n    border: none;\n    border-radius: 999px;\n    padding: 10px 16px;\n    background: #ffffff;\n    color: #1f2937;\n    font-weight: 600;\n    cursor: pointer;\n    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.08);\n    transition:\n      transform 0.15s ease,\n      box-shadow 0.15s ease,\n      background 0.15s ease;\n  }\n\n  .phone-button:hover {\n    transform: translateY(-1px);\n    background: #e0f2fe;\n    box-shadow: 0 8px 20px rgba(14, 116, 144, 0.18);\n  }\n\n  .phone-button:active {\n    transform: translateY(0);\n    box-shadow: 0 3px 10px rgba(15, 23, 42, 0.12);\n  }\n\n  .phone-button.active {\n    background: #e0f2fe;\n    color: #0958d9;\n    box-shadow: 0 8px 20px rgba(14, 116, 144, 0.18);\n  }\n\n"])), _ref => {
  var {
    theme
  } = _ref;
  return theme.gridUnit * 2;
}, _ref2 => {
  var {
    height
  } = _ref2;
  return height;
}, _ref3 => {
  var {
    width
  } = _ref3;
  return width;
}, _ref4 => {
  var {
    theme
  } = _ref4;
  return theme.gridUnit * 3;
}, _ref5 => {
  var {
    theme
  } = _ref5;
  return theme.typography.sizes.l;
}, _ref6 => {
  var {
    theme
  } = _ref6;
  return theme.typography.weights.bold;
}, _ref7 => {
  var {
    theme
  } = _ref7;
  return theme.gridUnit * 2;
});
function isSelected(selectedValues, value) {
  return !!(selectedValues != null && selectedValues.some(selected => String(selected) === value));
}
export default function PluginChartFilterButton(props) {
  var {
    data,
    height,
    width,
    labelColumn,
    phoneColumn,
    selectedValues,
    setDataMask
  } = props;
  var rootElem = /*#__PURE__*/createRef();
  useEffect(() => {
    var root = rootElem.current;
    console.log('Plugin element', root);
  });
  var applyFilter = (phone, label) => {
    var values = phone ? [phone] : [];
    setDataMask({
      extraFormData: {
        filters: values.length ? [{
          col: phoneColumn,
          op: 'IN',
          val: values
        }] : []
      },
      filterState: {
        value: values.length ? values : null,
        selectedValues: values.length ? values : null,
        label: label != null ? label : null
      }
    });
  };
  var handleClick = (event, phone, label) => {
    event.preventDefault();
    if (isSelected(selectedValues, phone)) {
      applyFilter(null);
      return;
    }
    applyFilter(phone, label);
  };
  return /*#__PURE__*/React.createElement(Styles, {
    ref: rootElem,
    height: height,
    width: width
  }, /*#__PURE__*/React.createElement("h3", null, props.headerText), /*#__PURE__*/React.createElement("div", {
    className: "button-grid"
  }, data.map((row, index) => /*#__PURE__*/React.createElement("button", {
    className: "phone-button" + (isSelected(selectedValues, String(row[phoneColumn])) ? ' active' : ''),
    key: index,
    onClick: event => {
      var _row$labelColumn;
      return handleClick(event, String(row[phoneColumn]), String((_row$labelColumn = row[labelColumn]) != null ? _row$labelColumn : row[phoneColumn]));
    },
    type: "button"
  }, String(row[labelColumn])))));
}