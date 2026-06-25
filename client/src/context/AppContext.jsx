import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyChats, dummyUserData } from "../assets/assets";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    const fetchUser = useCallback(async () => {
        setUser(dummyUserData);
    }, []);

    const fetchUserChats = useCallback(async () => {
        setChats(dummyChats);
        setSelectedChat(dummyChats[0]);
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    useEffect(() => {
        if (user) {
            fetchUserChats();
        } else {
            setChats([]);
            setSelectedChat(null);
        }
    }, [user, fetchUserChats]);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const value = {
        navigate, user, setUser, fetchUser,
        chats, setChats, selectedChat, setSelectedChat,
        theme, setTheme
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);