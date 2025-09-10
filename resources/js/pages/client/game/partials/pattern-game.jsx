import Modal from '@/components/Modal';
import { useAppContext } from '@/context/appContext';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { TransText } from '../../../../components/TransText';

// Inside your component, add this after your other useState hooks:

const COLORS = [
    '#ef4444',
    '#f97316',
    '#f59e0b',
    '#eab308',
    '#84cc16',
    '#22c55e',
    '#10b981',
    '#14b8a6',
    '#06b6d4',
    '#0ea5e9',
    '#3b82f6',
    '#6366f1',
    '#8b5cf6',
    '#a855f7',
    '#d946ef',
    '#ec4899',
];

const SHAPES = ['square', 'circle', 'triangle', 'diamond'];
const SYMBOLS = ['●', '■', '▲', '♦', '★', '◆', '◇', '♠', '♥', '♣'];

export function PatternGame({ data: formDataProp }) {
    const [intelligenceLevel, setIntelligenceLevel] = useState(null);


    const { post, processing, errors } = useForm();
    

    const { darkMode, selectedLanguage } = useAppContext();
    const [currentLevel, setCurrentLevel] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(240);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [currentPuzzle, setCurrentPuzzle] = useState(null);
    const [levelAttempts, setLevelAttempts] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());
    const [feedback, setFeedback] = useState('');
    const [feedbackType, setFeedbackType] = useState(null); // 'success' | 'error'

    // Modal states for success/error feedback
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('success'); // 'success' | 'error'
    const [isSubmitting, setIsSubmitting] = useState(false);

    const timerRef = useRef(null);

    const questionPools = useMemo(() => buildQuestionPools(72, 123456), []);
    const gamePlan = useMemo(() => [...Array(8).fill('easy'), ...Array(7).fill('medium'), ...Array(4).fill('hard'), ...Array(1).fill('extreme')], []);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeRemaining((t) => {
                if (t <= 1) {
                    clearInterval(timerRef.current);
                    // Time is up - show loading page and set processing
                    setIsSubmitting(true);
                    showLoadingPage();
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
                pools.easy.push({
                    sequence: nums.map((n) => ({ shape, color: COLORS[2], symbol: String(n) })),
                    correct: { shape, color: COLORS[2], symbol: String(start + 3 * step) },
                });
            }
        }

        for (let i = 0; i < targets.medium; i++) {
            const choose = Math.floor(rng() * 5);
            if (choose === 0) {
                const color = pick(COLORS);
                const a = 'diamond',
                    b = 'circle';
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
                pools.medium.push({
                    sequence: nums.map((n) => ({ shape, color: COLORS[9], symbol: String(n) })),
                    correct: { shape, color: COLORS[9], symbol: String(start - 3 * step) },
                });
            } else if (choose === 2) {
                const shape = 'square';
                const base = Math.floor(rng() * 5) + 1;
                const nums = [base, base + 1, base + 2].map((x) => x * x);
                pools.medium.push({
                    sequence: nums.map((n) => ({ shape, color: COLORS[7], symbol: String(n) })),
                    correct: { shape, color: COLORS[7], symbol: String((base + 3) * (base + 3)) },
                });
            } else if (choose === 3) {
                const shape = 'square';
                const step = [3, 4, 5][Math.floor(rng() * 3)];
                const start = Math.floor(rng() * 10) + 5;
                const nums = [start, start + step, start + 2 * step];
                pools.medium.push({
                    sequence: nums.map((n) => ({ shape, color: COLORS[4], symbol: String(n) })),
                    correct: { shape, color: COLORS[4], symbol: String(start + 3 * step) },
                });
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
                pools.medium.push({
                    sequence: [x1, x2, x3].map((n) => ({ shape, color: COLORS[8], symbol: String(n) })),
                    correct: { shape, color: COLORS[8], symbol: String(x4) },
                });
            }
        }

        for (let i = 0; i < targets.hard; i++) {
            const pickRule = Math.floor(rng() * 5);
            if (pickRule === 0) {
                const shape = 'circle';
                const k = [3, 4, 5][Math.floor(rng() * 3)];
                const start = [5, 6, 7, 8, 9][Math.floor(rng() * 5)];
                const nums = [start, start * k, start * k * k];
                pools.hard.push({
                    sequence: nums.map((n) => ({ shape, color: COLORS[8], symbol: String(n) })),
                    correct: { shape, color: COLORS[8], symbol: String(nums[2] * k) },
                });
            } else if (pickRule === 1) {
                const shape = 'triangle';
                const a = [13, 21, 34][Math.floor(rng() * 3)],
                    b = [21, 34, 55][Math.floor(rng() * 3)];
                const c = a + b,
                    d = b + c;
                pools.hard.push({
                    sequence: [a, b, c].map((n) => ({ shape, color: COLORS[6], symbol: String(n) })),
                    correct: { shape, color: COLORS[6], symbol: String(d) },
                });
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
                pools.hard.push({
                    sequence: nums.map((n) => ({ shape, color: COLORS[5], symbol: String(n) })),
                    correct: { shape, color: COLORS[5], symbol: String(next) },
                });
            } else {
                // second-difference constant (increasing difference)
                const shape = 'diamond';
                const d = Math.floor(rng() * 6) + 3; // base diff 3..8
                const r = Math.floor(rng() * 4) + 2; // growth 2..5
                const x1 = Math.floor(rng() * 40) + 30; // 30..69
                const x2 = x1 + d;
                const x3 = x2 + d + r;
                const x4 = x3 + d + 2 * r;
                pools.hard.push({
                    sequence: [x1, x2, x3].map((n) => ({ shape, color: COLORS[3], symbol: String(n) })),
                    correct: { shape, color: COLORS[3], symbol: String(x4) },
                });
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
                pools.extreme.push({
                    sequence: [a, b, c].map((n) => ({ shape, color: COLORS[1], symbol: String(n) })),
                    correct: { shape, color: COLORS[1], symbol: String(d) },
                });
            } else if (which === 1) {
                // tribonacci with large seeds
                const shape = 'triangle';
                const a = Math.floor(rng() * 30) + 40; // 40..69
                const b = a + Math.floor(rng() * 20) + 20; // +20..39
                const c = b + Math.floor(rng() * 20) + 20;
                const d = a + b + c;
                pools.extreme.push({
                    sequence: [a, b, c].map((n) => ({ shape, color: COLORS[0], symbol: String(n) })),
                    correct: { shape, color: COLORS[0], symbol: String(d) },
                });
            } else if (which === 2) {
                // prime squares (bigger primes)
                const shape = 'circle';
                const primes = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53];
                const startIdx = Math.floor(rng() * (primes.length - 4));
                const seqNums = [primes[startIdx], primes[startIdx + 1], primes[startIdx + 2]].map((p) => p * p);
                const next = primes[startIdx + 3] * primes[startIdx + 3];
                pools.extreme.push({
                    sequence: seqNums.map((n) => ({ shape, color: COLORS[2], symbol: String(n) })),
                    correct: { shape, color: COLORS[2], symbol: String(next) },
                });
            } else if (which === 3) {
                // powers of 3 with big exponents
                const shape = 'diamond';
                const e = Math.floor(rng() * 2) + 5; // 5..6
                const pow = (x, y) => Math.round(Math.exp(y * Math.log(x))); // safer
                const seqNums = [pow(3, e), pow(3, e + 1), pow(3, e + 2)];
                const next = pow(3, e + 3);
                pools.extreme.push({
                    sequence: seqNums.map((n) => ({ shape, color: COLORS[4], symbol: String(n) })),
                    correct: { shape, color: COLORS[4], symbol: String(next) },
                });
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
                pools.extreme.push({
                    sequence: [n1, n2, n3].map((n) => ({ shape, color: COLORS[10], symbol: String(n) })),
                    correct: { shape, color: COLORS[10], symbol: String(n4) },
                });
            }
        }

        return pools;
    }

    function createRng(seed) {
        let s = seed >>> 0;
        return function () {
            s = (s * 1664525 + 1013904223) >>> 0;
            return s / 4294967296;
        };
    }

    function generateLevel() {
        if (currentLevel >= gamePlan.length) {
            endGame(true);
            return;
        }

        // Clear any previous feedback when moving to a new level
        setFeedback('');
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
                    correctNum + 1,
                    correctNum - 1,
                    correctNum + 2,
                    correctNum - 2,
                    correctNum * 2,
                    Math.floor(correctNum / 2),
                    correctNum + 5,
                    correctNum - 5,
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
    // function calculateIntelligenceLevel() {
    //     const totalScore = levelAttempts.reduce((sum, lvl) => sum + (lvl.totalScore || 0), 0);
    //     if (totalScore > 90) setIntelligenceLevel('Very High');
    //     else if (totalScore > 60) setIntelligenceLevel('High'); 
    //     else if (totalScore > 30) setIntelligenceLevel('Medium'); 
    //     else return setIntelligenceLevel('Low');
    // }



    function getScoreForAnswer(isCorrect, timeTakenMs) { 
        if (!isCorrect) return -2;
        if (timeTakenMs <= 5000) return 7;
        if (timeTakenMs <= 10000 && timeTakenMs >= 5000) return 5;
        return 4;
    }

    function submitAnswer() {
        if (!selectedChoice || !currentPuzzle) return;

        const isCorrect = isEqual(selectedChoice, currentPuzzle.correct);
        const timeTaken = Date.now() - (levelAttempts[currentLevel]?.startTime || 0 );
        const score = getScoreForAnswer(isCorrect, timeTaken);

        setAttempts((a) => a + 1);
        setLevelAttempts((prev) => {
            const next = [...prev];
            if (!next[currentLevel]) {
                next[currentLevel] = {
                    attempts: 0,
                    correct: false,
                    totalScore: 0,
                    timeSpent: 0,
                    startTime: Date.now(),
                };
            }

            next[currentLevel].attempts += 1;

            next[currentLevel].totalScore = (next[currentLevel].totalScore || 0) + score;
            if (isCorrect) {
                next[currentLevel].correct = true;
                next[currentLevel].timeSpent = timeTaken;
            }


            const totalCorrectAnswers = next.filter(level => level.correct).length;
            const totalPoints = next.reduce((acc, level) => acc + (level.totalScore || 0), 0);

            // logggggggggggggggggggggggggggggg
            console.log('Total Correct Answers:', totalCorrectAnswers);
            console.log('Total Points:', totalPoints);
            console.log('Score:', score, 'Correct:', isCorrect, 'Time:', timeTaken);
            // logggggggggggggggggggggggggggggg

            return next;
        });

        if (isCorrect) {
            setLevelAttempts((prev) => {
                const next = [...prev];
                next[currentLevel].correct = true;
                next[currentLevel].timeSpent = Date.now() - next[currentLevel].startTime;
                return next;
            });
            setCorrectAnswers((c) => c + 1);
            
            // Check if this is the last level
            if (currentLevel >= gamePlan.length - 1) {
                // This is the last question - show loading page immediately and set processing
                setIsSubmitting(true);
                showLoadingPage();
                setFeedback('Correct! Submitting your application...');
                setFeedbackType('success');
                // End game immediately without delay
                endGame(true);
            } else {
                setFeedback('Correct! Moving to next level...');
                setFeedbackType('success');
                setTimeout(() => setCurrentLevel((l) => l + 1), 800);
            }
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
        setShowEnd(true);
        setCompletedFlag(completed);
        // calculateIntelligenceLevel();
        // Persist game metrics to sessionStorage so summary can show them
        try {
            const elapsedMs = Date.now() - startTime;
            const gameData = {
                game_completed: completed,
                correct_answers: correctAnswers,
                levels_completed: currentLevel,
                total_attempts: attempts,
                wrong_attempts: Math.max(0, attempts - correctAnswers),
                time_spent: Math.floor(elapsedMs / 1000),
                time_spent_formatted: formatElapsed(elapsedMs),
                intelligenceLevel: intelligenceLevel
            };
            const raw = sessionStorage.getItem('formData');
            const existing = raw ? JSON.parse(raw) : {};
            sessionStorage.setItem('formData', JSON.stringify({ ...existing, ...gameData }));
        } catch {}
        // clear session flag after finishing (optional)
    }

    const [showEnd, setShowEnd] = useState(false);
    const [completedFlag, setCompletedFlag] = useState(false);
    const [timeOver, setTimeOver] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorDetails, setErrorDetails] = useState(null);
    const submittedRef = useRef(false);

    // Auto-submit once finished (all levels) or when time is over
    useEffect(() => {
        if ((showEnd || timeOver) && !submittedRef.current) {
            submittedRef.current = true;
            setSubmitted(true);
            // Submit immediately without delay
            handleFormSubmission();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showEnd, timeOver]);

    // Handle form submission when user clicks "Postuler"
    const handleFormSubmission = () => {
        // Show loading page only when actually submitting data
        showLoadingPage();
        
        // Get form data from sessionStorage (without cv_file)
        const rawData = sessionStorage.getItem('formData');
        const formData = JSON.parse(rawData);

        if (formData && formDataProp) {
            // Calculate elapsed time
            const elapsedMs = Date.now() - startTime;
            const totalScore = levelAttempts.reduce((sum, lvl) => sum + (lvl.totalScore || 0), 0);
            // Combine sessionStorage data with props data (which includes cv_file)
            const submissionData = {
                ...formData,
                ...formDataProp, // This includes the cv_file from the form
                // Game metrics
                game_completed: completedFlag,
                correct_answers: correctAnswers,
                levels_completed: currentLevel,
                total_attempts: attempts,
                wrong_attempts: Math.max(0, attempts - correctAnswers),
                time_spent: Math.floor(elapsedMs / 1000),
                time_spent_formatted: formatElapsed(elapsedMs),
                intelligence_level: totalScore,
            };

console.log(formData);

            // Submit the form data to create participant
           router.post(`/participants/store?type=${formData.formation_field}`, submissionData, {
                onSuccess: (response) => {
                    // Hide loading page
                    hideLoadingPage();
                    
                    // Clear session storage after successful submission
                    sessionStorage.removeItem('formData');

                    // Show success modal
                    setModalType('success');
                    setShowModal(true);
                },
                onError: (errors) => {
                    // Hide loading page
                    hideLoadingPage();
                    
                    // Show error modal with details
                    setErrorDetails(errors);
                    setModalType('error');
                    setShowModal(true);
                }
            });
        } else {
            // Hide loading page
            hideLoadingPage();
            
            setErrorDetails('No form data found. Please try again.');
            setModalType('error');
            setShowModal(true);
        }
    };

    // Functions to show/hide loading page
    const showLoadingPage = () => {
        // Create loading screen element
        const loadingScreen = document.createElement('div');
        loadingScreen.id = 'loading-screen';
        loadingScreen.innerHTML = `
            <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="120"
                height="120"
                viewBox="0 0 280 280"
                preserveAspectRatio="xMidYMid meet"
                class="loading-svg"
            >
                <g
                    transform="translate(0.000000,302.000000) scale(0.100000,-0.100000)"
                    stroke="none"
                >
                    <path d="M705 3008 c-41 -120 -475 -1467 -475 -1474 1 -9 1238 -910 1257 -916 6 -2 294 203 640 454 l631 458 -84 257 c-46 142 -154 477 -241 745 l-158 488 -783 0 c-617 0 -784 -3 -787 -12z m1265 -412 c0 -3 65 -205 145 -451 80 -245 145 -448 145 -450 0 -2 -173 -130 -384 -283 l-384 -280 -384 279 c-283 207 -382 284 -380 297 5 22 283 875 289 885 4 7 953 10 953 3z" 
                          fill="oklch(0.145 0 0)" style="transition: fill 0.3s ease;"></path>
                    <path d="M1176 1661 c21 -15 101 -74 178 -130 l139 -101 31 23 c17 13 92 68 166 122 74 54 139 102 144 106 6 5 -145 9 -344 9 l-354 0 40 -29z" 
                          fill="oklch(0.145 0 0)" style="transition: fill 0.3s ease;"></path>
                </g>
            </svg>
        `;
        
        // Apply styles
        loadingScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: oklch(1 0 0);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease-out, visibility 0.5s ease-out, background-color 0.3s ease;
        `;
        
        // Apply dark mode if needed
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
            loadingScreen.style.backgroundColor = 'oklch(0.145 0 0)';
            const svgPaths = loadingScreen.querySelectorAll('path');
            svgPaths.forEach(path => {
                path.setAttribute('fill', 'oklch(1 0 0)');
            });
        }
        
        document.body.appendChild(loadingScreen);
    };

    const hideLoadingPage = () => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
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
        setFeedback('');
        setFeedbackType(null);
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTimeRemaining((t) => (t <= 1 ? 0 : t - 1));
        }, 1000);
    }

    const choices = useMemo(() => generateChoices(), [currentPuzzle]);

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="mb-2 text-2xl font-extrabold text-beta">
                    <TransText en="Pattern Master" fr="Maître des motifs" ar="سيد الأنماط" />
                </h1>
                <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
                    <TransText en="Find the Pattern" fr="Trouvez le motif" ar="اكتشف النمط" />
                </h2>
            </div>

            {!showEnd && (
                <div className="space-y-6">
                    <p className={`${darkMode ? 'text-white' : 'text-black'} mb-6 text-center`}>
                        <TransText en="Study the sequence and determine what comes next" fr="Étudiez la séquence et déterminez ce qui vient ensuite" ar="ادرس التتابع وحدد ما الذي يأتي بعد ذلك" />
                    </p>

                    <div className="mb-6 flex min-h-[120px] flex-wrap items-center justify-center gap-4">
                        {currentPuzzle?.sequence?.map((item, i) => (
                            <PatternItem key={i} item={item} />
                        ))}
                        <div
                            className={`grid h-20 w-20 place-items-center rounded-xl border-2 border-dashed ${darkMode ? 'border-white/70 text-white' : 'border-beta text-black/60'}`}
                        >
                            ?
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className={`text-center font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
                            <TransText en="Choose the next item:" fr="Choisissez l'élément suivant :" ar=":اختر العنصر التالي" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 place-items-center max-w-xs mx-auto sm:grid-cols-4 sm:max-w-md">
                            {choices.map((choice, idx) => (
                                <ChoiceItem
                                    key={idx}
                                    item={choice}
                                    selected={isEqual(selectedChoice || {}, choice)}
                                    onClick={() => setSelectedChoice(choice)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-center">
                        <button
                            type="button"
                            className={`rounded-md px-6 py-2.5 font-medium transition-all duration-150 ${
                                selectedChoice && !processing
                                    ? 'bg-yellow-400 text-black border border-yellow-400 hover:bg-yellow-500 active:scale-[0.98]'
                                    : 'bg-transparent text-white/80 border border-white/20 cursor-not-allowed'
                            }`}
                            onClick={submitAnswer}
                            disabled={!selectedChoice || processing}
                        >
                            {processing ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    <TransText en="Submitting..." fr="Soumission..." ar="جاري الإرسال..." />
                                </div>
                            ) : (
                                <TransText en="Submit Answer" fr="Valider la réponse" ar="إرسال الإجابة" />
                            )}
                        </button>
                    </div>

                    {feedback && (
                        <div className={`mt-3 text-center text-sm ${feedbackType === 'success' ? 'text-green-500' : feedbackType === 'error' ? 'text-red-500' : darkMode ? 'text-white' : 'text-black'}`}>
                            {feedback}
                        </div>
                    )}
                </div>
            )}

            {/* Show loading state when submitting */}
            {showEnd && isSubmitting && (
                <div className="space-y-4 text-center">
                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-beta"></div>
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
                    title={
                        modalType === 'success' ? (
                            <TransText en="Registration Successful!" fr="Inscription réussie !" ar="تم التسجيل بنجاح!" />
                        ) : (
                            <TransText en="Registration Failed" fr="Échec de l'inscription" ar="فشل التسجيل" />
                        )
                    }
                    message={modalType === 'success' ?
                        <TransText
                            en="Thank you for completing your application! We have received your information and will contact you soon."
                            fr="Merci d'avoir complété votre candidature ! Nous avons reçu vos informations et vous contacterons bientôt."
                            ar="شكراً لك على إكمال طلبك! لقد تلقينا معلوماتك وسنتواصل معك قريباً."
                        /> :
                        <TransText
                            en="There was an error processing your application. Please review the details below and try again."
                            fr="Il y a eu une erreur lors du traitement de votre candidature. Veuillez examiner les détails ci-dessous et réessayer."
                            ar="حدث خطأ أثناء معالجة طلبك. يرجى مراجعة التفاصيل أدناه والمحاولة مرة أخرى."
                        />
                    }
                    errorDetails={modalType === 'error' ? errorDetails : null}
                    selectedLanguage={selectedLanguage}
                    action={
                        <button
                            onClick={() => {
                                setShowModal(false);
                                setErrorDetails(null);
                                if (modalType === 'success') {
                                    router.visit('/');
                                }
                            }}
                            className="rounded-lg px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-black bg-alpha hover:bg-alpha/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-alpha focus:ring-opacity-50 min-w-[120px]"
                            disabled={isSubmitting}
                        >
                            {modalType === 'success' ? (
                                <TransText en="Done" fr="Aller à l'accueil" ar="الذهاب للرئيسية" />
                            ) : (
                                <TransText en="Try Again" fr="Réessayer" ar="حاول مرة أخرى" />
                            )}
                        </button>
                    }
                />
            )}
        </div>
    );
}

function formatElapsed(totalMs) {
    const minutes = Math.floor(totalMs / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000)
        .toString()
        .padStart(2, '0');
    return `${minutes}:${seconds}`;
}

function PatternItem({ item }) {
    return (
        <div className={`grid h-20 w-20 place-items-center rounded-xl border-2`} style={{ backgroundColor: item.color, borderColor: item.color }}>
            <span className="text-xl font-bold">{item.symbol}</span>
        </div>
    );
}

function ChoiceItem({ item, selected, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`grid h-16 w-16 place-items-center rounded-xl border-2 transition-all duration-150 ${selected ? 'ring-2 ring-alpha border-alpha' : 'hover:scale-[1.03] hover:ring-2 hover:ring-yellow-300'}`}
            style={{ backgroundColor: item.color, borderColor: selected ? '#f59e0b' : item.color }}
        >
            <span className="text-lg font-bold">{item.symbol}</span>
        </button>
    );
}

function Stat({ label, value }) {
    return (
        <div className="flex items-center justify-between border-b border-white/10 pb-1 last:border-b-0">
            <span className="text-xs opacity-70">{label}</span>
            <span className="text-sm font-semibold">{value}</span>
        </div>
    );
}
