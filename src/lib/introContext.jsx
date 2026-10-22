import React, { createContext, useContext } from 'react';

export const IntroContext = createContext({
  isIntroPlaying: false,
  skipIntro: () => {}
});

export function useIntro() {
  return useContext(IntroContext);
}
