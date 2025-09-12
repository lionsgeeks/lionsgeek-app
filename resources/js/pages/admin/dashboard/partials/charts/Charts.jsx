'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePage } from '@inertiajs/react';
import { BarChart2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import BarChart from './components/BarChart.js';
import { DonutChart } from './components/PieChart.js';

const Chart = () => {
    const { allsessions } = usePage().props;

    const [selectedSession, setSelectedSession] = useState('');
    const [selectedField, setSelectedField] = useState('all');
    const [selectedPromo, setSelectedPromo] = useState('all');
    const [barChart, setBarChart] = useState([]);
    const [pieChart, setPieChart] = useState([]);

    // Build normalized promo options (lowercased values)
    const promoOptions = useMemo(() => {
        const set = new Set();
        (allsessions || []).forEach((s) => {
            const name = s?.name || '';
            if (!name.includes(':')) return;
            const prefix = name.slice(0, name.indexOf(':')).trim().toLowerCase();
            if (prefix) set.add(prefix);
        });
        return Array.from(set).sort();
    }, [allsessions]);

    const toTitle = (txt) => txt.split(' ').map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w)).join(' ');

    // Sessions filtered by promo and field; sorted by date ascending
    const filteredSessions = useMemo(() => {
        let list = Array.isArray(allsessions) ? [...allsessions] : [];

        if (selectedPromo && selectedPromo !== 'all') {
            list = list.filter((s) => {
                const name = s?.name || '';
                if (!name.includes(':')) return false;
                const prefix = name.slice(0, name.indexOf(':')).trim().toLowerCase();
                return prefix === selectedPromo;
            });
        }

        if (selectedField && selectedField !== 'all') {
            const wanted = selectedField.toLowerCase();
            list = list.filter((s) => (s?.formation || '').toString().toLowerCase().includes(wanted));
        }

        list.sort((a, b) => new Date(a.start_date || 0) - new Date(b.start_date || 0));
        return list;
    }, [allsessions, selectedPromo, selectedField]);

    // Maintain a valid selectedSession when filters change
    useEffect(() => {
        if (!filteredSessions.length) {
            setSelectedSession('');
            return;
        }
        // If current is invalid, set default to first session id; keep 'all' as is
        if (selectedSession && selectedSession !== 'all') {
            const ok = filteredSessions.some((s) => s.id?.toString() === selectedSession?.toString());
            if (!ok) setSelectedSession(filteredSessions[0].id?.toString());
        } else if (!selectedSession) {
            setSelectedSession(filteredSessions[0].id?.toString());
        }
    }, [filteredSessions]);

    // Helper: sum BarChart arrays by step keys
    const sumBarCharts = (charts) => {
        const byStep = new Map();
        charts.forEach((arr) => {
            (arr || []).forEach((row) => {
                const key = row.step;
                if (!byStep.has(key)) byStep.set(key, { step: key });
                const target = byStep.get(key);
                Object.keys(row).forEach((k) => {
                    if (k === 'step') return;
                    target[k] = (target[k] || 0) + (row[k] || 0);
                });
            });
        });
        return Array.from(byStep.values());
    };

    // Helper: sum PieChart arrays by step keys
    const sumPieCharts = (charts) => {
        const byStep = new Map();
        charts.forEach((arr) => {
            (arr || []).forEach((row) => {
                const key = row.step;
                if (!byStep.has(key)) byStep.set(key, { step: key, total: 0, female: 0, male: 0 });
                const target = byStep.get(key);
                target.total += row.total || 0;
                target.female += row.female || 0;
                target.male += row.male || 0;
            });
        });
        return Array.from(byStep.values());
    };

    // Fetch and (optionally) aggregate chart data
    useEffect(() => {
        const load = async () => {
            if (!filteredSessions.length) {
                setBarChart([]);
                setPieChart([]);
                return;
            }

            // Determine which session ids to include
            let ids = [];
            if (selectedSession === 'all') {
                ids = filteredSessions.map((s) => s.id);
            } else if (selectedField === 'all') {
                // When All Fields is selected, aggregate across all filteredSessions
                ids = filteredSessions.map((s) => s.id);
            } else {
                ids = [selectedSession];
            }

            // Fetch all in parallel and aggregate
            const results = await Promise.all(
                ids.map((id) =>
                    fetch(`/admin/getChartData/${id}`)
                        .then((r) => r.json())
                        .catch(() => ({ BarChart: [], PieChart: [] }))
                )
            );

            const bar = sumBarCharts(results.map((r) => r.BarChart));
            const pie = sumPieCharts(results.map((r) => r.PieChart));
            setBarChart(bar);
            setPieChart(pie);
        };

        load();
    }, [filteredSessions, selectedSession]);

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
                    <Select value={selectedPromo} onValueChange={setSelectedPromo}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Promo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Promos</SelectItem>
                            {promoOptions.map((promo) => (
                                <SelectItem key={`promo-${promo}`} value={promo}>
                                    {toTitle(promo)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={selectedField} onValueChange={setSelectedField}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Field" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Fields</SelectItem>
                            <SelectItem value="Media">Media</SelectItem>
                            <SelectItem value="Coding">Coding</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={selectedSession?.toString() || ''} onValueChange={setSelectedSession}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Session" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Sessions</SelectItem>
                            {filteredSessions.map((session) => (
                                <SelectItem className='capitalize' key={`session-${session.id}`} value={session.id.toString()}>
                                    {session.name.includes(':') ? session.name.slice(session.name.indexOf(':') + 1).trim() : session.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>

            <CardContent>
                <div className="flex lg:flex-row-reverse gap-5 flex-col">
                    <DonutChart pieChart={pieChart} id={[selectedSession, selectedField, selectedPromo]} />
                    <BarChart barChart={barChart} />
                </div>
            </CardContent>
        </Card>
    );
};

export default Chart;