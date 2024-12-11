import { Progress } from "@/components/ui/progress"
import Link from 'next/link'

const books = [
  { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", cover: "/placeholder.svg?height=120&width=80", progress: 65 },
  { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee", cover: "/placeholder.svg?height=120&width=80", progress: 40 },
  { id: "3", title: "1984", author: "George Orwell", cover: "/placeholder.svg?height=120&width=80", progress: 80 },
  { id: "4", title: "Pride and Prejudice", author: "Jane Austen", cover: "/placeholder.svg?height=120&width=80", progress: 25 },
]

export function CurrentlyReading() {
  return (
    <>
      {books.map((book) => (
        <li key={book.id} className="p-4">
          <Link href={`/book/${book.id}`} className="flex items-center space-x-4">
            <img src={book.cover} alt={book.title} className="w-16 h-24 object-cover" />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm">{book.title}</h4>
              <p className="text-xs text-muted-foreground">{book.author}</p>
              <Progress value={book.progress} className="mt-2" />
              <p className="text-xs mt-1">{book.progress}% complete</p>
            </div>
          </Link>
        </li>
      ))}
    </>
  )
}

