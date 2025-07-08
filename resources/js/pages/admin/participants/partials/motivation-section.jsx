"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"


export function MotivationSection({ participant, loading = false }) {
  const [motivation, setMotivation] = useState(participant.motivation)

  
  

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Motivation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={motivation}
          placeholder="Enter participant motivation..."
          rows={4}
          disabled={loading}
          readOnly
        />
      </CardContent>
    </Card>
  )
}
