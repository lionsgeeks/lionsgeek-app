import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
function Participants({ bookings, tab }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const itemsPerPage = 10;

  const filteredParticipants = useMemo(() => {
    return bookings.filter((participant) => {
      const matchesSearch =
        participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGender = genderFilter === "all" || participant.gender === genderFilter;
      return matchesSearch && matchesGender;
    });
  }, [bookings, searchTerm, genderFilter]);

  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedParticipants = filteredParticipants.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleGenderFilterChange = (value) => {
    setGenderFilter(value);
    setCurrentPage(1);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Participants ({filteredParticipants.length.toLocaleString()})
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            Page {currentPage} of {totalPages}
          </Badge>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <Select value={genderFilter} onValueChange={handleGenderFilterChange}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genders</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">#</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Name</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Email</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Gender</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Phone</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Booked at</th>
              </tr>
            </thead>
            <tbody>
              {paginatedParticipants.map((participant, index) => (
                <tr key={participant.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-2 text-sm">{startIndex + index + 1}</td>
                  <td className="py-3 px-2 font-medium">{participant.name}</td>
                  <td className="py-3 px-2 text-sm text-muted-foreground">
                    {participant.email}
                  </td>
                  <td className="py-3 px-2 text-sm">{participant.gender}</td>
                  <td className="py-3 px-2 text-sm">{participant.phone}</td>
                  <td className="py-3 px-2 text-sm text-muted-foreground">
                    {new Date(participant.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredParticipants.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No participants found matching your criteria.
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredParticipants.length)} of{" "}
              {filteredParticipants.length.toLocaleString()} participants
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      className="w-8 h-8 p-0"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
export default Participants;
