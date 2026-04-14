import { CurveType } from '../types';

const METRIC_LABEL = '__value__';

const DEFAULT_PALETTE = [
  '#2563eb',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#06b6d4',
  '#84cc16',
  '#f97316',
  '#ec4899',
  '#64748b',
];

function rgbaToCss(
  color?: { r?: number; g?: number; b?: number; a?: number } | string | null,
  fallback = 'rgba(59,130,246,1)',
) {
  if (!color) return fallback;
  if (typeof color === 'string') return color;

  const r = color.r ?? 59;
  const g = color.g ?? 130;
  const b = color.b ?? 246;
  const a = color.a ?? 1;

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function toNumber(value: unknown): number {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function toDayString(value: unknown): string {
  if (value == null) {
    return '';
  }

  // timestamp в миллисекундах
  if (typeof value === 'number') {
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) {
      return d.toISOString().slice(0, 10);
    }
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  const raw = String(value).trim();
  if (!raw) {
    return '';
  }

  // строка вида 2026-04-03 00:00:00
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
    return raw.slice(0, 10);
  }

  // fallback
  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10);
  }

  return raw;
}

function buildColorMap(categories: string[]) {
  return categories.reduce<Record<string, string>>((acc, category, index) => {
    acc[category] = DEFAULT_PALETTE[index % DEFAULT_PALETTE.length];
    return acc;
  }, {});
}

export default function transformProps(chartProps: any) {
  const { width, height, queriesData, formData } = chartProps;

  const rows = (queriesData?.[0]?.data ?? []) as Record<string, unknown>[];

  // В transformProps у вас formData приходит в camelCase
  const dateColumn = formData.dateColumn || formData.date_column;
  const categoryColumn = formData.categoryColumn || formData.category_column;
  const valueColumn = formData.valueColumn || formData.value_column;

  console.log('transformProps rows:', rows);
  console.log('transformProps first row:', rows[0]);
  console.log('transformProps formData:', formData);
  console.log('dateColumn:', dateColumn);
  console.log('categoryColumn:', categoryColumn);
  console.log('valueColumn:', valueColumn);

  if (!rows.length || !dateColumn || !categoryColumn) {
    return {
      width,
      height,
      data: [],
      colorMap: {},
      showArea: Boolean(formData.showArea ?? formData.show_area ?? true),
      showMarkers: Boolean(formData.showMarkers ?? formData.show_markers ?? false),
      curveType: (formData.curveType || formData.curve_type || 'monotone') as CurveType,
    };
  }

  const firstRow = rows[0] ?? {};

  const resolvedMetricKey =
    METRIC_LABEL in firstRow
      ? METRIC_LABEL
      : valueColumn && valueColumn in firstRow
        ? valueColumn
        : Object.keys(firstRow).find(
            key =>
              key !== dateColumn &&
              key !== categoryColumn &&
              typeof firstRow[key] === 'number',
          ) || METRIC_LABEL;

  console.log('resolvedMetricKey:', resolvedMetricKey);

  const grouped = new Map<
    string,
    {
      day: string;
      total: number;
      breakdownMap: Map<string, number>;
    }
  >();

  const categories = new Set<string>();

  rows.forEach(row => {
    const rawDay = row[dateColumn];
    const rawCategory = row[categoryColumn];
    const rawValue = row[resolvedMetricKey];

    const day = toDayString(rawDay);
    const category = String(rawCategory ?? 'Unknown');
    const value = toNumber(rawValue);

    if (!day) {
      return;
    }

    categories.add(category);

    if (!grouped.has(day)) {
      grouped.set(day, {
        day,
        total: 0,
        breakdownMap: new Map<string, number>(),
      });
    }

    const current = grouped.get(day)!;
    current.total += value;
    current.breakdownMap.set(
      category,
      (current.breakdownMap.get(category) ?? 0) + value,
    );
  });

  const categoryList = Array.from(categories).sort((a, b) =>
    a.localeCompare(b, 'ru'),
  );

  const colorMap = buildColorMap(categoryList);

  const data = Array.from(grouped.values())
    .map(item => ({
      day: item.day,
      total: item.total,
      breakdown: Array.from(item.breakdownMap.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value),
    }))
    .sort((a, b) => a.day.localeCompare(b.day));

  console.log('final chart data:', data);

  return {
    width,
    height,
    data,
    colorMap,
    showArea: Boolean(formData.showArea ?? formData.show_area ?? true),
    showMarkers: Boolean(formData.showMarkers ?? formData.show_markers ?? false),
    curveType: (formData.curveType || formData.curve_type || 'monotone') as CurveType,
    lineColor: rgbaToCss(formData.lineColor ?? formData.line_color, 'rgba(59,130,246,1)'),
    areaColor: rgbaToCss(formData.areaColor ?? formData.area_color, 'rgba(59,130,246,0.15)'),
  };
}