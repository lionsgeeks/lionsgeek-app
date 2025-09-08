export const Button = ({ children, className, outline = false, ...rest }) => {
    return (
        <button
            {...rest}
            className={`border border-alpha bg-alpha ${
                outline ? 'hover:bg-transparent hover:text-alpha' : `hover:border-beta hover:bg-[#2f343a] hover:text-white`
            } w-fit rounded-lg px-5 py-2.5 font-normal text-black duration-[375ms] ${className}`}
        >
            {children}
        </button>
    );
};
