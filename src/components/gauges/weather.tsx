import { useEffect, useState } from "react";
import "../../styles/gauges/weather.css";
import GFIcon from "../GFIcon";

export function WeatherGauge(props: { current: boolean }) {
  const [date, setDate] = useState(new Date());

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

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 10000);

    return () => clearInterval(interval);
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
      <div className="clock">
        <span className="time">{pad(date.getUTCHours(), 2)}:{pad(date.getUTCMinutes(), 2)}</span>
        <span className="date">23/10/25</span>
      </div>
    </div>
  );
}

function pad(num: number, size: number) {
  let temp = num.toString();
  while (temp.length < size) temp = "0" + num;
  return temp;
}