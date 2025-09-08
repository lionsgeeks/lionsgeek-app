import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        const storedTheme = localStorage.getItem('darkMode');
        if (storedLanguage) {
            setSelectedLanguage(storedLanguage);
        }
        if (storedTheme) {
            setDarkMode(storedTheme == 'false' ? false : true);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('language', selectedLanguage);
        localStorage.setItem('darkMode', darkMode);
    }, [selectedLanguage, darkMode]);

    return <AppContext.Provider value={{ selectedLanguage, setSelectedLanguage, darkMode, setDarkMode }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
