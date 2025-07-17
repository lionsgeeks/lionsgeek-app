import { TransText } from "@/components/TransText";
import {Button} from "@/components/Button";
import { useAppContext } from "@/context/appContext";

export default function HeroSection() {
    const { selectedLanguage, darkMode} = useAppContext()

    const pillars = [
        {
            title: {
                en: <span style={{ color: darkMode ? "#fff" : "#1f1f1f" }}>Training</span>,
                fr: <span style={{ color: darkMode ? "#fff" : "#1f1f1f" }}>Formation</span>,
                ar: <span style={{ color: darkMode ? "#fff" : "#1f1f1f" }}>تدريب</span>,

            },
            description: {
                en: <span style={{ color: darkMode ? "#fff" : "#1f1f1f" }}>Master tech in 6 months! Gain the skills to thrive in the digital world. Build your career, start projects, and join a community of future tech pros.</span>,
                fr: <span style={{ color: darkMode ? "#fff" : "#1f1f1f" }}>Devenez expert en tech en 6 mois! Acquérez des compétences recherchées pour réussir dans le digital. Lancez vous, créez des projets et rejoignez une communauté.</span>,
                ar: <span style={{ color: darkMode ? "#fff" : "#1f1f1f" }}>أتقن التقنية في 6 أشهر! اكتسب مهارات مطلوبة لتزدهر في العالم الرقمي. ابدأ مسيرتك المهنية، أنشئ مشاريعك، وانضم إلى مجتمع الخبراء التقنيين</span>,
            },
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`absolute z-10 h-full scale-125 ${darkMode ? "stroke-white/[15.25%]" : "stroke-beta/[6.25%]"}  -top-[10%] ${selectedLanguage === "ar" ? "left-0 rotate-45" : "right-0 -rotate-45"
                        } transition-all duration-[625ms] group-hover:opacity-0 group-hover:scale-[25]`}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                    />
                </svg>
            ),
        },
        {
            title: {
                en: <span style={{ color: darkMode ? "#fff" : "#1f1f1f" }}>Co-working</span>,
                fr: <span style={{ color: darkMode ? "#fff" : "#1f1f1f" }}>Coworking</span>,
                ar: <span style={{ color: darkMode ? "#fff" : "#1f1f1f" }}>العمل المشترك</span>,
            },
            description: {
                en: <span style={{ color: darkMode ? "#fff" : "#1f1f1f" }}>Thrive in a dynamic coworking space! Collaborate, network, and elevate your work. Build ideas, create projects, and join a vibrant community of professionals.</span>,
                fr: <span style={{ color: darkMode ? "#fff" : "#1f1f1f" }}>Un espace de coworking dynamique où les idées s'épanouissent. Connectez-vous à des esprits similaires, collaborez sur des projets et améliorez votre travail.</span>,
                ar: <span style={{ color: darkMode ? "#fff" : "#1f1f1f" }}>مساحة عمل مشتركة نابضة حيث تزدهر الأفكار. تواصل مع أشخاص يشاركونك الفكر، وتعاون على المشاريع، وارفع مستوى عملك.</span>,
            },

            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 512 512"
                    strokeWidth="1.5"
                    stroke="red"
                    className={`absolute z-10 h-full scale-125  -top-[10%] ${selectedLanguage === "ar" ? "left-0 " : "right-0 -"
                        } transition-all duration-[625ms] group-hover:opacity-0 group-hover:scale-[25]`}
                >

                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        fill={darkMode ? "rgb(255 255 255 / 15.25%)" : "#f3f3f4"} stroke="none">
                        <path d="M790 4326 c-188 -42 -314 -214 -296 -404 12 -129 100 -253 219 -308
55 -26 73 -29 157 -29 88 0 101 3 162 33 137 67 211 187 212 342 1 75 -3 93
-31 152 -55 117 -154 194 -278 217 -69 13 -74 13 -145 -3z"/>
                        <path d="M4170 4330 c-110 -23 -209 -102 -267 -211 -26 -49 -28 -63 -28 -159
0 -93 3 -112 27 -162 34 -74 107 -146 183 -184 54 -26 70 -29 160 -29 88 0
107 3 157 27 74 34 152 112 186 186 24 51 27 69 27 162 0 96 -2 110 -30 163
-38 76 -127 159 -198 186 -66 24 -157 33 -217 21z"/>
                        <path d="M689 3506 c-105 -28 -200 -112 -241 -215 -23 -56 -23 -57 -23 -581 0
-477 2 -530 18 -575 35 -99 110 -176 217 -220 41 -18 80 -20 437 -23 l392 -4
3 -446 c3 -490 1 -474 65 -534 55 -53 83 -58 315 -58 240 0 266 6 325 73 29
33 53 90 53 127 0 37 -24 94 -53 127 -48 55 -97 73 -199 73 l-87 0 -3 468 c-3
513 -1 495 -67 565 -56 61 -58 62 -396 67 l-310 5 -3 238 -2 239 26 -21 c24
-19 40 -21 141 -21 111 0 114 -1 108 -20 -4 -13 0 -31 9 -45 l16 -25 439 0
c404 0 439 1 453 18 9 9 59 178 112 375 82 305 94 361 84 382 -21 46 -89 41
-107 -8 -4 -12 -46 -163 -91 -334 l-83 -313 -156 0 -155 0 23 21 c27 25 60 94
61 124 0 71 -48 146 -115 176 -36 17 -70 19 -309 19 l-268 0 -157 138 c-184
163 -217 186 -296 207 -70 18 -113 18 -176 1z"/>
                        <path d="M4249 3506 c-71 -19 -122 -55 -293 -205 l-158 -140 -282 -3 c-275 -3
-282 -4 -319 -26 -100 -63 -116 -200 -34 -290 l21 -23 -153 3 -154 3 -88 330
c-88 329 -98 355 -139 355 -26 0 -60 -30 -60 -53 0 -34 187 -727 201 -743 10
-12 83 -14 449 -14 411 0 438 1 453 18 10 10 17 31 17 45 l0 27 114 0 c89 0
116 3 126 15 7 8 16 15 21 15 5 0 9 -106 9 -235 l0 -235 -303 0 -303 0 -54
-32 c-42 -26 -61 -45 -82 -87 l-28 -53 0 -463 0 -463 -104 -4 c-97 -3 -108 -6
-148 -33 -128 -89 -113 -282 27 -346 35 -16 67 -19 256 -19 275 0 313 12 364
114 l25 50 0 437 0 437 388 4 c375 4 389 5 444 27 76 30 159 106 195 179 l28
57 3 520 c2 362 0 536 -8 572 -25 117 -134 227 -255 258 -70 18 -113 18 -176
1z"/>
                        <path d="M166 3384 c-14 -14 -16 -105 -16 -849 l0 -834 22 -15 c16 -12 47 -16
110 -16 l88 0 0 -429 0 -430 22 -15 c31 -22 45 -20 73 9 l25 24 0 421 0 420
250 0 250 0 0 -420 0 -421 25 -24 c29 -30 49 -31 75 -5 19 19 20 33 20 445 l0
425 90 0 c77 0 93 3 110 20 25 25 26 62 2 83 -17 15 -68 17 -530 17 l-512 0 0
783 c0 692 -2 785 -16 805 -18 26 -65 30 -88 6z"/>
                        <path d="M4870 3390 c-13 -8 -16 -112 -20 -802 l-5 -793 -515 -2 c-511 -3
-515 -3 -532 -24 -24 -29 -23 -45 7 -74 22 -23 32 -25 110 -25 l85 0 0 -420 0
-421 25 -24 c29 -30 49 -31 75 -5 19 19 20 33 20 445 l0 425 255 0 255 0 0
-425 c0 -412 1 -426 20 -445 26 -26 46 -25 75 5 l25 24 0 421 0 420 85 0 c78
0 88 2 110 25 l25 24 0 818 c0 725 -2 821 -16 841 -16 23 -57 29 -84 12z"/>
                        <path d="M1427 2632 c-22 -24 -21 -65 1 -85 17 -15 69 -17 545 -17 l527 0 0
-823 c0 -785 1 -825 18 -840 25 -23 58 -21 82 3 20 20 20 33 20 840 l0 820
525 0 c512 0 526 1 545 20 11 11 20 29 20 40 0 11 -9 29 -20 40 -20 20 -33 20
-1133 20 -1066 0 -1115 -1 -1130 -18z"/>
                    </g>
                </svg>
            ),
        },
        {
            title: {
                en: <span style={{ color: darkMode ? "#fff" : "#1f1f1f" }}>Event</span>,
                fr: <span style={{ color: darkMode ? "#fff" : "#1f1f1f" }}>Évènement</span>,
                ar: <span style={{ color: darkMode ? "#fff" : "#1f1f1f" }}>فعالية</span>,

            },
            description: {
                en: <span style={{ color: darkMode ? "#fff" : "#1f1f1f" }}>Dive into inspiring workshops, thrilling hackathons, and networking events. Be part of a community of developers, designers, and innovators</span>,
                fr: <span style={{ color: darkMode ? "#fff" : "#1f1f1f" }}>Participez à des ateliers inspirants, hackathons palpitants et événements réseau enrichissants. Rejoignez une communauté créative de développeurs et designers.</span>,
                ar: <span style={{ color: darkMode ? "#fff" : "#1f1f1f" }}>انضم إلى ورش عمل ملهمة، ومسابقات برمجية مثيرة، وفعاليات تواصل مؤثرة. كن جزءًا من مجتمع مبدع من المطورين والمصممين.</span>,
            },

            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 512 512"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`absolute z-10 h-full scale-100 stroke-beta/[6.25%] -top-[10%] ${selectedLanguage === "ar" ? "left-0 " : "right-0 -"
                        } transition-all duration-[625ms] group-hover:opacity-0 group-hover:scale-[25]`}
                >

                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        fill={darkMode ? "rgb(255 255 255 / 15.25%)" : "#f3f3f4"} stroke="none">
                        <path d="M530 4876 c-223 -89 -415 -172 -427 -184 l-23 -21 0 -751 0 -751 25
-24 c13 -14 34 -25 47 -25 38 0 851 329 871 352 16 19 17 70 17 770 l0 749
-25 24 c-15 16 -35 25 -52 24 -15 0 -210 -74 -433 -163z m350 -669 l0 -633
-307 -123 c-170 -68 -314 -125 -320 -128 -10 -4 -13 126 -13 629 l0 634 312
126 c172 69 316 127 321 127 4 1 7 -284 7 -632z"/>
                        <path d="M1145 5015 l-25 -24 0 -751 0 -751 25 -24 24 -25 1391 0 1391 0 24
25 25 24 0 751 0 751 -25 24 -24 25 -1391 0 -1391 0 -24 -25z m1340 -144 c-90
-22 -172 -90 -215 -176 -24 -47 -25 -60 -25 -215 0 -160 1 -167 27 -216 15
-28 38 -64 52 -81 27 -32 113 -82 160 -94 18 -4 -34 -7 -123 -8 -188 -1 -220
-10 -286 -76 -66 -65 -75 -99 -75 -269 l0 -136 -360 0 -360 0 0 640 0 640 618
-1 c339 -1 604 -4 587 -8z m1355 -631 l0 -640 -360 0 -360 0 0 136 c0 163 -10
200 -67 264 -62 69 -101 80 -292 81 -90 1 -143 4 -125 8 47 12 133 62 160 94
14 17 37 53 52 81 26 49 27 56 27 216 0 160 -1 167 -27 216 -15 28 -38 64 -52
81 -27 32 -113 82 -160 94 -17 4 247 7 587 8 l617 1 0 -640z m-1192 453 c62
-46 67 -62 67 -213 0 -124 -2 -141 -21 -166 -39 -53 -71 -69 -134 -69 -63 0
-95 16 -134 69 -18 23 -22 45 -24 138 -2 60 -1 125 2 144 8 41 50 92 91 110
40 19 120 12 153 -13z m287 -798 c24 -23 25 -29 25 -160 l0 -135 -40 0 -40 0
0 80 0 80 -80 0 -80 0 0 -80 0 -80 -160 0 -160 0 0 80 0 80 -80 0 -80 0 0 -80
0 -80 -40 0 -40 0 0 135 c0 131 1 137 25 160 l24 25 351 0 351 0 24 -25z"/>
                        <path d="M4105 5015 l-25 -24 0 -749 c0 -700 1 -751 18 -770 19 -23 832 -352
870 -352 13 0 34 11 47 25 l25 24 0 749 c0 700 -1 751 -17 770 -20 23 -833
352 -871 352 -13 0 -34 -11 -47 -25z m468 -306 l307 -123 0 -634 c0 -503 -3
-633 -12 -629 -7 3 -151 60 -320 128 l-308 123 0 634 c0 503 3 633 13 629 6
-3 150 -60 320 -128z"/>
                        <path d="M960 3267 c-49 -16 -133 -102 -148 -153 -16 -56 -16 -412 0 -468 16
-55 99 -138 154 -154 25 -7 107 -12 205 -12 l164 -1 159 -119 c174 -131 197
-140 241 -95 23 22 25 32 25 120 l0 95 56 0 c31 0 75 5 98 12 55 16 138 99
154 154 16 55 16 412 0 466 -6 22 -31 62 -55 88 -72 81 -69 80 -577 79 -291
-1 -453 -5 -476 -12z m935 -172 c25 -24 25 -26 25 -215 0 -189 0 -191 -25
-215 -23 -24 -31 -25 -135 -25 -104 0 -112 -1 -135 -25 -21 -20 -25 -34 -25
-80 l0 -55 -107 80 -106 80 -189 0 c-255 0 -238 -17 -238 240 0 189 0 191 25
215 l24 25 431 0 431 0 24 -25z"/>
                        <path d="M1120 2880 l0 -80 80 0 80 0 0 80 0 80 -80 0 -80 0 0 -80z" />
                        <path d="M1360 2880 l0 -80 80 0 80 0 0 80 0 80 -80 0 -80 0 0 -80z" />
                        <path d="M1600 2880 l0 -80 80 0 80 0 0 80 0 80 -80 0 -80 0 0 -80z" />
                        <path d="M3385 3255 c-23 -22 -25 -32 -25 -120 l0 -95 -56 0 c-31 0 -75 -5
-98 -12 -55 -16 -138 -99 -154 -154 -16 -56 -16 -412 0 -468 16 -55 99 -138
154 -154 58 -17 890 -17 948 0 55 16 138 99 154 154 16 55 16 412 0 466 -6 22
-31 62 -55 88 -63 70 -100 80 -302 80 l-166 1 -159 119 c-174 131 -197 140
-241 95z m537 -375 c255 0 238 17 238 -240 0 -189 0 -191 -25 -215 l-24 -25
-431 0 -431 0 -24 25 c-25 24 -25 26 -25 215 0 189 0 191 25 215 23 24 31 25
135 25 104 0 112 1 135 25 21 20 25 34 25 80 l0 55 107 -80 106 -80 189 0z"/>
                        <path d="M3360 2640 l0 -80 80 0 80 0 0 80 0 80 -80 0 -80 0 0 -80z" />
                        <path d="M3600 2640 l0 -80 80 0 80 0 0 80 0 80 -80 0 -80 0 0 -80z" />
                        <path d="M3840 2640 l0 -80 80 0 80 0 0 80 0 80 -80 0 -80 0 0 -80z" />
                        <path d="M2441 2624 c-169 -45 -301 -180 -346 -351 -20 -77 -20 -309 0 -386
17 -68 54 -142 90 -185 l25 -30 -52 -17 c-84 -27 -171 -80 -232 -141 -65 -65
-99 -118 -135 -213 -23 -62 -25 -79 -29 -298 l-4 -232 26 -26 25 -25 751 0
751 0 25 25 26 26 -4 232 c-4 219 -6 236 -29 298 -37 95 -71 149 -138 216 -61
62 -140 109 -229 138 l-52 17 30 38 c40 50 77 134 90 200 15 81 12 296 -5 363
-67 259 -333 419 -584 351z m270 -185 c67 -36 97 -68 137 -143 26 -49 27 -56
27 -216 l0 -165 -34 -63 c-38 -70 -70 -101 -145 -140 -43 -22 -64 -26 -136
-26 -72 0 -93 4 -136 26 -75 39 -107 70 -145 140 l-34 63 0 165 c0 155 1 168
25 215 42 86 123 152 215 176 62 17 161 2 226 -32z m261 -961 c91 -45 147
-103 191 -196 31 -66 32 -71 35 -234 l4 -168 -81 0 -81 0 0 160 0 160 -80 0
-80 0 0 -160 0 -160 -320 0 -320 0 0 160 0 160 -80 0 -80 0 0 -160 0 -160 -81
0 -81 0 4 168 c3 163 4 168 35 234 17 37 50 87 72 111 44 48 135 101 197 116
22 5 181 9 355 8 l315 -2 76 -37z"/>
                        <path d="M761 1984 c-169 -45 -301 -180 -346 -351 -20 -77 -20 -309 0 -386 17
-68 54 -142 90 -185 l25 -30 -52 -17 c-84 -27 -171 -80 -232 -141 -65 -65 -99
-118 -135 -213 -23 -62 -25 -79 -29 -298 l-4 -232 26 -26 25 -25 751 0 751 0
25 25 26 26 -4 232 c-4 219 -6 236 -29 298 -37 95 -71 149 -138 216 -61 62
-140 109 -229 138 l-52 17 30 38 c40 50 77 134 90 200 15 81 12 296 -5 363
-67 259 -333 419 -584 351z m270 -185 c67 -36 97 -68 137 -143 26 -49 27 -56
27 -216 l0 -165 -34 -63 c-38 -70 -70 -101 -145 -140 -43 -22 -64 -26 -136
-26 -72 0 -93 4 -136 26 -75 39 -107 70 -145 140 l-34 63 0 165 c0 155 1 168
25 215 42 86 123 152 215 176 62 17 161 2 226 -32z m261 -961 c91 -45 147
-103 191 -196 31 -66 32 -71 35 -235 l4 -167 -81 0 -81 0 0 160 0 160 -80 0
-80 0 0 -160 0 -160 -320 0 -320 0 0 160 0 160 -80 0 -80 0 0 -160 0 -160 -81
0 -81 0 4 168 c3 163 4 168 35 234 17 37 50 87 72 111 44 48 135 101 197 116
22 5 181 9 355 8 l315 -2 76 -37z"/>
                        <path d="M4121 1984 c-169 -45 -301 -180 -346 -351 -20 -77 -20 -309 0 -386
17 -68 54 -142 90 -185 l25 -30 -52 -17 c-84 -27 -171 -80 -232 -141 -65 -65
-99 -118 -135 -213 -23 -62 -25 -79 -29 -298 l-4 -232 26 -26 25 -25 751 0
751 0 25 25 26 26 -4 232 c-4 219 -6 236 -29 298 -37 95 -71 149 -138 216 -61
62 -140 109 -229 138 l-52 17 30 38 c40 50 77 134 90 200 15 81 12 296 -5 363
-67 259 -333 419 -584 351z m270 -185 c67 -36 97 -68 137 -143 26 -49 27 -56
27 -216 l0 -165 -34 -63 c-38 -70 -70 -101 -145 -140 -43 -22 -64 -26 -136
-26 -72 0 -93 4 -136 26 -75 39 -107 70 -145 140 l-34 63 0 165 c0 155 1 168
25 215 42 86 123 152 215 176 62 17 161 2 226 -32z m261 -961 c91 -45 147
-103 191 -196 31 -66 32 -71 35 -235 l4 -167 -81 0 -81 0 0 160 0 160 -80 0
-80 0 0 -160 0 -160 -320 0 -320 0 0 160 0 160 -80 0 -80 0 0 -160 0 -160 -81
0 -81 0 4 168 c3 163 4 168 35 234 17 37 50 87 72 111 44 48 135 101 197 116
22 5 181 9 355 8 l315 -2 76 -37z"/>
                    </g>
                </svg>
            ),
        },
    ];

    return (
        <div className="px-7 md:px-16 text- text-balance pt-6 py-12 mt-12 flex flex-col justify-between gap-6 md:gap-12" style={{ backgroundColor: darkMode ? "#0f0f0f" : "#ffffff" }}>
            <div className="bg-image h-[70vh] bg-no-repeat bg-center bg-cover md:h-[calc(calc(100vh-67.11px)*2/3)] rounded-lg overflow-hidden p-12 relative after:absolute after:size-full after:inset-0 after:bg-beta/50">
                <div
                    className={`flex flex-col  gap-4 absolute z-10 top-1/2 -translate-y-1/2 lg:w-[calc(calc(100%-6rem)*0.5)] ${selectedLanguage === "ar" ? "items-end right-12" : "items-start left-12"
                        }`}
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white text-balance">
                        <TransText
                            fr="Le portail vers le monde numérique."
                            en="The door to the digital world."
                            ar=".بوابة إلى العالم الرقمي"
                        />
                    </h1>
                    <p className="text-lg md:text-xl font-normal text-white text-balance">
                        <TransText
                            fr="Formation et mentorat gratuits pour vous aider à prospérer dans les secteurs de la technologie et des médias."
                            en="Free training and mentorship to help you thrive in the tech and media industries."
                            ar=".تدريب مجاني وتوجيه لمساعدتك على النجاح في مجالي التكنولوجيا والإعلام"
                        />
                    </p>

                    <Button
                        className="mt-3"
                        onClick={() =>
                            document.getElementById("trainings")?.scrollIntoView({ behavior: "smooth" })
                        }
                        outline
                    >
                        <TransText fr="Lancez-vous" en="Get Started" ar="ابدأ الآن" />
                    </Button>
                </div>
            </div>

            <div className="md:h-1/2 flex gap-4 flex-col">
                <h2 style={{ color: darkMode ? "#fff" : "#1d1d1d" }}
                    className={`text-xl md:text-3xl font-bold ${selectedLanguage === "ar" ? "text-end" : "text-start"
                        }`}
                >
                    <TransText fr="Nos piliers" en="Our pillars" ar="ركائزنا" />
                </h2>

                <div
                    className={`flex gap-6 flex-col md:gap-0 justify-between md:h-[15rem] ${selectedLanguage === "ar" ? "md:flex-row-reverse" : "md:flex-row"
                        }`}
                >
                    {pillars.map(({ title, description, icon }, index) => (
                        <div
                            style={{ border: `1px solid ${darkMode ? "#fff" : "#1f1f1f"}` }}
                            key={index}
                            className="md:w-[32%]  py-3 md:pt-8 md:pb-4 border rounded-lg rounded-tr-none md:h-full  relative overflow-hidden group cursor-pointer flex justify-end"
                        >
                            {icon}

                            <div
                                className={`flex flex-col justify-end py-4 px-4 md:pl-8 md:pb-6 overflow-hidden ${selectedLanguage === "ar" ? "text-end" : "text-start"
                                    }`}
                            >
                                <h1 className="font-medium text-lg md:text-xl md:duration-700 md:transition-all md:translate-y-[calc(150%+1.75rem)] md:group-hover:translate-y-0">
                                    <TransText {...title} />
                                </h1>
                                <div className="md:duration-700 static z-20 md:transition-all md:translate-y-[150%] md:group-hover:translate-y-0">
                                    <TransText {...description} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
