import { useState, useEffect } from 'react'

const lessons = [
  { lesson: "The only way to do great work is to love what you do.", book: "Steve Jobs: The Exclusive Biography" },
  { lesson: "It is our choices that show what we truly are, far more than our abilities.", book: "Harry Potter and the Chamber of Secrets" },
  { lesson: "The greatest glory in living lies not in never falling, but in rising every time we fall.", book: "Long Walk to Freedom" },
  { lesson: "Life is what happens to you while you're busy making other plans.", book: "Double Fantasy" },
  { lesson: "The journey of a thousand miles begins with one step.", book: "Tao Te Ching" },
]

export function Lessons() {
  const [lessonOfDay, setLessonOfDay] = useState(lessons[0])

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * lessons.length)
    setLessonOfDay(lessons[randomIndex])
  }, [])

  return (
    <div className="space-y-2">
      <p className="text-sm italic">"{lessonOfDay.lesson}"</p>
      <p className="text-xs text-muted-foreground">From: {lessonOfDay.book}</p>
    </div>
  )
}

