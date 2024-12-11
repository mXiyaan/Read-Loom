"use client"

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookDetails } from "@/components/book-details"
import { ReadingProgress } from "@/components/reading-progress"
import { BookReview } from "@/components/book-review"
import { NoteEditor } from "@/components/note-editor"
import { WordsLearned } from "@/components/words-learned"
import { ProgressLog } from "@/components/progress-log"
import { ReadingMode } from "@/components/reading-mode"
import { BorrowedCard } from "@/components/borrowed-card"; // Import BorrowedCard

const fetchBookData = async (id: string) => {
  // In a real app, this would be an API call
  const books = {
    "1": {
      id: "1",
      title: "The Midnight Library",
      author: "Matt Haig",
      cover: "/placeholder.svg?height=400&width=300",
      summary: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
      publishDate: "2020-08-13",
      genre: "Fiction",
      totalPages: 288,
      currentPage: 100,
      startDate: "2023-06-01",
      finishDate: null,
      rating: null,
      review: "",
    },
    "2": {
      id: "2",
      title: "Atomic Habits",
      author: "James Clear",
      cover: "/placeholder.svg?height=400&width=300",
      summary: "No matter your goals, Atomic Habits offers a proven framework for improving--every day.",
      publishDate: "2018-10-16",
      genre: "Self-help",
      totalPages: 320,
      currentPage: 320,
      startDate: "2023-05-15",
      finishDate: "2023-06-10",
      rating: 5,
      review: "A life-changing book about building good habits and breaking bad ones.",
    },
    "3": {
      id: "3",
      title: "The Song of Achilles",
      author: "Madeline Miller",
      cover: "/placeholder.svg?height=400&width=300",
      summary: "A tale of gods, kings, immortal fame, and the human heart, The Song of Achilles is a dazzling literary feat.",
      publishDate: "2011-09-20",
      genre: "Historical Fiction",
      totalPages: 378,
      currentPage: 0,
      startDate: null,
      finishDate: null,
      rating: null,
      review: "",
    },
  };
  return books[id as keyof typeof books] || null;
};

export default function BookDetailPage() {
  const params = useParams()
  const [book, setBook] = useState<any>(null)

  const loadBook = useCallback(async () => {
    if (params.id) {
      const bookData = await fetchBookData(params.id as string)
      setBook(bookData)
    }
  }, [params.id])

  useEffect(() => {
    loadBook()
  }, [loadBook])

  const handleSaveSession = (session: ReadingSession) => {
    // In a real app, you would save this session to your backend
    console.log('Saving session:', session)
    // For now, we'll just update the book's current page
    if (book) {
      setBook({
        ...book,
        currentPage: session.endPage
      })
    }
  }

  if (!book) return <div>Book not found</div>;

  return (
    <div className="p-6 flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2 space-y-6">
        <BookDetails 
          book={book} 
          onBookUpdate={(updatedBook) => setBook(updatedBook)} 
        />
        {book.startDate && (
          <Card>
            <CardHeader>
              <CardTitle>Reading Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ReadingProgress book={book} />
            </CardContent>
          </Card>
        )}
        <ReadingMode bookId={book.id} totalPages={book.totalPages} onSaveSession={handleSaveSession} />
        {book.startDate && (
          <Card>
            <CardHeader>
              <CardTitle>Progress Log</CardTitle>
            </CardHeader>
            <CardContent>
              <ProgressLog bookId={book.id} />
            </CardContent>
          </Card>
        )}
      </div>
      <div className="lg:w-1/2 space-y-6">
        <Tabs defaultValue="notes" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="words">Words Learned</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
          </TabsList>
          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <NoteEditor bookId={book.id} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="words">
            <Card>
              <CardHeader>
                <CardTitle>Words Learned</CardTitle>
              </CardHeader>
              <CardContent>
                <WordsLearned bookId={book.id} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="review">
            <Card>
              <CardHeader>
                <CardTitle>Review</CardTitle>
              </CardHeader>
              <CardContent>
                <BookReview book={book} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

