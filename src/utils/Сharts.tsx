import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type casesTimelineType = {
  cases: number;
  date: string;
}[];
type deathsTimelineType = {
  deaths: number;
  date: string;
}[];
type recoveredTimelineType = {
  recovered: number;
  date: string;
}[];

export type AreaProps = {
  data: casesTimelineType | deathsTimelineType | recoveredTimelineType;
  color: string;
  dataKey: string;
  width?: string;
  height?: string;
  margin?: { top: number; right: number; bottom: number; left: number };
};

function fillChart({
  data,
  dataKey,
  color,
  width = '97%',
  height = '18%',
  margin = { top: 10, right: 10, bottom: 20, left: 25 },
}: AreaProps): JSX.Element {
  const fillColor = `url(#${dataKey})`;
  return (
    <ResponsiveContainer width={width} height={height}>
      <AreaChart width={500} height={300} data={data} margin={margin}>
        <defs>
          <linearGradient id={dataKey} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey={dataKey} stroke={color} fillOpacity={1} fill={fillColor} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export const Chart = React.memo(fillChart);
