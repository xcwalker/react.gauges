import { useState } from "react";
import "../../styles/gauges/speed_night.css";

export function SpeedNightGauge(props: { current: boolean }) {
  const [speed, setSpeed] = useState(40);
  const [maxSpeed, setMaxSpeed] = useState(0);
  const [prevSpeed, setPrevSpeed] = useState(0);
  const MajorTickRate = 10;
  const MinorTickRate = 5;
  const VeryMinorTickRate = 1;
  const MaxDialSpeed = 120;
  const MaxDialAngle = 270;

  const getTickClass = (tickValue: number) => {
    if (tickValue <= 30) {
      return "visible";
    }
    const nextMinorTick = Math.ceil(speed / MinorTickRate) * MinorTickRate;
    if (tickValue <= nextMinorTick) {
      return "visible";
    }
    return "";
  };

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
      className={"speedNight " + (props.current ? "current" : "")}
      onClick={sweepStart}
    >
      <div className="veryMinorTicks">
        {Array.from({ length: MaxDialSpeed / VeryMinorTickRate }, (_, i) => {
          const tickValue = i * VeryMinorTickRate;
          const angle = (tickValue / MaxDialSpeed) * MaxDialAngle;
          const tickClass = getTickClass(tickValue);

          if (tickValue % MinorTickRate === 0) return null; // Skip numbers matching the minor ticks
          if (tickValue % MajorTickRate === 0) return null; // Skip numbers matching the major ticks

          return (
            <div
              key={i}
              className={`minorTick ${tickClass}`}
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
          const tickValue = i * MinorTickRate;
          const angle = (tickValue / MaxDialSpeed) * MaxDialAngle;
          const tickClass = getTickClass(tickValue);

          if (tickValue % MajorTickRate === 0) return null; // Skip numbers matching the major ticks

          return (
            <div
              key={i}
              className={`minorTick ${tickClass}`}
              style={{
                transform: `rotate(${angle}deg)`,
              }}
            >
              <span
                style={{
                  transform: `rotate(${-angle + 45}deg)`,
                }}
              >
                {tickValue}
              </span>
              <div className="tick" />
            </div>
          );
        })}
      </div>
      <div className="majorTicks">
        {Array.from({ length: MaxDialSpeed / MajorTickRate + 1 }, (_, i) => {
          const tickValue = i * MajorTickRate;
          const angle = (tickValue / MaxDialSpeed) * MaxDialAngle;
          const tickClass = getTickClass(tickValue);

          return (
            <div
              key={i}
              className={`majorTick ${tickClass}`}
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <span style={{ transform: `rotate(${-angle + 45}deg)` }}>
                {tickValue}
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
