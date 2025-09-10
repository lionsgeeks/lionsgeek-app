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

    const sessions = allsessions.filter((session) => session.name.toLowerCase() !== 'private session');
    const defaultSessionID = sessions[sessions.length - 1]?.id || null;

    const [selectedSession, setSelectedSession] = useState(defaultSessionID);
    const [AllPromo, setAllPromo] = useState([]);
    const [AllSessions, setAllSessions] = useState([]);
    const [selectedPromo, setSelectedPromo] = useState(AllPromo[0]);
    const [barChart, setBarChart] = useState([]);
    const [pieChart, setPieChart] = useState([]);

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

    useEffect(() => {
        const allPromo = [
            ...new Set(
                allsessions
                    .filter((e) => e.name.includes(':'))
                    .map((promo) => promo.name.slice(0, promo.name.indexOf(':')).trim())
            ),
        ];
        setAllPromo(allPromo);
    }, [allsessions]);

    useEffect(() => {
        if (AllPromo.length > 0) {
            setSelectedPromo(AllPromo[0]);
        }
    }, [AllPromo]);

    useEffect(() => {
        if (!selectedPromo) return;

        const newtab = allsessions.filter((session) => session.name.includes(selectedPromo));
        setAllSessions(newtab);
    }, [selectedPromo, allsessions]);

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
                    <Select value={selectedPromo} onValueChange={(value) => setSelectedPromo(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Promo" />
                        </SelectTrigger>
                        <SelectContent>
                            {AllPromo?.map((promo, index) => (
                                <SelectItem key={index} value={promo}>
                                    {promo}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={selectedSession} onValueChange={(value) => setSelectedSession(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Session" />
                        </SelectTrigger>
                        <SelectContent>
                            {AllSessions?.map((session) => (
                                <SelectItem key={session.id} value={session.id}>
                                    {session.name}
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
