import { useState } from "react";
import { MusicGauge } from "../components/gauges/music";
import { WeatherGauge } from "../components/gauges/weather";
import { TripGauge } from "../components/gauges/trip";
import { RoundGaugeSetup } from "../components/gauges/setup";

import "../styles/pages/example.css";
import { SpeedRoundGauge } from "../components/gauges/speed_round";
import { RPMGauge } from "../components/gauges/rpm";

function Example() {
  const [viewGauge1, setViewGauge1] = useState("rpm");
  const [viewGauge2, setViewGauge2] = useState("speed");
  const [viewGauge3, setViewGauge3] = useState("music");

  return (
    <section className="example">
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
        <RoundGaugeSetup size={450}>
          <RPMGauge current={viewGauge1 === "rpm" && viewGauge2 !== "night"} />
        </RoundGaugeSetup>
        <RoundGaugeSetup size={500}>
          <SpeedRoundGauge current={viewGauge2 === "speed"} />
          <SpeedRoundGauge mode="night" current={viewGauge2 === "night"} />
        </RoundGaugeSetup>
        <RoundGaugeSetup size={450}>
          <MusicGauge
            current={viewGauge3 === "music" && viewGauge2 !== "night"}
          />
          <WeatherGauge
            current={viewGauge3 === "weather" && viewGauge2 !== "night"}
          />
          <TripGauge
            current={viewGauge3 === "trip" && viewGauge2 !== "night"}
          />
        </RoundGaugeSetup>
      </div>
    </section>
  );
}

export default Example;
