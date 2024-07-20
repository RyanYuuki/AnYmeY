import "../Styling/VerticalCharacterCards.css";

export default function VerticalAnimeCards({ data = [], language, isManga }) {
  const filteredData = data.filter((anime) =>
    isManga
      ? anime
      : anime.voiceActors?.some((actor) => actor.language === language)
  );

  return filteredData.map((anime) => {
    const voiceActor = isManga
      ? anime
      : anime.voiceActors.find((actor) => actor.language === language);
    return (
      <div key={anime.id} className="character-item">
        <img
          className="anime-image"
          src={anime.image || "/path/to/default-anime-image.jpg"}
          alt={anime.name?.full || "Anime Character"}
          onError={(e) => (e.target.src = "/path/to/default-anime-image.jpg")}
        />
        <div className="anime-image-hover">
          <p>{anime.role}</p>
        </div>
        <p>
          {anime.name?.full || "Unknown Name"}
          {!isManga && voiceActor && (
            <span>- {voiceActor.name?.full || "Unknown Voice Actor"}</span>
          )}
        </p>
        {!isManga && voiceActor && (
          <img
            className="voice-actor-image"
            src={voiceActor.image || "/path/to/default-voice-actor-image.jpg"}
            alt={voiceActor.name?.full || "Voice Actor"}
            onError={(e) =>
              (e.target.src = "/path/to/default-voice-actor-image.jpg")
            }
          />
        )}
      </div>
    );
  });
}
