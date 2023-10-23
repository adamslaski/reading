import React from 'react';
import { useState } from 'react';
import { Idea, ideas } from './ideas/ideas';


const error = document.getElementById("error")! as HTMLAudioElement; 
      
function playError() { 
  error.play(); 
} 

var fanfare = document.getElementById("fanfare")! as HTMLAudioElement; 

function playFanfare() { 
  fanfare.play(); 
}

type Riddle = {
  correctAnswer: Idea,
  options: Idea[]
}

function shuffle<T>(arr: T[]): T[] { 
return [...arr].sort(() =>Math.random() - 0.5);
}

const getRiddle: (() => Riddle) = () => {
  const randomized = shuffle(ideas);
  return { 
    correctAnswer: randomized.at(0)!, 
    options: shuffle(randomized.slice(0, 3))
  };
}

function Option(idea: Idea, onClick: () => void) {
  return (<img height={200} width={200} alt={idea.word} src={idea.url} onClick={onClick}/> );
}

function App() {
  const [riddle, setRiddle] = useState(getRiddle());
  return (
    <div className="App">
      <div className='excersizeContainer'>
        <div className='correctAnswer'>{riddle.correctAnswer.word}</div>
        {riddle.options.map(option => option === riddle.correctAnswer 
          ? Option(option, () => { playFanfare(); setRiddle(getRiddle())} ) 
          : Option(option, () => playError()))}
      </div>
    </div>
  );
}

export default App;
