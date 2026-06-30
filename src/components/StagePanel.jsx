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
          <h1>Guess the player from the career route.</h1>
          <p className="subtitle">Follow the ticket strip, read the stops, and protect the round value.</p>
          <div className="stage-tags" aria-label="Game tags">
            <span>8-card run</span>
            <span>No logos</span>
            <span>Streak scoring</span>
          </div>
        </div>

        <div className="route-court-board">
          <CareerStops teams={player.teams} />

          <div className="card-spotlight">
            <div className="court-lines" aria-hidden="true" />
            <MysteryCard difficulty={player.difficulty} position={player.position} />
          </div>
        </div>
      </div>
    </section>
  );
}
