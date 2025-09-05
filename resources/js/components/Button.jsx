import { useAppContext } from '@/context/appContext';

export const Button = ({ children, className, outline = false, ...rest }) => {
    const { darkMode } = useAppContext();
    
    return (
        <button
            {...rest}
            className={`bg-alpha border border-alpha transition-all duration-300 ${
                outline
                    ? `hover:bg-alpha hover:text-beta ${darkMode ? 'text-alpha' : 'text-alpha'}`
                    : `hover:border-alpha hover:bg-alpha/90 hover:text-beta text-beta ${
                        darkMode ? 'shadow-lg shadow-alpha/20' : 'shadow-md shadow-alpha/20'
                    }`
                } px-5 py-2.5 w-fit rounded-lg font-medium ${className}`}
        >
            {children}
        </button>
    );
};
