import { Idea, ideas, groupedIdeas } from './ideas/ideas';

type Riddle = {
  correctAnswer: Idea,
  options: Idea[]
}

function shuffle<T>(arr: T[]): T[] { 
  const numbers = new Uint32Array(arr.length);
  window.self.crypto.getRandomValues(numbers);
  const result = arr.map((v, i) => ({v, i: numbers[i]})); 
  return result.sort((a,b) => a.i - b.i).map(o => o.v);
}

export type RiddleLevel = 'Easy' | 'Hard';

export const getRiddle: ((lvl:RiddleLevel) => Riddle)  = lvl =>
  lvl === 'Easy' ? getEasyRiddle() : getHardRiddle();

const getEasyRiddle: (() => Riddle) = () => {
  const randomized = shuffle(ideas);
  return { 
    correctAnswer: randomized.at(0)!, 
    options: shuffle(randomized.slice(0, 3))
  };
}

const getHardRiddle: (() => Riddle) = () => {

  const selected = groupedIdeas[Math.floor(Math.random() * groupedIdeas.length)];
  const randomized = shuffle(selected);
  return { 
    correctAnswer: randomized.at(0)!, 
    options: shuffle(randomized.slice(0, 3))
  };
}
