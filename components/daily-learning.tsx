import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const words = [
  { id: '1', word: 'Ephemeral', definition: 'Lasting for a very short time', book: 'The Alchemist' },
  { id: '2', word: 'Serendipity', definition: 'The occurrence and development of events by chance in a happy or beneficial way', book: 'The Hitchhiker\'s Guide to the Galaxy' },
  { id: '3', word: 'Eloquent', definition: 'Fluent or persuasive in speaking or writing', book: 'To Kill a Mockingbird' },
]

const notes = [
  { id: '1', note: "The only way to do great work is to love what you do.", book: "Steve Jobs: The Exclusive Biography" },
  { id: '2', note: "It is our choices that show what we truly are, far more than our abilities.", book: "Harry Potter and the Chamber of Secrets" },
  { id: '3', note: "The greatest glory in living lies not in never falling, but in rising every time we fall.", book: "Long Walk to Freedom" },
]

export function DailyLearning() {
  const [currentWord, setCurrentWord] = useState(words[0])
  const [currentNote, setCurrentNote] = useState(notes[0])

  useEffect(() => {
    const randomWord = words[Math.floor(Math.random() * words.length)]
    const randomNote = notes[Math.floor(Math.random() * notes.length)]
    setCurrentWord(randomWord)
    setCurrentNote(randomNote)
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Daily Learning</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWord.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-md font-semibold mb-1">Word of the Day</h3>
            <p className="text-lg font-bold">{currentWord.word}</p>
            <p className="text-sm text-muted-foreground">{currentWord.definition}</p>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-muted-foreground">From: {currentWord.book}</p>
              <Button variant="link" size="sm" asChild>
                <Link href={`/words-library?word=${currentWord.id}`}>Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
        <Separator />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNote.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-md font-semibold mb-1">Note</h3>
            <p className="text-sm italic">"{currentNote.note}"</p>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-muted-foreground">From: {currentNote.book}</p>
              <Button variant="link" size="sm" asChild>
                <Link href={`/notes?note=${currentNote.id}`}>Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

