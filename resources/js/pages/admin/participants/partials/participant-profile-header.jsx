import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Mail, Phone, MapPin, Users, User, GraduationCap, Clock, CheckCircle2 } from "lucide-react"

export function ParticipantProfileHeader({ participant }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStepColor = (step) => {
    switch(step) {
      case 'info_session':
        return "bg-[#f2f2f2] text-[#212529]"
      case 'interview':
        return "bg-[#fee819] text-[#212529]"
      case 'interview_pending':
        return "bg-[#fee819] text-[#212529]"
      case 'interview_failed':
        return "bg-[#ff7376] text-white"
      case 'jungle':
        return "bg-[#fee819] text-[#212529]"
      case 'jungle_failed':
        return "bg-[#ff7376] text-white"
      default:
        return "bg-[#212529] text-white"
    }
  }

  const getFormationColor = (formation) => {
    return formation === 'Coding' 
      ? 'bg-[#fee819] text-[#212529]' 
      : 'bg-[#fee819] text-[#212529]'
  }

  return (
    <Card className="border rounded-lg bg-white shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Avatar */}
          <div className="relative">
                                  <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
              {participant?.image ? (
                <img 
                  src={'/storage/images/participants/' + participant.image}   
                  alt={participant.full_name}
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2">
              <div className="bg-white rounded-full p-1 shadow-md">
                <CheckCircle2 className="w-5 h-5 text-[#fee819]" />
              </div>
            </div>
          </div>

          {/* Name and badges */}
          <div>
            <h1 className="text-xl font-bold text-[#212529] mb-2">{participant.full_name}</h1>
            <div className="flex flex-col gap-2">
              <Badge className={`${getStepColor(participant.current_step)} rounded-lg px-3 py-1`}>
                {participant.current_step.replaceAll('_', ' ')}
              </Badge>
              <Badge className={`${getFormationColor(participant.info_session.formation)} rounded-lg px-3 py-1`}>
                {participant.info_session.formation}
              </Badge>
            </div>
          </div>

          {/* Contact info */}
          <div className="w-full space-y-3">
            <div className="flex items-center gap-3 text-gray-600">
              <div className="p-2 bg-gray-50 rounded-lg">
                <Mail className="w-4 h-4 text-[#212529]" />
              </div>
              <span className="text-sm">{participant.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <div className="p-2 bg-gray-50 rounded-lg">
                <Phone className="w-4 h-4 text-[#212529]" />
              </div>
              <span className="text-sm">{participant.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <div className="p-2 bg-gray-50 rounded-lg">
                <Calendar className="w-4 h-4 text-[#212529]" />
              </div>
              <span className="text-sm">{formatDate(participant.birthday)}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <div className="p-2 bg-gray-50 rounded-lg">
                <MapPin className="w-4 h-4 text-[#212529]" />
              </div>
              <span className="text-sm capitalize">{participant.city}, {participant.prefecture?.replaceAll('_', ' ')}</span>
            </div>
          </div>

          {/* Session details */}
          <div className="w-full bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-[#212529] mb-2">Session Details</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-medium">Session:</span> {participant.info_session.name}</p>
              <p><span className="font-medium">Start Date:</span> {participant.info_session.start_date}</p>
              <p><span className="font-medium">Gender:</span> <span className="capitalize">{participant.gender}</span></p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
