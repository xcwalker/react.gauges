import { useState, useEffect } from "react";
import "./Gauge.css";
import GFIcon from "./components/GFIcon";

function Gauge() {
  const [view, setView] = useState("music");

  return (
    <>
      <div className="controls">
        <button
          onClick={() => {
            setView("music");
          }}
        >
          Music
        </button>
        <button
          onClick={() => {
            setView("weather");
          }}
        >
          Weather
        </button>
        <button
          onClick={() => {
            setView("trip");
          }}
        >
          Trip Computer
        </button>
      </div>
      <div className="gauge">
        <MusicGauge current={view === "music"} />
        <WeatherGauge current={view === "weather"} />
        <TripGauge current={view === "trip"} />
      </div>
    </>
  );
}

export default Gauge;

function MusicGauge(props: { current: boolean }) {
  return (
    <div className={"music " + (props.current ? "current" : "")}>
      <img src={musicInfo.imageURL} alt="" className="background" />
      <img src={musicInfo.imageURL} alt="" className="image" />
      <div className="info">
        <span className="title">{musicInfo.title}</span>
        <span className="artist">{musicInfo.artist}</span>
      </div>
      <div
        className="progress"
        style={
          {
            "--_position": musicInfo.position,
            "--_duration": musicInfo.duration,
          } as React.CSSProperties
        }
      >
        <div className="bar" />
        <span className="position">
          {new Date(musicInfo.position * 1000).toISOString().slice(14, 19)}
        </span>
        <span className="duration">
          {new Date(musicInfo.duration * 1000).toISOString().slice(14, 19)}
        </span>
      </div>
    </div>
  );
}

function WeatherGauge(props: { current: boolean }) {
  useEffect(() => {
    const rainContainer = document.querySelector(".weather .rain");
    if (rainContainer) {
      rainContainer.innerHTML = ""; // Clear existing raindrops
      for (let i = 0; i < 100; i++) {
        const drop = document.createElement("div");
        drop.className = "raindrop";
        drop.style.left = Math.random() * 100 + "%";
        drop.style.animationDelay = Math.random() * 2 + "s";
        drop.style.animationDuration = 2 + Math.random() * 2 + "s";
        drop.style.opacity = Math.random() * 0.5 + 0.5 + "";
        drop.style.width = Math.random() * 5 + 2 + "px";
        drop.style.height = Math.random() * 5 + 10 + "px";
        rainContainer.appendChild(drop);
      }
    }
  }, []);

  return (
    <div className={"weather " + (props.current ? "current" : "")}>
      <div className="rain night" />
      <GFIcon className="icon">rainy</GFIcon>
      <div className="location">
        <span className="city">Lyneham</span>
        <span className="street">Melsome Road</span>
      </div>
      <div className="info">
        <span className="description">Raining</span>
        <span className="temperature">15°C</span>
      </div>
    </div>
  );
}

function TripGauge(props: { current: boolean }) {
  return <></>;
}

const musicInfo = {
  imageURL: "https://i.scdn.co/image/f7a77846ac8a88f49145850d88fdd6bf33944773",
  title: "Someone You Loved",
  artist: "Lewis Capaldi ",
  duration: 306,
  position: 84,
};
