"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchInput } from "@/components/search-input"
import { WordList } from "@/components/word-list"
import { WordDetail } from "@/components/word-detail"
import { Plus } from 'lucide-react'

export default function WordsLibraryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleSelectWord = (wordId: string) => {
    setSelectedWordId(wordId)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Words Library</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Word
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2 space-y-4">
          <SearchInput
            placeholder="Search words..."
            onSearch={handleSearch}
            className="w-full"
          />
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="all">All Words</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="tags">By Tag</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <WordList
                category="all"
                searchQuery={searchQuery}
                onSelectWord={handleSelectWord}
              />
            </TabsContent>
            <TabsContent value="favorites">
              <WordList
                category="favorites"
                searchQuery={searchQuery}
                onSelectWord={handleSelectWord}
              />
            </TabsContent>
            <TabsContent value="recent">
              <WordList
                category="recent"
                searchQuery={searchQuery}
                onSelectWord={handleSelectWord}
              />
            </TabsContent>
            <TabsContent value="tags">
              <WordList
                category="tags"
                searchQuery={searchQuery}
                onSelectWord={handleSelectWord}
              />
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-full lg:w-1/2">
          <WordDetail
            wordId={selectedWordId}
            onClose={() => setSelectedWordId(null)}
          />
        </div>
      </div>
    </div>
  )
}

