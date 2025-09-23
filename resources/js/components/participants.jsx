import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, Filter, Search, Users, CheckCircle2, XCircle } from 'lucide-react'; // Added CheckCircle2, XCircle
import { useMemo, useState } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
function Participants({ bookings, tab }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [genderFilter, setGenderFilter] = useState('all');
    const [visitedFilter, setVisitedFilter] = useState('all'); // New state for visited filter
    const itemsPerPage = 10;

    const filteredParticipants = useMemo(() => {
        return bookings.filter((participant) => {
            const matchesSearch =
                participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                participant.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGender = genderFilter === 'all' || participant.gender === genderFilter;
            const matchesVisited = visitedFilter === 'all' || (visitedFilter === 'true' && participant.is_visited) || (visitedFilter === 'false' && !participant.is_visited);
            return matchesSearch && matchesGender && matchesVisited; // Include visited filter
        });
    }, [bookings, searchTerm, genderFilter, visitedFilter]); // Add visitedFilter to dependencies

    const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedParticipants = filteredParticipants.slice(startIndex, startIndex + itemsPerPage);

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleGenderFilterChange = (value) => {
        setGenderFilter(value);
        setCurrentPage(1);
    };

    const handleVisitedFilterChange = (value) => { // New handler for visited filter
        setVisitedFilter(value);
        setCurrentPage(1);
    };

    return (
        <Card className="hidden md:block">
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
                <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                        <Input
                            placeholder="Search by name or email..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                        />
                    </div>
                    <Select value={genderFilter} onValueChange={handleGenderFilterChange}>
                        <SelectTrigger className="w-full sm:w-48">
                            <Filter className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Filter by gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Genders</SelectItem>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                    </Select>
                    {/* New Select for visited filter */}
                    <Select value={visitedFilter} onValueChange={handleVisitedFilterChange}>
                        <SelectTrigger className="w-full sm:w-48">
                            <Filter className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Filter by visited status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="true">Visited</SelectItem>
                            <SelectItem value="false">Not Visited</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="px-2 py-3 text-left font-medium text-muted-foreground">#</th>
                                <th className="px-2 py-3 text-left font-medium text-muted-foreground">Name</th>
                                <th className="px-2 py-3 text-left font-medium text-muted-foreground">Email</th>
                                <th className="px-2 py-3 text-left font-medium text-muted-foreground">Gender</th>
                                <th className="px-2 py-3 text-left font-medium text-muted-foreground">Phone</th>
                                <th className="px-2 py-3 text-left font-medium text-muted-foreground">Booked at</th>
                                <th className="px-2 py-3 text-left font-medium text-muted-foreground">Visited</th> {/* New column header */}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedParticipants.map((participant, index) => (
                                <tr key={participant.id} className={`border-b ${participant.is_visited ? 'bg-green-50/50' : 'hover:bg-muted/50'}`}> {/* Highlight visited rows */}
                                    <td className="px-2 py-3 text-sm">{startIndex + index + 1}</td>
                                    <td className="px-2 py-3 font-medium">{participant.name}</td>
                                    <td className="px-2 py-3 text-sm text-muted-foreground">{participant.email}</td>
                                    <td className="px-2 py-3 text-sm">{participant.gender}</td>
                                    <td className="px-2 py-3 text-sm">{participant.phone}</td>
                                    <td className="px-2 py-3 text-sm text-muted-foreground">{new Date(participant.created_at).toLocaleString()}</td>
                                    <td className="px-2 py-3 text-sm">
                                        {participant.is_visited ? (
                                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <XCircle className="h-5 w-5 text-red-500" />
                                        )}
                                    </td> {/* Display visited status */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredParticipants.length === 0 && (
                    <div className="py-8 text-center text-muted-foreground">No participants found matching your criteria.</div>
                )}

                {totalPages > 1 && (
                    <div className="mt-4 flex items-center justify-between border-t pt-4">
                        <p className="text-sm text-muted-foreground">
                            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredParticipants.length)} of{' '}
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
                                            variant={currentPage === pageNum ? 'default' : 'outline'}
                                            size="sm"
                                            className="h-8 w-8 p-0"
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