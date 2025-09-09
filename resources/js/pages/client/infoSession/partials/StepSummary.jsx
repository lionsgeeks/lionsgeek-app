import { Button } from '../../../../components/Button';

export default function StepSummary({ data, errors, setCurrentStep, darkMode }) {
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
        { key: 'how_heard_about_formation', label: 'How did you hear about us?' },
        { key: 'current_commitments', label: 'Current commitments' },
    ];

    const goToField = (fieldKey) => {
        // Map field to step index
        const map = {
            full_name: 1,
            email: 1,
            phone: 1,
            birthday: 1,
            city: 1,
            region: 1,
            education_level: 2,
            current_situation: 2,
            has_training: 3,
            previous_training_details: 3,
            why_join_formation: 3,
            objectives_after_formation: 4,
            priority_learning_topics: 4,
            arabic_level: 4,
            french_level: 4,
            english_level: 4,
            how_heard_about_formation: 5,
            current_commitments: 5,
        };
        setCurrentStep(map[fieldKey] || 1);
    };

    // Filter only provided fields
    const provided = fields.filter(({ key }) => {
        const v = data[key];
        if (v === null || v === undefined) return false;
        const s = String(v).trim();
        return s.length > 0;
    });

    return (
        <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white dark:bg-beta dark:shadow-none p-4 sm:p-6">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-lg font-semibold text-[#212529]">Review your details</h3>
                    <button
                        type="button"
                        onClick={() => setCurrentStep(8)}
                        className="w-full rounded-lg bg-alpha px-4 py-2 text-black hover:text-white transition-all duration-200 hover:bg-[#212529]/90 hover:shadow sm:w-auto"
                    >
                        Proceed to Game Intro
                    </button>
                </div>
                <div className="divide-y">
                    {provided.map(({ key, label }) => (
                        <div key={key} className="py-4">
                            {/* Mobile Layout */}
                            <div className="block sm:hidden">
                                <div className="mb-2 flex items-center justify-between">
                                    <h1 className="text-sm font-medium text-black dark:text-white">{label}</h1>
                                    <Button
                                        type="button"
                                        onClick={() => goToField(key)}
                                        className="px-3 py-1 text-xs"
                                    >
                                        Edit
                                    </Button>
                                </div>
                                <div className={`break-words ${darkMode ? 'text-white' : 'text-[#212529]'}`}>{String(data[key])}</div>
                                {errors[key] && <p className="mt-1 text-sm text-red-600">{errors[key]}</p>}
                            </div>

                            {/* Desktop Layout */}
                            <div className="hidden sm:flex sm:items-start sm:justify-between sm:gap-4">
                                <div className="min-w-[200px] text-sm font-medium text-black dark:text-white lg:min-w-[220px]">{label}</div>
                                <div className="flex-1">
                                    <div className={`break-words ${darkMode ? 'text-white' : 'text-[#212529]'}`}>{String(data[key])}</div>
                                    {errors[key] && <p className="mt-1 text-sm text-red-600">{errors[key]}</p>}
                                </div>
                                <div className="min-w-[80px] text-right">
                                    <Button
                                        type="button"
                                        onClick={() => goToField(key)}
                                        className="px-3 py-2 text-sm"
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
