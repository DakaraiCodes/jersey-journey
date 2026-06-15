export function ControlPanel({
  currentPlayer,
  currentRound,
  roundCount,
  displayedScore,
  liveRoundScore,
  roundAwardedScore,
  streak,
  guess,
  onGuessChange,
  onSubmit,
  wrongGuesses,
  revealedHints,
  onHint,
  roundOutcome,
  guessFeedback,
  onRevealAnswer,
  onAdvanceRound,
}) {
  const isFinalRound = currentRound >= roundCount;
  const hints = currentPlayer.hints ?? [];
  const roundProgress = `${(currentRound / roundCount) * 100}%`;
  const isResolved = Boolean(roundOutcome);
  const isRevealed = roundOutcome === "revealed";
  const resultLabel = isRevealed ? "Revealed" : "Correct";
  const resultMeta = isRevealed
    ? `${currentPlayer.position} / ${currentPlayer.difficulty} / no points`
    : `${currentPlayer.position} / ${currentPlayer.difficulty} / +${roundAwardedScore}`;

  return (
    <aside className="control-panel">
      <div className="console-topper">
        <span>Live Board</span>
        <strong>Run Control</strong>
      </div>

      <section className="scoreboard" aria-label="Run scoreboard">
        <div>
          <span>Round</span>
          <strong>{currentRound} / {roundCount}</strong>
        </div>
        <div>
          <span>Score</span>
          <strong>{displayedScore}</strong>
        </div>
        <div>
          <span>Streak</span>
          <strong>{streak}</strong>
        </div>
      </section>

      <div
        className="round-progress"
        style={{ "--round-progress": roundProgress }}
        aria-hidden="true"
      />

      <section className="round-value-card">
        <div>
          <span>Round Value</span>
          <strong>{isResolved ? roundAwardedScore : liveRoundScore}</strong>
        </div>
        <p>
          {isRevealed
            ? "Answer revealed. No points banked."
            : isResolved
              ? "Banked for this stop."
              : "Drops with each miss or hint."}
        </p>
      </section>

      <section className={guessFeedback === "correct" ? "guess-card success-pulse" : "guess-card"}>
        <div className="panel-heading">
          <span>Guess Console</span>
          <h2>Who wore this route?</h2>
        </div>

        <form onSubmit={onSubmit} className="guess-form">
          <div
            className={[
              "input-frame",
              guessFeedback === "wrong" ? "input-frame-wrong" : "",
              guessFeedback === "correct" ? "input-frame-correct" : "",
            ].filter(Boolean).join(" ")}
          >
            <input
              value={guess}
              onChange={(event) => onGuessChange(event.target.value)}
              placeholder="Type player name..."
              disabled={isResolved}
              autoComplete="off"
            />
          </div>
          <button type="submit" disabled={isResolved || !guess.trim()}>
            Guess
          </button>
        </form>

        <div className="example-row" aria-label="Example guesses">
          <span>Examples</span>
          <button type="button" onClick={() => onGuessChange("James Harden")} disabled={isResolved}>
            Harden
          </button>
          <button type="button" onClick={() => onGuessChange("Kyrie Irving")} disabled={isResolved}>
            Kyrie
          </button>
          <button type="button" onClick={() => onGuessChange("Chris Paul")} disabled={isResolved}>
            CP3
          </button>
        </div>
      </section>

      <section className="lifeline-card">
        <div className="lifeline-header">
          <div className="panel-heading">
            <span>Lifelines</span>
            <h2>Hints</h2>
          </div>
          <strong>
            {revealedHints}/{hints.length}
          </strong>
        </div>

        <div className="hint-dots" aria-label="Hint progress">
          {hints.map((hint, index) => (
            <span
              key={hint}
              className={index < revealedHints ? "hint-dot active" : "hint-dot"}
            />
          ))}
        </div>

        {revealedHints > 0 && (
          <div className="hint-list">
            {hints.slice(0, revealedHints).map((hint, index) => (
              <div className="hint-card" key={hint}>
                <span>Hint {index + 1}</span>
                <p>{hint}</p>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          className="reveal-button"
          onClick={onHint}
          disabled={isResolved || revealedHints >= hints.length}
        >
          Reveal Hint
        </button>

        <button
          type="button"
          className="give-up-button"
          onClick={onRevealAnswer}
          disabled={isResolved}
        >
          Give Up / Reveal Answer
        </button>
      </section>

      {wrongGuesses.length > 0 && (
        <section className="past-guesses-card">
          <div className="panel-heading">
            <span>Miss Log</span>
            <h2>Past guesses</h2>
          </div>

          <div className="past-guesses-list">
            {wrongGuesses.map((wrongGuess, index) => (
              <div key={`${wrongGuess}-${index}`}>
                <span>{wrongGuess}</span>
                <strong>Miss</strong>
              </div>
            ))}
          </div>
        </section>
      )}

      {isResolved && (
        <section className={isRevealed ? "result-card result-card-revealed" : "result-card"}>
          <div className="result-badge">{resultLabel}</div>
          <p className="result-kicker">The player was</p>
          <h2>{currentPlayer.name}</h2>
          <p className="result-meta">{resultMeta}</p>

          <button type="button" className="next-button" onClick={onAdvanceRound}>
            {isFinalRound ? "Finish Run" : "Next Player"}
          </button>
        </section>
      )}
    </aside>
  );
}
