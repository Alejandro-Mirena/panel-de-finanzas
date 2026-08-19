"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  month: string;
  ingresos: number;
  gastos: number;
}

interface Props {
  data: DataPoint[];
}

export default function MonthlyTrendChart({ data }: Props) {
  return (
    <div className="bg-card rounded-xl p-4 sm:p-6 border border-card-border">
      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
        Tendencia mensual
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
            <XAxis dataKey="month" stroke="#8888aa" fontSize={12} />
            <YAxis stroke="#8888aa" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a2e",
                border: "1px solid #2a2a4a",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: any) => [
                `$${Number(value).toLocaleString()}`,
                "",
              ]}
            />
            <Line
              type="monotone"
              dataKey="ingresos"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="gastos"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-4 mt-3">
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          Ingresos
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          Gastos
        </div>
      </div>
    </div>
  );
}
