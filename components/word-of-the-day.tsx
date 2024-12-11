import { useState, useEffect } from 'react'

const words = [
  { word: 'Ephemeral', definition: 'Lasting for a very short time', book: 'The Alchemist' },
  { word: 'Serendipity', definition: 'The occurrence and development of events by chance in a happy or beneficial way', book: 'The Hitchhiker\'s Guide to the Galaxy' },
  { word: 'Eloquent', definition: 'Fluent or persuasive in speaking or writing', book: 'To Kill a Mockingbird' },
  { word: 'Resilience', definition: 'The capacity to recover quickly from difficulties; toughness', book: 'Man\'s Search for Meaning' },
  { word: 'Mellifluous', definition: 'Sweet or musical; pleasant to hear', book: 'The Great Gatsby' },
]

export function WordOfTheDay() {
  const [wordOfDay, setWordOfDay] = useState(words[0])

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * words.length)
    setWordOfDay(words[randomIndex])
  }, [])

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">{wordOfDay.word}</h3>
      <p className="text-sm text-muted-foreground">{wordOfDay.definition}</p>
      <p className="text-xs text-muted-foreground">From: {wordOfDay.book}</p>
    </div>
  )
}

