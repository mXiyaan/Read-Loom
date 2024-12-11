"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pie, PieChart, ResponsiveContainer, Cell, Legend, Tooltip } from "recharts"

const genreData = [
  { name: 'Fiction', value: 45 },
  { name: 'Non-Fiction', value: 30 },
  { name: 'Sci-Fi', value: 15 },
  { name: 'Mystery', value: 10 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function BookshelfAnalytics({ className }: { className?: string }) {
  // Mock data for quick stats
  const totalBooks = 150
  const newBooksAdded = 5
  const borrowedBooks = 3
  const returnedBooks = 2
  const lentBooks = 4
  const receivedBooks = 3
  const ownedBooks = 120
  const booksRead = 80
  const unreadBooks = totalBooks - booksRead

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm font-medium">Total Books</p>
            <p className="text-2xl font-bold">{totalBooks}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Owned Books</p>
            <p className="text-2xl font-bold">{ownedBooks}</p>
          </div>
          <div>
            <p className="text-sm font-medium">New Books (30 days)</p>
            <p className="text-2xl font-bold">{newBooksAdded}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Books Read</p>
            <p className="text-2xl font-bold">{booksRead}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Unread Books</p>
            <p className="text-2xl font-bold">{unreadBooks}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Borrowed / Returned</p>
            <p className="text-2xl font-bold">{borrowedBooks} / {returnedBooks}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Lent / Received</p>
            <p className="text-2xl font-bold">{lentBooks} / {receivedBooks}</p>
          </div>
        </div>
        <div className="h-[200px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={genreData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {genreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

