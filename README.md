# Jersey Journey

Feel free to give it a try and leave feedback, please:

Live Link https://jerseyjourney.vercel.app/

Jersey Journey is a basketball career-path trivia game. Players are shown a mystery player's team history and must guess the player before hints and wrong guesses reduce the round score.

The project is built as a polished browser game with multiple run modes, streak tracking, scoring pressure, hint reveals, and a replayable data-driven player pool.

## Features

- Eight-round trivia runs
- Multiple run modes: mixed, easy, hard, and journeyman
- Mystery player cards with position and difficulty context
- Career stop timeline using team names and abbreviations
- Hint system with score penalties
- Wrong-guess penalties and round feedback
- Streak and best-streak tracking
- Final results screen with grade, score, and share text
- Optional Google Forms feedback link
- Responsive game UI built for desktop and mobile browsers

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- Vercel Analytics

## Game Rules

Each run contains 8 rounds. Every round starts at 1,000 possible points.

Score penalties:

- Wrong guess: -100 points
- Revealed hint: -150 points
- Revealing the answer: 0 points for the round

At the end of the run, the final score is converted into a grade:

| Grade | Score Range |
| --- | --- |
| S | 92% or higher |
| A | 80% or higher |
| B | 65% or higher |
| C | 48% or higher |
| D | Below 48% |

## Project Structure

```text
jersey-journey/
|-- src/
|   |-- components/
|   |   |-- CareerStops.jsx
|   |   |-- ControlPanel.jsx
|   |   |-- FinalResults.jsx
|   |   |-- MysteryCard.jsx
|   |   |-- StagePanel.jsx
|   |   `-- StartScreen.jsx
|   |-- data/
|   |   |-- players.js
|   |   `-- teamAbbreviations.js
|   |-- utils/
|   |   `-- game.js
|   |-- App.jsx
|   |-- config.js
|   |-- index.css
|   `-- main.jsx
|-- index.html
|-- package.json
`-- vite.config.js
```

## Local Setup

### Prerequisites

- Node.js 20+
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The app runs locally at the Vite-provided localhost URL, usually:

```text
http://localhost:5173
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Vite dev server |
| `npm run build` | Build the production bundle |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## Configuration

The feedback form URL is configured in:

```text
src/config.js
```

If the URL is empty or clearly a placeholder, the app hides the active feedback behavior and shows the feedback feature as coming soon.

## Future Improvements

- Add a public leaderboard
- Add daily challenge mode
- Add player statistics after each run
- Add more leagues, eras, and difficulty filters
- Replace the current shuffle helper with a Fisher-Yates shuffle
- Add unit tests for scoring, answer normalization, and run generation
- Add GitHub Actions for lint and build checks

## Author

Built by Dakarai Mitcham as a replayable sports trivia project.
