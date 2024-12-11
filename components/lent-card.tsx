import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format, differenceInDays, isAfter } from 'date-fns'

interface LendDetails {
  lentTo: string
  lentDate: string
  expectedReturnDate: string
}

interface LentCardProps {
  book: any
  onSave: (details: LendDetails) => void
  onReceive: () => void
  initialDetails: LendDetails
  isEditing: boolean
  onEdit: () => void
}

export function LentCard({ book, onSave, onReceive, initialDetails, isEditing, onEdit }: LentCardProps) {
  const [lendDetails, setLendDetails] = useState<LendDetails>(initialDetails)

  useEffect(() => {
    setLendDetails(initialDetails)
  }, [initialDetails])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(lendDetails)
  }

  const handleReceive = () => {
    onReceive()
  }

  if (isEditing) {
    return (
      <Card className="bg-green-100 border-green-300 border-2">
        <CardHeader>
          <CardTitle>Lend Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lentTo">Lent To</Label>
              <Input
                id="lentTo"
                value={lendDetails.lentTo}
                onChange={(e) => setLendDetails(prev => ({ ...prev, lentTo: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lentDate">Lent Date</Label>
              <Input
                id="lentDate"
                type="date"
                value={lendDetails.lentDate}
                onChange={(e) => setLendDetails(prev => ({ ...prev, lentDate: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedReturnDate">Expected Return Date</Label>
              <Input
                id="expectedReturnDate"
                type="date"
                value={lendDetails.expectedReturnDate}
                onChange={(e) => setLendDetails(prev => ({ ...prev, expectedReturnDate: e.target.value }))}
                required
              />
            </div>
            <Button type="submit">Save Lend Details</Button>
          </form>
        </CardContent>
      </Card>
    )
  }

  const today = new Date()
  const returnDate = new Date(lendDetails.expectedReturnDate)
  const daysRemaining = differenceInDays(returnDate, today)
  const isOverdue = isAfter(today, returnDate)

  return (
    <Card className={`${isOverdue ? 'bg-red-100 border-red-300' : 'bg-green-100 border-green-300'} border-2`}>
      <CardHeader>
        <CardTitle>Lent Book</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p><strong>Lent to:</strong> {lendDetails.lentTo}</p>
        <p><strong>Lent on:</strong> {format(new Date(lendDetails.lentDate), 'MMMM d, yyyy')}</p>
        <p><strong>Expected return:</strong> {format(new Date(lendDetails.expectedReturnDate), 'MMMM d, yyyy')}</p>
        <p className={`font-bold ${isOverdue ? 'text-red-600' : ''}`}>
          {isOverdue
            ? `Overdue by ${Math.abs(daysRemaining)} days`
            : `${daysRemaining} days remaining until expected return`}
        </p>
        <div className="space-x-2">
          <Button onClick={onEdit}>Edit</Button>
          <Button onClick={handleReceive} variant="secondary">Receive Book</Button>
        </div>
      </CardContent>
    </Card>
  )
}

