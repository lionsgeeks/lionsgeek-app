"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useForm } from "@inertiajs/react"
// import { useToast } from "@/hooks/use-toast"

export function AdminNotesSection({ participant }) {
  const { data, setData, post, processing } = useForm({
    note: "",
  }); 
  const handleAddNote = async () => {
    post(route('participant.notes', participant.id))
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Notes:</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="new-note">Add a Note:</Label>
          <Textarea
            id="new-note"
            value={data.note}
            onChange={(e) => setData('note', e.target.value)}
            placeholder="Enter your remarks about the user"
            rows={4}
            className="mt-1"
            disabled={processing}
          />
          <Button onClick={handleAddNote} disabled={processing} className="w-full mt-2">
            Add Note
          </Button>
        </div>

        {/* Existing Notes */}
        {participant.notes.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Previous Notes:</h4>
            {participant.notes.map((note) => (
              <div key={note.id} className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-800 mb-2">{note.note}</p>
                <div className="text-xs text-gray-500">
                  <span className="font-medium">{note.author}</span> - {formatDate(note.created_at)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
