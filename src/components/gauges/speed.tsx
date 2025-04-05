import { useState } from "react";
import "../../styles/gauges/speed.css";

export function SpeedGauge(props: { current: boolean }) {
  const [speed, setSpeed] = useState(40);
  const [maxSpeed, setMaxSpeed] = useState(0);
  const [prevSpeed, setPrevSpeed] = useState(0);
  const MajorTickRate = 10;
  const MinorTickRate = 5;
  const VeryMinorTickRate = 1;
  const MaxDialSpeed = 120;
  const MaxDialAngle = 270;

  const handleSpeedChange = (newSpeed: number) => {
    setPrevSpeed(speed);
    setSpeed(newSpeed);
    if (newSpeed > maxSpeed) {
      setMaxSpeed(newSpeed);
    }
  };

  const sweepStart = async () => {
    handleSpeedChange(0);
    for (let i = 0; i <= MaxDialSpeed; i++) {
      handleSpeedChange(i);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    for (let i = MaxDialSpeed; i >= 0; i--) {
      handleSpeedChange(i);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    handleSpeedChange(0);
  }

  return (
    <div
      className={"speed " + (props.current ? "current" : "")}
      onClick={sweepStart}
    >
      <div className="veryMinorTicks">
        {Array.from({ length: MaxDialSpeed / VeryMinorTickRate }, (_, i) => {
          const angle = ((i * VeryMinorTickRate) / MaxDialSpeed) * MaxDialAngle;
          if ((i * VeryMinorTickRate) % MinorTickRate === 0) return null; // Skip numbers matching the major ticks
          if ((i * VeryMinorTickRate) % MajorTickRate === 0) return null; // Skip numbers matching the major ticks

          return (
            <div
              key={i}
              className="minorTick"
              style={{
                transform: `rotate(${angle}deg)`,
              }}
            >
              <div className="tick" />
            </div>
          );
        })}
      </div>
      <div className="minorTicks">
        {Array.from({ length: MaxDialSpeed / MinorTickRate }, (_, i) => {
          const angle = ((i * MinorTickRate) / MaxDialSpeed) * MaxDialAngle;
          if ((i * MinorTickRate) % MajorTickRate === 0) return null; // Skip numbers matching the major ticks
          return (
            <div
              key={i}
              className="minorTick"
              style={{
                transform: `rotate(${angle}deg)`,
              }}
            >
              <span
                style={{
                  transform: `rotate(${-angle + 45}deg)`,
                }}
              >
                {i * MinorTickRate}
              </span>
              <div className="tick" />
            </div>
          );
        })}
      </div>
      <div className="majorTicks">
        {Array.from({ length: MaxDialSpeed / MajorTickRate + 1 }, (_, i) => {
          const angle = ((i * MajorTickRate) / MaxDialSpeed) * MaxDialAngle;
          return (
            <div
              key={i}
              className="majorTick"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <span style={{ transform: `rotate(${-angle + 45}deg)` }}>
                {i * MajorTickRate}
              </span>
              <div className="tick" />
            </div>
          );
        })}
      </div>
      <div
        className="needle"
        style={{
          transform: `rotate(${(speed / MaxDialSpeed) * MaxDialAngle - 45}deg)`,
        }}
      />
      <div
        className="maxNeedle"
        style={{
          transform: `rotate(${
            (maxSpeed / MaxDialSpeed) * MaxDialAngle - 45
          }deg)`,
        }}
      />
      <div
        className="prevNeedle"
        style={{
          transform: `rotate(${
            (prevSpeed / MaxDialSpeed) * MaxDialAngle - 45
          }deg)`,
        }}
      />

      <div className="speedometer">
        <span className="value">{speed}</span>
        <span className="unit">mph</span>
      </div>
    </div>
  );
}
