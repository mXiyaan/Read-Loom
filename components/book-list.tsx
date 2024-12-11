import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface Book {
  id: string
  title: string
  author: string
  cover: string
  progress?: number
  startDate?: Date
  endDate?: Date
  rating?: number
  status?: 'borrowed' | 'lent'
  dueDate?: Date
}

const mockBooks: Record<string, Book[]> = {
  "currently-reading": [
    { id: "1", title: "The Midnight Library", author: "Matt Haig", cover: "/placeholder.svg", progress: 35, startDate: new Date(2023, 5, 15) },
    { id: "2", title: "Atomic Habits", author: "James Clear", cover: "/placeholder.svg", progress: 72, startDate: new Date(2023, 4, 20) },
  ],
  "to-read": [
    { id: "3", title: "The Song of Achilles", author: "Madeline Miller", cover: "/placeholder.svg" },
    { id: "4", title: "Project Hail Mary", author: "Andy Weir", cover: "/placeholder.svg" },
  ],
  "completed": [
    { id: "5", title: "To Kill a Mockingbird", author: "Harper Lee", cover: "/placeholder.svg", startDate: new Date(2023, 2, 10), endDate: new Date(2023, 3, 5), rating: 5 },
    { id: "6", title: "1984", author: "George Orwell", cover: "/placeholder.svg", startDate: new Date(2023, 1, 15), endDate: new Date(2023, 2, 1), rating: 4 },
  ],
  "borrowed-lent": [
    { id: "7", title: "The Great Gatsby", author: "F. Scott Fitzgerald", cover: "/placeholder.svg", status: 'borrowed', dueDate: new Date(2023, 7, 15) },
    { id: "8", title: "Pride and Prejudice", author: "Jane Austen", cover: "/placeholder.svg", status: 'lent', dueDate: new Date(2023, 8, 1) },
  ],
  "all": [
    { id: "1", title: "The Midnight Library", author: "Matt Haig", cover: "/placeholder.svg", progress: 35, startDate: new Date(2023, 5, 15) },
    { id: "2", title: "Atomic Habits", author: "James Clear", cover: "/placeholder.svg", progress: 72, startDate: new Date(2023, 4, 20) },
    { id: "3", title: "The Song of Achilles", author: "Madeline Miller", cover: "/placeholder.svg" },
    { id: "4", title: "Project Hail Mary", author: "Andy Weir", cover: "/placeholder.svg" },
    { id: "5", title: "To Kill a Mockingbird", author: "Harper Lee", cover: "/placeholder.svg", startDate: new Date(2023, 2, 10), endDate: new Date(2023, 3, 5), rating: 5 },
    { id: "6", title: "1984", author: "George Orwell", cover: "/placeholder.svg", startDate: new Date(2023, 1, 15), endDate: new Date(2023, 2, 1), rating: 4 },
    { id: "7", title: "The Great Gatsby", author: "F. Scott Fitzgerald", cover: "/placeholder.svg", status: 'borrowed', dueDate: new Date(2023, 7, 15) },
    { id: "8", title: "Pride and Prejudice", author: "Jane Austen", cover: "/placeholder.svg", status: 'lent', dueDate: new Date(2023, 8, 1) },
  ],
}

export function BookList({ category }: { category: string }) {
  const books = mockBooks[category] || []

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((book) => (
        <Link href={`/book/${book.id}`} className="block" key={book.id}>
          <Card className="flex flex-col h-full transition-shadow hover:shadow-md">
            <div className="relative pb-[150%]">
              <img src={book.cover} alt={book.title} className="absolute inset-0 w-full h-full object-cover rounded-t-lg" />
            </div>
            <CardContent className="flex-grow">
              <h3 className="font-semibold mt-2 line-clamp-1">{book.title}</h3>
              <p className="text-sm text-muted-foreground">{book.author}</p>
              {book.progress !== undefined && (
                <div className="mt-2">
                  <Progress value={book.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">{book.progress}% complete</p>
                </div>
              )}
              {book.startDate && (
                <p className="text-xs text-muted-foreground mt-1">
                  Started: {book.startDate.toLocaleDateString()}
                </p>
              )}
              {book.endDate && (
                <p className="text-xs text-muted-foreground">
                  Finished: {book.endDate.toLocaleDateString()}
                </p>
              )}
              {book.rating && (
                <p className="text-xs text-muted-foreground">
                  Rating: {'★'.repeat(book.rating)}{'☆'.repeat(5 - book.rating)}
                </p>
              )}
              {book.status && (
                <Badge variant={book.status === 'borrowed' ? 'secondary' : 'outline'} className="mt-2">
                  {book.status === 'borrowed' ? 'Borrowed' : 'Lent'}
                </Badge>
              )}
              {book.dueDate && (
                <p className="text-xs text-muted-foreground mt-1">
                  Due: {book.dueDate.toLocaleDateString()}
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

