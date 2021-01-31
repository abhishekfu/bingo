import React, { useEffect, useState,useContext } from "react";
import { WinnerContext} from '../context/winner.context'
import Tile from "./tile";
import lines from "../utilities/data";
//import shuffle from "shuffle-array";
import Confetti from "./confetti";

const data = [
  "(child noises in the background)",
  "Hello, hello?",
  "I need to jump in another call",
  "can everyone go on mute",
  "could you please get closer to the mic",
  "(load painful echo / feedback)",
  "Next slide, please.",
  "can we take this offline?",
  "is ____ on the call?",
  "Could you share this slides afterwards?",
  "can somebody grant presenter rights?",
  "can you email that to everyone?",
  "CONF CALL 😷 BINGO",
  "sorry, I had problems losing in",
  "(animal noises in the background)",
  "sorry, I didn’t found the conference id",
  "I was having connection issues",
  "I’ll have to get back to you",
  "who just joined?",
  "sorry, something ____ with my calendar",
  "do you see my screen?",
  "lets wait for ____!",
  "you will send the minutes?",
  "sorry, I was on mute.",
  "can you repeat, please?",
];

// const data = shuffle(bbb).reduce(
//   (data, value, index) => ({ ...data, [index]: value }),
//   {}
// );

function Blocks() {
  const [state, setState] = useState({ checked: {} });
  const {setWinner} = useContext(WinnerContext);
  const isWon = (checked) => {
    const range = [0, 1, 2, 3, 4];
    return (
      undefined !==
        range.find((row) =>
          range.every((column) => checked[row * 5 + column])
        ) ||
      undefined !==
        range.find((column) =>
          range.every((row) => checked[row * 5 + column])
        ) ||
      range.every((index) => checked[index * 5 + index]) ||
      range.every((index) => checked[index * 5 + 4 - index])
    );
  };
  const toggle = (id) => {
    
    setState((state) => {
      const checked = { ...state.checked, [id]: !state.checked[id] };
      const won = isWon(checked);
      return {
        ...state,
        checked,
        won,
      };
    });
  };
  useEffect(() => {
    let newArr=[];
    for (let i = 0; i < lines.length; i++) {
      const [a,b,c,d,e]=lines[i];
      if(state.checked[a] && state.checked[b] && state.checked[c] && state.checked[d] && state.checked[e]){
        newArr.push(a,b,c,d,e);
      }
    }
   
      setWinner(newArr);
    
    
    
  }, [state.checked])

  return (
    <>
      <div className="wrapper">
        {Object.keys(data).map((id) => (
          <Tile
            key={id}
            id={id}
            isSet={!!state.checked[id]}
            onToggle={() => toggle(id)}
            
          >
            {data[id]}
          </Tile>
        ))}
      </div>
      {state.won ? <Confetti /> : null}
    </>
  );
}

export default (Blocks);
