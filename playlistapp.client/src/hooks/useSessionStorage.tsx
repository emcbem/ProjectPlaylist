import { useState, useEffect } from 'react';

function useSessionStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    // Get stored value from sessionStorage or use the initial value
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.sessionStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    // Update sessionStorage whenever storedValue changes
    useEffect(() => {
        try {
            window.sessionStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error(error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

export default useSessionStorage;
