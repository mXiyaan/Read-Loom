import { Progress } from "@/components/ui/progress"

export function ReadingProgress({ book }: { book: any }) {
  const progress = Math.round((book.currentPage / book.totalPages) * 100)

  return (
    <div className="space-y-4">
      <Progress value={progress} className="w-full" />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Page {book.currentPage} of {book.totalPages}</span>
        <span>{progress}% Complete</span>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-medium">Start Date</p>
          <p>{book.startDate || 'Not started'}</p>
        </div>
        <div>
          <p className="font-medium">Finish Date</p>
          <p>{book.finishDate || 'In progress'}</p>
        </div>
      </div>
    </div>
  )
}

