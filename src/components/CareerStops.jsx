import { useRef } from "react";
import { getTeamAbbreviation } from "../data/teamAbbreviations";

const SCROLL_AMOUNT = 260;

export function CareerStops({ teams }) {
  const rowRef = useRef(null);

  function handleWheel(event) {
    const row = rowRef.current;
    if (!row) return;

    const canScrollHorizontally = row.scrollWidth > row.clientWidth;
    if (!canScrollHorizontally) return;

    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ? event.deltaX
      : event.deltaY;

    if (delta === 0) return;

    event.preventDefault();
    row.scrollBy({ left: delta, behavior: "auto" });
  }

  function scrollByAmount(amount) {
    rowRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section className="team-card-section" aria-labelledby="career-stops-title">
      <div className="team-card-header">
        <div>
          <p className="team-card-kicker">Career Route</p>
          <h2 id="career-stops-title">Career Stops</h2>
        </div>

        <div className="team-scroll-actions" aria-label="Career stop scrolling">
          <button
            type="button"
            onClick={() => scrollByAmount(-SCROLL_AMOUNT)}
            aria-label="Scroll career stops left"
          >
            <span aria-hidden="true">&lsaquo;</span>
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(SCROLL_AMOUNT)}
            aria-label="Scroll career stops right"
          >
            <span aria-hidden="true">&rsaquo;</span>
          </button>
        </div>
      </div>

      <div className="team-row-shell">
        <div className="team-card-row" ref={rowRef} onWheel={handleWheel}>
          {teams.map((team, index) => (
            <article
              className="mini-team-card"
              key={`${team.team}-${team.years}-${index}`}
              tabIndex="0"
            >
              <div className="ticket-notches" aria-hidden="true" />
              <div className="team-stop-label">
                <span>Stop</span>
                <strong>{String(index + 1).padStart(2, "0")}</strong>
              </div>
              <div className="mini-team-abbr">
                <span>{getTeamAbbreviation(team.team)}</span>
              </div>
              <div className="mini-team-info">
                <strong>{team.team}</strong>
                <span>{team.years}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <p className="stage-tip">Regular season NBA teams only.</p>
    </section>
  );
}
