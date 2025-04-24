export const generateTrackingCode = (): string => {
    const prefix = 'BLS';
    const part1 = Array(5)
      .fill(0)
      .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
      .join('') + Math.floor(Math.random() * 100).toString().padStart(2, '0');
    const part2 = Array(6)
      .fill(0)
      .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
      .join('');
    return `${prefix}-${part1}-${part2}`; // Ex: BLS-BVV89-YU52JJ
  };