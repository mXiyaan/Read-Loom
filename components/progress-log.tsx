"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { format } from 'date-fns'
import { Pencil, Trash2, Save, X } from 'lucide-react'

interface ProgressEntry {
  id: string
  date: string
  pagesRead: number
  timeSpent: number
  startPage: number
  endPage: number
}

export function ProgressLog({ bookId }: { bookId: string }) {
  const [entries, setEntries] = useState<ProgressEntry[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<ProgressEntry | null>(null)

  useEffect(() => {
    // In a real app, you would fetch the progress log from your backend here
    // For now, we'll use mock data
    const mockEntries: ProgressEntry[] = [
      {
        id: '1',
        date: '2023-06-15',
        pagesRead: 20,
        timeSpent: 1800, // 30 minutes
        startPage: 1,
        endPage: 20,
      },
      {
        id: '2',
        date: '2023-06-16',
        pagesRead: 15,
        timeSpent: 1500, // 25 minutes
        startPage: 21,
        endPage: 35,
      },
    ]
    setEntries(mockEntries)
  }, [bookId])

  const handleEdit = (entry: ProgressEntry) => {
    setEditingId(entry.id)
    setEditForm(entry)
  }

  const handleSave = () => {
    if (editForm) {
      setEntries(entries.map(entry => entry.id === editForm.id ? editForm : entry))
      setEditingId(null)
      setEditForm(null)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const handleDelete = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id))
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {entries.map((entry) => (
          <li key={entry.id} className="flex justify-between items-center text-sm">
            {editingId === entry.id ? (
              <>
                <Input
                  type="date"
                  value={editForm?.date}
                  onChange={(e) => setEditForm({ ...editForm!, date: e.target.value })}
                  className="w-32"
                />
                <Input
                  type="number"
                  value={editForm?.startPage}
                  onChange={(e) => setEditForm({ ...editForm!, startPage: parseInt(e.target.value) })}
                  className="w-20"
                />
                <Input
                  type="number"
                  value={editForm?.endPage}
                  onChange={(e) => setEditForm({ ...editForm!, endPage: parseInt(e.target.value) })}
                  className="w-20"
                />
                <Input
                  type="number"
                  value={Math.floor(editForm!.timeSpent / 60)}
                  onChange={(e) => setEditForm({ ...editForm!, timeSpent: parseInt(e.target.value) * 60 })}
                  className="w-20"
                />
                <div>
                  <Button onClick={handleSave} size="sm" className="mr-2">
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button onClick={handleCancel} size="sm" variant="outline">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <span>{format(new Date(entry.date), 'MMM dd, yyyy')}</span>
                <span>
                  {entry.startPage} - {entry.endPage} ({entry.pagesRead} pages)
                </span>
                <span>{formatDuration(entry.timeSpent)}</span>
                <div>
                  <Button onClick={() => handleEdit(entry)} size="sm" variant="ghost" className="mr-2">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => handleDelete(entry.id)} size="sm" variant="ghost" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

