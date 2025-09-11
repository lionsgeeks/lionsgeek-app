'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePage } from '@inertiajs/react';
import { BarChart2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import BarChart from './components/BarChart.js';
import { DonutChart } from './components/PieChart.js';

const Chart = () => {
    const { allsessions } = usePage().props;

    const [selectedSession, setSelectedSession] = useState(null);
    const [selectedField, setSelectedField] = useState('Media'); // Default to Media
    const [AllPromo, setAllPromo] = useState([]);
    const [AllSessions, setAllSessions] = useState([]);
    const [filteredSessions, setFilteredSessions] = useState([]); // New state for filtered sessions
    const [selectedPromo, setSelectedPromo] = useState(null);
    const [barChart, setBarChart] = useState([]);
    const [pieChart, setPieChart] = useState([]);

    // Extract promos from all sessions
    useEffect(() => {
        const promoNames = allsessions
            .filter((session) => session.name && session.name.includes(':'))
            .map((session) => {
                const colonIndex = session.name.indexOf(':');
                return session.name.slice(0, colonIndex).trim().toLowerCase();
            })
            .filter((promo) => promo.length > 0);

        const uniquePromos = [...new Set(promoNames)].sort();
        setAllPromo(uniquePromos);

        if (uniquePromos.length > 0 && !selectedPromo) {
            setSelectedPromo(uniquePromos[0]);
        }
    }, [allsessions]);

    // Filter sessions by selected promo
    useEffect(() => {
        if (!selectedPromo) return;

        const sessionsForPromo = allsessions.filter((session) => {
            if (!session.name || !session.name.includes(':')) return false;
            const sessionPromo = session.name.slice(0, session.name.indexOf(':')).trim().toLowerCase();
            return sessionPromo === selectedPromo.toLowerCase();
        });

        setAllSessions(sessionsForPromo);
    }, [selectedPromo, allsessions]);

    // Filter sessions by selected field (Media/Coding) and update selected session
    useEffect(() => {
        if (!selectedField || AllSessions.length === 0) return;

        const sessionsForField = AllSessions.filter((session) =>
            session.name.toLowerCase().includes(selectedField.toLowerCase())
        );

        setFilteredSessions(sessionsForField);

        // Auto-select the last session in the filtered list
        if (sessionsForField.length > 0) {
            const defaultSessionId = sessionsForField[sessionsForField.length - 1]?.id;
            setSelectedSession(defaultSessionId);
        } else {
            setSelectedSession(null);
        }
    }, [selectedField, AllSessions]);

    console.log(barChart);
    // Fetch chart data when session changes
    useEffect(() => {
        if (!selectedSession) return;

        fetch(`/admin/getChartData/${selectedSession}`)
            .then((res) => res.json())
            .then((data) => {
                setBarChart(data.BarChart || []);
                setPieChart(data.PieChart || []);
                
            })
            .catch((err) => console.error('Error fetching chart data:', err));
    }, [selectedSession]);

    return (
        <Card className="w-full">
            <CardHeader className="flex lg:flex-row flex-col lg:gap-5 gap-10 lg:items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-gray-100 p-2">
                        <BarChart2 className="h-5 w-5 text-[#212529]" />
                    </div>
                    <CardTitle className="text-xl font-semibold">Analyse</CardTitle>
                </div>

                <div className="flex lg:flex-row flex-col lg:w-[50%] w-full gap-5">
                    <Select value={selectedPromo || ''} onValueChange={(value) => setSelectedPromo(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Promo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Promos</SelectItem>
                            {AllPromo?.map((promo, index) => (
                                <SelectItem key={`promo-${index}-${promo}`} value={promo}>
                                    {promo.charAt(0).toUpperCase() + promo.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={selectedField} onValueChange={(value) => setSelectedField(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Field" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Fields</SelectItem>
                            {['Media', 'Coding']?.map((field, index) => (
                                <SelectItem className='capitalize' key={`field-${index}`} value={field.toString()}>
                                    {field}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={selectedSession?.toString() || ''} onValueChange={(value) => setSelectedSession(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Session" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Sessions</SelectItem>
                            {filteredSessions?.map((session) => (
                                <SelectItem className='capitalize' key={`session-${session.id}`} value={session.id.toString()}>
                                    {session.name.slice(session.name.indexOf(':') + 1).trim()}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>

            <CardContent>
                <div className="flex lg:flex-row-reverse gap-5 flex-col">
                    <DonutChart pieChart={pieChart} id={[selectedSession , selectedField , selectedPromo]} />
                    <BarChart barChart={barChart} />
                </div>
            </CardContent>
        </Card>
    );
};

export default Chart;