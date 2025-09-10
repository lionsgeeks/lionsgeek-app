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

    // const sessions = allsessions.filter((session) => session.name.toLowerCase() !== 'private session');

    const [selectedSession, setSelectedSession] = useState(null);
    const [AllPromo, setAllPromo] = useState([]);
    const [AllSessions, setAllSessions] = useState([]);
    const [selectedPromo, setSelectedPromo] = useState(null);
    const [barChart, setBarChart] = useState([]);
    const [pieChart, setPieChart] = useState([]);
    useEffect(() => {
        const allPromo = [
            ...new Set(
                allsessions
                    .filter((e) => e.name.includes(':'))
                    .map((promo) => promo.name.slice(0, promo.name.indexOf(':')).trim())
            ),
        ];
        setAllPromo(allPromo);

        if (allPromo.length > 0 && !selectedPromo) {
            setSelectedPromo(allPromo[0]);
        }
    }, [allsessions]);
    useEffect(() => {
        if (!selectedPromo) return;

        const filteredSessions = allsessions.filter((session) =>
            session.name.includes(selectedPromo)
        );
        setAllSessions(filteredSessions);

        if (filteredSessions.length > 0) {
            const defaultSessionId = filteredSessions[filteredSessions.length - 1]?.id;
            setSelectedSession(defaultSessionId);
        }
    }, [selectedPromo, allsessions]);

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

    console.log('Selected Session:', selectedSession);
    console.log('Selected Promo:', selectedPromo);

    return (
        <Card className="w-full">
            <CardHeader className="flex lg:flex-row flex-col lg:gap-5 gap-10 lg:items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-gray-100 p-2">
                        <BarChart2 className="h-5 w-5 text-[#212529]" />
                    </div>
                    <CardTitle className="text-xl font-semibold">Analyse</CardTitle>
                </div>

                <div className="flex flex-col lg:w-[30%] w-full gap-5">
                    <Select value={selectedPromo || ''} onValueChange={(value) => setSelectedPromo(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Promo" />
                        </SelectTrigger>
                        <SelectContent>
                            {AllPromo?.map((promo, index) => (
                                <SelectItem key={index} value={promo}>
                                    {promo[0].toUpperCase()+promo.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={selectedSession?.toString() || ''} onValueChange={(value) => setSelectedSession(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Session" />
                        </SelectTrigger>
                        <SelectContent>
                            {AllSessions?.map((session) => (
                                <SelectItem key={session.id} value={session.id.toString()}>
                                    {session.name.slice(session.name.indexOf(':')+1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>

            <CardContent>
                <div className="flex lg:flex-row-reverse gap-5 flex-col">
                    <DonutChart pieChart={pieChart} id={selectedSession} />
                    <BarChart barChart={barChart} />
                </div>
            </CardContent>
        </Card>
    );
};

export default Chart;