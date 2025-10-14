import Footer from '@/components/footer.jsx';
import Navbar from '@/components/navbar.jsx';
import { useAppContext } from '@/context/appContext'; // khass tdir import dyal context
import { Link } from '@inertiajs/react';

export default function NotFound() {
    const { darkMode } = useAppContext();

    return (
        <>
            <Navbar />

            <div
                style={{
                    backgroundColor: darkMode ? '#000000' : '#ffffff',
                    color: darkMode ? '#ffffff' : '#000000',
                    transition: 'background-color 0.5s ease, color 0.5s ease',
                }}
                className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
            >
                <div className="flex items-center justify-center gap-4 text-[130px] font-extrabold tracking-widest select-none md:text-[180px]">
                    <div className="flex items-center justify-center">
                        <span
                            className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg"
                            style={{ filter: 'drop-shadow(0 0 8px rgba(255, 223, 0, 0.8))' }}
                        >
                            4
                        </span>

                        <div className="animate-spin-slow flex h-32 w-32 items-center rounded-full border-4 border-yellow-400 bg-gradient-to-tr from-yellow-400 to-yellow-300 pt-5.5 pl-1.5 shadow-lg">
                            <svg
                                version="1.0"
                                xmlns="http://www.w3.org/2000/svg"
                                width="100"
                                height="100"
                                viewBox="0 0 280 280"
                                preserveAspectRatio="xMidYMid meet"
                                className="flex items-center justify-center"
                            >
                                <g
                                    transform="translate(0.000000,302.000000) scale(0.100000,-0.100000)"
                                    fill={darkMode ? '#000000' : '#ffffff'}
                                    stroke="none"
                                >
                                    <path d="M705 3008 c-41 -120 -475 -1467 -475 -1474 1 -9 1238 -910 1257 -916 6 -2 294 203 640 454 l631 458 -84 257 c-46 142 -154 477 -241 745 l-158 488 -783 0 c-617 0 -784 -3 -787 -12z m1265 -412 c0 -3 65 -205 145 -451 80 -245 145 -448 145 -450 0 -2 -173 -130 -384 -283 l-384 -280 -384 279 c-283 207 -382 284 -380 297 5 22 283 875 289 885 4 7 953 10 953 3z"></path>
                                    <path d="M1176 1661 c21 -15 101 -74 178 -130 l139 -101 31 23 c17 13 92 68 166 122 74 54 139 102 144 106 6 5 -145 9 -344 9 l-354 0 40 -29z"></path>
                                </g>
                            </svg>
                        </div>

                        <span
                            className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text pl-3 text-transparent drop-shadow-lg"
                            style={{ filter: 'drop-shadow(0 0 8px rgba(255, 223, 0, 0.8))' }}
                        >
                            4
                        </span>
                    </div>
                </div>

                <p className="mb-4 text-4xl font-extrabold text-yellow-300 drop-shadow-md select-none">Oops! Page Not Found</p>
                <p
                    className={
                        darkMode
                            ? 'mb-12 max-w-lg text-center text-lg text-gray-300 select-none'
                            : 'mb-12 max-w-lg text-center text-lg text-gray-700 select-none'
                    }
                >
                    Sorry, the page you’re looking for doesn’t exist or has been moved.
                </p>

                <Link
                    href="/"
                    className={`transform rounded-full px-12 py-4 font-semibold duration-150 hover:scale-105 ${
                        darkMode ? 'text-white hover:text-yellow-400' : 'text-black hover:text-yellow-400'
                    }`}
                >
                    Go Back Home
                </Link>
            </div>

            <Footer />
        </>
    );
}
