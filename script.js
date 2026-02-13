const LEAGUES = {
  county: "SLC County",
  mic: "Mammoth Ice Center"
};

const POSITION_OPTIONS = ["F", "D", "G", "F/D", "D/G", "F/G", "F/D/G"];

const ROSTER_STATUSES = [
  "full time both teams",
  "full time county only",
  "full time MIC only",
  "full time county/part time MIC",
  "part time county/full time MIC",
  "part time county only",
  "part time MIC only",
  "not rostered"
];

const players = [
  { id: "p1", name: "Jordan Tate", position: "F/D", rosterStatus: "full time county/part time MIC" },
  { id: "p2", name: "Sasha Kim", position: "D/G", rosterStatus: "part time county only" },
  { id: "p3", name: "Maya Ibanez", position: "G", rosterStatus: "full time MIC only" },
  { id: "p4", name: "Nolan Pierce", position: "F/G", rosterStatus: "not rostered" },
  { id: "p5", name: "Avery Shah", position: "F/D/G", rosterStatus: "full time both teams" }
];

const uiState = {
  filters: {
    position: "all",
    rosterStatus: "all"
  }
};

function getRosterParticipation(rosterStatus) {
  switch (rosterStatus) {
    case "full time both teams":
      return { county: "full time", mic: "full time" };
    case "full time county only":
      return { county: "full time", mic: null };
    case "full time MIC only":
      return { county: null, mic: "full time" };
    case "full time county/part time MIC":
      return { county: "full time", mic: "part time" };
    case "part time county/full time MIC":
      return { county: "part time", mic: "full time" };
    case "part time county only":
      return { county: "part time", mic: null };
    case "part time MIC only":
      return { county: null, mic: "part time" };
    default:
      return { county: null, mic: null };
  }
}

function getVisiblePlayers() {
  return players.filter((player) => {
    if (uiState.filters.position !== "all") {
      const selectedPosition = uiState.filters.position;
      if (selectedPosition.includes("/")) {
        if (player.position !== selectedPosition) return false;
      } else if (!player.position.split("/").includes(selectedPosition)) {
        return false;
      }
    }

    if (uiState.filters.rosterStatus !== "all" && player.rosterStatus !== uiState.filters.rosterStatus) {
      return false;
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
    <label>
      Filter by roster status
      <select id="filter-roster-status">
        <option value="all" ${uiState.filters.rosterStatus === "all" ? "selected" : ""}>All statuses</option>
        ${ROSTER_STATUSES.map((status) => `<option value="${status}" ${uiState.filters.rosterStatus === status ? "selected" : ""}>${status}</option>`).join("")}
      </select>
    </label>
    <p class="result-count">Showing ${visiblePlayers.length} of ${players.length} players</p>
  `;

  toolbar.querySelector("#filter-position").addEventListener("change", (event) => {
    uiState.filters.position = event.target.value;
    renderBoard();
  });

  toolbar.querySelector("#filter-roster-status").addEventListener("change", (event) => {
    uiState.filters.rosterStatus = event.target.value;
    renderBoard();
  });
}

function buildPlayerManagementColumn(visiblePlayers) {
  const column = document.createElement("section");
  column.className = "roster-column players-column";

  column.innerHTML = `
    <h2>Players <span class="count-pill">${visiblePlayers.length}</span></h2>
    <p class="column-subtext">Set each player's current roster status.</p>
    <div class="line-list" id="players-list"></div>
  `;

  const list = column.querySelector("#players-list");

  visiblePlayers.forEach((player) => {
    const row = document.createElement("div");
    row.className = "player-row";

    row.innerHTML = `
      <div class="player-row-main">
        <span class="player-line">${player.name} - ${player.position}</span>
      </div>
      <label class="sr-only" for="status-${player.id}">Roster status for ${player.name}</label>
      <select id="status-${player.id}" data-player-id="${player.id}" class="status-select">
        ${ROSTER_STATUSES.map((status) => `<option value="${status}" ${player.rosterStatus === status ? "selected" : ""}>${status}</option>`).join("")}
      </select>
    `;

    row.querySelector("select").addEventListener("change", (event) => {
      player.rosterStatus = event.target.value;
      renderBoard();
    });

    list.appendChild(row);
  });

  return column;
}

function buildLeagueColumn(title, description, visiblePlayers, leagueKey) {
  const assignedPlayers = visiblePlayers
    .filter((player) => Boolean(getRosterParticipation(player.rosterStatus)[leagueKey]))
    .map((player) => `${player.name} - ${player.position} - ${player.rosterStatus}`);

  const column = document.createElement("section");
  column.className = "roster-column";

  column.innerHTML = `
    <h2>${title} <span class="count-pill">${assignedPlayers.length}</span></h2>
    <p class="column-subtext">${description}</p>
    <div class="line-list">
      ${assignedPlayers.length > 0
        ? assignedPlayers.map((line) => `<p class="roster-line">${line}</p>`).join("")
        : '<p class="empty-message">No players currently rostered.</p>'}
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
  board.appendChild(
    buildLeagueColumn(
      LEAGUES.county,
      "Players currently rostered for county play.",
      visiblePlayers,
      "county"
    )
  );
  board.appendChild(
    buildLeagueColumn(
      LEAGUES.mic,
      "Players currently rostered for MIC play.",
      visiblePlayers,
      "mic"
    )
  );
}

renderBoard();
