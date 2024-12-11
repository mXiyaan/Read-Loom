"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'

interface SearchInputProps {
  placeholder: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
}

export function SearchInput({ placeholder, onChange, onSearch }: SearchInputProps) {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange?.(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(value)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="flex-grow"
      />
      {onSearch && (
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      )}
    </form>
  )
}

