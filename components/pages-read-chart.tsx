"use client"

import * as React from "react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const data = [
  {
    name: "Jan",
    total: 100,
  },
  {
    name: "Feb",
    total: 120,
  },
  {
    name: "Mar",
    total: 150,
  },
  {
    name: "Apr",
    total: 80,
  },
  {
    name: "May",
    total: 200,
  },
  {
    name: "Jun",
    total: 180,
  },
  {
    name: "Jul",
    total: 220,
  },
]

export function PagesReadChart() {
  const [timeRange, setTimeRange] = React.useState("monthly")

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Pages Read</h3>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#adfa1d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#adfa1d" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#adfa1d"
              strokeWidth={2}
              dot={false}
              fill="url(#colorTotal)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

