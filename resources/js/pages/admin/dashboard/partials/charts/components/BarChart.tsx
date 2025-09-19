'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

// Describe your chart config
const chartConfig = {
    success: {
        label: 'Success',
        color: 'var(--chart-1)',
    },
    failed: {
        label: 'Failed',
        color: 'var(--chart-2)',
    },
    absence: {
        label: 'Absence',
        color: 'var(--chart-3)', // make sure you have this CSS var or use a hex color
    },
} satisfies ChartConfig;

// Define prop types for this component
type ChartBarStackedProps = {
    barChart: {
        step: string;
        success?: number;
        failed?: number;
        absence?: number;
    }[];
};



export default function ChartBarStacked({ barChart }: ChartBarStackedProps) {
    return (
        <div className="w-full lg:w-1/2">
            <Card>
                {/* <CardHeader>
                        <CardTitle>Bar Chart - Stacked + Legend</CardTitle>
                        <CardDescription>January - June 2024</CardDescription>
                    </CardHeader> */}
                <CardContent>
                    
                    <ChartContainer config={chartConfig}>
                        <BarChart accessibilityLayer data={barChart}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="step" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value} />
                            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar dataKey="success" stackId="a" fill="#4CAF50" radius={[0, 0, 4, 4]} />
                            <Bar dataKey="failed" stackId="a" fill="#ff0000" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="absence" stackId="a" fill="#bcbcbc" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
                {/* <CardFooter className="flex-col items-start gap-2 text-sm">
                        <div className="flex gap-2 leading-none font-medium">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="text-muted-foreground leading-none">
                            Showing total visitors for the last 6 months
                        </div>
                    </CardFooter> */}
            </Card>
        </div>
    );
}
