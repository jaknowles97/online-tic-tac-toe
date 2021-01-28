import React from 'react';
import { createGameStore } from './gameStore';
import { useLocalStore } from 'mobx-react';

const GameContext = React.createContext(null);

export const GameProvider = ({children}) => {
    const gameStore = useLocalStore(createGameStore);

    return <NotesContext.Provider value={gameStore}>
        {children}
    </NotesContext.Provider>
}

export const useGameStore = () => React.useContext(GameContext)