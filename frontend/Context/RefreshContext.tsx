import React, { createContext, useState, useContext, ReactNode } from 'react';

interface RefreshContextType {
    refreshing: boolean;
    setRefreshing: (refreshing: boolean) => void;
}

const RefreshContext = createContext<RefreshContextType | undefined>(undefined);

export const RefreshProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [refreshing, setRefreshing] = useState(false);

    return (
        <RefreshContext.Provider value={{ refreshing, setRefreshing }}>
            {children}
        </RefreshContext.Provider>
    );
};

export const useRefresh = (): RefreshContextType => {
    const context = useContext(RefreshContext);
    if (!context) {
        throw new Error('useRefresh must be used within a RefreshProvider');
    }
    return context;
};
