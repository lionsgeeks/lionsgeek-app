const LoadingPage = () => {

    const darkMode = false;

    return (
        <div className={`h-screen ${darkMode && "bg-[#0f0f0f]"} flex justify-center flex-col gap-8 items-center relative overflow-hidden group `}>
            <svg
                viewBox="0 0 37 36"
                fill={darkMode ? "#fff" : "#000"}
                xmlns="http://www.w3.org/2000/svg"
                className="size-24 animate-spin"
            >
                <path d="M29.8744 0H7.05262L0 21.706L18.463 35.121L36.93 21.706L29.8744 0ZM18.464 27.506L7.24261 19.353L11.5284 6.161H25.3986L29.6844 19.353L18.464 27.506Z" />
                <path d="M13.1763 19.326L18.464 23.167L23.7517 19.326H13.1763Z" />
            </svg>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`animate-pulse absolute h-5/6 ${darkMode ? "fill-[#252529]" : "fill-beta/5"} -top-1/3 left-0 rotate-45 transition-all duration-700 group-hover/coding:rotate-[200deg] group-hover/coding:left-2/4 group-hover/coding:scale-[62.5%] group-hover/coding:top-0 ${darkMode ? "fill-[#252529]" : "fill-beta/5"}`}
            >
                <path
                    fillRule="evenodd"
                    d="M14.447 3.026a.75.75 0 0 1 .527.921l-4.5 16.5a.75.75 0 0 1-1.448-.394l4.5-16.5a.75.75 0 0 1 .921-.527ZM16.72 6.22a.75.75 0 0 1 1.06 0l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 1 1-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 0 1 0-1.06Zm-9.44 0a.75.75 0 0 1 0 1.06L2.56 12l4.72 4.72a.75.75 0 0 1-1.06 1.06L.97 12.53a.75.75 0 0 1 0-1.06l5.25-5.25a.75.75 0 0 1 1.06 0Z"
                    clipRule="evenodd"
                />
            </svg>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`animate-pulse absolute h-5/6 ${darkMode ? "stroke-[#252529]" : "stroke-beta/5"} -bottom-1/3 right-0 -rotate-45  transition-all duration-700 group-hover/media:rotate-[382.5deg] group-hover/media:right-1/2 group-hover/media:scale-75 group-hover/media:top-0`}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                />
            </svg>
        </div>
    );
};
export default LoadingPage;
