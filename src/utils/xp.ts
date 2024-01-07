export default (points: number) => {
  let poinsToNextLevel = 10;
  let level = 1;

  while (points >= poinsToNextLevel) {
    poinsToNextLevel += poinsToNextLevel + 1;
    level += 1;
  }

  const currentLevelXp = poinsToNextLevel;
  const nextLevelXp = poinsToNextLevel + poinsToNextLevel + 1;

  return {
    level,
    nextLevelXp,
    currentLevelXp,
    percentage: Math.round(
      ((points - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100,
    ),
  };
};
