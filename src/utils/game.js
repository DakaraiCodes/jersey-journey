export const ROUND_COUNT = 8;
export const MAX_ROUND_SCORE = 1000;
export const WRONG_GUESS_PENALTY = 100;
export const HINT_PENALTY = 150;

export const RUN_MODES = [
  {
    id: "mixed",
    name: "Mixed Run",
    tagline: "Stars, legends, and tricky routes.",
    description: "A balanced eight-round pack using the full player pool.",
  },
  {
    id: "easy",
    name: "Easy Run",
    tagline: "Famous names, cleaner paths.",
    description: "Favors easy players and iconic careers.",
  },
  {
    id: "hard",
    name: "Hard Run",
    tagline: "Less obvious, more punishment.",
    description: "Favors medium and hard players.",
  },
  {
    id: "journeyman",
    name: "Journeyman Run",
    tagline: "Long routes only.",
    description: "Favors players with four or more team stops.",
  },
];

export function normalizeAnswer(value) {
  return value
    .toLowerCase()
    .replace(/[.'\u2019]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function calculateRoundScore(wrongGuessCount, revealedHintCount) {
  return Math.max(
    0,
    MAX_ROUND_SCORE -
      wrongGuessCount * WRONG_GUESS_PENALTY -
      revealedHintCount * HINT_PENALTY,
  );
}

export function isCorrectGuess(guess, player) {
  const normalizedGuess = normalizeAnswer(guess);
  const validAnswers = [player.name, ...player.aliases].map(normalizeAnswer);

  return validAnswers.includes(normalizedGuess);
}

export function shufflePlayers(playerList) {
  return [...playerList].sort(() => Math.random() - 0.5);
}

export function getRunMode(modeId) {
  return RUN_MODES.find((mode) => mode.id === modeId) ?? RUN_MODES[0];
}

export function getPlayersForMode(playerList, modeId, roundCount = ROUND_COUNT) {
  let filteredPlayers = playerList;

  if (modeId === "easy") {
    filteredPlayers = playerList.filter((player) => player.difficulty === "easy");
  }

  if (modeId === "hard") {
    filteredPlayers = playerList.filter((player) =>
      ["medium", "hard"].includes(player.difficulty),
    );
  }

  if (modeId === "journeyman") {
    filteredPlayers = playerList.filter((player) => player.teams.length >= 4);
  }

  return filteredPlayers.length >= roundCount ? filteredPlayers : playerList;
}

export function createRun(playerList, roundCount = ROUND_COUNT, modeId = "mixed") {
  return shufflePlayers(getPlayersForMode(playerList, modeId, roundCount)).slice(0, roundCount);
}

export function getRunGrade(score, maxPossibleScore) {
  const percent = maxPossibleScore > 0 ? score / maxPossibleScore : 0;

  if (percent >= 0.92) return "S";
  if (percent >= 0.8) return "A";
  if (percent >= 0.65) return "B";
  if (percent >= 0.48) return "C";
  return "D";
}
