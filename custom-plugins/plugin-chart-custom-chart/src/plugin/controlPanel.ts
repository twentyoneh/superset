import { t, validateNonEmpty } from '@superset-ui/core';
import { ControlPanelConfig } from '@superset-ui/chart-controls';

function getColumnChoices(datasource: any, predicate?: (col: any) => boolean) {
  const columns = datasource?.columns ?? [];
  const filtered = predicate ? columns.filter(predicate) : columns;

  return filtered.map((col: any) => [
    col.column_name,
    col.verbose_name || col.column_name,
  ]);
}

const config: ControlPanelConfig = {
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'date_column',
            config: {
              type: 'SelectControl',
              label: t('Date column'),
              description: t('Column with date or truncated day'),
              clearable: false,
              validators: [validateNonEmpty],
              mapStateToProps: ({ datasource }: any) => ({
                choices: getColumnChoices(datasource),
              }),
              renderTrigger: true,
            },
          },
        ],
        [
          {
            name: 'category_column',
            config: {
              type: 'SelectControl',
              label: t('Category column'),
              description: t('Category/event column'),
              clearable: false,
              validators: [validateNonEmpty],
              mapStateToProps: ({ datasource }: any) => ({
                choices: getColumnChoices(datasource),
              }),
              renderTrigger: true,
            },
          },
        ],
        [
          {
            name: 'value_column',
            config: {
              type: 'SelectControl',
              label: t('Value column'),
              description: t('Numeric column to aggregate'),
              clearable: false,
              validators: [validateNonEmpty],
              mapStateToProps: ({ datasource }: any) => ({
                choices: getColumnChoices(datasource),
              }),
              renderTrigger: true,
            },
          },
        ],
        [
          {
            name: 'aggregation',
            config: {
              type: 'SelectControl',
              label: t('Aggregation'),
              default: 'SUM',
              choices: [
                ['SUM', 'SUM'],
                ['AVG', 'AVG'],
                ['MIN', 'MIN'],
                ['MAX', 'MAX'],
              ],
              renderTrigger: true,
            },
          },
        ],
        ['adhoc_filters'],
        ['row_limit'],
      ],
    },
    {
      label: t('Chart options'),
      tabOverride: 'customize',
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'line_color',
            config: {
              type: 'ColorPickerControl',
              label: t('Line color'),
              description: t('Color of the main line'),
              default: { r: 59, g: 130, b: 246, a: 1 },
              renderTrigger: true,
            },
          },
          {
            name: 'area_color',
            config: {
              type: 'ColorPickerControl',
              label: t('Area color'),
              description: t('Color of the filled area'),
              default: { r: 59, g: 130, b: 246, a: 0.15 },
              renderTrigger: true,
            },
          },
        ],
        [
          {
            name: 'show_area',
            config: {
              type: 'CheckboxControl',
              label: t('Show area fill'),
              default: true,
              renderTrigger: true,
            },
          },
          {
            name: 'show_markers',
            config: {
              type: 'CheckboxControl',
              label: t('Show markers'),
              default: false,
              renderTrigger: true,
            },
          },
        ],
        [
          {
            name: 'curve_type',
            config: {
              type: 'SelectControl',
              label: t('Curve type'),
              default: 'monotone',
              choices: [
                ['linear', 'Linear'],
                ['monotone', 'Smooth (monotone)'],
                ['natural', 'Natural'],
                ['basis', 'Basis'],
              ],
              renderTrigger: true,
            },
          },
        ],
      ],
    },
  ],
};

export default config;