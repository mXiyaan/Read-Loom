"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Note {
  id: string
  title: string
  content: string
  bookTitle: string
  tags: string[]
  isFavorite: boolean
  createdAt: string
}

interface NoteListProps {
  category: 'all' | 'favorites' | 'books' | 'tags'
  searchQuery: string
  onSelectNote: (noteId: string) => void
}

export function NoteList({ category, searchQuery, onSelectNote }: NoteListProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date')
  const [filterTag, setFilterTag] = useState<string | null>(null)

  useEffect(() => {
    // In a real app, fetch notes from an API
    const mockNotes: Note[] = [
      {
        id: '1',
        title: 'Character Analysis: Atticus Finch',
        content: `Atticus Finch, the protagonist of Harper Lee's "To Kill a Mockingbird," is a paragon of moral virtue and wisdom. As a lawyer in the racially charged atmosphere of 1930s Alabama, Atticus stands out for his unwavering commitment to justice and equality. His decision to defend Tom Robinson, a black man falsely accused of rape, demonstrates his courage and integrity in the face of societal pressure.`,
        bookTitle: 'To Kill a Mockingbird',
        tags: ['character analysis', 'moral integrity', 'parenting'],
        isFavorite: true,
        createdAt: '2023-06-15',
      },
      {
        id: '2',
        title: 'Themes in 1984: The Nature of Truth',
        content: `George Orwell's dystopian novel "1984" explores several profound themes, but perhaps none is more central than the nature of truth. In the totalitarian society of Oceania, the Party exerts absolute control over reality itself through the manipulation of facts, history, and language.`,
        bookTitle: '1984',
        tags: ['dystopia', 'truth', 'totalitarianism'],
        isFavorite: false,
        createdAt: '2023-06-16',
      },
      {
        id: '3',
        title: 'Symbolism in The Great Gatsby: The Green Light',
        content: `F. Scott Fitzgerald's masterpiece, "The Great Gatsby," is rife with symbolism, but perhaps no symbol is more prominent or significant than the green light at the end of Daisy's dock. This green light serves multiple symbolic functions throughout the novel.`,
        bookTitle: 'The Great Gatsby',
        tags: ['symbolism', 'American Dream', 'illusion vs reality'],
        isFavorite: true,
        createdAt: '2023-06-17',
      },
      {
        id: '4',
        title: 'Narrative Structure in One Hundred Years of Solitude',
        content: `Gabriel García Márquez's "One Hundred Years of Solitude" is renowned for its complex and innovative narrative structure. The novel employs a non-linear, cyclical narrative that spans seven generations of the Buendía family, creating a rich tapestry of interconnected stories and themes.`,
        bookTitle: 'One Hundred Years of Solitude',
        tags: ['magical realism', 'narrative structure', 'cyclical time'],
        isFavorite: false,
        createdAt: '2023-06-18',
      },
      {
        id: '5',
        title: 'Existentialism in The Stranger',
        content: `Albert Camus's "The Stranger" is a seminal work of existentialist fiction that explores themes of absurdism, alienation, and the human condition. The novel's protagonist, Meursault, embodies the philosophical concept of the "absurd hero" – a person who recognizes the fundamental meaninglessness of life but chooses to live on regardless.`,
        bookTitle: 'The Stranger',
        tags: ['existentialism', 'absurdism', 'societal critique'],
        isFavorite: true,
        createdAt: '2023-06-19',
      },
      {
        id: '6',
        title: 'The Role of Memory in Beloved',
        content: `Toni Morrison's "Beloved" is a powerful exploration of the lasting trauma of slavery, with memory playing a crucial role in the narrative. The novel demonstrates how the past, particularly traumatic memories, can haunt the present and shape individual and collective identities.`,
        bookTitle: 'Beloved',
        tags: ['memory', 'trauma', 'slavery'],
        isFavorite: false,
        createdAt: '2023-06-20',
      },
    ]
    setNotes(mockNotes)
  }, [])

  const filteredAndSortedNotes = notes
    .filter(note => {
      if (category === 'favorites' && !note.isFavorite) return false
      if (searchQuery && !note.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
      if (filterTag && !note.tags.includes(filterTag)) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else {
        return a.title.localeCompare(b.title)
      }
    })

  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)))

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'date' | 'title')}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Sort by Date</SelectItem>
            <SelectItem value="title">Sort by Title</SelectItem>
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
        {filteredAndSortedNotes.map(note => (
          <Card key={note.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onSelectNote(note.id)}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex-1">
                <h3 className="font-semibold">{note.title}</h3>
                <p className="text-sm text-muted-foreground">Book: {note.bookTitle}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex flex-wrap gap-2 justify-end">
                  {note.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(note.createdAt).toLocaleDateString()}
                </p>
              </div>
              {note.isFavorite && <Star className="fill-yellow-400 ml-2 flex-shrink-0" />}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

