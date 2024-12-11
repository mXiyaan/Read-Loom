"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from 'lucide-react'

interface Word {
  id: string
  word: string
  definition: string
  tags: string[]
  isFavorite: boolean
  createdAt: string
  etymology?: string
  examples?: string[]
}

interface WordDetailProps {
  wordId: string | null
  onClose: () => void
}

export function WordDetail({ wordId, onClose }: WordDetailProps) {
  const [word, setWord] = useState<Word | null>(null)

  useEffect(() => {
    if (wordId) {
      // In a real app, fetch the word data from an API
      // For this example, we'll use mock data
      const mockWord: Word = {
        id: wordId,
        word: 'Serendipity',
        definition: 'The occurrence and development of events by chance in a happy or beneficial way',
        tags: ['noun', 'positive'],
        isFavorite: true,
        createdAt: '2023-06-17',
        etymology: 'From Serendip, an old name for Sri Lanka + -ity. Coined by Horace Walpole in 1754 based on a Persian fairy tale.',
        examples: [
          "The discovery of penicillin was a serendipity.",
          "Finding your dream job while looking for something else is an example of serendipity."
        ]
      }
      setWord(mockWord)
    } else {
      setWord(null)
    }
  }, [wordId])

  if (!word) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">Select a word to view details</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {word.word}
          {word.isFavorite && <Star className="fill-yellow-400" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-1">Definition</h3>
          <p className="text-sm">{word.definition}</p>
        </div>
        {word.etymology && (
          <div>
            <h3 className="font-semibold mb-1">Etymology</h3>
            <p className="text-sm">{word.etymology}</p>
          </div>
        )}
        {word.examples && word.examples.length > 0 && (
          <div>
            <h3 className="font-semibold mb-1">Examples</h3>
            <ul className="list-disc list-inside text-sm">
              {word.examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <h3 className="font-semibold mb-1">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {word.tags.map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Added on: {new Date(word.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  )
}

