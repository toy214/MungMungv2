import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [textSize, setTextSize] = useState('Medium');
  const [voiceGender, setVoiceGender] = useState('Male');

  const dynamicTextStyle = () => {
    switch (textSize) {
      case 'Small':
        return { fontSize: 14 };
      case 'Large':
        return { fontSize: 22 };
      default:
        return { fontSize: 18 };
    }
  };

  return (
    <AppContext.Provider
      value={{
        textSize,
        setTextSize,
        voiceGender,
        setVoiceGender,
        dynamicTextStyle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
