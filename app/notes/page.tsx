"use client"

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NoteList } from "@/components/note-list"
import { NoteDetail } from "@/components/note-detail"
import { SearchInput } from "@/components/search-input"

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleSelectNote = (noteId: string) => {
    setSelectedNoteId(noteId)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Notes</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2 space-y-4">
          <SearchInput
            placeholder="Search notes..."
            onSearch={handleSearch}
            className="w-full"
          />
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="all">All Notes</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="books">By Book</TabsTrigger>
              <TabsTrigger value="tags">By Tag</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <NoteList
                category="all"
                searchQuery={searchQuery}
                onSelectNote={handleSelectNote}
              />
            </TabsContent>
            <TabsContent value="favorites">
              <NoteList
                category="favorites"
                searchQuery={searchQuery}
                onSelectNote={handleSelectNote}
              />
            </TabsContent>
            <TabsContent value="books">
              <NoteList
                category="books"
                searchQuery={searchQuery}
                onSelectNote={handleSelectNote}
              />
            </TabsContent>
            <TabsContent value="tags">
              <NoteList
                category="tags"
                searchQuery={searchQuery}
                onSelectNote={handleSelectNote}
              />
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-full lg:w-1/2">
          <NoteDetail
            noteId={selectedNoteId}
            onClose={() => setSelectedNoteId(null)}
          />
        </div>
      </div>
    </div>
  )
}

