"use client"

import * as React from "react"
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const genreData = [
  { name: "Fiction", value: 45 },
  { name: "Non-Fiction", value: 30 },
  { name: "Science Fiction", value: 15 },
  { name: "Mystery", value: 10 },
  { name: "Fantasy", value: 20 },
  { name: "Biography", value: 12 },
]

const timeSpentData = [
  { name: "Fiction", hours: 120 },
  { name: "Non-Fiction", hours: 80 },
  { name: "Science Fiction", hours: 40 },
  { name: "Mystery", hours: 25 },
  { name: "Fantasy", hours: 55 },
  { name: "Biography", hours: 30 },
]

const pagesReadData = [
  { name: "Fiction", pages: 3500 },
  { name: "Non-Fiction", pages: 2200 },
  { name: "Science Fiction", pages: 1800 },
  { name: "Mystery", pages: 1200 },
  { name: "Fantasy", pages: 2500 },
  { name: "Biography", pages: 1500 },
]

const fictionNonFictionRatio = [
  { name: "Fiction", value: 80 },
  { name: "Non-Fiction", value: 42 },
]

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))', 'hsl(var(--chart-6))']

const chartConfig: ChartConfig = {
  genre: {
    label: "Genre",
    color: "hsl(var(--chart-1))",
  },
  hours: {
    label: "Hours",
    color: "hsl(var(--chart-2))",
  },
  pages: {
    label: "Pages",
    color: "hsl(var(--chart-3))",
  },
}

export function GenreAnalytics({ className }: { className?: string }) {
  return (
    <Tabs defaultValue="books" className={cn("w-full h-full flex flex-col", className)}>
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="books">Books</TabsTrigger>
        <TabsTrigger value="time">Time Spent</TabsTrigger>
        <TabsTrigger value="pages">Pages Read</TabsTrigger>
        <TabsTrigger value="ratio">Fiction/Non-Fiction</TabsTrigger>
      </TabsList>
      <TabsContent value="books">
        <Card>
          <CardHeader>
            <CardTitle>Number of Books per Genre</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[calc(100%-40px)]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genreData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="time">
        <Card>
          <CardHeader>
            <CardTitle>Time Spent on Different Genres</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[calc(100%-40px)]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeSpentData}>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="hours" fill="var(--color-hours)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="pages">
        <Card>
          <CardHeader>
            <CardTitle>Pages Read by Genre</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[calc(100%-40px)]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pagesReadData}>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="pages" fill="var(--color-pages)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="ratio">
        <Card>
          <CardHeader>
            <CardTitle>Fiction vs Non-Fiction Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[calc(100%-40px)]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fictionNonFictionRatio}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {fictionNonFictionRatio.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

