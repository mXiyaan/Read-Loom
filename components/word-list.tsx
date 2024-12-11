"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Word {
  id: string
  word: string
  definition: string
  tags: string[]
  isFavorite: boolean
  createdAt: string
}

interface WordListProps {
  category: 'all' | 'favorites' | 'recent' | 'tags'
  searchQuery: string
  onSelectWord: (wordId: string) => void
}

export function WordList({ category, searchQuery, onSelectWord }: WordListProps) {
  const [words, setWords] = useState<Word[]>([])
  const [sortBy, setSortBy] = useState<'date' | 'alphabetical'>('date')
  const [filterTag, setFilterTag] = useState<string | null>(null)

  useEffect(() => {
    // In a real app, fetch words from an API
    const mockWords: Word[] = [
      {
        id: '1',
        word: 'Ephemeral',
        definition: 'Lasting for a very short time',
        tags: ['adjective', 'literature'],
        isFavorite: true,
        createdAt: '2023-06-15',
      },
      {
        id: '2',
        word: 'Ubiquitous',
        definition: 'Present, appearing, or found everywhere',
        tags: ['adjective', 'formal'],
        isFavorite: false,
        createdAt: '2023-06-16',
      },
      {
        id: '3',
        word: 'Serendipity',
        definition: 'The occurrence and development of events by chance in a happy or beneficial way',
        tags: ['noun', 'positive'],
        isFavorite: true,
        createdAt: '2023-06-17',
      },
      {
        id: '4',
        word: 'Eloquent',
        definition: 'Fluent or persuasive in speaking or writing',
        tags: ['adjective', 'communication'],
        isFavorite: false,
        createdAt: '2023-06-18',
      },
      {
        id: '5',
        word: 'Paradigm',
        definition: 'A typical example or pattern of something',
        tags: ['noun', 'academic'],
        isFavorite: true,
        createdAt: '2023-06-19',
      },
      {
        id: '6',
        word: 'Enigma',
        definition: 'A person or thing that is mysterious or difficult to understand',
        tags: ['noun', 'mystery'],
        isFavorite: false,
        createdAt: '2023-06-20',
      },
    ]
    setWords(mockWords)
  }, [])

  const filteredAndSortedWords = words
    .filter(word => {
      if (category === 'favorites' && !word.isFavorite) return false
      if (searchQuery && !word.word.toLowerCase().includes(searchQuery.toLowerCase())) return false
      if (filterTag && !word.tags.includes(filterTag)) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else {
        return a.word.localeCompare(b.word)
      }
    })

  const allTags = Array.from(new Set(words.flatMap(word => word.tags)))

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'date' | 'alphabetical')}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Sort by Date</SelectItem>
            <SelectItem value="alphabetical">Sort Alphabetically</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterTag || 'all'} onValueChange={(value) => setFilterTag(value === 'all' ? null : value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tags</SelectItem>
            {allTags.map(tag => (
              <SelectItem key={tag} value={tag}>{tag}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        {filteredAndSortedWords.map(word => (
          <Card key={word.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onSelectWord(word.id)}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex-1">
                <h3 className="font-semibold">{word.word}</h3>
                <p className="text-sm text-muted-foreground">{word.definition}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex flex-wrap gap-2 justify-end">
                  {word.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(word.createdAt).toLocaleDateString()}
                </p>
              </div>
              {word.isFavorite && <Star className="fill-yellow-400 ml-2 flex-shrink-0" />}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

