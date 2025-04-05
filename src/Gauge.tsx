import { useState } from "react";
import { MusicGauge } from "./components/gauges/music";
import { WeatherGauge } from "./components/gauges/weather";
import { TripGauge } from "./components/gauges/trip";
import { GaugeSetup } from "./components/gauges/setup";

import "../../styles/gauges.css";
import { SpeedGauge } from "./components/gauges/speed";
import { RPMGauge } from "./components/gauges/rpm";
import { SpeedNightGauge } from "./components/gauges/speed_night";

function Gauge() {
  const [viewGauge1, setViewGauge1] = useState("rpm");
  const [viewGauge2, setViewGauge2] = useState("speed");
  const [viewGauge3, setViewGauge3] = useState("music");

  return (
    <>
      <div className="controls">
        <div className="group">
          <button
            onClick={() => {
              setViewGauge1("rpm");
            }}
          >
            RPM
          </button>
          <button
            onClick={() => {
              setViewGauge1("weather");
            }}
          >
            Other
          </button>
          <button
            onClick={() => {
              setViewGauge1("trip");
            }}
          >
            Other2
          </button>
        </div>
        <div className="group">
          <button
            onClick={() => {
              setViewGauge2("speed");
            }}
          >
            Speed
          </button>
          <button
            onClick={() => {
              setViewGauge2("night");
            }}
          >
            Night Mode
          </button>
          <button
            onClick={() => {
              setViewGauge2("trip");
            }}
          >
            Other2
          </button>
        </div>
        <div className="group">
          <button
            onClick={() => {
              setViewGauge3("music");
            }}
          >
            Music
          </button>
          <button
            onClick={() => {
              setViewGauge3("weather");
            }}
          >
            Weather
          </button>
          <button
            onClick={() => {
              setViewGauge3("trip");
            }}
          >
            Trip Computer
          </button>
        </div>
      </div>
      <div className="gauges">
        <GaugeSetup size={450}>
          <RPMGauge current={viewGauge1 === "rpm" && viewGauge2 !== "night"} />
        </GaugeSetup>
        <GaugeSetup size={500}>
          <SpeedGauge current={viewGauge2 === "speed"} />
          <SpeedNightGauge current={viewGauge2 === "night"} />
        </GaugeSetup>
        <GaugeSetup size={450}>
          <MusicGauge current={viewGauge3 === "music" && viewGauge2 !== "night"} />
          <WeatherGauge current={viewGauge3 === "weather" && viewGauge2 !== "night"} />
          <TripGauge current={viewGauge3 === "trip" && viewGauge2 !== "night"} />
        </GaugeSetup>
      </div>
    </>
  );
}

export default Gauge;
