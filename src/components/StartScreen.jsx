import { RUN_MODES } from "../utils/game";

const START_RULES = [
  { label: "Rounds", value: "8", note: "Fresh route every stop" },
  { label: "Hints", value: "-150", note: "Use only when stuck" },
  { label: "Reveal", value: "0", note: "No points, next round unlocked" },
];

const RUN_STATS = [
  { label: "Rounds", value: "8" },
  { label: "Max", value: "8000" },
  { label: "Hint", value: "-150" },
];

const PACK_STOPS = ["BOS", "PHX", "ATL", "BKN"];

const MODE_EMBLEMS = {
  mixed: "MX",
  easy: "EZ",
  hard: "HD",
  journeyman: "JM",
};

export function StartScreen({ selectedMode, onModeChange, onStartRun }) {
  const selectedRun = RUN_MODES.find((mode) => mode.id === selectedMode) ?? RUN_MODES[0];

  return (
    <section className="start-screen" aria-labelledby="start-title">
      <div className="start-hero">
        <div className="start-copy-block">
          <p className="eyebrow">Beta Run Setup</p>
          <h1 id="start-title">Open the pack. Read the route.</h1>
          <p className="subtitle">
            Eight mystery careers, one player at a time. Study the team path,
            protect your score, and finish the run with a clean card.
          </p>
        </div>

        <div className="pack-showcase" aria-hidden="true">
          <div className="pack-card">
            <div className="pack-card-top">
              <span>Jersey Journey</span>
              <strong>Route Pack</strong>
            </div>
            <div className="pack-card-mark">JJ</div>
            <div className="pack-route-preview">
              {PACK_STOPS.map((stop, index) => (
                <span key={stop}>
                  <i>{String(index + 1).padStart(2, "0")}</i>
                  {stop}
                </span>
              ))}
            </div>
            <div className="pack-card-bottom">
              <span>Mystery Player</span>
              <strong>{selectedRun.name}</strong>
            </div>
          </div>

          <div className="route-scan">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="start-rules" aria-label="Game rules">
          {START_RULES.map((rule) => (
            <div key={rule.label}>
              <span>{rule.label}</span>
              <strong>{rule.value}</strong>
              <small>{rule.note}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="mode-picker" aria-label="Run type selection">
        <div className="mode-console">
          <div>
            <p className="mode-kicker">Choose Run Type</p>
            <h2>{selectedRun.name}</h2>
            <span>{selectedRun.tagline}</span>
          </div>
          <strong>{RUN_MODES.length} modes</strong>
        </div>

        <div className="selected-run-slip">
          <span>Selected Pack</span>
          <strong>{selectedRun.name}</strong>
          <p>{selectedRun.description}</p>
        </div>

        <div className="run-stat-strip" aria-label="Run setup stats">
          {RUN_STATS.map((stat) => (
            <div key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>

        <div className="scouting-report-preview" aria-label="Scouting report preview">
          <div>
            <span>Scouting Report</span>
            <strong>3 locked clues</strong>
          </div>
          <div className="locked-hint-slots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="mode-grid">
          {RUN_MODES.map((mode) => {
            const isSelected = selectedMode === mode.id;

            return (
              <button
                type="button"
                key={mode.id}
                className={isSelected ? "mode-card active" : "mode-card"}
                aria-pressed={isSelected}
                onClick={() => onModeChange(mode.id)}
              >
                <span className="mode-emblem" aria-hidden="true">
                  {MODE_EMBLEMS[mode.id]}
                </span>
                <span className="mode-card-copy">
                  <span>{mode.name}</span>
                  <strong>{mode.tagline}</strong>
                  <small>{mode.description}</small>
                </span>
              </button>
            );
          })}
        </div>

        <button type="button" className="start-run-button" onClick={onStartRun}>
          <span>Start Run</span>
          <strong>Deal 8 routes</strong>
        </button>
      </div>
    </section>
  );
}
