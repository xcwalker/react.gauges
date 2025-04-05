import { useState } from "react";
import "../../styles/gauges/rpm.css";

export function RPMGauge(props: { current: boolean }) {
  const [rpm, setRPM] = useState(40);
  const [maxRPM, setMaxRPM] = useState(0);
  const [prevRPM, setPrevRPM] = useState(0);
  const MajorTickRate = 1000;
  const MinorTickRate = 100;
  const MaxDialRPM = 8000;
  const MaxDialAngle = 270;
  const RedlineRPM = 6500;

  const handleRPMChange = (newRPM: number) => {
    setPrevRPM(rpm);
    setRPM(newRPM);
    if (newRPM > maxRPM) {
      setMaxRPM(newRPM);
    }
  };

  const sweepStart = async () => {
    handleRPMChange(0);
    const sweepStep = 25; // Increase step size for faster sweep
    for (let i = 0; i <= MaxDialRPM; i += sweepStep) {
      handleRPMChange(i);
      await new Promise((resolve) => setTimeout(resolve, 1));
    }
    for (let i = MaxDialRPM; i >= 0; i -= sweepStep) {
      handleRPMChange(i);
      await new Promise((resolve) => setTimeout(resolve, 1));
    }
    handleRPMChange(0);
  }

  return (
    <div
      className={"rpm " + (props.current ? "current" : "")}
      onClick={sweepStart}
    >
      <div className="minorTicks">
        {Array.from({ length: MaxDialRPM / MinorTickRate }, (_, i) => {
          const angle = ((i * MinorTickRate) / MaxDialRPM) * MaxDialAngle;
          if ((i * MinorTickRate) % MajorTickRate === 0) return null; // Skip numbers matching the major ticks
            const isRedline = (i * MinorTickRate) >= RedlineRPM;
            return (
            <div
              key={i}
              className="minorTick"
              style={{
              transform: `rotate(${angle}deg)`,
              }}
            >
              <div className={`tick ${isRedline ? "redline" : ""}`} />
            </div>
            );
        })}
      </div>
      <div className="majorTicks">
        {Array.from({ length: MaxDialRPM / MajorTickRate + 1 }, (_, i) => {
          const angle = ((i * MajorTickRate) / MaxDialRPM) * MaxDialAngle;
          const isRedline = (i * MajorTickRate) >= RedlineRPM;
          return (
        <div
          key={i}
          className={`majorTick ${isRedline ? "redline" : ""}`}
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <span style={{ transform: `rotate(${-angle + 45}deg)` }}>
            {(i * MajorTickRate) / 1000}
          </span>
          <div className={`tick ${isRedline ? "redline" : ""}`} />
        </div>
          );
        })}
      </div>
      <div
        className="needle"
        style={{
          transform: `rotate(${(rpm / MaxDialRPM) * MaxDialAngle - 45}deg)`,
        }}
      />
      <div
        className="maxNeedle"
        style={{
          transform: `rotate(${(maxRPM / MaxDialRPM) * MaxDialAngle - 45}deg)`,
        }}
      />
      <div
        className="prevNeedle"
        style={{
          transform: `rotate(${(prevRPM / MaxDialRPM) * MaxDialAngle - 45}deg)`,
        }}
      />

      <div className="rpmometer">
        <span className="value">{Math.ceil(rpm / 100) * 100}</span>
        <span className="unit">RPM x1000</span>
      </div>
    </div>
  );
}
