import { Area } from '@ant-design/plots';
import { CHART_TOKENS, NO_ENTRY_ANIMATION } from '@/constants/app';
import type { SignupPoint } from '@/types';

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

/** Single series, so no legend — the card title names it. */
export default function SignupsChart({ data }: { data: SignupPoint[] }) {
  return (
    <Area
      {...NO_ENTRY_ANIMATION}
      data={data}
      xField="month"
      yField="signups"
      height={260}
      legend={false}
      style={{ fill: CHART_TOKENS.series, fillOpacity: CHART_TOKENS.seriesFillOpacity }}
      line={{
        style: {
          stroke: CHART_TOKENS.series,
          lineWidth: 2,
          lineCap: 'round',
          lineJoin: 'round',
        },
      }}
      axis={AXIS}
      scale={{ y: { nice: true } }}
    />
  );
}
