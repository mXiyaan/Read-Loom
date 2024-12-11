import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addDays, format, differenceInDays } from 'date-fns'

interface BorrowDialogProps {
  book: {
    title: string
    author: string
  }
  onBorrowed: () => void
}

export function BorrowDialog({ book, onBorrowed }: BorrowDialogProps) {
  const [borrowedFrom, setBorrowedFrom] = useState('')
  const [borrowedDate, setBorrowedDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [returnDate, setReturnDate] = useState(format(addDays(new Date(), 14), 'yyyy-MM-dd'))
  const [isSet, setIsSet] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSet(true)
    onBorrowed()
  }

  const daysRemaining = differenceInDays(new Date(returnDate), new Date())

  if (isSet) {
    return (
      <div className="space-y-4">
        <p>Book: {book.title} by {book.author}</p>
        <p>Borrowed from: {borrowedFrom}</p>
        <p>Borrowed on: {format(new Date(borrowedDate), 'MMMM d, yyyy')}</p>
        <p>Return by: {format(new Date(returnDate), 'MMMM d, yyyy')}</p>
        <p className="text-lg font-bold">
          {daysRemaining > 0 
            ? `${daysRemaining} days remaining to return`
            : 'Book is overdue!'
          }
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="borrowedFrom">Borrowed From</Label>
        <Input
          id="borrowedFrom"
          value={borrowedFrom}
          onChange={(e) => setBorrowedFrom(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="borrowedDate">Borrowed Date</Label>
        <Input
          id="borrowedDate"
          type="date"
          value={borrowedDate}
          onChange={(e) => setBorrowedDate(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="returnDate">Planned Return Date</Label>
        <Input
          id="returnDate"
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Set Borrow Details</Button>
    </form>
  )
}

