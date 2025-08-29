"use client"

import React, { useEffect, useState } from "react"
import BarChart from "./components/BarChart.js"
import { DonutChart } from "./components/PieChart.js"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { BarChart2 } from "lucide-react"
import { usePage } from "@inertiajs/react"

const Chart = () => {
    const { allsessions } = usePage().props

    // remove private sessions
    const sessions = allsessions.filter(
        (session) => session.name.toLowerCase() !== "private session"
    )

    // default session is the last one
    const defaultSessionID = sessions[sessions.length - 1]?.id || null

    const [selectedSession, setSelectedSession] = useState(defaultSessionID)
    const [barChart, setBarChart] = useState([])
    const [pieChart, setPieChart] = useState([])

    useEffect(() => {
        if (!selectedSession) return

        fetch(`/admin/getChartData/${selectedSession}`)
            .then((res) => res.json())
            .then((data) => {
                setBarChart(data.BarChart || [])
                setPieChart(data.PieChart || [])
            })
            .catch((err) => console.error("Error fetching chart data:", err))
    }, [selectedSession])

    return (
        <Card className="w-full">
            {/* Header with title + select */}
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <BarChart2 color="#ffc803" className="h-6 w-6" />
                    <CardTitle className="text-xl font-semibold">Analyse</CardTitle>
                </div>

                <Select
                    value={selectedSession}
                    onValueChange={(value) => setSelectedSession(value)}
                >
                    <SelectTrigger className="w-[20%]">
                        <SelectValue placeholder="Select Session" />
                    </SelectTrigger>
                    <SelectContent>
                        {sessions.map((session) => (
                            <SelectItem key={session.id} value={session.id}>
                                {session.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>

            {/* Content with charts */}
            <CardContent>
                <div className="flex flex-row-reverse gap-5">
                    <DonutChart pieChart={pieChart} id={selectedSession} />
                    <BarChart barChart={barChart} />
                </div>
            </CardContent>
        </Card>
    )
}

export default Chart
