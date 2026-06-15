import { useState } from "react";

export function FinalResults({
  totalScore,
  grade,
  roundsCompleted,
  bestStreak,
  maxPossibleScore,
  onPlayAgain,
  onLeaveFeedback,
  isFeedbackEnabled,
}) {
  const [didCopy, setDidCopy] = useState(false);

  async function handleCopyResult() {
    const shareText = [
      "Jersey Journey 🏀",
      `Score: ${totalScore} / ${maxPossibleScore}`,
      `Grade: ${grade}`,
      `Best Streak: ${bestStreak}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(shareText);
      setDidCopy(true);
      window.setTimeout(() => setDidCopy(false), 1400);
    } catch {
      setDidCopy(false);
    }
  }

  return (
    <section className="final-results" aria-labelledby="final-results-title">
      <div className="final-spotlight">
        <div className="final-ticket-edge" aria-hidden="true" />
        <p className="eyebrow">Run Complete</p>
        <div className="grade-badge" aria-label={`Grade ${grade}`}>
          {grade}
        </div>
        <h1 id="final-results-title">Final Score</h1>
        <strong className="final-score">{totalScore}</strong>
        <p className="final-copy">
          You finished the eight-round run. Run it back with a fresh set and chase
          a cleaner route.
        </p>

        <div className="final-actions">
          <button type="button" className="play-again-button" onClick={onPlayAgain}>
            Play Again
          </button>
          <button type="button" className="copy-button" onClick={handleCopyResult}>
            Copy Result
          </button>
        </div>
        <p className={didCopy ? "copy-confirmation visible" : "copy-confirmation"}>
          Copied!
        </p>
      </div>

      <div className="final-stat-grid">
        <div>
          <span>Grade</span>
          <strong>{grade}</strong>
        </div>
        <div>
          <span>Rounds Completed</span>
          <strong>{roundsCompleted}/8</strong>
        </div>
        <div>
          <span>Best Streak</span>
          <strong>{bestStreak}</strong>
        </div>
        <div>
          <span>Max Possible Score</span>
          <strong>{maxPossibleScore}</strong>
        </div>
        <div className="final-feedback-card">
          <span>Beta Feedback</span>
          <strong>Help shape the next version.</strong>
          <button
            type="button"
            className="leave-feedback-button"
            onClick={onLeaveFeedback}
            disabled={!isFeedbackEnabled}
          >
            {isFeedbackEnabled ? "Leave Feedback" : "Feedback Soon"}
          </button>
        </div>
      </div>
    </section>
  );
}
