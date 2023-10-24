import React from 'react';
import { useState } from 'react';
import { Idea } from './ideas/ideas';
import { getRiddle, RiddleLevel } from './riddle';


const error = document.getElementById("error")! as HTMLAudioElement; 
      
function playError() { 
  error.play(); 
} 

var fanfare = document.getElementById("fanfare")! as HTMLAudioElement; 

function playFanfare() { 
  fanfare.play(); 
}

function Option(idea: Idea, onClick: () => void) {
  return (<img height={200} width={200} alt={idea.word} src={idea.url} onClick={onClick}/> );
}

function App() {
  const [riddleLevel, setRiddleLevel] = useState<RiddleLevel>('Easy'); 
  const [riddle, setRiddle] = useState(getRiddle(riddleLevel));
  const toggleLevel = () => {
    const newLvl = riddleLevel === 'Easy' ? 'Hard' : 'Easy';
    setRiddleLevel(newLvl);
    setRiddle(getRiddle(newLvl));
  }
  return (
    <div className="App">
      <div className='levelSettings'><span onClick={toggleLevel} className='levelSettings'>przełącz trudność</span></div>
      <div className='correctAnswer'>{riddle.correctAnswer.word}</div>
      <div className='excersizeContainer'>
        {riddle.options.map(option => option === riddle.correctAnswer 
          ? Option(option, () => { playFanfare(); setRiddle(getRiddle(riddleLevel))} ) 
          : Option(option, () => playError()))}
                    </div>
    </div>
  );
}

export default App;
