import "../../styles/gauges/music.css"

export function MusicGauge(props: { current: boolean }) {
  return (
    <div className={"music " + (props.current ? "current" : "")}>
      <img src={musicInfo.imageURL} alt="" className="background" />
      <img src={musicInfo.imageURL} alt="" className="image" />
      <div className="info">
        <span className="title">{musicInfo.title}</span>
        <span className="artist">{musicInfo.artist}</span>
      </div>
      <div
        className="progress"
        style={
          {
            "--_position": musicInfo.position,
            "--_duration": musicInfo.duration,
          } as React.CSSProperties
        }
      >
        <div className="bar" />
        <span className="position">
          {new Date(musicInfo.position * 1000).toISOString().slice(14, 19)}
        </span>
        <span className="duration">
          {new Date(musicInfo.duration * 1000).toISOString().slice(14, 19)}
        </span>
      </div>
    </div>
  );
} 

const musicInfo = {
  imageURL: "https://i.scdn.co/image/f7a77846ac8a88f49145850d88fdd6bf33944773",
  title: "Someone You Loved",
  artist: "Lewis Capaldi ",
  duration: 306,
  position: 84,
};
