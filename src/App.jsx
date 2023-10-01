import { useState } from "react";
import { keys } from "./utils/keys";

function App() {
  const [audioName, setAudioName] = useState("");

  // let audio;

  const playAudioOnClick = (e, url) => {
    const audio = new Audio(url);
    audio.play();
    // console.log(e.target.innerText);
    const clickedKey = keys.find((key) => key.key === e.target.innerText);
    setAudioName(clickedKey.audioName);
  };

  const playAudioOnKeyDown = (e) => {
    console.log(e.key);
    const pressedKey = keys.find((key) => key.key === e.key.toUpperCase());
    const audio = new Audio(pressedKey?.audioUrl);
    audio.play();
    setAudioName(pressedKey?.audioName);
  };

  //   onKeyUp={(event) => {
  //     if (event.key === "Backspace") {
  //         handleKeyup(event);
  //     }
  // }}

  return (
    <div>
      {keys.map((key) => {
        return (
          <button
            key={key.id}
            onKeyDown={(e) => playAudioOnKeyDown(e)}
            onClick={(e) => playAudioOnClick(e, key.audioUrl)}
          >
            {key.key}
          </button>
        );
      })}
      <p>{audioName}</p>
    </div>
  );
}

export default App;

// {keys.map((key) => {
//         return (
//             <button
//               key={key.id}
//               onClick={(e) => playAudioOnClick(e, key.audioUrl)}
//               onKeyDown={(e) => playAudioOnKeyDown(e)}
//             >
//               {key.key}
//             </button>
//         )
//       <p>{audioName}</p>
