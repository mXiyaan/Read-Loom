"use client"

import * as React from "react"
import { format, subDays, startOfYear, endOfYear, eachDayOfInterval, getDay, subYears, addDays, eachMonthOfInterval } from 'date-fns'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function RecentActivity() {
  const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear().toString())
  const years = Array.from({ length: 5 }, (_, i) => (new Date().getFullYear() - i).toString())

  const generateActivityData = (year: number) => {
    const endDate = new Date(year, 11, 31)
    const startDate = subYears(endDate, 1)
    const days = eachDayOfInterval({ start: startDate, end: endDate })

    return days.map(day => ({
      date: format(day, 'yyyy-MM-dd'),
      count: Math.floor(Math.random() * 5)
    }))
  }

  const [activityData, setActivityData] = React.useState(generateActivityData(parseInt(selectedYear)))

  React.useEffect(() => {
    setActivityData(generateActivityData(parseInt(selectedYear)))
  }, [selectedYear])

  const currentStreak = 7
  const currentStreakStart = subDays(new Date(), currentStreak - 1)
  const currentStreakEnd = new Date()

  const longestStreak = 14
  const longestStreakStart = new Date(parseInt(selectedYear), 2, 1) // Example date
  const longestStreakEnd = new Date(parseInt(selectedYear), 2, 14) // Example date

  const getColor = (count: number) => {
    if (count === 0) return "bg-gray-100"
    if (count < 2) return "bg-green-200"
    if (count < 4) return "bg-green-400"
    return "bg-green-600"
  }

  const weekDays = ['', 'Mon', '', 'Wed', '', 'Fri', '']

  const getWeeksInYear = (year: number) => {
    const firstDay = new Date(year, 0, 1)
    const lastDay = new Date(year, 11, 31)
    const daysInYear = (lastDay.getTime() - firstDay.getTime()) / (1000 * 3600 * 24) + 1
    return Math.ceil((daysInYear + getDay(firstDay)) / 7)
  }

  const weeksInYear = getWeeksInYear(parseInt(selectedYear))

  const months = eachMonthOfInterval({
    start: new Date(parseInt(selectedYear), 0, 1),
    end: new Date(parseInt(selectedYear), 11, 31)
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Reading Activity</div>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col">
        <div className="flex text-xs text-muted-foreground mb-1 justify-between">
          {months.map((month, index) => (
            <div key={index} style={{width: '8.33%', textAlign: 'center'}}>
              {format(month, 'MMM')}
            </div>
          ))}
        </div>
        <div className="flex">
          <div className="grid grid-rows-7 grid-flow-col gap-[2px] mr-2">
            {weekDays.map((day, index) => (
              <div key={day} className="text-xs text-muted-foreground h-3 w-3 flex items-center justify-end">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-rows-7 grid-flow-col gap-[2px] flex-grow">
            {Array.from({ length: weeksInYear * 7 }).map((_, index) => {
              const date = addDays(new Date(parseInt(selectedYear), 0, 1), index)
              const dataForDay = activityData.find(d => d.date === format(date, 'yyyy-MM-dd'))
              const count = dataForDay ? dataForDay.count : 0
              return (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        className={`h-3 w-3 rounded-sm ${getColor(count)}`}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{format(date, 'MMM dd, yyyy')}: {count} pages</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="h-3 w-3 rounded-sm bg-gray-100" />
            <div className="h-3 w-3 rounded-sm bg-green-200" />
            <div className="h-3 w-3 rounded-sm bg-green-400" />
            <div className="h-3 w-3 rounded-sm bg-green-600" />
          </div>
          <span>More</span>
        </div>
        <div className="space-x-4">
          <span>
            <span className="font-medium">Current Streak:</span> {currentStreak} days
            ({format(currentStreakStart, 'MMM d')} - {format(currentStreakEnd, 'MMM d')})
          </span>
          <span>
            <span className="font-medium">Longest Streak:</span> {longestStreak} days
            ({format(longestStreakStart, 'MMM d')} - {format(longestStreakEnd, 'MMM d')})
          </span>
        </div>
      </div>
    </div>
  )
}

