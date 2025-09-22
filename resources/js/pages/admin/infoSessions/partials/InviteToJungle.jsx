import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { router } from '@inertiajs/react';
import { Rocket } from 'lucide-react';
import { useState } from 'react';

const InviteToJungle = ({ infosession }) => {
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(`/admin/invite/jungle?infosession_id=${infosession.id}&date=${date}`);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Rocket className="h-5 w-5" />
                    Invite to Jungle
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <label htmlFor="date">Date</label>
                            <input
                                id="date"
                                type="datetime-local"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </div>
                    <Button className="mt-4">Invite</Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default InviteToJungle;