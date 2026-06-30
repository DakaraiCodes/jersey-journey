import { useMemo, useRef, useState } from "react";
import { ControlPanel } from "./components/ControlPanel";
import { FinalResults } from "./components/FinalResults";
import { StartScreen } from "./components/StartScreen";
import { StagePanel } from "./components/StagePanel";
import { isFeedbackFormEnabled, openFeedbackForm } from "./config";
import { players } from "./data/players";
import {
  calculateRoundScore,
  createRun,
  getRunGrade,
  isCorrectGuess,
  MAX_ROUND_SCORE,
  ROUND_COUNT,
} from "./utils/game";
import "./index.css";

function App() {
  const [gameStatus, setGameStatus] = useState("start");
  const [selectedRunMode, setSelectedRunMode] = useState("mixed");
  const [runPlayers, setRunPlayers] = useState([]);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const [guess, setGuess] = useState("");
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [revealedHints, setRevealedHints] = useState(0);
  const [roundOutcome, setRoundOutcome] = useState(null);
  const [roundAwardedScore, setRoundAwardedScore] = useState(0);
  const [guessFeedback, setGuessFeedback] = useState(null);
  const advanceLockedRef = useRef(false);

  const isRunComplete = gameStatus === "complete";
  const isPlaying = gameStatus === "playing";
  const currentPlayer = isPlaying ? runPlayers[currentRoundIndex] ?? null : null;
  const roundsCompleted = isRunComplete ? ROUND_COUNT : currentRoundIndex;

  const liveRoundScore = useMemo(
    () => calculateRoundScore(wrongGuesses.length, revealedHints),
    [wrongGuesses.length, revealedHints],
  );

  const displayedScore = totalScore;
  const maxPossibleScore = ROUND_COUNT * MAX_ROUND_SCORE;
  const grade = getRunGrade(totalScore, maxPossibleScore);

  function resetRoundState() {
    setGuess("");
    setWrongGuesses([]);
    setRevealedHints(0);
    setRoundOutcome(null);
    setRoundAwardedScore(0);
    setGuessFeedback(null);
  }

  function resetRunState() {
    advanceLockedRef.current = false;
    setCurrentRoundIndex(0);
    setTotalScore(0);
    setStreak(0);
    setBestStreak(0);
    resetRoundState();
  }

  function handleStartRun() {
    resetRunState();
    setRunPlayers(createRun(players, ROUND_COUNT, selectedRunMode));
    setGameStatus("playing");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!currentPlayer || !guess.trim() || roundOutcome || isRunComplete) return;

    if (isCorrectGuess(guess, currentPlayer)) {
      const awardedScore = liveRoundScore;

      setRoundAwardedScore(awardedScore);
      setTotalScore((current) => current + awardedScore);
      setRoundOutcome("correct");
      setGuessFeedback("correct");
      setStreak((current) => {
        const nextStreak = current + 1;
        setBestStreak((best) => Math.max(best, nextStreak));
        return nextStreak;
      });
      return;
    }

    setWrongGuesses((previousGuesses) => [...previousGuesses, guess.trim()]);
    setGuess("");
    setGuessFeedback("wrong");
    setStreak(0);
    window.setTimeout(() => {
      setGuessFeedback((current) => (current === "wrong" ? null : current));
    }, 420);
  }

  function handleHint() {
    if (!currentPlayer || roundOutcome || isRunComplete) return;

    setRevealedHints((current) =>
      Math.min(current + 1, currentPlayer.hints.length),
    );
  }

  function handleRevealAnswer() {
    if (!currentPlayer || roundOutcome || isRunComplete) return;

    setRoundAwardedScore(0);
    setRoundOutcome("revealed");
    setGuessFeedback(null);
    setStreak(0);
  }

  function handleAdvanceRound() {
    if (!roundOutcome || isRunComplete || advanceLockedRef.current) return;

    advanceLockedRef.current = true;

    const isLastRound = currentRoundIndex >= ROUND_COUNT - 1;

    if (isLastRound) {
      setGameStatus("complete");
      return;
    }

    setCurrentRoundIndex((current) => current + 1);
    resetRoundState();
    window.setTimeout(() => {
      advanceLockedRef.current = false;
    }, 250);
  }

  function handleRestartRun() {
    resetRunState();
    setRunPlayers([]);
    setGameStatus("start");
  }

  if (gameStatus === "start") {
    return (
      <main className="app app-start">
        <section className="shell shell-start">
          <GameNav />
          <StartScreen
            selectedMode={selectedRunMode}
            onModeChange={setSelectedRunMode}
            onStartRun={handleStartRun}
          />
        </section>
      </main>
    );
  }

  if (isRunComplete) {
    return (
      <main className="app">
        <section className="shell shell-final">
          <GameNav />
          <FinalResults
            totalScore={totalScore}
            grade={grade}
            roundsCompleted={ROUND_COUNT}
            bestStreak={bestStreak}
            maxPossibleScore={maxPossibleScore}
            onPlayAgain={handleRestartRun}
            onLeaveFeedback={openFeedbackForm}
            isFeedbackEnabled={isFeedbackFormEnabled()}
          />
        </section>
      </main>
    );
  }

  if (!currentPlayer) {
    return (
      <main className="app">
        <section className="shell shell-final">
          <GameNav />
          <FinalResults
            totalScore={totalScore}
            grade="D"
            roundsCompleted={roundsCompleted}
            bestStreak={bestStreak}
            maxPossibleScore={maxPossibleScore}
            onPlayAgain={handleRestartRun}
            onLeaveFeedback={openFeedbackForm}
            isFeedbackEnabled={isFeedbackFormEnabled()}
          />
        </section>
      </main>
    );
  }

  return (
    <main className="app">
      <section className="shell">
        <GameNav />

        <div className="game-layout">
          <StagePanel player={currentPlayer} roundIndex={currentRoundIndex} />

          <ControlPanel
            currentPlayer={currentPlayer}
            currentRound={currentRoundIndex + 1}
            roundCount={ROUND_COUNT}
            displayedScore={displayedScore}
            liveRoundScore={liveRoundScore}
            roundAwardedScore={roundAwardedScore}
            streak={streak}
            guess={guess}
            onGuessChange={setGuess}
            onSubmit={handleSubmit}
            wrongGuesses={wrongGuesses}
            revealedHints={revealedHints}
            onHint={handleHint}
            roundOutcome={roundOutcome}
            guessFeedback={guessFeedback}
            onRevealAnswer={handleRevealAnswer}
            onAdvanceRound={handleAdvanceRound}
          />
        </div>

        <section className="feature-strip" aria-label="Game features">
          <div>
            <strong>8 Rounds</strong>
            <span>Every run is a fresh pack of player paths.</span>
          </div>
          <div>
            <strong>Pressure Scoring</strong>
            <span>Hints and misses lower the round value.</span>
          </div>
          <div>
            <strong>Streak Watch</strong>
            <span>Correct answers build your best streak.</span>
          </div>
          <div>
            <strong>More Modes</strong>
            <span>Leaderboards and daily runs are coming soon.</span>
          </div>
        </section>
      </section>
    </main>
  );
}

function GameNav() {
  return (
    <nav className="nav" aria-label="Primary">
      <div className="logo" aria-label="Jersey Journey">
        <span className="logo-mark">JJ</span>
        <div>
          <strong>Jersey</strong>
          <strong>Journey</strong>
          <small>Career path trivia</small>
        </div>
      </div>

      <div className="nav-links">
        <span className="active">Play</span>
        {isFeedbackFormEnabled() ? (
          <button
            type="button"
            className="feedback-nav-button"
            onClick={openFeedbackForm}
          >
            Feedback <em>Beta</em>
          </button>
        ) : (
          <span className="coming-soon" aria-disabled="true">Feedback <em>Soon</em></span>
        )}
        <span className="coming-soon" aria-disabled="true">How to Play <em>Soon</em></span>
        <span className="coming-soon" aria-disabled="true">Leaderboard <em>Soon</em></span>
        <span className="coming-soon" aria-disabled="true">Stats <em>Soon</em></span>
      </div>

      <button className="sign-in-button" type="button" disabled>
        Sign In Soon
      </button>
    </nav>
  );
}

export default App;
