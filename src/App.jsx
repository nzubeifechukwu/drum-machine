import { useCallback, useEffect, useState } from "react";
import { keys } from "./utils/keys";

function App() {
  const [audioName, setAudioName] = useState("");
  const [isOn, setIsOn] = useState(true);
  const [volume, setVolume] = useState(50);

  const playAudioOnClick = (e, url) => {
    const audio = new Audio(url);
    audio.play();
    const clickedKey = keys.find((key) => key.key === e.target.innerText);
    setAudioName(clickedKey.audioName);
    audio.volume = volume / 100;
  };

  const playAudioOnKeyDown = useCallback(
    (e) => {
      const pressedKey = keys.find((key) => key.key === e.key.toUpperCase());
      const audio = new Audio(pressedKey?.audioUrl);
      audio.play();
      setAudioName(pressedKey?.audioName);
      audio.volume = volume / 100;
    },
    [volume]
  );

  useEffect(() => {
    if (isOn) {
      document.body.addEventListener("keydown", playAudioOnKeyDown);

      return () => {
        document.body.removeEventListener("keydown", playAudioOnKeyDown);
      };
    }
  }, [isOn, playAudioOnKeyDown]);

  if (isOn) {
    return (
      <>
        <main>
          <section className="keys">
            {keys.map((key) => {
              return (
                <button
                  key={key.id}
                  onClick={(e) => playAudioOnClick(e, key.audioUrl)}
                >
                  {key.key}
                </button>
              );
            })}
          </section>
          <section className="controls">
            <div className="power">
              <p>Power</p>
              <button
                onClick={() => {
                  setIsOn(!isOn);
                  setAudioName("");
                }}
                style={{ backgroundColor: "#1E641E" }}
              >
                {isOn && "on"}
              </button>
            </div>
            <div className="audio-name">
              <p>{audioName}</p>
            </div>
            <div className="volume">
              <p>volume</p>
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => {
                  setVolume(e.target.valueAsNumber);
                }}
              />
            </div>
          </section>
        </main>
        <footer>
          <a href="https://github.com/nzubeifechukwu/drum-machine">
            &copy; Nzube Ifechukwu
          </a>
        </footer>
      </>
    );
  } else {
    return (
      <>
        <main>
          <section className="keys">
            {keys.map((key) => {
              return <button key={key.id}>{key.key}</button>;
            })}
          </section>
          <section className="controls">
            <div className="power">
              <p>Power</p>
              <button
                onClick={() => setIsOn(!isOn)}
                style={{ backgroundColor: "#B22222" }}
              >
                {isOn || "off"}
              </button>
            </div>
            <div className="audio-name"></div>
            <div className="volume">
              <p>volume</p>
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => {
                  setVolume(e.target.valueAsNumber);
                }}
              />
            </div>
          </section>
        </main>
        <footer>
          <a href="https://github.com/nzubeifechukwu/drum-machine">
            &copy; Nzube Ifechukwu
          </a>
        </footer>
      </>
    );
  }
}

export default App;
