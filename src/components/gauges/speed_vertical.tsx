import { useAtomValue } from "jotai";
import {
  speedAtom,
  speedCruiseActiveAtom,
  speedCruiseAtom,
  speedCruiseEnableAtom,
  speedLimitAtom,
  speedSettingsAtom,
} from "../../atoms";

import "../../styles/gauges/speed_vertical.css";

export default function SpeedVerticalGauge() {
  const speed = useAtomValue(speedAtom);
  const speedSettings = useAtomValue(speedSettingsAtom);
  const speedLimit = useAtomValue(speedLimitAtom);
  const speedCruise = useAtomValue(speedCruiseAtom);
  const speedCruiseEnabled = useAtomValue(speedCruiseEnableAtom);
  const speedCruiseActive = useAtomValue(speedCruiseActiveAtom);

  return (
    <div
      className="speed_vertical"
      style={
        {
          "--_current-speed": speed,
          "--_limit_speed": speedLimit,
          "--_cruise_speed": speedCruise,
        } as React.CSSProperties
      }
    >
      <div className="speedometer">
        <span className="value">{speed}</span>
        <span className="unit">mph</span>
      </div>
      <div className="speed_indicator" />
      <div className="speed_indicator_limit" />
      <div
        className={
          "speed_indicator_cruise" +
          (+speedCruiseEnabled ? " enabled" : "") +
          (+speedCruiseActive ? " active" : "")
        }
      />
      <div className="ticks">
        {Array.from(
          {
            length:
              speedSettings.MaxDialSpeed / speedSettings.VeryMinorTickRate + 1,
          },
          (_, i) => {
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
              >
                {(isMajorTick || isMinorTick) && (
                  <span
                    className={
                      "tickLabel" +
                      (isMajorTick ? " majorTickLabel" : " minorTickLabel") +
                      (isVisible ? " visible" : "")
                    }
                    style={{
                      opacity:
                        Math.abs(speed - i * speedSettings.VeryMinorTickRate) <=
                        2
                          ? 0
                          : Math.abs(
                              speed - i * speedSettings.VeryMinorTickRate
                            ) <= 5
                          ? (Math.abs(
                              speed - i * speedSettings.VeryMinorTickRate
                            ) -
                              2) /
                            3
                          : 1,
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
    </div>
  );
}
