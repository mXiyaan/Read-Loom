"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Note {
  id: string
  title: string
  content: string
  bookTitle: string
  tags: string[]
  isFavorite: boolean
  createdAt: string
}

interface NoteDetailProps {
  noteId: string | null
  onClose: () => void
}

export function NoteDetail({ noteId, onClose }: NoteDetailProps) {
  const [note, setNote] = useState<Note | null>(null)
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState('');

  useEffect(() => {
    if (noteId) {
      // In a real app, fetch the note data from an API
      // For this example, we'll use mock data
      const mockNote: Note = {
        id: noteId,
        title: 'Example Note',
        content: `This is an example note content. It would contain the full text of the note, which could be quite long. In a real application, this would be fetched from a database or API based on the noteId.

        The content could span multiple paragraphs and include detailed analysis, quotes, or personal reflections on the book being discussed.

        For instance, if this were a note about "To Kill a Mockingbird", it might delve into themes of racial injustice, the loss of innocence, and the nature of good and evil. It could discuss key characters like Atticus Finch, Scout, and Boo Radley, and how they embody these themes.

        The note might also include personal reactions to the book, questions for further exploration, or connections to other works of literature or historical events.`,
        bookTitle: 'To Kill a Mockingbird',
        tags: ['character analysis', 'themes', 'social justice'],
        isFavorite: true,
        createdAt: '2023-06-15',
      }
      setNote(mockNote)
      setEditableContent(mockNote.content);
    } else {
      setNote(null)
    }
  }, [noteId])

  const execCommand = (command: string) => {
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection) {
        document.execCommand(command, false, null);
        setEditableContent(note?.content || '');
      }
    }
  };


  if (!note) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">Select a note to view details</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {note.title}
          {note.isFavorite && <Star className="fill-yellow-400" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing && (
          <div className="flex gap-2 mb-4">
            <Button onClick={() => execCommand('bold')} variant="outline" size="sm">Bold</Button>
            <Button onClick={() => execCommand('italic')} variant="outline" size="sm">Italic</Button>
            <Button onClick={() => execCommand('underline')} variant="outline" size="sm">Underline</Button>
          </div>
        )}
        {isEditing ? (
          <div contentEditable={true} className="border border-gray-300 p-2 rounded" >{editableContent}</div>
        ) : (
          <p className="text-sm mb-4">{note.content}</p>
        )}
        <p className="text-sm text-muted-foreground mb-2">Book: {note.bookTitle}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.map(tag => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  )
}

