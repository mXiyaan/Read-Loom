"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Word {
  id: string
  word: string
  meaning: string
  page: number
  date: string
}

export function WordsLearned({ bookId }: { bookId: string }) {
  const [words, setWords] = useState<Word[]>([])
  const [newWord, setNewWord] = useState('')
  const [newMeaning, setNewMeaning] = useState('')
  const [newPage, setNewPage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newWord && newMeaning && newPage) {
      const newId = Date.now().toString() // Generate a unique ID
      setWords([...words, { 
        id: newId,
        word: newWord, 
        meaning: newMeaning, 
        page: parseInt(newPage), 
        date: new Date().toISOString().split('T')[0]
      }])
      setNewWord('')
      setNewMeaning('')
      setNewPage('')
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          placeholder="New word"
        />
        <Textarea
          value={newMeaning}
          onChange={(e) => setNewMeaning(e.target.value)}
          placeholder="Meaning"
        />
        <Input
          value={newPage}
          onChange={(e) => setNewPage(e.target.value)}
          placeholder="Page"
          type="number"
        />
        <Button type="submit">Add</Button>
      </form>
      <ul className="space-y-2">
        {words.map((item) => (
          <li key={item.id} className="border-b pb-2">
            <div className="flex justify-between">
              <span className="font-bold">{item.word}</span>
              <span>Page {item.page}</span>
            </div>
            <p className="text-sm text-gray-600">{item.meaning}</p>
            <p className="text-xs text-gray-400">Added on {item.date}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

