import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Line,
} from 'recharts';

import {
  BreakdownItem,
  SmoothEventTimelineProps,
  TimelinePoint,
} from './types';

function formatNumber(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value);
}

function BreakdownRow({
  item,
  color,
}: {
  item: BreakdownItem;
  color?: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 6,
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          minWidth: 0,
          flex: 1,
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: color || '#94a3b8',
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          title={item.name}
        >
          {item.name}
        </span>
      </div>

      <strong>{formatNumber(item.value)}</strong>
    </div>
  );
}

function CustomTooltip({
  active,
  payload,
  label,
  colorMap,
}: {
  active?: boolean;
  payload?: readonly any[];
  label?: string | number;
  colorMap: Record<string, string>;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const point = payload[0]?.payload as TimelinePoint | undefined;
  if (!point) {
    return null;
  }

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #d9d9d9',
        borderRadius: 8,
        padding: 12,
        minWidth: 240,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
      }}
    >
      <div
        style={{
          fontWeight: 700,
          marginBottom: 10,
        }}
      >
        {String(label ?? '')}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 10,
          paddingBottom: 10,
          borderBottom: '1px solid #eee',
        }}
      >
        <span>Всего</span>
        <strong>{formatNumber(point.total)}</strong>
      </div>

      <div>
        {point.breakdown.map(item => (
          <BreakdownRow
            key={item.name}
            item={item}
            color={colorMap[item.name]}
          />
        ))}
      </div>
    </div>
  );
}

export default function PluginChartCustomChart({
  width,
  height,
  data,
  colorMap,
  showArea,
  showMarkers,
  curveType,
  lineColor,
  areaColor,
}: SmoothEventTimelineProps) {
  if (!data.length) {
    return (
      <div
        style={{
          width,
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#64748b',
          fontSize: 14,
        }}
      >
        Нет данных
      </div>
    );
  }

  return (
    <div style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 12, right: 18, bottom: 8, left: 6 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" minTickGap={24} tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip
            content={({ active, payload, label }) => (
              <CustomTooltip
                active={active}
                payload={payload}
                label={label}
                colorMap={colorMap}
              />
            )}
          />

          {showArea && (
            <Area
              type={curveType}
              dataKey="total"
              stroke="none"
              fill={areaColor}
              isAnimationActive
            />
          )}

          <Line
            type={curveType}
            dataKey="total"
            stroke={lineColor}
            strokeWidth={2}
            dot={
              showMarkers
                ? {
                    r: 3,
                    fill: lineColor,
                    strokeWidth: 0,
                  }
                : false
            }
            activeDot={{
              r: 5,
              fill: lineColor,
              strokeWidth: 0,
            }}
            connectNulls
            isAnimationActive
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}