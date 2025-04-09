import { oceanIcons, oceanSounds } from './OceanThemeAssets';

export const generateRandomStimulus = () => {
  const position = Math.floor(Math.random() * 9);
  const icon = oceanIcons[Math.floor(Math.random() * oceanIcons.length)];
  const sound = oceanSounds[Math.floor(Math.random() * oceanSounds.length)];

  return { position, icon, sound };
};

export const isMatchNBack = (current, history, n) => {
  if (history.length < n) return { visual: false, audio: false };

  const nBackStimulus = history[history.length - (n+1)];
  return {
    visual: current.position === nBackStimulus.position,
    audio: current.sound === nBackStimulus.sound,
  };
};
