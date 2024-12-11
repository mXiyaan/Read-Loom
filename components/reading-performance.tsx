import { useState, useEffect } from 'react'
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ReadingPerformance() {
  const [timeRange, setTimeRange] = useState('monthly')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [performanceData, setPerformanceData] = useState({
    avgTimePerSession: 45,
    totalTimeRead: 120,
    readingSpeed: 250,
    avgPagesPerSession: 20,
    totalPagesRead: 2500,
    booksStartedVsCompleted: 85,
    notesPerBook: 15,
    wordsLearnedPerBook: 8,
    bookReviewsWritten: 42
  })

  useEffect(() => {
    // Simulating data fetch based on selected time range
    const fetchData = () => {
      // In a real application, you would fetch data from an API here
      // For this example, we'll just simulate different data for each time range
      const newData = {
        daily: {
          avgTimePerSession: 30,
          totalTimeRead: 2,
          readingSpeed: 200,
          avgPagesPerSession: 15,
          totalPagesRead: 30,
          booksStartedVsCompleted: 10,
          notesPerBook: 5,
          wordsLearnedPerBook: 3,
          bookReviewsWritten: 0
        },
        weekly: {
          avgTimePerSession: 40,
          totalTimeRead: 14,
          readingSpeed: 220,
          avgPagesPerSession: 18,
          totalPagesRead: 126,
          booksStartedVsCompleted: 30,
          notesPerBook: 10,
          wordsLearnedPerBook: 5,
          bookReviewsWritten: 1
        },
        monthly: {
          avgTimePerSession: 45,
          totalTimeRead: 60,
          readingSpeed: 250,
          avgPagesPerSession: 20,
          totalPagesRead: 600,
          booksStartedVsCompleted: 70,
          notesPerBook: 15,
          wordsLearnedPerBook: 8,
          bookReviewsWritten: 2
        },
        yearly: {
          avgTimePerSession: 50,
          totalTimeRead: 730,
          readingSpeed: 280,
          avgPagesPerSession: 25,
          totalPagesRead: 9125,
          booksStartedVsCompleted: 90,
          notesPerBook: 20,
          wordsLearnedPerBook: 12,
          bookReviewsWritten: 24
        },
        custom: {
          avgTimePerSession: 35,
          totalTimeRead: 100,
          readingSpeed: 230,
          avgPagesPerSession: 17,
          totalPagesRead: 1700,
          booksStartedVsCompleted: 50,
          notesPerBook: 12,
          wordsLearnedPerBook: 6,
          bookReviewsWritten: 5
        }
      }

      setPerformanceData(newData[timeRange as keyof typeof newData])
    }

    fetchData()
  }, [timeRange, startDate, endDate])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Reading Performance</h3>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {timeRange === 'custom' && (
        <div className="flex space-x-2">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Start Date"
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="End Date"
          />
          <Button onClick={() => console.log('Custom date range applied')}>Apply</Button>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-medium text-muted-foreground">Avg. Time per Session</div>
          <div className="text-2xl font-bold">{performanceData.avgTimePerSession} mins</div>
        </div>
        <div>
          <div className="text-sm font-medium text-muted-foreground">Total Time Read</div>
          <div className="text-2xl font-bold">{performanceData.totalTimeRead} hours</div>
        </div>
        <div>
          <div className="text-sm font-medium text-muted-foreground">Reading Speed</div>
          <div className="text-2xl font-bold">{performanceData.readingSpeed} wpm</div>
        </div>
        <div>
          <div className="text-sm font-medium text-muted-foreground">Avg. Pages per Session</div>
          <div className="text-2xl font-bold">{performanceData.avgPagesPerSession}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-muted-foreground">Total Pages Read</div>
          <div className="text-2xl font-bold">{performanceData.totalPagesRead}</div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Books Started vs. Completed</span>
          <span className="font-medium">{performanceData.booksStartedVsCompleted}%</span>
        </div>
        <Progress value={performanceData.booksStartedVsCompleted} className="h-2" />
      </div>
      <div className="space-y-4">
        <div>
          <div className="text-sm font-medium text-muted-foreground">Notes/Annotations per Book</div>
          <div className="text-xl font-bold">{performanceData.notesPerBook}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-muted-foreground">Words Learned per Book</div>
          <div className="text-xl font-bold">{performanceData.wordsLearnedPerBook}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-muted-foreground">Book Reviews Written</div>
          <div className="text-xl font-bold">{performanceData.bookReviewsWritten}</div>
        </div>
      </div>
    </div>
  )
}

