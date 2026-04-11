import { t, validateNonEmpty } from '@superset-ui/core';
var config = {
  controlPanelSections: [{
    label: t('Query'),
    expanded: true,
    controlSetRows: [[{
      name: 'phone_column',
      config: {
        type: 'SelectControl',
        label: t('Phone column'),
        description: t('Column used to filter the dashboard'),
        validators: [validateNonEmpty],
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
        label: t('Label column'),
        description: t('Column displayed on the button'),
        validators: [validateNonEmpty],
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
    label: t('Chart options'),
    expanded: true,
    controlSetRows: [[{
      name: 'header_text',
      config: {
        type: 'TextControl',
        default: 'Phone Filter Buttons',
        renderTrigger: true,
        label: t('Header Text'),
        description: t('Text shown above the buttons')
      }
    }]]
  }]
};
export default config;