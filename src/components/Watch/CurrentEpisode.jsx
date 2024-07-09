/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
function CurrentEpisode({ data, title }) {
  return (
    <div className="current-episode-container">
      <h2>{title}</h2>
      <p>You{`'`}re Watching Episode {data.number}</p>
    </div>
  );
}

export default CurrentEpisode;
