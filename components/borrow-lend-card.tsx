import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BorrowLendItem {
  id: string
  title: string
  person: string
  dueDate: Date
  status: 'borrowed' | 'lent'
}

const borrowLendItems: BorrowLendItem[] = [
  { id: '1', title: "The Great Gatsby", person: "John Doe", dueDate: new Date(2023, 7, 15), status: 'borrowed' },
  { id: '2', title: "Pride and Prejudice", person: "Jane Smith", dueDate: new Date(2023, 8, 1), status: 'lent' },
  { id: '3', title: "1984", person: "Alice Johnson", dueDate: new Date(2023, 7, 30), status: 'borrowed' },
]

export function BorrowLendCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Borrowed & Lent Books</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {borrowLendItems.map((item) => (
            <li key={item.id} className="flex justify-between items-start">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.person}</p>
                <p className="text-sm text-muted-foreground">Due: {item.dueDate.toLocaleDateString()}</p>
              </div>
              <Badge variant={item.status === 'borrowed' ? 'secondary' : 'outline'}>
                {item.status === 'borrowed' ? 'Borrowed' : 'Lent'}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

