export const getGrade = (points: number, total: number): string => {
  const percentage = points / total;
  if (percentage < 0.5) {
    return 'bad';
  } else if (percentage < 0.75) {
    return 'ok';
  } else {
    return 'great';
  }
};
