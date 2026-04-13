import { ChartMetadata, ChartPlugin } from '@superset-ui/core';

import controlPanel from './controlPanel';
import buildQuery from './buildQuery';
import transformProps from './transformProps';
import PluginChartCustomChart from '../PluginChartCustomChart';

export default class PluginChartCustomChartPlugin extends ChartPlugin {
  constructor() {
    super({
      buildQuery,
      controlPanel,
      transformProps,
      Chart: PluginChartCustomChart,
      metadata: new ChartMetadata({
        category: 'Trend',
        description:
          'Smooth line chart by day with a detailed breakdown tooltip.',
        name: 'Custom Smooth Event Timeline',
        thumbnail: '',
        tags: ['line', 'smooth', 'timeline', 'tooltip'],
      }),
    });
  }
}