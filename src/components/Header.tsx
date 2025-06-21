import { NavLink } from "react-router-dom";
import ControlBar from "./ControlBar";
import { useState } from "react";

import css from "../styles/components/header.module.css";

export default function Header() {
  const [showControls, setShowControls] = useState(false);

  return (
    <>
      <header
        className={css.header + (showControls ? ` ${css.showControls}` : "")}
      >
        <div className={css.container}>
          <h1>Car Dashboard</h1>
          <nav>
            <ul>
              <li>
                <NavLinkInternal to="/">Gallery</NavLinkInternal>
              </li>
              <li>
                <NavLinkInternal to="/example">Example</NavLinkInternal>
              </li>
              <li>
                <NavLinkInternal to="/development">Development</NavLinkInternal>
              </li>
            </ul>
            <button
              className="controls-toggle"
              onClick={() => setShowControls((prev) => !prev)}
            >
              {showControls ? "Hide Controls" : "Show Controls"}
            </button>
          </nav>
        </div>
      </header>
      {showControls && <ControlBar />}
    </>
  );
}


function NavLinkInternal({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <NavLink
      className={({ isActive }) => (isActive ? css.active : undefined)}
      to={to}
    >
      {children}
    </NavLink>
  );
}