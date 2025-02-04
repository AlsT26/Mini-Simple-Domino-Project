export type Domino = [number, number];

export const initialDominoes: Domino[] = [
  [6, 1],
  [4, 3],
  [5, 1],
  [3, 4],
  [1, 1],
  [3, 4],
  [1, 2],
];

export const countDoubles = (dominoes: Domino[]): number => {
  let count = 0;
  for (const [a, b] of dominoes) {
    if (a === b) {
      count++;
    }
  }
  return count;
};

export const sort = (dominoes: Domino[], order: "asc" | "desc"): Domino[] => {
  const sortedDominoes = [...dominoes];
  sortedDominoes.sort((a, b) => {
    const totalA = a[0] + a[1];
    const totalB = b[0] + b[1];

    if (totalA === totalB) {
      return order === "asc" ? a[0] - b[0] : b[0] - a[0];
    }
    return order === "asc" ? totalA - totalB : totalB - totalA;
  });

  return sortedDominoes;
};

// export const removeDuplicates = (dominoes: Domino[]): Domino[] => {
//   const uniqueDominoes: Domino[] = [];

//   for (const domino of dominoes) {
//     const normalizedDomino: Domino = domino[0] <= domino[1] ? domino : [domino[1], domino[0]];

//     let isDuplicate = false;
//     for (const unique of uniqueDominoes) {
//       if (unique[0] === normalizedDomino[0] && unique[1] === normalizedDomino[1]) {
//         isDuplicate = true;
//         break;
//       }
//     }

//     if (!isDuplicate) {
//       uniqueDominoes.push(normalizedDomino);
//     }
//   }

//   return uniqueDominoes;
// };

export const removeDuplicatesByTotal = (dominoes: Domino[]): Domino[] => {
  const sumCounts: { [key: number]: number } = {};
  const sumOfDomino: { [key: number]: Domino[] } = {};

  for (const [a, b] of dominoes) {
    const sum = a + b;
    sumCounts[sum] = (sumCounts[sum] || 0) + 1;
    if (!sumOfDomino[sum]) {
      sumOfDomino[sum] = [];
    }
    sumOfDomino[sum].push([a, b]);
  }
  console.log(sumOfDomino);

  const uniqueDominoes: Domino[] = [];
  for (const sum in sumCounts) {
    if (sumCounts[parseInt(sum)] === 1) {
      uniqueDominoes.push(...sumOfDomino[parseInt(sum)]);
    }
  }

  return uniqueDominoes;
};

export const flipDominoes = (dominoes: Domino[]): Domino[] => {
  return dominoes.map(([a, b]) => [b, a]);
};

export const removeByTotal = (dominoes: Domino[], total: number): Domino[] => {
  return dominoes.filter(([a, b]) => a + b !== total);
};

export const addNewDomino = (a: number, b: number, dominoes: Domino[]): Domino[] => {
  const newDomino: Domino = [a, b];
  // return dominoes.push(newDomino);
  return [...dominoes, newDomino];
};
