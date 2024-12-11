import { useState, useEffect } from 'react'

const notes = [
  { note: "The only way to do great work is to love what you do.", book: "Steve Jobs: The Exclusive Biography" },
  { note: "It is our choices that show what we truly are, far more than our abilities.", book: "Harry Potter and the Chamber of Secrets" },
  { note: "The greatest glory in living lies not in never falling, but in rising every time we fall.", book: "Long Walk to Freedom" },
  { note: "Life is what happens to you while you're busy making other plans.", book: "Double Fantasy" },
  { note: "The journey of a thousand miles begins with one step.", book: "Tao Te Ching" },
]

export function NoteOfTheDay() {
  const [noteOfDay, setNoteOfDay] = useState(notes[0])

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * notes.length)
    setNoteOfDay(notes[randomIndex])
  }, [])

  return (
    <div className="space-y-2">
      <p className="text-sm italic">"{noteOfDay.note}"</p>
      <p className="text-xs text-muted-foreground">From: {noteOfDay.book}</p>
    </div>
  )
}

