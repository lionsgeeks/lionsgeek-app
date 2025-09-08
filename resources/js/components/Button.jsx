export const Button = ({ children, className, outline = false, ...rest }) => {
    return (
        <button
            {...rest}
            className={`bg-alpha border border-alpha ${outline
                    ? "hover:bg-transparent hover:text-alpha "
                    : `hover:border-beta hover:bg-[#2f343a] hover:text-white `
                } px-4 sm:px-5 py-2.5 sm:py-3 w-fit rounded-lg font-normal text-black duration-[375ms] transition-all ease-in-out focus:outline-none focus:ring-2 focus:ring-alpha focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {children}
        </button>
    );
};
