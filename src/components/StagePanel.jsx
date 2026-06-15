import { CareerStops } from "./CareerStops";
import { MysteryCard } from "./MysteryCard";

export function StagePanel({ player, roundIndex }) {
  return (
    <section className="stage-panel round-enter" key={roundIndex}>
      <div className="arena-rail" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="stage-content">
        <div className="stage-copy">
          <p className="eyebrow">Nightly Run</p>
          <h1>Read the route. Name the player.</h1>
          <p className="subtitle">A basketball career puzzle built like a courtside scoreboard.</p>
          <div className="stage-tags" aria-label="Game tags">
            <span>8-card run</span>
            <span>No logos</span>
            <span>Streak scoring</span>
          </div>
        </div>

        <div className="card-spotlight">
          <div className="court-lines" aria-hidden="true" />
          <MysteryCard difficulty={player.difficulty} position={player.position} />
        </div>

        <CareerStops teams={player.teams} />
      </div>
    </section>
  );
}
