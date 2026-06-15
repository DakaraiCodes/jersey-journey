export function MysteryCard({ difficulty, position }) {
  return (
    <div className="mystery-player-card" aria-label="Mystery player card">
      <div className="card-shine" />

      <div className="card-topline">
        <span>JJ-08</span>
        <span>{position}</span>
      </div>

      <div className="card-question">?</div>

      <div className="card-rings" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="mystery-card-text">
        <span>{difficulty} route</span>
        <strong>Identity sealed</strong>
      </div>

      <div className="card-footer-strip" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
