export const rollTheDice = () => Math.floor(Math.random() * 6) + 1;

export const calculatePoints = (grid: (number | null)[][]): number => {
  let totalPoints = 0;

  grid.forEach(row => {
    const counts: { [key: number]: number } = {};

    // Count the occurrences of each number in the row
    row.forEach(num => {
      if (num !== null) {
        counts[num] = (counts[num] || 0) + 1;
      }
    });

    // Calculate the row sum with multipliers for repeated numbers
    let rowSum = 0;
    Object.entries(counts).forEach(([numStr, count]) => {
      const num = parseInt(numStr);
      let multiplier = 1;
      if (count === 2) {
        multiplier = 2;
      } else if (count >= 3) {
        multiplier = 3;
      }
      rowSum += num * count * multiplier;
    });

    // Add the row sum to the total points
    totalPoints += rowSum;
  });

  return totalPoints;
}

export const findFirstAvailableIndex = (column: (number | null)[]) => {
  const index = column.findIndex(record => record === null)
  return index
}