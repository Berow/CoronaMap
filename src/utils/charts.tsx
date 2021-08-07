import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type HistoryDay = {
  cases: number;
  date: string;
};

type Timeline = {
  timeline: HistoryDay[];
};

export function Chart({ timeline }: Timeline): JSX.Element {
  return (
    <ResponsiveContainer width="100%" height="40%">
      <AreaChart
        width={500}
        height={400}
        data={timeline}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="cases" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// export const MemorizedChart = React.memo(Chart);
