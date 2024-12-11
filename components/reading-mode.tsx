"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlayCircle, PauseCircle, StopCircle, Save, Timer, Clock, AlarmClock } from 'lucide-react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ReadingModeProps {
  bookId: string
  totalPages: number
  onSaveSession: (session: ReadingSession) => void
}

interface ReadingSession {
  bookId: string
  duration: number
  startPage: number
  endPage: number
  date: string
}

export function ReadingMode({ bookId, totalPages, onSaveSession }: ReadingModeProps) {
  const [isReading, setIsReading] = useState(false)
  const [time, setTime] = useState(0)
  const [startPage, setStartPage] = useState('')
  const [endPage, setEndPage] = useState('')
  const [timerMode, setTimerMode] = useState<'stopwatch' | 'manual' | 'countdown'>('stopwatch')
  const [manualStartTime, setManualStartTime] = useState('')
  const [manualEndTime, setManualEndTime] = useState('')
  const [countdownDuration, setCountdownDuration] = useState(30)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isReading) {
      if (timerMode === 'stopwatch') {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime + 1)
        }, 1000)
      } else if (timerMode === 'countdown') {
        interval = setInterval(() => {
          setTime((prevTime) => {
            if (prevTime <= 0) {
              setIsReading(false)
              return 0
            }
            return prevTime - 1
          })
        }, 1000)
      }
    } else if (interval) {
      clearInterval(interval)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isReading, timerMode])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleStartStop = () => {
    setIsReading(!isReading)
    if (!isReading && timerMode === 'countdown') {
      setTime(countdownDuration * 60)
    }
  }

  const handleReset = () => {
    setIsReading(false)
    setTime(timerMode === 'countdown' ? countdownDuration * 60 : 0)
    setStartPage('')
    setEndPage('')
    setManualStartTime('')
    setManualEndTime('')
  }

  const handleSave = () => {
    let duration = time
    if (timerMode === 'manual' && manualStartTime && manualEndTime) {
      const start = new Date(`1970-01-01T${manualStartTime}:00`)
      const end = new Date(`1970-01-01T${manualEndTime}:00`)
      duration = (end.getTime() - start.getTime()) / 1000
    }

    const session: ReadingSession = {
      bookId,
      duration,
      startPage: parseInt(startPage),
      endPage: parseInt(endPage),
      date: new Date().toISOString(),
    }

    onSaveSession(session)
    handleReset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reading Mode</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-center space-x-4 mb-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={timerMode === 'stopwatch' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setTimerMode('stopwatch')}
                  >
                    <Timer className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Stopwatch Mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={timerMode === 'countdown' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setTimerMode('countdown')}
                  >
                    <AlarmClock className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Countdown Mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={timerMode === 'manual' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setTimerMode('manual')}
                  >
                    <Clock className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Manual Time Input</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {timerMode === 'stopwatch' ? (
            <div className="space-y-4">
              <div className="text-4xl font-bold text-center">{formatTime(time)}</div>
              <div className="flex justify-center space-x-2">
                <Button onClick={handleStartStop}>
                  {isReading ? <PauseCircle className="mr-2 h-4 w-4" /> : <PlayCircle className="mr-2 h-4 w-4" />}
                  {isReading ? 'Pause' : 'Start'}
                </Button>
                <Button onClick={handleReset} variant="outline">
                  <StopCircle className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>
          ) : (
            <>
              {timerMode === 'manual' && (
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      type="time"
                      value={manualStartTime}
                      onChange={(e) => setManualStartTime(e.target.value)}
                      placeholder="Start Time"
                    />
                    <Input
                      type="time"
                      value={manualEndTime}
                      onChange={(e) => setManualEndTime(e.target.value)}
                      placeholder="End Time"
                    />
                  </div>
                </div>
              )}
              {timerMode === 'countdown' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Input
                      type="number"
                      value={countdownDuration}
                      onChange={(e) => setCountdownDuration(Number(e.target.value))}
                      className="w-20"
                      min={1}
                    />
                    <span>minutes</span>
                  </div>
                  <div className="text-4xl font-bold text-center">{formatTime(time)}</div>
                  <div className="flex justify-center space-x-2">
                    <Button onClick={handleStartStop}>
                      {isReading ? <PauseCircle className="mr-2 h-4 w-4" /> : <PlayCircle className="mr-2 h-4 w-4" />}
                      {isReading ? 'Pause' : 'Start'}
                    </Button>
                    <Button onClick={handleReset} variant="outline">
                      <StopCircle className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Start Page"
              value={startPage}
              onChange={(e) => setStartPage(e.target.value)}
              min={1}
              max={totalPages}
            />
            <Input
              type="number"
              placeholder="End Page"
              value={endPage}
              onChange={(e) => setEndPage(e.target.value)}
              min={1}
              max={totalPages}
            />
          </div>
          <Button 
            onClick={handleSave} 
            className="w-full" 
            disabled={
              (timerMode === 'stopwatch' && !time) || 
              (timerMode === 'manual' && (!manualStartTime || !manualEndTime)) || 
              (timerMode === 'countdown' && !countdownDuration) ||
              !startPage || 
              !endPage
            }
          >
            <Save className="mr-2 h-4 w-4" />
            Save Session
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

