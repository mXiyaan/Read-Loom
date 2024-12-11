import { Progress } from "@/components/ui/progress"

export function ReadingStatistics() {
  const stats = [
    { label: "Average Reading Speed", value: "300 words/min" },
    { label: "Total Reading Time", value: "127 hours" },
    { label: "Longest Reading Streak", value: "14 days" },
    { label: "Current Streak", value: "5 days" },
  ]

  return (
    <div className="space-y-4">
      {stats.map((stat, index) => (
        <div key={index}>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">{stat.label}</span>
            <span className="text-sm font-medium">{stat.value}</span>
          </div>
          <Progress value={Math.random() * 100} />
        </div>
      ))}
    </div>
  )
}

