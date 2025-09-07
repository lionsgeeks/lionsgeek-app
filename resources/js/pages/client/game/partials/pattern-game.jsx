import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAppContext } from '@/context/appContext';
import Modal from '@/components/Modal';
import { router, useForm } from '@inertiajs/react';
import { TransText } from '../../../../components/TransText';

// Inside your component, add this after your other useState hooks:

const COLORS = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308',
    '#84cc16', '#22c55e', '#10b981', '#14b8a6',
    '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
    '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
];

const SHAPES = ['square', 'circle', 'triangle', 'diamond'];
const SYMBOLS = ['●', '■', '▲', '♦', '★', '◆', '◇', '♠', '♥', '♣'];



export function PatternGame({ data: formDataProp }) {
    const { post, processing, errors } = useForm();

    const { darkMode } = useAppContext();
    const [currentLevel, setCurrentLevel] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(240);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [currentPuzzle, setCurrentPuzzle] = useState(null);
    const [levelAttempts, setLevelAttempts] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());
    const [feedback, setFeedback] = useState("");
    const [feedbackType, setFeedbackType] = useState(null); // 'success' | 'error'

    // Modal states for success/error feedback
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('success'); // 'success' | 'error'
    const [isSubmitting, setIsSubmitting] = useState(false);

    const timerRef = useRef(null);

    const questionPools = useMemo(() => buildQuestionPools(72, 123456), []);
    const gamePlan = useMemo(() => (
        [...Array(8).fill('easy'), ...Array(7).fill('medium'), ...Array(4).fill('hard'), ...Array(1).fill('extreme')]
    ), []);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeRemaining((t) => {
                if (t <= 1) {
                    clearInterval(timerRef.current);
                    setTimeOver(true);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, []);

    useEffect(() => {
        generateLevel();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentLevel]);

    function buildQuestionPools(total, seed) {
        const rng = createRng(seed);
        const pick = (arr) => arr[Math.floor(rng() * arr.length)];
        const pools = { easy: [], medium: [], hard: [], extreme: [] };
        // 72 total: 12 easy, 20 medium, 30 hard, 10 extreme
        const targets = { easy: 12, medium: 20, hard: 30, extreme: 10 };

        const symFor = (shape) => (shape === 'circle' ? '●' : shape === 'square' ? '■' : shape === 'triangle' ? '▲' : '♦');

        for (let i = 0; i < targets.easy; i++) {
            const rule = Math.floor(rng() * 3);
            if (rule === 0) {
                const color = pick(COLORS);
                const cycle = ['circle', 'square', 'triangle', 'diamond'];
                const start = Math.floor(rng() * cycle.length);
                const seq = [0, 1, 2].map((j) => ({ shape: cycle[(start + j) % 4], color, symbol: symFor(cycle[(start + j) % 4]) }));
                const nextShape = cycle[(start + 3) % 4];
                pools.easy.push({ sequence: seq, correct: { shape: nextShape, color, symbol: symFor(nextShape) } });
            } else if (rule === 1) {
                const shape = 'circle';
                const start = Math.floor(rng() * (COLORS.length - 4));
                const seq = [0, 1, 2].map((j) => ({ shape, color: COLORS[start + j], symbol: '●' }));
                pools.easy.push({ sequence: seq, correct: { shape, color: COLORS[start + 3], symbol: '●' } });
            } else {
                const shape = 'square';
                const step = [1, 2, 3][Math.floor(rng() * 3)];
                const start = Math.floor(rng() * 5) + 1;
                const nums = [start, start + step, start + 2 * step];
                pools.easy.push({ sequence: nums.map((n) => ({ shape, color: COLORS[2], symbol: String(n) })), correct: { shape, color: COLORS[2], symbol: String(start + 3 * step) } });
            }
        }

        for (let i = 0; i < targets.medium; i++) {
            const choose = Math.floor(rng() * 5);
            if (choose === 0) {
                const color = pick(COLORS);
                const a = 'diamond', b = 'circle';
                const seq = [
                    { shape: a, color, symbol: symFor(a) },
                    { shape: b, color, symbol: symFor(b) },
                    { shape: a, color, symbol: symFor(a) },
                    { shape: b, color, symbol: symFor(b) },
                ];
                pools.medium.push({ sequence: seq, correct: { shape: a, color, symbol: symFor(a) } });
            } else if (choose === 1) {
                const shape = 'diamond';
                const step = [1, 2, 3, 4][Math.floor(rng() * 4)];
                const start = step * (Math.floor(rng() * 6) + 5);
                const nums = [start, start - step, start - 2 * step];
                pools.medium.push({ sequence: nums.map((n) => ({ shape, color: COLORS[9], symbol: String(n) })), correct: { shape, color: COLORS[9], symbol: String(start - 3 * step) } });
            } else if (choose === 2) {
                const shape = 'square';
                const base = Math.floor(rng() * 5) + 1;
                const nums = [base, base + 1, base + 2].map((x) => x * x);
                pools.medium.push({ sequence: nums.map((n) => ({ shape, color: COLORS[7], symbol: String(n) })), correct: { shape, color: COLORS[7], symbol: String((base + 3) * (base + 3)) } });
            } else if (choose === 3) {
                const shape = 'square';
                const step = [3, 4, 5][Math.floor(rng() * 3)];
                const start = Math.floor(rng() * 10) + 5;
                const nums = [start, start + step, start + 2 * step];
                pools.medium.push({ sequence: nums.map((n) => ({ shape, color: COLORS[4], symbol: String(n) })), correct: { shape, color: COLORS[4], symbol: String(start + 3 * step) } });
            } else {
                // alternating +a then *b
                const shape = 'circle';
                const a = Math.floor(rng() * 6) + 2; // 2..7
                const b = [2, 3][Math.floor(rng() * 2)]; // 2 or 3
                const start = Math.floor(rng() * 10) + 5; // 5..14
                const x1 = start;
                const x2 = x1 + a;
                const x3 = x2 * b;
                const x4 = x3 + a;
                pools.medium.push({ sequence: [x1, x2, x3].map((n) => ({ shape, color: COLORS[8], symbol: String(n) })), correct: { shape, color: COLORS[8], symbol: String(x4) } });
            }
        }

        for (let i = 0; i < targets.hard; i++) {
            const pickRule = Math.floor(rng() * 5);
            if (pickRule === 0) {
                const shape = 'circle';
                const k = [3, 4, 5][Math.floor(rng() * 3)];
                const start = [5, 6, 7, 8, 9][Math.floor(rng() * 5)];
                const nums = [start, start * k, start * k * k];
                pools.hard.push({ sequence: nums.map((n) => ({ shape, color: COLORS[8], symbol: String(n) })), correct: { shape, color: COLORS[8], symbol: String(nums[2] * k) } });
            } else if (pickRule === 1) {
                const shape = 'triangle';
                const a = [13, 21, 34][Math.floor(rng() * 3)], b = [21, 34, 55][Math.floor(rng() * 3)];
                const c = a + b, d = b + c;
                pools.hard.push({ sequence: [a, b, c].map((n) => ({ shape, color: COLORS[6], symbol: String(n) })), correct: { shape, color: COLORS[6], symbol: String(d) } });
            } else if (pickRule === 2) {
                const colorStart = Math.floor(rng() * (COLORS.length - 4));
                const shapes = ['circle', 'square', 'triangle'];
                const seq = shapes.slice(0, 3).map((s, i) => ({ shape: s, color: COLORS[colorStart + i], symbol: symFor(s) }));
                pools.hard.push({ sequence: seq, correct: { shape: 'diamond', color: COLORS[colorStart + 3], symbol: symFor('diamond') } });
            } else if (pickRule === 3) {
                // quadratic n^2 + c
                const shape = 'square';
                const n0 = Math.floor(rng() * 5) + 5; // 5..9
                const c = Math.floor(rng() * 50) + 10; // 10..59
                const nums = [n0, n0 + 1, n0 + 2].map((n) => n * n + c);
                const next = (n0 + 3) * (n0 + 3) + c;
                pools.hard.push({ sequence: nums.map((n) => ({ shape, color: COLORS[5], symbol: String(n) })), correct: { shape, color: COLORS[5], symbol: String(next) } });
            } else {
                // second-difference constant (increasing difference)
                const shape = 'diamond';
                const d = Math.floor(rng() * 6) + 3; // base diff 3..8
                const r = Math.floor(rng() * 4) + 2; // growth 2..5
                const x1 = Math.floor(rng() * 40) + 30; // 30..69
                const x2 = x1 + d;
                const x3 = x2 + d + r;
                const x4 = x3 + d + 2 * r;
                pools.hard.push({ sequence: [x1, x2, x3].map((n) => ({ shape, color: COLORS[3], symbol: String(n) })), correct: { shape, color: COLORS[3], symbol: String(x4) } });
            }
        }

        for (let i = 0; i < targets.extreme; i++) {
            const which = Math.floor(rng() * 5);
            if (which === 0) {
                // alternating *2 then *3
                const shape = 'square';
                const base = Math.floor(rng() * 5) + 2; // 2..6 (keeps values large but reasonable)
                const a = base;
                const b = a * 2;
                const c = b * 3;
                const d = c * 2;
                pools.extreme.push({ sequence: [a, b, c].map((n) => ({ shape, color: COLORS[1], symbol: String(n) })), correct: { shape, color: COLORS[1], symbol: String(d) } });
            } else if (which === 1) {
                // tribonacci with large seeds
                const shape = 'triangle';
                const a = Math.floor(rng() * 30) + 40; // 40..69
                const b = a + Math.floor(rng() * 20) + 20; // +20..39
                const c = b + Math.floor(rng() * 20) + 20;
                const d = a + b + c;
                pools.extreme.push({ sequence: [a, b, c].map((n) => ({ shape, color: COLORS[0], symbol: String(n) })), correct: { shape, color: COLORS[0], symbol: String(d) } });
            } else if (which === 2) {
                // prime squares (bigger primes)
                const shape = 'circle';
                const primes = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53];
                const startIdx = Math.floor(rng() * (primes.length - 4));
                const seqNums = [primes[startIdx], primes[startIdx + 1], primes[startIdx + 2]].map((p) => p * p);
                const next = primes[startIdx + 3] * primes[startIdx + 3];
                pools.extreme.push({ sequence: seqNums.map((n) => ({ shape, color: COLORS[2], symbol: String(n) })), correct: { shape, color: COLORS[2], symbol: String(next) } });
            } else if (which === 3) {
                // powers of 3 with big exponents
                const shape = 'diamond';
                const e = Math.floor(rng() * 2) + 5; // 5..6
                const pow = (x, y) => Math.round(Math.exp(y * Math.log(x))); // safer
                const seqNums = [pow(3, e), pow(3, e + 1), pow(3, e + 2)];
                const next = pow(3, e + 3);
                pools.extreme.push({ sequence: seqNums.map((n) => ({ shape, color: COLORS[4], symbol: String(n) })), correct: { shape, color: COLORS[4], symbol: String(next) } });
            } else {
                // mixed: ((x + a) * b) ^ 2 pattern simplified as numbers
                const shape = 'square';
                const x = Math.floor(rng() * 20) + 10; // 10..29
                const a = Math.floor(rng() * 10) + 5; // 5..14
                const b = Math.floor(rng() * 3) + 2; // 2..4
                const n1 = x;
                const n2 = (x + a) * b;
                const n3 = (n2 + a) * b;
                const n4 = (n3 + a) * b;
                pools.extreme.push({ sequence: [n1, n2, n3].map((n) => ({ shape, color: COLORS[10], symbol: String(n) })), correct: { shape, color: COLORS[10], symbol: String(n4) } });
            }
        }

        return pools;
    }

    function createRng(seed) {
        let s = seed >>> 0;
        return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
    }

    function generateLevel() {
        if (currentLevel >= gamePlan.length) {
            endGame(true);
            return;
        }

        // Clear any previous feedback when moving to a new level
        setFeedback("");
        setFeedbackType(null);

        setLevelAttempts((prev) => {
            const next = [...prev];
            if (!next[currentLevel]) {
                next[currentLevel] = { attempts: 0, correct: false, timeSpent: 0, startTime: Date.now() };
            }
            return next;
        });

        const difficulty = gamePlan[currentLevel];
        const pool = questionPools[difficulty];
        const idx = Math.floor(Math.random() * pool.length);
        const nextPuzzle = pool.splice(idx, 1)[0];
        setCurrentPuzzle(nextPuzzle);
        setSelectedChoice(null);
    }

    function generateChoices() {
        if (!currentPuzzle) return [];
        const choices = [currentPuzzle.correct];
        while (choices.length < 4) {
            let wrongChoice;
            const correctNum = parseInt(currentPuzzle.correct.symbol);
            if (!Number.isNaN(correctNum)) {
                const variations = [
                    correctNum + 1, correctNum - 1, correctNum + 2, correctNum - 2,
                    correctNum * 2, Math.floor(correctNum / 2), correctNum + 5, correctNum - 5,
                ].filter((n) => n > 0);
                wrongChoice = {
                    shape: currentPuzzle.correct.shape,
                    color: currentPuzzle.correct.color,
                    symbol: variations[Math.floor(Math.random() * variations.length)].toString(),
                };
            } else {
                wrongChoice = {
                    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
                    color: COLORS[Math.floor(Math.random() * COLORS.length)],
                    symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
                };
            }
            if (!choices.some((c) => isEqual(c, wrongChoice))) {
                choices.push(wrongChoice);
            }
        }
        return choices.sort(() => Math.random() - 0.5);
    }

    function submitAnswer() {
        if (!selectedChoice || !currentPuzzle) return;
        setAttempts((a) => a + 1);
        setLevelAttempts((prev) => {
            const next = [...prev];
            next[currentLevel].attempts += 1;
            return next;
        });

        const isCorrect = isEqual(selectedChoice, currentPuzzle.correct);
        if (isCorrect) {
            setLevelAttempts((prev) => {
                const next = [...prev];
                next[currentLevel].correct = true;
                next[currentLevel].timeSpent = Date.now() - next[currentLevel].startTime;
                return next;
            });
            setCorrectAnswers((c) => c + 1);
            setFeedback('Correct! Moving to next level...');
            setFeedbackType('success');
            setTimeout(() => setCurrentLevel((l) => l + 1), 800);
        } else {
            setSelectedChoice(null);
            setFeedback('Incorrect! Try again.');
            setFeedbackType('error');
        }
    }

    function isEqual(a, b) {
        return a.shape === b.shape && a.color === b.color && a.symbol === b.symbol;
    }

    function endGame(completed) {
        setGameCompleted(true);
        clearInterval(timerRef.current);
        setTimeout(() => setShowEnd(true), 0);
        setCompletedFlag(completed);
        // clear session flag after finishing (optional: just redirect home)
    }

    const [showEnd, setShowEnd] = useState(false);
    const [completedFlag, setCompletedFlag] = useState(false);
    const [timeOver, setTimeOver] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Auto-submit once finished (all levels) or when time is over
    useEffect(() => {
        if ((showEnd || timeOver) && !submitted) {
            setSubmitted(true);
            handleFormSubmission();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showEnd, timeOver]);

    // Handle form submission when user clicks "Postuler"
    // const handleFormSubmission = () => {
    //     // Check what's in sessionStorage first
    //     const rawData = sessionStorage.getItem('formData');
    //     console.log('🔍 Raw sessionStorage data:', rawData);

    //     // Retrieve form data from sessionStorage (stored when user left the form)
    //     const formData = JSON.parse(rawData);

    //     console.log('🔍 Debug: Parsed form data:', formData);
    //     console.log('🔍 Form data keys:', formData ? Object.keys(formData) : 'No data');

    //     if (formData) {
    //         console.log('✅ Form data found, submitting to /participants/store');

    //         // Submit the form data to create participant
    //        post('/participants/store', formData, {
    //             onSuccess: (response) => {
    //                 console.log('✅ Submission successful:', response);
    //                 // Clear session storage after successful submission
    //                 sessionStorage.removeItem('formData');

    //                 // Redirect to home page
    //                 // router.visit('/');
    //             },
    //             onError: (errors) => {
    //                 console.error('❌ Submission errors:', errors);
    //                 console.error('❌ Error details:', JSON.stringify(errors, null, 2));
    //                 console.error('❌ Form data that failed:', formData);

    //                 // Show specific validation errors
    //                 if (errors.message) {
    //                     console.error('❌ Error message:', errors.message);
    //                 }
    //                 if (errors.errors) {
    //                     console.error('❌ Validation errors:', errors.errors);
    //                 }

    //                 // Don't redirect on error so we can see what's wrong
    //                 alert('Form submission failed! Check console for details.');
    //             }
    //         });
    //     } else {
    //         alert('❌ No form data found in sessionStorage');
    //         // No form data found, just redirect to home
    //         alert('/');
    //     }
    // };

    const handleFormSubmission = () => {
        try {
            // Prefer in-memory data; fallback to sessionStorage if user refreshed
            const fallbackRaw = sessionStorage.getItem('formData');
            const fallback = fallbackRaw ? JSON.parse(fallbackRaw) : null;
            const formData = (formDataProp && Object.keys(formDataProp).length ? formDataProp : null) || fallback;

            if (formData) {
                const elapsedMs = Date.now() - startTime;
                const submissionData = {
                    ...formData,
                    // Game metrics
                    game_completed: completedFlag,
                    correct_answers: correctAnswers,
                    levels_completed: currentLevel,
                    total_attempts: attempts,
                    wrong_attempts: Math.max(0, attempts - correctAnswers),
                    time_spent: Math.floor(elapsedMs / 1000),
                    time_spent_formatted: formatElapsed(elapsedMs),
                };

                setIsSubmitting(true);

                // Use router.post and force multipart to ensure File objects (cv_file) are sent
                router.post('/participants/store', submissionData, {
                    forceFormData: true,
                    onSuccess: () => {
                        sessionStorage.removeItem('formData');
                        setIsSubmitting(false);
                        setModalType('success');
                        setShowModal(true);
                    },
                    onError: (errs) => {
                        setIsSubmitting(false);
                        setModalType('error');
                        setShowModal(true);
                    }
                });
            } else {
                setModalType('error');
                setShowModal(true);
            }
        } catch (error) {
            setIsSubmitting(false);
            setModalType('error');
            setShowModal(true);
        }
    };



    const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
    const seconds = (timeRemaining % 60).toString().padStart(2, '0');

    function restart() {
        setCurrentLevel(0);
        setScore(0);
        setAttempts(0);
        setTimeRemaining(240);
        setSelectedChoice(null);
        setGameCompleted(false);
        setLevelAttempts([]);
        setCorrectAnswers(0);
        setStartTime(Date.now());
        setFeedback("");
        setFeedbackType(null);
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTimeRemaining((t) => (t <= 1 ? 0 : t - 1));
        }, 1000);
    }

    const choices = useMemo(() => generateChoices(), [currentPuzzle]);

    return (
        <div className="space-y-6">
            {/* Only show game header if game is active */}
            {!showEnd && !timeOver && (
                <div className="text-center">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-beta mb-2">Pattern Master</h1>
                    <h2 className={`text-base sm:text-lg font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>Find the Pattern</h2>
                </div>
            )}

            {!showEnd && !timeOver && (
                <div className="space-y-6">

                    <p className={`${darkMode ? 'text-white' : 'text-black'} text-center mb-4 sm:mb-6 text-sm sm:text-base`}>Study the sequence and determine what comes next</p>

                    <div className="flex min-h-[100px] sm:min-h-[120px] flex-wrap items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                        {currentPuzzle?.sequence?.map((item, i) => (
                            <PatternItem key={i} item={item} />
                        ))}
                        <div className={`grid h-16 w-16 sm:h-20 sm:w-20 place-items-center rounded-xl border-2 border-dashed ${darkMode ? 'border-beta/50 text-white/60' : 'border-beta text-black/60'}`}>?</div>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        <div className={`text-center font-medium text-sm sm:text-base ${darkMode ? 'text-white' : 'text-black'}`}>Choose the next item:</div>
                        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                            {choices.map((choice, idx) => (
                                <ChoiceItem key={idx} item={choice} selected={isEqual(selectedChoice || {}, choice)} onClick={() => setSelectedChoice(choice)} />
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-3 flex-wrap mt-6 sm:mt-8">
                        <button
                            type="button"
                            className={`rounded-lg px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold transition-all duration-200 shadow-lg w-full sm:w-auto ${
                                selectedChoice 
                                    ? 'bg-alpha text-beta hover:bg-alpha/90 hover:shadow-xl transform hover:scale-105' 
                                    : 'bg-gray-400 text-gray-200 cursor-not-allowed shadow-gray-400/30'
                            } ${darkMode && !selectedChoice ? 'bg-gray-600 text-gray-400' : ''}`}
                            onClick={submitAnswer}
                            disabled={!selectedChoice}
                        >
                            <TransText en="Submit Answer" fr="Soumettre la réponse" ar="إرسال الإجابة" />
                        </button>
                    </div>

                    {feedback && (
                        <div className={`text-center font-medium mt-4 px-4 py-2 rounded-lg transition-all duration-300 ${
                            feedbackType === 'success' 
                                ? 'text-green-600 bg-green-100 border border-green-200' + (darkMode ? ' !text-green-400 !bg-green-900/30 !border-green-800' : '')
                                : feedbackType === 'error' 
                                ? 'text-red-600 bg-red-100 border border-red-200' + (darkMode ? ' !text-red-400 !bg-red-900/30 !border-red-800' : '')
                                : darkMode ? 'text-white bg-gray-800 border border-gray-700' : 'text-black bg-gray-100 border border-gray-200'
                        }`}>
                            {feedback}
                        </div>
                    )}
                </div>
            )}

            {/* Show loading state when submitting */}
            {showEnd && isSubmitting && (
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-beta mx-auto"></div>
                    <p className={`${darkMode ? 'text-white' : 'text-black'}`}>
                        <TransText en="Submitting your application..." fr="Soumission de votre candidature..." ar="جاري إرسال طلبك..." />
                    </p>
                </div>
            )}

            {/* Success/Error Modal - Always visible when showModal is true */}
            {showModal && (
                <Modal
                    validate={modalType === 'success'}
                    confirm={showModal}
                    title={modalType === 'success' ?
                        <TransText en="Registration Successful!" fr="Inscription réussie !" ar="تم التسجيل بنجاح!" /> :
                        <TransText en="Registration Failed" fr="Échec de l'inscription" ar="فشل التسجيل" />
                    }
                    message={modalType === 'success' ?
                        <div className="space-y-2">
                            <p>
                                <TransText
                                    en="Thank you for completing your application! We have received your information and will contact you soon."
                                    fr="Merci d'avoir complété votre candidature ! Nous avons reçu vos informations et vous contacterons bientôt."
                                    ar="شكراً لك على إكمال طلبك! لقد تلقينا معلوماتك وسنتواصل معك قريباً."
                                />
                            </p>
                            <p className="text-sm opacity-80">
                                <TransText
                                    en="Please check your email inbox (including spam folder) for a confirmation message."
                                    fr="Veuillez vérifier votre boîte e-mail (y compris le dossier spam) pour un message de confirmation."
                                    ar="يرجى التحقق من صندوق البريد الإلكتروني (بما في ذلك مجلد الرسائل المزعجة) للحصول على رسالة تأكيد."
                                />
                            </p>
                        </div> :
                        <TransText
                            en="There was an error processing your application. Please try again or contact support if the problem persists."
                            fr="Il y a eu une erreur lors du traitement de votre candidature. Veuillez réessayer ou contacter le support si le problème persiste."
                            ar="حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى أو الاتصال بالدعم إذا استمر المشكلة."
                        />
                    }
                    action={
                        <button
                            onClick={() => {
                                setShowModal(false);
                                if (modalType === 'success') {
                                    router.visit('/');
                                } else {
                                    // On error, redirect back to postuler page (step 1) to retry
                                    router.visit('/postuler');
                                }
                            }}
                            className={`rounded-lg px-6 py-3 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                modalType === 'success' 
                                    ? 'bg-alpha text-beta hover:bg-alpha/90 focus:ring-alpha' 
                                    : 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500'
                            } ${darkMode && modalType !== 'success' ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'}`}
                            disabled={isSubmitting}
                        >
                            {modalType === 'success' ?
                                <TransText en="Go to Home" fr="Aller à l'accueil" ar="الذهاب للرئيسية" /> :
                                <TransText en="Try Again" fr="Réessayer" ar="حاول مرة أخرى" />
                            }
                        </button>
                    }
                />
            )}
        </div>
    );
}

function formatElapsed(totalMs) {
    const minutes = Math.floor(totalMs / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

function PatternItem({ item }) {
    const { darkMode } = useAppContext();
    return (
        <div className={`grid h-16 w-16 sm:h-20 sm:w-20 place-items-center rounded-xl border-2 shadow-md ${darkMode ? 'shadow-gray-900/50' : 'shadow-gray-200/50'}`} 
             style={{ backgroundColor: item.color, borderColor: item.color }}>
            <span className={`text-lg sm:text-xl font-bold drop-shadow-sm ${darkMode ? 'text-black' : 'text-black'}`}>{item.symbol}</span>
        </div>
    );
}

function ChoiceItem({ item, selected, onClick }) {
    const { darkMode } = useAppContext();
    return (
        <button
            type="button"
            onClick={onClick}
            className={`grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-xl border-2 transition-all duration-200 shadow-md hover:scale-105 ${
                selected 
                    ? 'ring-4 ring-alpha ring-offset-2 transform scale-105' + (darkMode ? ' ring-offset-gray-800' : ' ring-offset-white') 
                    : 'hover:shadow-lg'
            } ${darkMode ? 'shadow-gray-900/50 hover:shadow-gray-900/70' : 'shadow-gray-200/50 hover:shadow-gray-300/70'}`}
            style={{ backgroundColor: item.color, borderColor: item.color }}
        >
            <span className={`text-base sm:text-lg font-bold drop-shadow-sm ${darkMode ? 'text-black' : 'text-black'}`}>{item.symbol}</span>
        </button>
    );
}

function Stat({ label, value }) {
    const { darkMode } = useAppContext();
    return (
        <div className={`flex items-center justify-between border-b pb-2 last:border-b-0 ${
            darkMode ? 'border-gray-600/30' : 'border-gray-300/30'
        }`}>
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span>
            <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{value}</span>
        </div>
    );
}


