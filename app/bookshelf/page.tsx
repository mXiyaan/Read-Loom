"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookSearch } from "@/components/book-search"
import { BookList } from "@/components/book-list"
import { RecommendedBooks } from "@/components/recommended-books"
import { BookshelfAnalytics } from "@/components/bookshelf-analytics"
import { BorrowLendCard } from "@/components/borrow-lend-card"
import { cn } from "@/lib/utils"
import { SearchInput } from "@/components/search-input"
import { Import } from 'lucide-react'
import { ImportBooksModal } from "@/components/import-books-modal"

export default function BookshelfPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [bookshelfSearchQuery, setBookshelfSearchQuery] = useState('')
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    // Implement Google Books API search
  }

  const handleBookshelfSearch = (value: string) => {
    setBookshelfSearchQuery(value)
    // Implement bookshelf search logic
    console.log('Searching bookshelf:', value)
  }

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Book Shelf</h1>
      <div className="flex justify-between items-center mb-4">
        <Button onClick={() => setIsImportModalOpen(true)}>
          <Import className="mr-2 h-4 w-4" /> Import from Goodreads
        </Button>
      </div>
      <div className="flex gap-6">
        <div className="flex-grow space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Books</CardTitle>
            </CardHeader>
            <CardContent>
              <SearchInput
                placeholder="Search for new books to add..."
                onSearch={handleSearch}
              />
              <BookSearch query={searchQuery} />
            </CardContent>
          </Card>

          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Books</TabsTrigger>
              <TabsTrigger value="currently-reading">Reading</TabsTrigger>
              <TabsTrigger value="to-read">To Read</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="borrowed-lent">Borrowed/Lent</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <BookList category="all" />
            </TabsContent>
            <TabsContent value="currently-reading">
              <BookList category="currently-reading" />
            </TabsContent>
            <TabsContent value="to-read">
              <BookList category="to-read" />
            </TabsContent>
            <TabsContent value="completed">
              <BookList category="completed" />
            </TabsContent>
            <TabsContent value="borrowed-lent">
              <BookList category="borrowed-lent" />
            </TabsContent>
          </Tabs>
          <ImportBooksModal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} />
        </div>
        <div className="w-1/4 min-w-[300px] space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Search Your Bookshelf</CardTitle>
            </CardHeader>
            <CardContent>
              <SearchInput
                placeholder="Search your books..."
                onSearch={handleBookshelfSearch}
              />
            </CardContent>
          </Card>
          <BookshelfAnalytics className="w-full" />
          <Card>
            <CardHeader>
              <CardTitle>Recommended Books</CardTitle>
            </CardHeader>
            <CardContent>
              <RecommendedBooks />
            </CardContent>
          </Card>
          <BorrowLendCard />
        </div>
      </div>
    </div>
  )
}

