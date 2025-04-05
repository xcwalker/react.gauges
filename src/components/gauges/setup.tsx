import { ReactNode } from "react";
import "../../styles/gauges/setup.css";

export function GaugeSetup(props: { children: ReactNode, size: number }) {
  return <div className="gauge" style={{"--_size": props.size + "px"} as React.CSSProperties}>{props.children}</div>;
}
