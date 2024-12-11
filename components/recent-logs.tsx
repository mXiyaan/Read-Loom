import { format } from 'date-fns'

const recentLogs = [
  { date: new Date(2023, 5, 30), pages: 15, book: 'The Great Gatsby' },
  { date: new Date(2023, 5, 29), pages: 20, book: 'To Kill a Mockingbird' },
  { date: new Date(2023, 5, 28), pages: 18, book: '1984' },
  { date: new Date(2023, 5, 27), pages: 25, book: 'Pride and Prejudice' },
  { date: new Date(2023, 5, 26), pages: 12, book: 'The Catcher in the Rye' },
]

export function RecentLogs() {
  return (
    <div className="space-y-4">
      {recentLogs.map((log, index) => (
        <div key={index} className="text-sm">
          <p className="font-medium">{format(log.date, 'MMM dd, yyyy')}</p>
          <p className="text-muted-foreground">
            Read {log.pages} pages of "{log.book}"
          </p>
        </div>
      ))}
    </div>
  )
}

