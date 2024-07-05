import "./css/VerticalCharacterCards.css";
export default function VerticalAnimeCards({ data }) {
  return data.map((anime) =>
    (
      <div key={anime.id} className="character-item">
        <img
          className="anime-image"
          src={anime.image}
        />
          <p>{anime.name.full} <span>-{anime.voiceActors[0].name.full}</span></p>
          <img src={anime.voiceActors[0].image} />
      </div>
    )
  );
}
