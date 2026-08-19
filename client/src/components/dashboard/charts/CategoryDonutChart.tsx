"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#a78bfa",
  "#c4b5fd",
  "#22c55e",
  "#f97316",
  "#3b82f6",
  "#ef4444",
];

interface DataPoint {
  name: string;
  value: number;
}

interface Props {
  data: DataPoint[];
}

export default function CategoryDonutChart({ data }: Props) {
  return (
    <div className="bg-card rounded-xl p-4 sm:p-6 border border-card-border">
      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
        Gastos por categoria
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
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
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {data.map((entry, index) => (
          <div
            key={entry.name}
            className="flex items-center gap-1.5 text-xs text-muted"
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            {entry.name}
          </div>
        ))}
      </div>
    </div>
  );
}
