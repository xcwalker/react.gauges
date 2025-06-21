import { useState } from "react";
import { MusicGauge } from "./components/gauges/music";
import { WeatherGauge } from "./components/gauges/weather";
import { TripGauge } from "./components/gauges/trip";
import { GaugeSetup } from "./components/gauges/setup";

import "./styles/gauges.css";
import { SpeedGauge } from "./components/gauges/speed";
import { RPMGauge } from "./components/gauges/rpm";
import { useAtom } from "jotai";
import { fuelAtom, gearAtom, rpmAtom, rpmSettingsAtom, speedAtom, speedCruiseActiveAtom, speedCruiseAtom, speedCruiseEnableAtom, speedLimitAtom, speedSettingsAtom } from "./atoms";

function Gauge() {
  const [speed, setSpeed] = useAtom(speedAtom);
  const [speedLimit, setSpeedLimit] = useAtom(speedLimitAtom);
  const [speedSettings, setSpeedSettings] = useAtom(speedSettingsAtom);
  const [fuel, setFuel] = useAtom(fuelAtom);
  const [rpm, setRPM] = useAtom(rpmAtom);
  const [cruiseEnabled, setCruiseEnabled] = useAtom(speedCruiseEnableAtom);
  const [cruiseActive, setCruiseActive] = useAtom(speedCruiseActiveAtom);
  const [cruiseSpeed, setCruiseSpeed] = useAtom(speedCruiseAtom);
  const [rpmSettings, setRpmSettings] = useAtom(rpmSettingsAtom);
  const [gear, setGear] = useAtom(gearAtom);
  const [viewGauge1, setViewGauge1] = useState("rpm");
  const [viewGauge2, setViewGauge2] = useState("speed");
  const [viewGauge3, setViewGauge3] = useState("music");

  return (
    <>
      <div className="controls">
        <div className="group">
          <button
            onClick={() => {
              setRpmSettings((prev) => {
                return { ...prev, showGear: !prev.showGear };
              }); // Toggle scaleTickLabels
            }}
          >ShowGear: {rpmSettings.showGear ? "On" : "Off"}</button>
          <span>Gear: {gear}</span>
          <button
            onClick={() => {
              setGear((prev) => {
                return typeof prev === "number"
                  ? prev + 1
                  : 1;
              });
            }}
          >
            Gear +
          </button>
          <button
            onClick={() => {
              setGear((prev) => {
                return typeof prev === "number"
                  ? prev === 1
                    ? 1
                    : prev - 1
                  : 1;
              });
            }}
          >
            Gear -
          </button>
          <button
            onClick={() => {
              setGear("P");
            }}
          >
            Gear P
          </button>
          <button
            onClick={() => {
              setGear("R");
            }}
          >
            Gear R
          </button>
          <button
            onClick={() => {
              setGear("N");
            }}
          >
            Gear N
          </button>
          <button
            onClick={() => {
              setGear("D");
            }}
          >
            Gear D
          </button>
        </div>
        <div className="group">
          <button
            onClick={() => {
              setCruiseActive(!cruiseActive);
            }}
          >
            {cruiseActive ? "Cruising" : "Activate Cruise"}
          </button>
          <button
            onClick={() => {
              setCruiseEnabled((prev) => {
                setCruiseActive(false);
                return !prev;
              });
            }}
          >
            Cruise {cruiseEnabled ? "ON" : "OFF"}
          </button>
          <button
            onClick={() => {
              setCruiseSpeed(speed);
            }}
          >
            Set Cruise
          </button>
          <button
            onClick={() => {
              setCruiseSpeed(undefined);
            }}
          >
            Clear
          </button>
          <input
            type="range"
            name=""
            id=""
            value={cruiseSpeed}
            max={speedSettings.MaxDialSpeed}
            onChange={(e) => {
              setCruiseSpeed(parseInt(e.target.value));
            }}
          />
        </div>
        <input
          type="range"
          name=""
          max={100}
          value={fuel}
          id=""
          onChange={(e) => {
            setFuel(parseInt(e.target.value));
          }}
        />
        <input
          type="range"
          name=""
          max={rpmSettings.MaxDialRPM}
          value={rpm}
          id=""
          step={100}
          onChange={(e) => {
            setRPM(parseInt(e.target.value));
          }}
        />
        <input
          type="range"
          name=""
          max={speedSettings.MaxDialSpeed}
          id=""
          value={speed}
          onChange={(e) => {
            setSpeed(parseInt(e.target.value));
          }}
        />
        <input
          type="range"
          name=""
          max={speedSettings.MaxDialSpeed}
          id=""
          value={speedLimit}
          step={5}
          onChange={(e) => {
            setSpeedLimit(parseInt(e.target.value));
          }}
        />
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
              setSpeedSettings((prev) => {
                return { ...prev, scaleTickLabels: !prev.scaleTickLabels };
              }); // Toggle scaleTickLabels
            }}
          >
            ScaleTickLabel: {speedSettings.scaleTickLabels ? "ON" : "OFF"}
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
          <SpeedGauge mode="night" current={viewGauge2 === "night"} />
        </GaugeSetup>
        <GaugeSetup size={450}>
          <MusicGauge
            current={viewGauge3 === "music" && viewGauge2 !== "night"}
          />
          <WeatherGauge
            current={viewGauge3 === "weather" && viewGauge2 !== "night"}
          />
          <TripGauge
            current={viewGauge3 === "trip" && viewGauge2 !== "night"}
          />
        </GaugeSetup>
      </div>
    </>
  );
}

export default Gauge;