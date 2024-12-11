import Image from 'next/image'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BorrowedCard } from "./borrowed-card"
import { LentCard } from "./lent-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface BorrowDetails {
  borrowedFrom: string
  borrowedDate: string
  returnDate: string
}

interface LendDetails {
  lentTo: string
  lentDate: string
  expectedReturnDate: string
}

interface Book {
  id: string
  title: string
  author: string
  cover: string
  summary: string
  publishDate: string
  genre: string
  totalPages: number
  currentPage: number
  startDate: string | null
  finishDate: string | null
  rating: number | null
  review: string
  isOwned: boolean
  borrowDetails: BorrowDetails | null
  lendDetails: LendDetails | null
}

export function BookDetails({ book, onBookUpdate }: { book: Book; onBookUpdate: (book: Book) => void }) {
  const [isOwned, setIsOwned] = useState(book.isOwned)
  const [isEditing, setIsEditing] = useState(false)
  const [isLentEditing, setIsLentEditing] = useState(false)

  const handleMarkAsOwned = () => {
    setIsOwned(true)
    onBookUpdate({ ...book, isOwned: true })
  }

  const handleBuyNow = (region: 'us' | 'uk' | 'india') => {
    const domains = {
      us: 'com',
      uk: 'co.uk',
      india: 'in'
    };
    window.open(`https://www.amazon.${domains[region]}/s?k=${encodeURIComponent(book.title + ' ' + book.author)}`, '_blank');
  }

  const handleBorrow = () => {
    if (book.borrowDetails) {
      onBookUpdate({ ...book, borrowDetails: null })
    } else {
      const today = new Date()
      const twoWeeksLater = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)
      setIsEditing(true)
      onBookUpdate({
        ...book,
        borrowDetails: {
          borrowedFrom: '',
          borrowedDate: today.toISOString().split('T')[0],
          returnDate: twoWeeksLater.toISOString().split('T')[0]
        }
      })
    }
  }

  const handleSaveBorrowDetails = (details: BorrowDetails) => {
    setIsEditing(false)
    onBookUpdate({ ...book, borrowDetails: details })
  }

  const handleEditBorrowDetails = () => {
    setIsEditing(true)
  }

  const handleLend = () => {
    if (book.lendDetails) {
      onBookUpdate({ ...book, lendDetails: null })
    } else {
      const today = new Date()
      const twoWeeksLater = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)
      setIsLentEditing(true)
      onBookUpdate({
        ...book,
        lendDetails: {
          lentTo: '',
          lentDate: today.toISOString().split('T')[0],
          expectedReturnDate: twoWeeksLater.toISOString().split('T')[0]
        }
      })
    }
  }

  const handleSaveLendDetails = (details: LendDetails) => {
    setIsLentEditing(false)
    onBookUpdate({ ...book, lendDetails: details })
  }

  const handleEditLendDetails = () => {
    setIsLentEditing(true)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{book.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <Image
              src={book.cover}
              alt={book.title}
              width={300}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="md:w-2/3 space-y-4 flex flex-col">
            <div className="flex-grow space-y-2">
              {[
                { key: 'author', label: 'Author', value: book.author },
                { key: 'genre', label: 'Genre', value: book.genre },
                { key: 'published', label: 'Published', value: book.publishDate },
                { key: 'summary', label: 'Summary', value: book.summary },
              ].map(({ key, label, value }) => (
                <p key={key}><strong>{label}:</strong> {value}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <Button
                onClick={handleMarkAsOwned}
                disabled={isOwned}
                variant={isOwned ? "outline" : "default"}
                className="flex-grow sm:flex-grow-0"
              >
                {isOwned ? "Owned" : "Mark as Owned"}
              </Button>
              <Button
                onClick={handleBorrow}
                disabled={isOwned}
                variant={book.borrowDetails ? "outline" : "secondary"}
                className="flex-grow sm:flex-grow-0"
              >
                {book.borrowDetails ? "Return Book" : "Mark as Borrowed"}
              </Button>
              <Button
                onClick={handleLend}
                variant={book.lendDetails ? "outline" : "secondary"}
                className="flex-grow sm:flex-grow-0"
              >
                {book.lendDetails ? "Receive Book" : "Mark as Lent"}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" className="flex-grow sm:flex-grow-0">
                    Buy Now
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleBuyNow('us')}>
                    Amazon US
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBuyNow('uk')}>
                    Amazon UK
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBuyNow('india')}>
                    Amazon India
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {book.borrowDetails && (
        <BorrowedCard
          book={book}
          onSave={handleSaveBorrowDetails}
          onReturn={handleBorrow}
          initialDetails={book.borrowDetails}
          isEditing={isEditing}
          onEdit={handleEditBorrowDetails}
        />
      )}
      {book.lendDetails && (
        <LentCard
          book={book}
          onSave={handleSaveLendDetails}
          onReceive={handleLend}
          initialDetails={book.lendDetails}
          isEditing={isLentEditing}
          onEdit={handleEditLendDetails}
        />
      )}
    </div>
  )
}

