"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface Book {
  id: string
  title: string
  authors: string[]
  description: string
  imageLinks: {
    thumbnail: string
  }
}

export function BookSearch({ query }: { query: string }) {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query) {
      searchBooks(query)
    }
  }, [query])

  const searchBooks = async (searchQuery: string) => {
    setLoading(true)
    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY
      if (!apiKey) {
        throw new Error("Google Books API key is not set. Please add NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY to your environment variables.")
      }
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&key=${apiKey}`)
      const data = await response.json()
      setBooks(data.items.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || [],
        description: item.volumeInfo.description || '',
        imageLinks: item.volumeInfo.imageLinks || { thumbnail: '/placeholder.svg' }
      })))
    } catch (error) {
      console.error('Error fetching books:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToLibrary = (book: Book) => {
    // Implement adding book to library
    console.log('Adding to library:', book)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {books.map((book) => (
        <Card key={book.id} className="flex flex-col">
          <div className="relative pb-[150%]">
            <img src={book.imageLinks.thumbnail} alt={book.title} className="absolute inset-0 w-full h-full object-cover rounded-t-lg" />
          </div>
          <CardContent className="flex-grow">
            <h3 className="font-semibold mt-2 line-clamp-2">{book.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{book.authors.join(', ')}</p>
            <p className="text-sm mt-2 line-clamp-3">{book.description}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => addToLibrary(book)} className="w-full">Add to Library</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

