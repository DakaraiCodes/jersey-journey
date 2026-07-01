import { RUN_MODES } from "../utils/game";

const ROUTE_STOPS = [
  { abbr: "BOS", rail: "East", tone: "green" },
  { abbr: "PHX", rail: "West", tone: "gold" },
  { abbr: "ATL", rail: "West", tone: "red" },
  { abbr: "BKN", rail: "East", tone: "silver" },
];

const RUN_STATS = [
  { label: "Rounds", value: "8", note: "Fresh route every stop" },
  { label: "Max Score", value: "8000", note: "Can you perfect it?" },
  { label: "Hints Cost", value: "-150", note: "Use only when stuck" },
];

export function StartScreen({ selectedMode, onModeChange, onStartRun }) {
  return (
    <section className="start-screen start-screen-remodel" aria-labelledby="start-title">
      <div className="start-main-board">
        <div className="start-title-block">
          <h1 id="start-title">Jersey Journey</h1>
          <p>Guess the player from the career route.</p>
        </div>

        <div className="route-ticket-line" aria-label="Example career route">
          <div className="route-track" aria-hidden="true">
            {ROUTE_STOPS.map((stop) => (
              <span key={stop.abbr} />
            ))}
          </div>

          <div className="route-ticket-grid">
            {ROUTE_STOPS.map((stop, index) => (
              <article className={`route-ticket route-ticket-${stop.tone}`} key={stop.abbr}>
                <span className="route-ticket-rail">{stop.rail}</span>
                <div>
                  <small>Stop {String(index + 1).padStart(2, "0")}</small>
                  <strong>{stop.abbr}</strong>
                </div>
                <span className="route-ticket-barcode" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>

        <div className="start-feature-panel">
          <div className="player-silhouette-card" aria-hidden="true">
            <div className="silhouette-head" />
            <div className="silhouette-body" />
            <strong>?</strong>
          </div>

          <div className="feature-copy">
            <span>One career. Four stops.</span>
            <h2>Follow the path. Read the clues. Who wore the jerseys?</h2>

            <div className="feature-rule-grid">
              <div>
                <i className="feature-icon feature-icon-route" aria-hidden="true" />
                <strong>Read each stop</strong>
                <p>Track the player&apos;s career path.</p>
              </div>
              <div>
                <i className="feature-icon feature-icon-scout" aria-hidden="true" />
                <strong>Use hints wisely</strong>
                <p>Hints help, but they cost points.</p>
              </div>
              <div>
                <i className="feature-icon feature-icon-score" aria-hidden="true" />
                <strong>Score big</strong>
                <p>Less help means more points.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="daily-route-strip" aria-label="Beta run details">
          <div>
            <span>Beta Pack</span>
            <strong>Fresh run</strong>
          </div>
          <div>
            <span>Accounts</span>
            <strong>Not required</strong>
          </div>
          <div>
            <span>Storage</span>
            <strong>Local only</strong>
          </div>
        </div>
      </div>

      <div className="mode-picker run-setup-console" aria-label="Run setup">
        <div className="run-setup-heading">
          <span>Run Setup</span>
          <h2>Choose a run type</h2>
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
                <span className={`mode-emblem mode-emblem-${mode.id}`} aria-hidden="true" />
                <span className="mode-card-copy">
                  <span>{mode.name}</span>
                  <strong>{mode.tagline}</strong>
                </span>
                <span className="mode-radio" aria-hidden="true" />
              </button>
            );
          })}
        </div>

        <div className="run-stat-strip" aria-label="Run setup stats">
          {RUN_STATS.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
              <small>{stat.note}</small>
            </div>
          ))}
        </div>

        <div className="setup-mini-grid">
          <div className="daily-mini-card">
            <span>Beta Pack</span>
            <strong>Fresh route set</strong>
            <p>Ready</p>
          </div>

          <div className="scouting-report-preview" aria-label="Scouting report preview">
            <div>
              <span>Scouting Report</span>
              <strong>Locked clues</strong>
            </div>
            <div className="locked-hint-slots" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>

        <div className="scorecard-preview">
          <span>Scorecard Preview</span>
          <div aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <strong>Total --</strong>
        </div>

        <button type="button" className="start-run-button" onClick={onStartRun}>
          <span>Start Run</span>
          <strong>Deal the route. Begin the journey.</strong>
        </button>
      </div>
    </section>
  );
}
