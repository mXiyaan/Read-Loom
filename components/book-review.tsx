import { useState } from 'react'
import { Star } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function BookReview({ book }: { book: any }) {
  const [rating, setRating] = useState(book.rating)
  const [review, setReview] = useState(book.review)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the review to your backend
    console.log('Submitting review:', { rating, review })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`cursor-pointer ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
      <Textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review here..."
        rows={5}
      />
      <Button type="submit">Submit Review</Button>
    </form>
  )
}

