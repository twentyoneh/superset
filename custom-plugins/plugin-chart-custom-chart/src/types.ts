export type AggregationType = 'SUM' | 'AVG' | 'MIN' | 'MAX';

export type CurveType = 'linear' | 'monotone' | 'natural' | 'basis';

export type BreakdownItem = {
  name: string;
  value: number;
};

export type TimelinePoint = {
  day: string;
  total: number;
  breakdown: BreakdownItem[];
};

export type SmoothEventTimelineProps = {
  width: number;
  height: number;
  data: TimelinePoint[];
  colorMap: Record<string, string>;
  showArea: boolean;
  showMarkers: boolean;
  curveType: CurveType;
};

export type SmoothEventTimelineFormData = {
  date_column: string;
  category_column: string;
  value_column: string;
  aggregation: AggregationType;
  show_area?: boolean;
  show_markers?: boolean;
  curve_type?: CurveType;
};