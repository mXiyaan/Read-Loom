import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format, differenceInDays, isAfter, addDays } from 'date-fns'

interface BorrowDetails {
  borrowedFrom: string
  borrowedDate: string
  returnDate: string
}

interface BorrowedCardProps {
  book: any
  onSave: (details: BorrowDetails) => void
  onReturn: () => void
  initialDetails: BorrowDetails
  isEditing: boolean
  onEdit: () => void
}

export function BorrowedCard({ book, onSave, onReturn, initialDetails, isEditing, onEdit }: BorrowedCardProps) {
  const [borrowDetails, setBorrowDetails] = useState<BorrowDetails>(initialDetails)

  useEffect(() => {
    setBorrowDetails(initialDetails)
  }, [initialDetails])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(borrowDetails)
  }

  const handleReturn = () => {
    onReturn()
  }

  if (isEditing) {
    return (
      <Card className="bg-blue-100 border-blue-300 border-2">
        <CardHeader>
          <CardTitle>Borrow Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="borrowedFrom">Borrowed From</Label>
              <Input
                id="borrowedFrom"
                value={borrowDetails.borrowedFrom}
                onChange={(e) => setBorrowDetails(prev => ({ ...prev, borrowedFrom: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="borrowedDate">Borrowed Date</Label>
              <Input
                id="borrowedDate"
                type="date"
                value={borrowDetails.borrowedDate}
                onChange={(e) => setBorrowDetails(prev => ({ ...prev, borrowedDate: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="returnDate">Planned Return Date</Label>
              <Input
                id="returnDate"
                type="date"
                value={borrowDetails.returnDate}
                onChange={(e) => setBorrowDetails(prev => ({ ...prev, returnDate: e.target.value }))}
                required
              />
            </div>
            <Button type="submit">Save Borrow Details</Button>
          </form>
        </CardContent>
      </Card>
    )
  }

  const today = new Date()
  const returnDate = new Date(borrowDetails.returnDate)
  const daysRemaining = differenceInDays(returnDate, today)
  const isOverdue = isAfter(today, returnDate)

  return (
    <Card className={`${isOverdue ? 'bg-red-100 border-red-300' : 'bg-blue-100 border-blue-300'} border-2`}>
      <CardHeader>
        <CardTitle>Borrowed Book</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p><strong>Borrowed from:</strong> {borrowDetails.borrowedFrom}</p>
        <p><strong>Borrowed on:</strong> {format(new Date(borrowDetails.borrowedDate), 'MMMM d, yyyy')}</p>
        <p><strong>Return by:</strong> {format(new Date(borrowDetails.returnDate), 'MMMM d, yyyy')}</p>
        <p className={`font-bold ${isOverdue ? 'text-red-600' : ''}`}>
          {isOverdue
            ? `Overdue by ${Math.abs(daysRemaining)} days`
            : `${daysRemaining} days remaining to return`}
        </p>
        <div className="space-x-2">
          <Button onClick={onEdit}>Edit</Button>
          <Button onClick={handleReturn} variant="destructive">Return Book</Button>
        </div>
      </CardContent>
    </Card>
  )
}

