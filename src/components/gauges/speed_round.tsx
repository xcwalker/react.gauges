import React, { useState } from "react";
import "../../styles/gauges/speed_round.css";
import "../../styles/gauges/speed_round_night.css";
import { useAtom, useAtomValue } from "jotai";
import {
  fuelAtom,
  speedAtom,
  speedCruiseActiveAtom,
  speedCruiseAtom,
  speedCruiseEnableAtom,
  speedLimitAtom,
  speedSettingsAtom,
} from "../../atoms";

export function SpeedRoundGauge(props: { current?: boolean; mode?: "night" | "day" }) {
  const [speed, setSpeed] = useAtom(speedAtom);
  const speedSettings = useAtomValue(speedSettingsAtom);
  const speedLimit = useAtomValue(speedLimitAtom);
  const speedCruise = useAtomValue(speedCruiseAtom);
  const speedCruiseEnabled = useAtomValue(speedCruiseEnableAtom);
  const speedCruiseActive = useAtomValue(speedCruiseActiveAtom);
  const fuel = useAtomValue(fuelAtom);
  const [maxSpeed, setMaxSpeed] = useState(0);
  const [prevSpeed, setPrevSpeed] = useState(0);

  const handleSpeedChange = (newSpeed: number) => {
    setPrevSpeed(speed);
    setSpeed(newSpeed);
    if (newSpeed > maxSpeed) {
      setMaxSpeed(newSpeed);
    }
  };

  const sweepStart = async () => {
    handleSpeedChange(0);
    for (let i = 0; i <= speedSettings.MaxDialSpeed; i++) {
      handleSpeedChange(i);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    for (let i = speedSettings.MaxDialSpeed; i >= 0; i--) {
      handleSpeedChange(i);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    handleSpeedChange(0);
  };

  return (
    <div
      className={
        "speed" +
        (props.current === undefined || props.current ? " current" : "") +
        (props.mode === "night" ? " night" : "")
      }
      onClick={sweepStart}
    >
      <div className="ticks">
        {Array.from(
          {
            length:
              speedSettings.MaxDialSpeed / speedSettings.VeryMinorTickRate + 1,
          },
          (_, i) => {
            const angle =
              ((i * speedSettings.VeryMinorTickRate) /
                speedSettings.MaxDialSpeed) *
              speedSettings.MaxDialAngle;

            const isMinorTick =
              (i * speedSettings.VeryMinorTickRate) %
                speedSettings.MinorTickRate ===
              0;
            const isMajorTick =
              (i * speedSettings.VeryMinorTickRate) %
                speedSettings.MajorTickRate ===
              0;

            const isVisible =
              i <
                Math.ceil(
                  (Math.max(speed, speedCruise ? speedCruise : 0) + 1) / 5
                ) *
                  5 +
                  1 || i < 31;

            return (
              <div
                key={i}
                className={
                  "veryMinorTick" +
                  (isMinorTick ? " minorTick" : "") +
                  (isMajorTick ? " majorTick" : "") +
                  (isVisible ? " visible" : "")
                }
                style={{
                  transform: `rotate(${angle}deg)`,
                }}
              >
                {(isMajorTick || isMinorTick) && (
                  <span
                    className={
                      "tickLabel" +
                      (isMajorTick ? " majorTickLabel" : " minorTickLabel") +
                      (isVisible ? " visible" : "")
                    }
                    style={{
                      transform: `rotate(${-angle + 45}deg) scale(${
                        speedSettings.scaleTickLabels
                          ? Math.min(
                              1 +
                                Math.max(
                                  0,
                                  1 -
                                    Math.abs(
                                      speed -
                                        i * speedSettings.VeryMinorTickRate
                                    ) /
                                      5
                                ) *
                                  0.5,
                              1.5
                            )
                          : 1
                      })`,
                    }}
                  >
                    {i * speedSettings.VeryMinorTickRate}
                  </span>
                )}
                <div className="tick" />
              </div>
            );
          }
        )}
      </div>
      <div
        className="needle"
        style={{
          transform: `rotate(${
            (speed / speedSettings.MaxDialSpeed) * speedSettings.MaxDialAngle -
            45
          }deg)`,
        }}
      />
      <div
        className="cruiseIndicator"
        style={
          {
            transform: `rotate(${
              ((speedCruise ? speedCruise : 0) / speedSettings.MaxDialSpeed) *
                speedSettings.MaxDialAngle -
              45
            }deg)`,
            "--_background":
              (speedCruise ? speedCruise : 0) >= speed
                ? props.mode !== "night"
                  ? "white"
                  : "darkred"
                : "red",
            opacity:
              speedCruise && speedCruiseActive && speedCruiseEnabled ? 1 : 0,
          } as React.CSSProperties
        }
      />
      <div
        className="cruiseArcFromNeedle"
        style={
          {
            "--_currentSpeed": speed,
            "--_speedCruise": speedCruise ? speedCruise : 0,
            "--_maxSpeed": speedSettings.MaxDialSpeed,
            "--_maxGaugeAngle": speedSettings.MaxDialAngle,
            background:
              (speedCruise ? speedCruise : 0) > speed
                ? props.mode !== "night"
                  ? "white"
                  : "darkred"
                : "red",
            opacity:
              speedCruise && speedCruiseActive && speedCruiseEnabled ? 1 : 0,
          } as React.CSSProperties
        }
      />
      <div
        className="maxNeedle"
        style={{
          transform: `rotate(${
            (maxSpeed / speedSettings.MaxDialSpeed) *
              speedSettings.MaxDialAngle -
            45
          }deg)`,
        }}
      />
      <div
        className="prevNeedle"
        style={{
          transform: `rotate(${
            (prevSpeed / speedSettings.MaxDialSpeed) *
              speedSettings.MaxDialAngle -
            45
          }deg)`,
        }}
      />

      <div className="speedometer">
        <span className="value">{speed}</span>
        <span className="unit">mph</span>
        <div className={`limit ${speed > speedLimit ? "over" : ""}`}>
          {speedLimit}
        </div>
        <div
          className={`cruise ${speedCruiseEnabled ? "enabled" : ""} ${
            speedCruiseActive && speedCruise ? "active" : ""
          }`}
        >
          {speedCruise ? speedCruise : "C"}
        </div>
      </div>

      <div className="fuel">
        {Array.from({ length: 20 + 1 }, (_, i) => {
          const angle = (i / 20) * 50;
          const isMajorTick = i % 5 === 0; // Skip numbers matching the major ticks

          const isVisible = i < Math.ceil((fuel + 1) / 25) * 5 + 1 || i < 5;

          return (
            <div
              key={i}
              className={
                (isMajorTick ? "majorTick" : "minorTick") +
                (isVisible ? " visible" : "")
              }
              style={{
                transform: `rotate(${angle}deg)`,
              }}
            >
              {isMajorTick && (
                <span
                  className={"tickLabel"}
                  style={{
                    transform: `rotate(${-angle + 115}deg)`,
                  }}
                >
                  {i / 5}/4
                </span>
              )}
              <div className="tick" />
            </div>
          );
        })}
        <div
          className="indicatorArc"
          style={
            {
              "--_fuel-level": fuel,
              background:
                fuel > 15
                  ? props.mode !== "night"
                    ? "white"
                    : "darkred"
                  : "red",
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
}
