"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusCircle, MinusCircle, Trash2 } from 'lucide-react'

interface Goal {
  id: string
  name: string
  target: number
  current: number
  timeframe: string
  unit: string
}

const timeframes = [
  { value: "day", label: "Daily" },
  { value: "week", label: "Weekly" },
  { value: "month", label: "Monthly" },
  { value: "year", label: "Yearly" },
]

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', name: "Read Books", target: 30, current: 15, timeframe: "year", unit: "books" },
    { id: '2', name: "Reading Time", target: 60, current: 45, timeframe: "day", unit: "minutes" },
    { id: '3', name: "Explore Genres", target: 5, current: 2, timeframe: "month", unit: "genres" },
  ])
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({ timeframe: 'month' })

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault()
    if (newGoal.name && newGoal.target && newGoal.timeframe && newGoal.unit) {
      setGoals([...goals, {
        id: Date.now().toString(),
        name: newGoal.name,
        target: parseInt(newGoal.target.toString()),
        current: 0,
        timeframe: newGoal.timeframe,
        unit: newGoal.unit,
      } as Goal])
      setNewGoal({ timeframe: 'month' })
    }
  }

  const handleUpdateGoal = (id: string, current: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, current: Math.min(Math.max(current, 0), goal.target) } : goal
    ))
  }

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id))
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Reading Goals</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddGoal} className="space-y-4">
            <Input
              placeholder="Goal Name (e.g., Read Books, Reading Time)"
              value={newGoal.name || ''}
              onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
            />
            <div className="flex gap-4">
              <Input
                type="number"
                placeholder="Target"
                value={newGoal.target || ''}
                onChange={(e) => setNewGoal({...newGoal, target: parseInt(e.target.value)})}
                className="w-24"
              />
              <Input
                placeholder="Unit (e.g., books, minutes, pages)"
                value={newGoal.unit || ''}
                onChange={(e) => setNewGoal({...newGoal, unit: e.target.value})}
                className="flex-grow"
              />
              <Select
                value={newGoal.timeframe}
                onValueChange={(value) => setNewGoal({...newGoal, timeframe: value})}
              >
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  {timeframes.map((tf) => (
                    <SelectItem key={tf.value} value={tf.value}>
                      {tf.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Add Goal</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <GoalCard 
            key={goal.id} 
            goal={goal} 
            onUpdate={handleUpdateGoal} 
            onDelete={handleDeleteGoal} 
          />
        ))}
      </div>
    </div>
  )
}

function GoalCard({ goal, onUpdate, onDelete }: { 
  goal: Goal, 
  onUpdate: (id: string, current: number) => void, 
  onDelete: (id: string) => void 
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{goal.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress: {goal.current} / {goal.target} {goal.unit}</span>
            <span>{timeframes.find(tf => tf.value === goal.timeframe)?.label}</span>
          </div>
          <Progress value={(goal.current / goal.target) * 100} className="h-2" />
          <div className="flex justify-between items-center mt-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => onUpdate(goal.id, goal.current - 1)}
            >
              <MinusCircle className="h-4 w-4" />
            </Button>
            <span className="text-2xl font-bold">{goal.current}</span>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => onUpdate(goal.id, goal.current + 1)}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            variant="destructive" 
            size="sm"
            className="w-full mt-4"
            onClick={() => onDelete(goal.id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Goal
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

