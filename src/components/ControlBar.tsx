import { useAtom } from "jotai";
import {
  fuelAtom,
  gearAtom,
  rpmAtom,
  rpmSettingsAtom,
  speedAtom,
  speedCruiseActiveAtom,
  speedCruiseAtom,
  speedCruiseEnableAtom,
  speedLimitAtom,
  speedSettingsAtom,
} from "../atoms";

import css from "../styles/components/control-bar.module.css";

export default function ControlBar() {
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

  return (
    <div className={css.controlBar}>
      <div className="controls">
        <div className="group">
          <button
            onClick={() => {
              setRpmSettings((prev) => {
                return { ...prev, showGear: !prev.showGear };
              }); // Toggle scaleTickLabels
            }}
          >
            ShowGear: {rpmSettings.showGear ? "On" : "Off"}
          </button>
          <span>Gear: {gear}</span>
          <button
            onClick={() => {
              setGear((prev) => {
                return typeof prev === "number" ? prev + 1 : 1;
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
        <div className="group">
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
      </div>
    </div>
  );
}
