"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Note {
  id: string
  date: string
  heading: string
  excerpt: string
}

export function BookNotes({ bookId }: { bookId: string }) {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    // In a real app, you would fetch notes from your backend here
    // For now, we'll use mock data
    const mockNotes: Note[] = [
      {
        id: '1',
        date: '2023-06-15',
        heading: 'Chapter 1 Thoughts',
        excerpt: 'The opening scene really sets the tone for the entire book...'
      },
      {
        id: '2',
        date: '2023-06-16',
        heading: 'Character Development',
        excerpt: 'I\'m impressed with how the author has developed the protagonist...'
      },
      // Add more mock notes as needed
    ]
    setNotes(mockNotes)
  }, [bookId])

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Existing Notes</h3>
      {notes.map((note) => (
        <Card key={note.id}>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{note.heading}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{note.date}</p>
            <p className="text-sm">{note.excerpt}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

