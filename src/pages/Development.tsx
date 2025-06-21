

import { VerticalGaugeSetup } from "../components/gauges/setup";
import SpeedVerticalGauge from "../components/gauges/speed_vertical";
import css from "../styles/pages/development.module.css";

export default function Development() {
  return (
    <section className={css.gallery}>
      <h1>Development</h1>
      <div className={css.gauges}>
        {/* <RoundGaugeSetup size={450}>
          <WeatherGauge />
        </RoundGaugeSetup> */}
        <VerticalGaugeSetup size={{ width: 200, height: 600 }}>
          <SpeedVerticalGauge />
        </VerticalGaugeSetup>
      </div>
    </section>
  );
}
