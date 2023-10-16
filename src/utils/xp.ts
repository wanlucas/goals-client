const calculateLevel = (xp: number) => Math.floor(0.2 * Math.sqrt(xp));

const calculateXp = (level: number) => (level / 0.2) ** 2;

const percentageToNextLevel = (xp: number) => {
  const currentLevel = calculateLevel(xp);
  const nextLevel = currentLevel + 1;
  const currentLevelXp = calculateXp(currentLevel);
  const nextLevelXp = calculateXp(nextLevel);

  return Math.round(((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100);
};

export default {
  calculateLevel,
  calculateXp,
  percentageToNextLevel,
};
