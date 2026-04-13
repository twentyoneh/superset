import { buildQueryContext } from '@superset-ui/core';

const METRIC_LABEL = '__value__';

export default function buildQuery(formData: any) {
  const dateColumn = formData.date_column || formData.dateColumn;
  const categoryColumn = formData.category_column || formData.categoryColumn;
  const valueColumn = formData.value_column || formData.valueColumn;
  const aggregation = formData.aggregation || 'SUM';

  console.log('=== BUILDQUERY V2 ===');
  console.log('dateColumn =', dateColumn);
  console.log('categoryColumn =', categoryColumn);
  console.log('valueColumn =', valueColumn);

  const metric = {
    expressionType: 'SIMPLE',
    aggregate: aggregation,
    column: {
      column_name: valueColumn,
    },
    hasCustomLabel: true,
    label: METRIC_LABEL,
  };

  return buildQueryContext(formData, (baseQueryObject: any) => [
    {
      ...baseQueryObject,
      columns: [dateColumn, categoryColumn],
      metrics: [metric],
    },
  ]);
}