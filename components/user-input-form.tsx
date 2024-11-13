'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function UserInputForm() {
  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input1.trim() || !input2.trim()) return

    setIsLoading(true)
    setResult('')

    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input1, input2 }),
      })

      if (response.ok) {
        const data = await response.json()
        setResult(data.reply)
      } else {
        const errorData = await response.json()
        console.error('Error from Flask:', errorData.error)
        setResult("Sorry, there was an error processing your request.")
      }
    } catch (error) {
      console.error('Error:', error)
      setResult("Sorry, there was an error connecting to the server.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Data Point Analysis</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input1">Input Data 1</Label>
            <Input
              id="input1"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              placeholder="Enter your first input..."
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="input2">Input Data 2</Label>
            <Input
              id="input2"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
              placeholder="Enter your second input..."
              disabled={isLoading}
            />
          </div>
          {result && (
            <div className="mt-4 p-2 bg-gray-100 rounded-lg">
              <strong>Analysis Result:</strong>
              <p>{result}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}