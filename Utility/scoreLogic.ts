
export const currentProgress = (currentScore: number, currentGoal: number, passedLevelScore: number) => {
    return (currentScore - passedLevelScore) / currentGoal
}

export const goalCalculator = (currentLevel: number, currentGoal: number) => {
    return { updatedGoal: currentGoal + 10, updatedLevel: currentLevel + 1 }
}
