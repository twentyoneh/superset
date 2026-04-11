"use strict";

exports.__esModule = true;
exports.default = void 0;
var _core = require("@superset-ui/core");
var config = {
  controlPanelSections: [{
    label: (0, _core.t)('Query'),
    expanded: true,
    controlSetRows: [[{
      name: 'phone_column',
      config: {
        type: 'SelectControl',
        label: (0, _core.t)('Phone column'),
        description: (0, _core.t)('Column used to filter the dashboard'),
        validators: [_core.validateNonEmpty],
        mapStateToProps: _ref => {
          var _datasource$columns;
          var {
            datasource
          } = _ref;
          return {
            choices: (datasource == null ? void 0 : (_datasource$columns = datasource.columns) == null ? void 0 : _datasource$columns.map(column => [column.column_name])) || []
          };
        }
      }
    }], [{
      name: 'label_column',
      config: {
        type: 'SelectControl',
        label: (0, _core.t)('Label column'),
        description: (0, _core.t)('Column displayed on the button'),
        validators: [_core.validateNonEmpty],
        mapStateToProps: _ref2 => {
          var _datasource$columns2;
          var {
            datasource
          } = _ref2;
          return {
            choices: (datasource == null ? void 0 : (_datasource$columns2 = datasource.columns) == null ? void 0 : _datasource$columns2.map(column => [column.column_name])) || []
          };
        }
      }
    }], ['adhoc_filters'], ['row_limit']]
  }, {
    label: (0, _core.t)('Chart options'),
    expanded: true,
    controlSetRows: [[{
      name: 'header_text',
      config: {
        type: 'TextControl',
        default: 'Phone Filter Buttons',
        renderTrigger: true,
        label: (0, _core.t)('Header Text'),
        description: (0, _core.t)('Text shown above the buttons')
      }
    }]]
  }]
};
var _default = exports.default = config;