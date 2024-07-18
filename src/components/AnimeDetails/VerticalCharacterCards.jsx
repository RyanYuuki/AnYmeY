import "../Styling/VerticalCharacterCards.css";

export default function VerticalAnimeCards({ data = [], language }) {
  const Filtered = data.filter((anime) => 
    anime.voiceActors?.some((actor) => actor.language === language)
  );

  console.log(Filtered);

  return Filtered.map((anime) => (
    <div key={anime.id} className="character-item">
      <img
        className="anime-image"
        src={anime.image || "/path/to/default-anime-image.jpg"}
        alt={anime.name?.full || "Anime Character"}
        onError={(e) => e.target.src = "/path/to/default-anime-image.jpg"}
      />
      <p>
        {anime.name?.full || "Unknown Name"}{" "}
        {anime.voiceActors?.some((actor) => actor.language === language) && (
          <span>
            - {
              anime.voiceActors.find((actor) => actor.language === language)
                ?.name?.full || "Unknown Voice Actor"
            }
          </span>
        )}
      </p>
      {anime.voiceActors?.some((actor) => actor.language === language) && (
        <img
          className="voice-actor-image"
          src={
            anime.voiceActors.find((actor) => actor.language === language)
              ?.image || "/path/to/default-voice-actor-image.jpg"
          }
          alt={
            anime.voiceActors.find((actor) => actor.language === language)
              ?.name?.full || "Voice Actor"
          }
          onError={(e) => e.target.src = "/path/to/default-voice-actor-image.jpg"}
        />
      )}
    </div>
  ));
}
