'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export const description = 'A donut chart with text';

interface PieStep {
    step: string;
    total: number;
    male: number;
    female: number;
}

interface DonutChartProps {
    pieChart: PieStep[];
    id: number | string;
}

const chartConfig: ChartConfig = {
    male: {
        label: 'Male',
        color: 'var(--chart-1)',
    },
    female: {
        label: 'Female',
        color: 'var(--chart-2)',
    },
};

export const DonutChart: React.FC<DonutChartProps> = ({ pieChart }) => {
    const [selectedStep, setSelectedStep] = React.useState<PieStep | null>(null);

    // Reset selected step whenever pieChart changes
    React.useEffect(() => {
        if (!pieChart || pieChart.length === 0) return;
        const infoStep = pieChart.find((step) => step.step.trim() === 'Info Session');
        setSelectedStep(infoStep || pieChart[0]);
    }, [pieChart]);

    // Prepare male/female dataset
    const genderData = React.useMemo(() => {
        if (!selectedStep) return [];
        return [
            { name: 'Male', value: selectedStep.male ?? 0, fill: '#16537e' },
            { name: 'Female', value: selectedStep.female ?? 0, fill: '#c22673' },
        ];
    }, [selectedStep]);

    const totalVisitors = selectedStep?.total ?? 0;

    if (!pieChart || pieChart.length === 0) {
        return <p>No data available</p>;
    }

    return (
        <div className="lg:w-1/2 w-full">
            <Card className="flex flex-col">
                <CardContent className="flex-1 pb-0">
                    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                        <PieChart>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                            <Pie data={genderData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5}>
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                            return (
                                                <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                    <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                                                        {totalVisitors}
                                                    </tspan>
                                                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                                        Participants
                                                    </tspan>
                                                </text>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </CardContent>

                {/* Step selection radios */}
                <CardFooter className="flex-col gap-5 text-sm">
                    <div className="grid lg:grid-cols-4 grid-cols-2 gap-10">
                        {pieChart.map((step) => (
                            <div key={step.step} className="flex items-center gap-x-1">
                                <input
                                    type="radio"
                                    name="inputs"
                                    id={step.step}
                                    checked={selectedStep?.step === step.step}
                                    onChange={() => setSelectedStep(step)}
                                />
                                <label htmlFor={step.step} className="text-sm">
                                    {step.step}
                                </label>
                            </div>
                        ))}
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};
