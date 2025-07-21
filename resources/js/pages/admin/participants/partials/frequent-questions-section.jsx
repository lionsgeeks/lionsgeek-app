import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
// import { useToast } from "@/hooks/use-toast"

export function FrequentQuestionsSection({ participant }) {
    //   const { toast } = useToast()
    const { data, setData, processing, post } = useForm({
        participant_id: participant.id,
        mode_of_transportation: participant.questions.mode_of_transportation,
        living_situation: participant.questions.living_situation,
        where_have_you_heard_of_lionsgeek: participant.questions.where_have_you_heard_of_lionsgeek,
        academic_background: participant.questions.academic_background,
        professional_experience: participant.questions.professional_experience,
        interest_in_joining_lionsgeek: participant.questions.interest_in_joining_lionsgeek,
        technical_skills: participant.questions.technical_skills,
        profeciency_in_french: participant.questions.profeciency_in_french,
        profeciency_in_english: participant.questions.profeciency_in_english,
        strengths: participant.questions.strengths,
        weaknesses: participant.questions.weaknesses,
        do_you_have_a_laptop: participant.questions.do_you_have_a_laptop,
        available_all_week: participant.questions.available_all_week,
    });

    const handleSave = () => {
        post(route(`participant.questions`, participant.id))
    };

    const handleChange = (field, value) => {
        setData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Frequent Questions:</CardTitle>
                <Button onClick={handleSave} disabled={processing} size="sm">
                    Save
                </Button>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Background Section */}
                <Collapsible>
                    <CollapsibleTrigger>
                        <h3 className="mb-4 cursor-pointer pb-2 text-lg font-semibold">Background</h3>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className="">
                            <div>
                                <Label htmlFor="transportation">Mode of Transportation?</Label>
                                <Textarea
                                    id="transportation"
                                    value={data?.mode_of_transportation}
                                    onChange={(e) => handleChange('mode_of_transportation', e.target.value)}
                                    placeholder="Enter mode of transportation"
                                    className="mt-1"
                                    disabled={processing}
                                />
                            </div>

                            <div>
                                <Label htmlFor="living">Living Situation?</Label>
                                <Textarea
                                    id="living"
                                    value={data?.living_situation}
                                    onChange={(e) => handleChange('living_situation', e.target.value)}
                                    placeholder="Enter living situation"
                                    className="mt-1"
                                    disabled={processing}
                                />
                            </div>

                            <div>
                                <Label htmlFor="heard">Where have you heard of LionsGeek?</Label>
                                <Textarea
                                    id="heard"
                                    value={data?.where_have_you_heard_of_lionsgeek}
                                    onChange={(e) => handleChange('where_have_you_heard_of_lionsgeek', e.target.value)}
                                    placeholder="Enter how you heard about LionsGeek"
                                    className="mt-1"
                                    disabled={processing}
                                />
                            </div>

                            <div>
                                <Label htmlFor="academic">Academic Background?</Label>
                                <Textarea
                                    id="academic"
                                    value={data?.academic_background}
                                    onChange={(e) => handleChange('academic_background', e.target.value)}
                                    placeholder="Enter academic background"
                                    className="mt-1"
                                    disabled={processing}
                                />
                            </div>

                            <div>
                                <Label htmlFor="professional">Professional Experience?</Label>
                                <Textarea
                                    id="professional"
                                    value={data?.professional_experience}
                                    onChange={(e) => handleChange('professional_experience', e.target.value)}
                                    placeholder="Enter professional experience"
                                    className="mt-1"
                                    disabled={processing}
                                />
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
                {/* Interest Section */}
                <Collapsible>
                    <CollapsibleTrigger>
                        <h3 className="mb-4 cursor-pointer text-lg font-semibold">Interest</h3>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div>
                            <div>
                                <Label htmlFor="interest-joining">Interest In Joining Lionsgeek?</Label>
                                <Textarea
                                    id="interest-joining"
                                    value={data?.interest_in_joining_lionsgeek}
                                    onChange={(e) => handleChange('interest_in_joining_lionsgeek', e.target.value)}
                                    placeholder="Enter interest in joining"
                                    className="mt-1"
                                    disabled={processing}
                                />
                            </div>

                            <div>
                                <Label htmlFor="technical-skills">Technical Skills?</Label>
                                <Textarea
                                    id="technical-skills"
                                    value={data?.technical_skills}
                                    onChange={(e) => handleChange('technical_skills', e.target.value)}
                                    placeholder="Enter technical skills"
                                    className="mt-1"
                                    disabled={processing}
                                />
                            </div>

                            <div>
                                <Label htmlFor="french">Proficiency in French?</Label>
                                <Textarea
                                    id="french"
                                    value={data?.profeciency_in_french}
                                    onChange={(e) => handleChange('profeciency_in_french', e.target.value)}
                                    placeholder="Enter French proficiency level"
                                    className="mt-1"
                                    disabled={processing}
                                />
                            </div>

                            <div>
                                <Label htmlFor="english">Proficiency in English?</Label>
                                <Textarea
                                    id="english"
                                    value={data?.profeciency_in_english}
                                    onChange={(e) => handleChange('profeciency_in_english', e.target.value)}
                                    placeholder="Enter English proficiency level"
                                    className="mt-1"
                                    disabled={processing}
                                />
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
                {/* Additional Section */}
                <Collapsible>
                    <CollapsibleTrigger>
                        <h3 className="mb-4 cursor-pointer text-lg font-semibold">Additional</h3>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div>
                            <div>
                                <Label htmlFor="strengths">Strengths?</Label>
                                <Textarea
                                    id="strengths"
                                    value={data?.strengths}
                                    onChange={(e) => handleChange('strengths', e.target.value)}
                                    placeholder="Enter strengths"
                                    className="mt-1"
                                    disabled={processing}
                                />
                            </div>

                            <div>
                                <Label htmlFor="weaknesses">Weaknesses?</Label>
                                <Textarea
                                    id="weaknesses"
                                    value={data?.weaknesses}
                                    onChange={(e) => handleChange('weaknesses', e.target.value)}
                                    placeholder="Enter weaknesses"
                                    className="mt-1"
                                    disabled={processing}
                                />
                            </div>

                            <div>
                                <Label htmlFor="laptop">Do you have a laptop?</Label>
                                <Textarea
                                    id="laptop"
                                    value={data?.do_you_have_a_laptop}
                                    onChange={(e) => handleChange('do_you_have_a_laptop', e.target.value)}
                                    placeholder="Enter laptop availability"
                                    className="mt-1"
                                    disabled={processing}
                                />
                            </div>

                            <div>
                                <Label htmlFor="available">Available all week?</Label>
                                <Textarea
                                    id="available"
                                    value={data?.available_all_week}
                                    onChange={(e) => handleChange('available_all_week', e.target.value)}
                                    placeholder="Enter availability"
                                    className="mt-1"
                                    disabled={processing}
                                />
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>
    );
}
