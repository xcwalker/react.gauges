import { ReactNode } from "react";
import "../../styles/gauges/setup.css";

export function RoundGaugeSetup(props: { children: ReactNode; size: number }) {
  return (
    <div
      className="gauge_round"
      style={{ "--_size": props.size + "px" } as React.CSSProperties}
    >
      {props.children}
    </div>
  );
}

export function VerticalGaugeSetup(props: {
  children: ReactNode;
  size: { width: number; height: number };
}) {
  return (
    <div
      className="gauge"
      style={
        {
          width: props.size.width + "px",
          height: props.size.height + "px",
        } as React.CSSProperties
      }
    >
      {props.children}
    </div>
  );
}
