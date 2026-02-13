const LEAGUES = {
  county: {
    name: "SLC County",
    description: "Players currently rostered for county play."
  },
  mic: {
    name: "Mammoth Ice Center",
    description: "Players currently rostered for MIC play."
  }
};

const POSITION_OPTIONS = ["F", "D", "G"];
const LEAGUE_STATUS_OPTIONS = ["full time", "part time", "non-roster"];
const PRIORITY_TIER_OPTIONS = ["Tier 1", "Tier 2", "Tier 3"];
const LEAGUE_STATUS_PRIORITY = {
  "full time": 0,
  "part time": 1,
  "non-roster": 2
};

const players = [
  {
    id: "p1",
    name: "Jordan Tate",
    primaryPosition: "F",
    secondaryPosition: "D",
    priorityTier: "Tier 1",
    leagueStatus: { county: "full time", mic: "part time" }
  },
  {
    id: "p2",
    name: "Sasha Kim",
    primaryPosition: "D",
    secondaryPosition: "G",
    priorityTier: "Tier 2",
    leagueStatus: { county: "part time", mic: "non-roster" }
  },
  {
    id: "p3",
    name: "Maya Ibanez",
    primaryPosition: "G",
    secondaryPosition: "G",
    priorityTier: "Tier 1",
    leagueStatus: { county: "non-roster", mic: "full time" }
  },
  {
    id: "p4",
    name: "Nolan Pierce",
    primaryPosition: "F",
    secondaryPosition: "G",
    priorityTier: "Tier 3",
    leagueStatus: { county: "non-roster", mic: "non-roster" }
  },
  {
    id: "p5",
    name: "Avery Shah",
    primaryPosition: "F",
    secondaryPosition: "D",
    priorityTier: "Tier 1",
    leagueStatus: { county: "full time", mic: "full time" }
  }
];

const uiState = {
  filters: {
    position: "all"
  }
};

function getAssignedLeagueStatus(player, leagueKey) {
  const status = player.leagueStatus[leagueKey];
  return status === "non-roster" ? null : status;
}

function getPositionSortRank(position) {
  const idx = POSITION_OPTIONS.indexOf(position);
  return idx === -1 ? Number.MAX_SAFE_INTEGER : idx;
}

function getDisplayPosition(player) {
  if (player.primaryPosition === player.secondaryPosition) return player.primaryPosition;
  return `${player.primaryPosition}/${player.secondaryPosition}`;
}

function sortRosterPlayers(a, b) {
  const statusRank = LEAGUE_STATUS_PRIORITY[a.status] - LEAGUE_STATUS_PRIORITY[b.status];
  if (statusRank !== 0) return statusRank;

  const primaryRank = getPositionSortRank(a.primaryPosition) - getPositionSortRank(b.primaryPosition);
  if (primaryRank !== 0) return primaryRank;

  const secondaryRank = getPositionSortRank(a.secondaryPosition) - getPositionSortRank(b.secondaryPosition);
  if (secondaryRank !== 0) return secondaryRank;

  return a.name.localeCompare(b.name);
}

function getVisiblePlayers() {
  return players.filter((player) => {
    if (uiState.filters.position !== "all") {
      const selectedPosition = uiState.filters.position;
      if (player.primaryPosition !== selectedPosition && player.secondaryPosition !== selectedPosition) {
        return false;
      }
    }

    return true;
  });
}

function renderToolbar() {
  const toolbar = document.querySelector("#board-controls");
  const visiblePlayers = getVisiblePlayers();

  toolbar.innerHTML = `
    <label>
      Filter by position
      <select id="filter-position">
        <option value="all" ${uiState.filters.position === "all" ? "selected" : ""}>All positions</option>
        ${POSITION_OPTIONS.map((position) => `<option value="${position}" ${uiState.filters.position === position ? "selected" : ""}>${position}</option>`).join("")}
      </select>
    </label>
    <p class="result-count">Showing ${visiblePlayers.length} of ${players.length} players</p>
  `;

  toolbar.querySelector("#filter-position").addEventListener("change", (event) => {
    uiState.filters.position = event.target.value;
    renderBoard();
  });
}

function buildPlayerManagementColumn(visiblePlayers) {
  const column = document.createElement("section");
  column.className = "roster-column players-column";

  column.innerHTML = `
    <h2>Players <span class="count-pill">${visiblePlayers.length}</span></h2>
    <p class="column-subtext">Expand each player to edit player settings and roster statuses.</p>
    <div class="line-list" id="players-list"></div>
  `;

  const list = column.querySelector("#players-list");

  visiblePlayers.forEach((player) => {
    const row = document.createElement("div");
    row.className = "player-row";

    row.innerHTML = `
      <details class="status-accordion">
        <summary>
          <span class="summary-main">
            <span class="player-name">${player.name}</span>
            <span class="summary-description">player settings</span>
          </span>
          <span class="summary-caret" aria-hidden="true">▾</span>
        </summary>
        <div class="accordion-content">
          <label class="inline-field" for="primary-position-${player.id}">
            Primary Position
            <select id="primary-position-${player.id}" data-player-id="${player.id}" class="status-select">
              ${POSITION_OPTIONS.map((position) => `<option value="${position}" ${player.primaryPosition === position ? "selected" : ""}>${position}</option>`).join("")}
            </select>
          </label>
          <label class="inline-field" for="secondary-position-${player.id}">
            Secondary Position
            <select id="secondary-position-${player.id}" data-player-id="${player.id}" class="status-select">
              ${POSITION_OPTIONS.map((position) => `<option value="${position}" ${player.secondaryPosition === position ? "selected" : ""}>${position}</option>`).join("")}
            </select>
          </label>
          <label class="inline-field" for="status-${player.id}-county">
            ${LEAGUES.county.name}
            <select id="status-${player.id}-county" data-player-id="${player.id}" data-league-key="county" class="status-select league-status-select">
              ${LEAGUE_STATUS_OPTIONS.map((status) => `<option value="${status}" ${player.leagueStatus.county === status ? "selected" : ""}>${status}</option>`).join("")}
            </select>
          </label>
          <label class="inline-field" for="priority-tier-${player.id}">
            Priority Tier
            <select id="priority-tier-${player.id}" data-player-id="${player.id}" class="status-select">
              ${PRIORITY_TIER_OPTIONS.map((tier) => `<option value="${tier}" ${player.priorityTier === tier ? "selected" : ""}>${tier}</option>`).join("")}
            </select>
          </label>
          <label class="inline-field" for="status-${player.id}-mic">
            ${LEAGUES.mic.name}
            <select id="status-${player.id}-mic" data-player-id="${player.id}" data-league-key="mic" class="status-select league-status-select">
              ${LEAGUE_STATUS_OPTIONS.map((status) => `<option value="${status}" ${player.leagueStatus.mic === status ? "selected" : ""}>${status}</option>`).join("")}
            </select>
          </label>
        </div>
      </details>
    `;

    row.querySelector(`#primary-position-${player.id}`).addEventListener("change", (event) => {
      player.primaryPosition = event.target.value;
      renderBoard();
    });

    row.querySelector(`#secondary-position-${player.id}`).addEventListener("change", (event) => {
      player.secondaryPosition = event.target.value;
      renderBoard();
    });

    row.querySelector(`#priority-tier-${player.id}`).addEventListener("change", (event) => {
      player.priorityTier = event.target.value;
      renderBoard();
    });

    row.querySelectorAll(".league-status-select").forEach((select) => {
      select.addEventListener("change", (event) => {
        const leagueKey = event.target.dataset.leagueKey;
        player.leagueStatus[leagueKey] = event.target.value;
        renderBoard();
      });
    });

    list.appendChild(row);
  });

  return column;
}

function buildRosterSection(title, sectionPlayers, className = "") {
  return `
    <section class="roster-group ${className}">
      <h3>${title} <span class="count-pill">${sectionPlayers.length}</span></h3>
      ${sectionPlayers.length > 0
        ? sectionPlayers
            .map(
              (player) => `<p class="roster-line">${player.name} - ${player.position}</p>`
            )
            .join("")
        : '<p class="empty-message">No players in this section.</p>'}
    </section>
  `;
}

function buildLeagueColumn(leagueKey, visiblePlayers) {
  const league = LEAGUES[leagueKey];

  const assignedPlayers = visiblePlayers
    .map((player) => ({
      name: player.name,
      position: getDisplayPosition(player),
      primaryPosition: player.primaryPosition,
      secondaryPosition: player.secondaryPosition,
      status: getAssignedLeagueStatus(player, leagueKey)
    }))
    .filter((player) => Boolean(player.status))
    .sort(sortRosterPlayers);

  const fullTimePlayers = assignedPlayers.filter((player) => player.status === "full time");
  const partTimePlayers = assignedPlayers.filter((player) => player.status === "part time");

  const byPosition = {
    F: fullTimePlayers.filter((player) => player.primaryPosition === "F").sort((a, b) => a.name.localeCompare(b.name)),
    D: fullTimePlayers.filter((player) => player.primaryPosition === "D").sort((a, b) => a.name.localeCompare(b.name)),
    G: fullTimePlayers.filter((player) => player.primaryPosition === "G").sort((a, b) => a.name.localeCompare(b.name))
  };


  const column = document.createElement("section");
  column.className = `roster-column league-column league-${leagueKey}`;

  column.innerHTML = `
    <h2>
      ${league.name}
      <span class="count-pills">
        <span class="count-pill count-pill-f">F ${byPosition.F.length}</span>
        <span class="count-pill count-pill-d">D ${byPosition.D.length}</span>
        <span class="count-pill count-pill-g">G ${byPosition.G.length}</span>
        <span class="count-pill count-pill-subs">Sub ${partTimePlayers.length}</span>
      </span>
    </h2>
    <p class="column-subtext">${league.description}</p>
    <div class="line-list roster-sections">
      ${buildRosterSection("Forward", byPosition.F, "forward-section")}
      ${buildRosterSection("Defense", byPosition.D, "defense-section")}
      ${buildRosterSection("Goalie", byPosition.G, "goalie-section")}
      ${buildRosterSection("Part Time", partTimePlayers, "subs-section")}
    </div>
  `;

  return column;
}

function renderBoard() {
  renderToolbar();

  const board = document.querySelector("#board");
  const visiblePlayers = getVisiblePlayers();
  board.innerHTML = "";

  board.appendChild(buildPlayerManagementColumn(visiblePlayers));
  board.appendChild(buildLeagueColumn("county", visiblePlayers));
  board.appendChild(buildLeagueColumn("mic", visiblePlayers));
}

renderBoard();
