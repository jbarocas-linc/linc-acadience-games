'use client';

import { useCallback } from 'react';

export function useVoice() {
  const speak = useCallback(async (text: string, ipa?: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const spokenText = ipa ? `${text}` : text;
      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.rate = 0.92;
      utterance.pitch = 1.02;
      const voice = window.speechSynthesis
        .getVoices()
        .find((v) => /samantha|ava|allison|aria|emma/i.test(v.name));
      if (voice) utterance.voice = voice;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  return { speak };
}
