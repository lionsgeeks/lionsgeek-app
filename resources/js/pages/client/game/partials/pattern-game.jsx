import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAppContext } from '@/context/appContext';
import Modal from '@/components/Modal';

const COLORS = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308',
    '#84cc16', '#22c55e', '#10b981', '#14b8a6',
    '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
    '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
];

const SHAPES = ['square', 'circle', 'triangle', 'diamond'];
const SYMBOLS = ['●', '■', '▲', '♦', '★', '◆', '◇', '♠', '♥', '♣'];

const baseContainer = 'max-w-5xl mx-auto';
const cardBase = 'rounded-2xl border shadow-xl';

export function PatternGame() {
    const { darkMode } = useAppContext();
    const [currentLevel, setCurrentLevel] = useState(0);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(600);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [currentPuzzle, setCurrentPuzzle] = useState(null);
    const [levelAttempts, setLevelAttempts] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());
    const [feedback, setFeedback] = useState("");
    const [feedbackType, setFeedbackType] = useState(null); // 'success' | 'error'
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
                    endGame(false);
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
                const seq = [0,1,2].map((j) => ({ shape: cycle[(start + j) % 4], color, symbol: symFor(cycle[(start + j) % 4]) }));
                const nextShape = cycle[(start + 3) % 4];
                pools.easy.push({ sequence: seq, correct: { shape: nextShape, color, symbol: symFor(nextShape) } });
            } else if (rule === 1) {
                const shape = 'circle';
                const start = Math.floor(rng() * (COLORS.length - 4));
                const seq = [0,1,2].map((j) => ({ shape, color: COLORS[start + j], symbol: '●' }));
                pools.easy.push({ sequence: seq, correct: { shape, color: COLORS[start + 3], symbol: '●' } });
            } else {
                const shape = 'square';
                const step = [1,2,3][Math.floor(rng() * 3)];
                const start = Math.floor(rng() * 5) + 1;
                const nums = [start, start + step, start + 2*step];
                pools.easy.push({ sequence: nums.map((n) => ({ shape, color: COLORS[2], symbol: String(n) })), correct: { shape, color: COLORS[2], symbol: String(start + 3*step) } });
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
                const step = [1,2,3,4][Math.floor(rng() * 4)];
                const start = step * (Math.floor(rng() * 6) + 5);
                const nums = [start, start - step, start - 2*step];
                pools.medium.push({ sequence: nums.map((n) => ({ shape, color: COLORS[9], symbol: String(n) })), correct: { shape, color: COLORS[9], symbol: String(start - 3*step) } });
            } else if (choose === 2) {
                const shape = 'square';
                const base = Math.floor(rng() * 5) + 1;
                const nums = [base, base+1, base+2].map((x) => x*x);
                pools.medium.push({ sequence: nums.map((n) => ({ shape, color: COLORS[7], symbol: String(n) })), correct: { shape, color: COLORS[7], symbol: String((base+3)*(base+3)) } });
            } else if (choose === 3) {
                const shape = 'square';
                const step = [3,4,5][Math.floor(rng() * 3)];
                const start = Math.floor(rng() * 10) + 5;
                const nums = [start, start + step, start + 2*step];
                pools.medium.push({ sequence: nums.map((n) => ({ shape, color: COLORS[4], symbol: String(n) })), correct: { shape, color: COLORS[4], symbol: String(start + 3*step) } });
            } else {
                // alternating +a then *b
                const shape = 'circle';
                const a = Math.floor(rng() * 6) + 2; // 2..7
                const b = [2,3][Math.floor(rng()*2)]; // 2 or 3
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
                const k = [3,4,5][Math.floor(rng() * 3)];
                const start = [5,6,7,8,9][Math.floor(rng() * 5)];
                const nums = [start, start*k, start*k*k];
                pools.hard.push({ sequence: nums.map((n) => ({ shape, color: COLORS[8], symbol: String(n) })), correct: { shape, color: COLORS[8], symbol: String(nums[2]*k) } });
            } else if (pickRule === 1) {
                const shape = 'triangle';
                const a = [13,21,34][Math.floor(rng()*3)], b = [21,34,55][Math.floor(rng()*3)];
                const c = a + b, d = b + c;
                pools.hard.push({ sequence: [a,b,c].map((n) => ({ shape, color: COLORS[6], symbol: String(n) })), correct: { shape, color: COLORS[6], symbol: String(d) } });
            } else if (pickRule === 2) {
                const colorStart = Math.floor(rng() * (COLORS.length - 4));
                const shapes = ['circle','square','triangle'];
                const seq = shapes.slice(0,3).map((s, i) => ({ shape: s, color: COLORS[colorStart + i], symbol: symFor(s) }));
                pools.hard.push({ sequence: seq, correct: { shape: 'diamond', color: COLORS[colorStart + 3], symbol: symFor('diamond') } });
            } else if (pickRule === 3) {
                // quadratic n^2 + c
                const shape = 'square';
                const n0 = Math.floor(rng() * 5) + 5; // 5..9
                const c = Math.floor(rng() * 50) + 10; // 10..59
                const nums = [n0, n0+1, n0+2].map((n) => n*n + c);
                const next = (n0+3)*(n0+3) + c;
                pools.hard.push({ sequence: nums.map((n) => ({ shape, color: COLORS[5], symbol: String(n) })), correct: { shape, color: COLORS[5], symbol: String(next) } });
            } else {
                // second-difference constant (increasing difference)
                const shape = 'diamond';
                const d = Math.floor(rng() * 6) + 3; // base diff 3..8
                const r = Math.floor(rng() * 4) + 2; // growth 2..5
                const x1 = Math.floor(rng() * 40) + 30; // 30..69
                const x2 = x1 + d;
                const x3 = x2 + d + r;
                const x4 = x3 + d + 2*r;
                pools.hard.push({ sequence: [x1,x2,x3].map((n) => ({ shape, color: COLORS[3], symbol: String(n) })), correct: { shape, color: COLORS[3], symbol: String(x4) } });
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
                pools.extreme.push({ sequence: [a,b,c].map((n) => ({ shape, color: COLORS[1], symbol: String(n) })), correct: { shape, color: COLORS[1], symbol: String(d) } });
            } else if (which === 1) {
                // tribonacci with large seeds
                const shape = 'triangle';
                const a = Math.floor(rng()*30)+40; // 40..69
                const b = a + Math.floor(rng()*20)+20; // +20..39
                const c = b + Math.floor(rng()*20)+20;
                const d = a + b + c;
                pools.extreme.push({ sequence: [a,b,c].map((n)=>({ shape, color: COLORS[0], symbol: String(n) })), correct: { shape, color: COLORS[0], symbol: String(d) } });
            } else if (which === 2) {
                // prime squares (bigger primes)
                const shape = 'circle';
                const primes = [11,13,17,19,23,29,31,37,41,43,47,53];
                const startIdx = Math.floor(rng() * (primes.length - 4));
                const seqNums = [primes[startIdx], primes[startIdx+1], primes[startIdx+2]].map((p) => p*p);
                const next = primes[startIdx+3] * primes[startIdx+3];
                pools.extreme.push({ sequence: seqNums.map((n)=>({ shape, color: COLORS[2], symbol: String(n) })), correct: { shape, color: COLORS[2], symbol: String(next) } });
            } else if (which === 3) {
                // powers of 3 with big exponents
                const shape = 'diamond';
                const e = Math.floor(rng()*2) + 5; // 5..6
                const pow = (x, y) => Math.round(Math.exp(y * Math.log(x))); // safer
                const seqNums = [pow(3,e), pow(3,e+1), pow(3,e+2)];
                const next = pow(3,e+3);
                pools.extreme.push({ sequence: seqNums.map((n)=>({ shape, color: COLORS[4], symbol: String(n) })), correct: { shape, color: COLORS[4], symbol: String(next) } });
            } else {
                // mixed: ((x + a) * b) ^ 2 pattern simplified as numbers
                const shape = 'square';
                const x = Math.floor(rng()*20)+10; // 10..29
                const a = Math.floor(rng()*10)+5; // 5..14
                const b = Math.floor(rng()*3)+2; // 2..4
                const n1 = x;
                const n2 = (x + a) * b;
                const n3 = (n2 + a) * b;
                const n4 = (n3 + a) * b;
                pools.extreme.push({ sequence: [n1,n2,n3].map((n)=>({ shape, color: COLORS[10], symbol: String(n) })), correct: { shape, color: COLORS[10], symbol: String(n4) } });
            }
        }

        return pools;
    }

    function createRng(seed) {
        let s = seed >>> 0;
        return function() { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
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
            setScore((s) => s + (currentLevel + 1) * 10);
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
        <div className={`${baseContainer} pb-16`}>
            <div className={`mb-6 flex items-center justify-between rounded-xl border px-4 py-3 ${darkMode ? 'bg-[#0f0f0f] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}>
                <div className="text-lg font-bold text-beta">Pattern Master</div>
                {/* Stats hidden from student: timer/score/attempts intentionally not shown */}
                <div />
            </div>

            {!showEnd && (
                <div className={`${cardBase} ${darkMode ? 'bg-[#1e1e1e] border-white/10' : 'bg-white border-black/10'} p-6 relative z-0`}>
                    <h2 className={`mb-4 text-lg font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>Find the Pattern</h2>

                    <p className={`${darkMode ? 'text-white' : 'text-black'} text-center`}>Study the sequence and determine what comes next</p>

                    <div className="my-8 flex min-h-[120px] flex-wrap items-center justify-center gap-4">
                        {currentPuzzle?.sequence?.map((item, i) => (
                            <PatternItem key={i} item={item} />
                        ))}
                        <div className={`grid h-20 w-20 place-items-center rounded-xl border-2 border-dashed ${darkMode ? 'border-beta/50 text-white/60' : 'border-beta text-black/60'}`}>?</div>
                    </div>

                    <div className="mt-6">
                        <div className={`mb-4 text-center font-medium ${darkMode ? 'text-white' : 'text-black'}`}>Choose the next item:</div>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {choices.map((choice, idx) => (
                                <ChoiceItem key={idx} item={choice} selected={isEqual(selectedChoice || {}, choice)} onClick={() => setSelectedChoice(choice)} />
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-3">
                        <button
                            type="button"
                            className={`rounded-md px-4 py-2 font-medium text-white pointer-events-auto ${selectedChoice ? 'bg-beta hover:opacity-90' : 'bg-beta/50 cursor-not-allowed'}`}
                            onClick={submitAnswer}
                            disabled={!selectedChoice}
                        >
                            Submit Answer
                        </button>
                        <button
                            type="button"
                            className={`${darkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-black'} rounded-md px-4 py-2 pointer-events-auto`}
                            onClick={restart}
                        >
                            Restart
                        </button>
                    </div>
                    <div className={`mt-4 text-center text-sm ${feedbackType === 'success' ? 'text-green-500' : feedbackType === 'error' ? 'text-red-500' : darkMode ? 'text-white' : 'text-black'}`}>
                        {feedback}
                    </div>
                </div>
            )}

            {showEnd && (
                <Modal
                    validate={true}
                    confirm={true}
                    title={<span>{completedFlag ? 'Game finished' : "Time's up"}</span>}
                    message={<span>Your request has been submitted.</span>}
                    submessage={<span>We will contact you soon.</span>}
                    action={(
                        <form method="post" action={route('game.finish')}>
                            <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')} />
                            <button type="submit" className="mt-4 rounded bg-alpha px-5 py-2 font-medium">Close</button>
                        </form>
                    )}
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
            className={`grid h-16 w-16 place-items-center rounded-xl border-2 transition ${selected ? 'ring-2 ring-beta' : ''}`}
            style={{ backgroundColor: item.color, borderColor: item.color }}
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


