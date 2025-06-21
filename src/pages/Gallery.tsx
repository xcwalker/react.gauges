import { MusicGauge } from "../components/gauges/music";
import { RPMGauge } from "../components/gauges/rpm";
import { RoundGaugeSetup, VerticalGaugeSetup } from "../components/gauges/setup";
import { SpeedRoundGauge } from "../components/gauges/speed_round";
import SpeedVerticalGauge from "../components/gauges/speed_vertical";
import { TripGauge } from "../components/gauges/trip";
import { WeatherGauge } from "../components/gauges/weather";

import css from "../styles/pages/gallery.module.css";

export default function Gallery() {
  return (
    <section className={css.gallery}>
      <h1>Gallery</h1>
      <div className={css.gauges}>
        <RoundGaugeSetup size={450}>
          <WeatherGauge />
        </RoundGaugeSetup>
        <RoundGaugeSetup size={450}>
          <RPMGauge />
        </RoundGaugeSetup>
        <RoundGaugeSetup size={450}>
          <SpeedRoundGauge mode="day" />
        </RoundGaugeSetup>
        <RoundGaugeSetup size={450}>
          <SpeedRoundGauge mode="night" />
        </RoundGaugeSetup>
        <RoundGaugeSetup size={450}>
          <TripGauge />
        </RoundGaugeSetup>
        <RoundGaugeSetup size={450}>
          <MusicGauge />
        </RoundGaugeSetup>
        <VerticalGaugeSetup size={{ width: 200, height: 600 }}>
          <SpeedVerticalGauge />
        </VerticalGaugeSetup>
      </div>
    </section>
  );
}
