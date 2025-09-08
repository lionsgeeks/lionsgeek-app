import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function SummaryPage() {
    const stored = useMemo(() => {
        try {
            const raw = sessionStorage.getItem('formData');
            return raw ? JSON.parse(raw) : {};
        } catch {
            return {};
        }
    }, []);

    const [data, setData] = useState(stored || {});
    const [editingField, setEditingField] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const fields = [
        { key: 'full_name', label: 'Full name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'birthday', label: 'Birthday' },
        { key: 'city', label: 'City' },
        { key: 'region', label: 'Region' },
        { key: 'education_level', label: 'Education level' },
        { key: 'current_situation', label: 'Current situation' },
        { key: 'has_training', label: 'Has prior training' },
        { key: 'previous_training_details', label: 'Previous training details' },
        { key: 'why_join_formation', label: 'Motivation' },
        { key: 'objectives_after_formation', label: 'Objectives after formation' },
        { key: 'priority_learning_topics', label: 'Priority learning topics' },
        { key: 'arabic_level', label: 'Arabic level' },
        { key: 'french_level', label: 'French level' },
        { key: 'english_level', label: 'English level' },
        { key: 'other_language', label: 'Other language' },
        { key: 'other_language_level', label: 'Other language level' },
        { key: 'how_heard_about_formation', label: 'How did you hear about us?' },
        { key: 'current_commitments', label: 'Current commitments' },
    ];

    const updateField = (key, value) => {
        const next = { ...data, [key]: value };
        setData(next);
        sessionStorage.setItem('formData', JSON.stringify(next));
    };

    const handleEditAll = () => {
        router.visit('/postuler');
    };

    const handleConfirm = () => {
        setSubmitting(true);
        setErrors({});
        // Defer final submission to existing game submission flow. Here we only validate client-side quickly.
        // Navigate back to game intro or directly call participants/store if game already finished.
        router.post('/participants/store', data, {
            forceFormData: true,
            onSuccess: () => {
                sessionStorage.removeItem('formData');
                router.visit('/');
            },
            onError: (e) => {
                setErrors(e || {});
                setSubmitting(false);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Application Summary" />
            <div className="min-h-screen bg-white">
                <div className="bg-[#212529] py-8 text-white">
                    <div className="mx-auto max-w-5xl px-6">
                        <h1 className="text-3xl font-bold">Review your application</h1>
                        <p className="mt-1 text-gray-300">Please review and edit your information before final submission.</p>
                    </div>
                </div>

                <div className="mx-auto max-w-5xl px-6 py-8">
                    <div className="rounded-lg border-0 bg-white p-6 shadow-lg">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-[#212529]">Personal information</h2>
                            <button onClick={handleEditAll} className="rounded-lg bg-gray-100 px-3 py-2 text-sm hover:bg-gray-200">
                                Edit all
                            </button>
                        </div>

                        <div className="divide-y">
                            {fields.map(({ key, label }) => (
                                <div key={key} className="flex items-start justify-between gap-4 py-4">
                                    <div className="min-w-[220px] text-sm font-medium text-gray-600">{label}</div>
                                    <div className="flex-1">
                                        {editingField === key ? (
                                            <input
                                                type="text"
                                                value={data[key] ?? ''}
                                                onChange={(e) => updateField(key, e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-[#fee819]"
                                            />
                                        ) : (
                                            <div className="text-[#212529]">
                                                {String(data[key] ?? '').length ? (
                                                    String(data[key])
                                                ) : (
                                                    <span className="text-gray-400">Not provided</span>
                                                )}
                                            </div>
                                        )}
                                        {errors[key] && <p className="mt-1 text-sm text-red-600">{errors[key]}</p>}
                                    </div>
                                    <div className="min-w-[80px] text-right">
                                        {editingField === key ? (
                                            <button
                                                onClick={() => setEditingField(null)}
                                                className="rounded-lg bg-[#212529] px-3 py-2 text-sm text-white hover:bg-[#212529]/90"
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => setEditingField(key)}
                                                className="rounded-lg bg-gray-100 px-3 py-2 text-sm hover:bg-gray-200"
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-end pt-6">
                            <button
                                onClick={handleConfirm}
                                disabled={submitting}
                                className="rounded-lg bg-[#212529] px-6 py-3 text-white transition-all duration-200 hover:bg-[#212529]/90 hover:shadow-lg disabled:opacity-50"
                            >
                                {submitting ? 'Submitting…' : 'Confirm & Submit'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
