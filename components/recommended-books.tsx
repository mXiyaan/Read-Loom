import { Button } from "@/components/ui/button"

const recommendedBooks = [
  { id: "1", title: "The Name of the Wind", author: "Patrick Rothfuss", cover: "/placeholder.svg", genre: "Fantasy", publishDate: "2007-03-27" },
  { id: "2", title: "The Martian", author: "Andy Weir", cover: "/placeholder.svg", genre: "Science Fiction", publishDate: "2011-09-27" },
  { id: "3", title: "The Silent Patient", author: "Alex Michaelides", cover: "/placeholder.svg", genre: "Thriller", publishDate: "2019-02-05" },
  { id: "4", title: "Educated", author: "Tara Westover", cover: "/placeholder.svg", genre: "Memoir", publishDate: "2018-02-20" },
]

export function RecommendedBooks() {
  return (
    <div className="space-y-4">
      {recommendedBooks.map((book) => (
        <div key={book.id} className="flex items-center space-x-4">
          <img src={book.cover} alt={book.title} className="w-16 h-24 object-cover rounded" />
          <div className="flex-grow">
            <h3 className="font-semibold text-sm">{book.title}</h3>
            <p className="text-xs text-muted-foreground">{book.author}</p>
            <p className="text-xs text-muted-foreground">{book.genre}</p>
            <p className="text-xs text-muted-foreground">Published: {book.publishDate}</p>
            <Button variant="link" className="text-xs p-0 h-auto">Add to Library</Button>
          </div>
        </div>
      ))}
    </div>
  )
}

