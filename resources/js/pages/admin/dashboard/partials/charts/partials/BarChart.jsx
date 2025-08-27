import { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
    const visitsData = [
        { month: 'Jan', visits: 850, contacts: 12, events: 1, subscribers: 250 },
        { month: 'Feb', visits: 1200, contacts: 18, events: 2, subscribers: 270 },
        { month: 'Mar', visits: 1550, contacts: 20, events: 1, subscribers: 300 },
        { month: 'Apr', visits: 1320, contacts: 15, events: 1, subscribers: 310 },
        { month: 'May', visits: 1400, contacts: 22, events: 3, subscribers: 330 },
        { month: 'Jun', visits: 920, contacts: 10, events: 1, subscribers: 350 },
        { month: 'Jul', visits: 1600, contacts: 25, events: 2, subscribers: 370 },
        { month: 'Aug', visits: 1800, contacts: 28, events: 2, subscribers: 400 },
        { month: 'Sep', visits: 1500, contacts: 20, events: 1, subscribers: 420 },
        { month: 'Oct', visits: 2000, contacts: 30, events: 4, subscribers: 450 },
        { month: 'Nov', visits: 1750, contacts: 24, events: 2, subscribers: 470 },
        { month: 'Dec', visits: 2100, contacts: 32, events: 3, subscribers: 500 },
    ];
    const [userData, setUserData] = useState({
        labels: visitsData.map((vit)),
        datasets:[],
    });
    return (
        <>
            <Bar data={visitsData} />
        </>
    );
};

export default BarChart;
