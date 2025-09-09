<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{-- Enhanced script to detect and follow website dark mode preference --}}
    <script>
        (function() {
            // Function to apply theme based on website preference
            function applyWebsiteTheme() {
                // Check localStorage for user's theme preference
                const savedTheme = localStorage.getItem('darkMode');
                const isDark = savedTheme === 'true' || (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
                
                if (isDark) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
                
                // Update SVG colors immediately
                updateLoadingSVGColors(isDark);
            }

            // Function to update SVG colors
            function updateLoadingSVGColors(isDark) {
                const svgPaths = document.querySelectorAll('#loading-screen path');
                const fillColor = isDark ? 'oklch(1 0 0)' : 'oklch(0.145 0 0)';
                
                svgPaths.forEach(path => {
                    path.setAttribute('fill', fillColor);
                });
            }

            // Apply theme immediately when page loads
            applyWebsiteTheme();

            // Listen for storage changes (when user toggles theme in another tab)
            window.addEventListener('storage', function(e) {
                if (e.key === 'darkMode') {
                    applyWebsiteTheme();
                }
            });

            // Store reference for later use
            window.themeSystem = {
                applyWebsiteTheme: applyWebsiteTheme,
                updateLoadingSVGColors: updateLoadingSVGColors
            };
        })();
    </script>

    {{-- Enhanced inline style with better transitions --}}
    <style>
        html {
            background-color: oklch(1 0 0);
            transition: background-color 0.3s ease;
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }

        /* Loading Screen Styles */
        #loading-screen {
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
        }

        html.dark #loading-screen {
            background-color: oklch(0.145 0 0);
        }

        #loading-screen.hidden {
            opacity: 0;
            visibility: hidden;
        }

        .loading-svg {
            animation: pulse 2s ease-in-out infinite;
            margin-bottom: 20px;
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
                opacity: 0.8;
            }
            50% {
                transform: scale(1.05);
                opacity: 1;
            }
        }

        .loading-text {
            color: oklch(0.145 0 0);
            font-family: 'Instrument Sans', sans-serif;
            font-size: 18px;
            font-weight: 500;
            opacity: 0.7;
            transition: color 0.3s ease;
        }

        html.dark .loading-text {
            color: oklch(1 0 0);
        }

        /* Spinner dots */
        .loading-dots {
            display: flex;
            gap: 4px;
            margin-top: 10px;
        }

        .loading-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: oklch(0.145 0 0);
            animation: loadingDots 1.4s ease-in-out infinite both;
            transition: background-color 0.3s ease;
        }

        html.dark .loading-dot {
            background-color: oklch(1 0 0);
        }

        .loading-dot:nth-child(1) { animation-delay: -0.32s; }
        .loading-dot:nth-child(2) { animation-delay: -0.16s; }
        .loading-dot:nth-child(3) { animation-delay: 0s; }

        @keyframes loadingDots {
            0%, 80%, 100% {
                transform: scale(0.8);
                opacity: 0.5;
            }
            40% {
                transform: scale(1);
                opacity: 1;
            }
        }
    </style>

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/favicon.svg">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    {{-- Loading Screen --}}
    <div id="loading-screen">
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
        
     
    </div>

    @inertia

    {{-- Enhanced script with better theme following --}}
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Function to update SVG fill colors
            function updateSVGFill() {
                const isDark = document.documentElement.classList.contains('dark');
                const svgPaths = document.querySelectorAll('#loading-screen path');
                const fillColor = isDark ? 'oklch(1 0 0)' : 'oklch(0.145 0 0)';
                
                svgPaths.forEach(path => {
                    path.setAttribute('fill', fillColor);
                });
            }

            // Initial SVG update
            updateSVGFill();

            // Create a more robust theme follower
            function initThemeFollowing() {
                // Function to apply website theme preference
                function applyWebsiteTheme() {
                    const savedTheme = localStorage.getItem('darkMode');
                    const isDark = savedTheme === 'true' || (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
                    
                    if (isDark) {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }
                    updateSVGFill();
                }

                // Apply current website preference
                applyWebsiteTheme();
                
                // Listen for storage changes (when user toggles theme)
                window.addEventListener('storage', function(e) {
                    if (e.key === 'darkMode') {
                        applyWebsiteTheme();
                    }
                });
                
                // Also watch for manual class changes (in case of user toggles)
                const observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        if (mutation.attributeName === 'class') {
                            updateSVGFill();
                        }
                    });
                });
                
                observer.observe(document.documentElement, {
                    attributes: true,
                    attributeFilter: ['class']
                });
            }

            // Initialize theme following
            initThemeFollowing();

            // Hide loading screen functionality
            const minLoadingTime = 1000;
            const startTime = Date.now();

            function hideLoadingScreen() {
                const elapsedTime = Date.now() - startTime;
                const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
                
                setTimeout(() => {
                    const loadingScreen = document.getElementById('loading-screen');
                    if (loadingScreen) {
                        loadingScreen.classList.add('hidden');
                        setTimeout(() => {
                            loadingScreen.remove();
                        }, 500);
                    }
                }, remainingTime);
            }

            if (document.readyState === 'complete') {
                hideLoadingScreen();
            } else {
                window.addEventListener('load', hideLoadingScreen);
            }
        });

        // Handle Inertia navigation
        document.addEventListener('inertia:start', function() {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }
        });

        // Re-initialize theme following after Inertia page visits
        document.addEventListener('inertia:success', function() {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                function applyCurrentWebsiteTheme() {
                    const savedTheme = localStorage.getItem('darkMode');
                    const isDark = savedTheme === 'true' || (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
                    
                    if (isDark) {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }
                }
                
                applyCurrentWebsiteTheme();
                
                // Ensure listener is attached for this page
                window.addEventListener('storage', function(e) {
                    if (e.key === 'darkMode') {
                        applyCurrentWebsiteTheme();
                    }
                });
            }, 100);
        });
    </script>
</body>

</html>