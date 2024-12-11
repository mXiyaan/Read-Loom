import { Progress } from "@/components/ui/progress"

// This would typically come from your global state management or API
const goals = [
  { name: "Books Read", type: 'volume', current: 15, target: 30, timeframe: "this year", unit: "books" },
  { name: "Read Diverse Genres", type: 'diversity', completed: 2, total: 4, timeframe: "this year" },
  { name: "Write Book Summaries", type: 'comprehension', completed: 3, total: 5, timeframe: "this month" },
  { name: "Daily Reading Habit", type: 'habit', completed: 15, total: 30, timeframe: "this month" },
  { name: "Career Development Books", type: 'personal', completed: 2, total: 5, timeframe: "this year" },
]

export function ReadingGoals() {
  return (
    <div className="space-y-4">
      {goals.map((goal, index) => (
        <div key={index}>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">{goal.name}</span>
            <span className="text-sm font-medium">
              {goal.completed} / {goal.total} {goal.unit}
            </span>
          </div>
          <Progress value={(goal.completed / goal.total) * 100} />
          <p className="text-xs text-muted-foreground mt-1">
            {goal.type.charAt(0).toUpperCase() + goal.type.slice(1)} goal for {goal.timeframe}
          </p>
        </div>
      ))}
    </div>
  )
}

