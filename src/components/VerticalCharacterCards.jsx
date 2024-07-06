import "./css/VerticalCharacterCards.css";

export default function VerticalAnimeCards({ data = [] }) {
  return data.map((anime) => (
    <div key={anime.id} className="character-item">
      <img
        className="anime-image"
        src={anime.image || "/path/to/default-anime-image.jpg"}
        alt={anime.name?.full || "Anime Character"}
        onError={(e) => e.target.src = "/path/to/default-anime-image.jpg"}
      />
      <p>
        {anime.name?.full || "Unknown Name"}{" "}
        {anime.voiceActors && anime.voiceActors[0] && (
          <span>
            - {anime.voiceActors[0]?.name?.full || "Unknown Voice Actor"}
          </span>
        )}
      </p>
      {anime.voiceActors && anime.voiceActors[0] && (
        <img
          className="voice-actor-image"
          src={anime.voiceActors[0]?.image || "/path/to/default-voice-actor-image.jpg"} // Default image
          alt={anime.voiceActors[0]?.name?.full || "Voice Actor"}
          onError={(e) => e.target.src = "/path/to/default-voice-actor-image.jpg"} // Fallback for broken images
        />
      )}
    </div>
  ));
}
