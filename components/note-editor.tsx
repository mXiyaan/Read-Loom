"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface NoteEditorProps {
  noteId: string
  onSave: () => void
  onCancel: () => void
}

export function NoteEditor({ noteId, onSave, onCancel }: NoteEditorProps) {
  const [note, setNote] = useState({
    title: '',
    content: '',
    tags: '',
  })

  useEffect(() => {
    if (noteId !== 'new') {
      // In a real app, fetch the note data from an API
      // For now, we'll use mock data
      setNote({
        title: 'Example Note',
        content: 'This is an example note content.',
        tags: 'example,mock',
      })
    }
  }, [noteId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, send the note data to an API
    console.log('Saving note:', note)
    onSave()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{noteId === 'new' ? 'Create New Note' : 'Edit Note'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={note.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              value={note.content}
              onChange={handleChange}
              required
              rows={5}
            />
          </div>
          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              name="tags"
              value={note.tags}
              onChange={handleChange}
              placeholder="e.g., character,plot,theme"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

