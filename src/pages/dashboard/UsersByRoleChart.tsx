import { Column } from '@ant-design/plots';
import { CHART_TOKENS, NO_ENTRY_ANIMATION } from '@/constants/app';
import type { RoleCount } from '@/types';

const AXIS = {
  x: {
    title: false,
    line: false,
    tick: false,
    grid: false,
    labelFill: CHART_TOKENS.axisLabel,
    labelFontSize: 12,
  },
  y: {
    title: false,
    line: false,
    tick: false,
    gridLineWidth: 1,
    gridStroke: CHART_TOKENS.grid,
    labelFill: CHART_TOKENS.axisLabel,
    labelFontSize: 12,
  },
};

/**
 * One measure split by one dimension, so every column shares one hue — bar height
 * already encodes the count, and spending colour on it would re-encode the same
 * thing. 24px cap keeps the columns from filling the band; the rounded corners are
 * the data end, square at the baseline.
 */
export default function UsersByRoleChart({ data }: { data: RoleCount[] }) {
  return (
    <Column
      {...NO_ENTRY_ANIMATION}
      data={data}
      xField="role"
      yField="count"
      height={260}
      legend={false}
      style={{
        fill: CHART_TOKENS.series,
        maxWidth: 24,
        radiusTopLeft: 4,
        radiusTopRight: 4,
      }}
      label={{
        text: 'count',
        position: 'top',
        dy: -18,
        style: { fill: CHART_TOKENS.axisLabel, fontSize: 12 },
      }}
      axis={AXIS}
      scale={{ y: { nice: true } }}
    />
  );
}
