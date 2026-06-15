import { RUN_MODES } from "../utils/game";

export function StartScreen({ selectedMode, onModeChange, onStartRun }) {
  return (
    <section className="start-screen" aria-labelledby="start-title">
      <div className="start-hero">
        <div className="start-copy">
          <p className="eyebrow">Jersey Journey</p>
          <h1 id="start-title">Career routes, no shortcuts.</h1>
          <p className="subtitle">
            Read the team timeline, spend hints carefully, and identify the player
            before your score slips away.
          </p>
        </div>

        <div className="start-rules" aria-label="Game rules">
          <div>
            <strong>01</strong>
            <span>Eight rounds per run.</span>
          </div>
          <div>
            <strong>02</strong>
            <span>Wrong guesses and hints lower the round value.</span>
          </div>
          <div>
            <strong>03</strong>
            <span>Give up reveals the answer for no points.</span>
          </div>
        </div>
      </div>

      <div className="mode-picker" aria-label="Run type selection">
        <div className="mode-picker-header">
          <span>Choose Run Type</span>
          <strong>{RUN_MODES.length} modes</strong>
        </div>

        <div className="mode-grid">
          {RUN_MODES.map((mode) => (
            <button
              type="button"
              key={mode.id}
              className={selectedMode === mode.id ? "mode-card active" : "mode-card"}
              onClick={() => onModeChange(mode.id)}
            >
              <span>{mode.name}</span>
              <strong>{mode.tagline}</strong>
              <small>{mode.description}</small>
            </button>
          ))}
        </div>

        <button type="button" className="start-run-button" onClick={onStartRun}>
          Start Run
        </button>
      </div>
    </section>
  );
}
