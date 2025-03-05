import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTheme } from './ThemeSlice';

const Theme = () => {
    const theme = useSelector((state) => state.theme);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!theme) {
            dispatch(fetchTheme());
        }
        theme === "dark"
            ? document.documentElement.classList.add("dark")
            : document.documentElement.classList.remove("dark");
        
    }, [dispatch, theme]);

    return (
        <></>
    );
}

export default Theme;