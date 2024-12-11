"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock, FileText, ChevronDown } from 'lucide-react'
import { PagesReadChart } from "@/components/pages-read-chart"
import { RecentActivity } from "@/components/recent-activity"
import { RecentLogs } from "@/components/recent-logs"
import { ReadingPerformance } from "@/components/reading-performance"
import { CurrentlyReading } from "@/components/currently-reading"
import { GenreDistribution } from "@/components/genre-distribution"
import { ReadingGoals } from "@/components/reading-goals"
import { DailyLearning } from "@/components/daily-learning"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">+20 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52,430</div>
            <p className="text-xs text-muted-foreground">+1,824 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">873</div>
            <p className="text-xs text-muted-foreground">+32 from last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentLogs />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Pages Read</CardTitle>
          </CardHeader>
          <CardContent>
            <PagesReadChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reading Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ReadingPerformance />
          </CardContent>
        </Card>
        <DailyLearning />
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Currently Reading</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow p-0 relative">
            <div className="h-[400px] overflow-hidden">
              <ul className="divide-y" id="currently-reading-list">
                <CurrentlyReading />
              </ul>
            </div>
          </CardContent>
          <div className="p-2 flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => {
                const list = document.getElementById('currently-reading-list');
                if (list) {
                  list.scrollTop += 100; // Scroll down by 100 pixels
                }
              }}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reading Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <ReadingGoals />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Genre Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <GenreDistribution />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

