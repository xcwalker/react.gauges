import css from "../styles/components/footer.module.css";
import { Logos } from "./Logo";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <div className={css.column}>
          <Logos.xcwalkeruk className={css.logo} />
          <span className={css.span}>
            Built by{" "}
            <a href="https://xcw.one/development ">xcwalker development</a>
          </span>
          <span className={css.span}>Copyright © 2025 xcwalker.</span>
          <span className={css.span}>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}