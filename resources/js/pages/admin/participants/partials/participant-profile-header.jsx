import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Mail, Phone, MapPin, Users, Image } from "lucide-react"
// import Image from "next/image"
// import type { ParticipantProfile } from "@/hooks/use-participants"

// interface ParticipantProfileHeaderProps {
//   participant: ParticipantProfile
// }

export function ParticipantProfileHeader({ participant }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  const getStepColor = (step) => {
    if (step.toLowerCase().includes("failed")) return "bg-red-100 text-red-800"
    if (step.toLowerCase().includes("completed")) return "bg-green-100 text-green-800"
    if (step.toLowerCase().includes("scheduled")) return "bg-blue-100 text-blue-800"
    return "bg-yellow-100 text-yellow-800"
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-32 aspect-square bg-black rounded-lg flex items-center justify-center">
              {participant?.image ? (
                 <img src={'/storage/' + participant.image}   alt={participant.full_name}
                    className="rounded-lg w-[100%] aspect-square object-cover" />
                 
              ) : (
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                  <Users className="w-8 h-8 text-black" />
                </div>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{participant.full_name}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(participant.birthDate)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span>{participant.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>{participant.phone}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Current Step:</label>
                <div className="mt-1">
                  <Badge className={getStepColor(participant.current_step)}>{participant.current_step}</Badge>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Location:</label>
                <div className="mt-1 flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {participant.city}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Session:</label>
                <div className="mt-1">
                  <Badge variant="outline">{participant.info_session.formation}</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
