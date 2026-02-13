const LEAGUES = {
  county: "SLC County",
  mic: "Mammoth Ice Center"
};

const POSITION_OPTIONS = ["F", "D", "G", "F/D", "D/G", "F/G", "F/D/G"];
const LEAGUE_STATUS_OPTIONS = ["full time", "part time", "non-roster"];

const players = [
  {
    id: "p1",
    name: "Jordan Tate",
    position: "F/D",
    leagueStatus: { county: "full time", mic: "part time" }
  },
  {
    id: "p2",
    name: "Sasha Kim",
    position: "D/G",
    leagueStatus: { county: "part time", mic: "non-roster" }
  },
  {
    id: "p3",
    name: "Maya Ibanez",
    position: "G",
    leagueStatus: { county: "non-roster", mic: "full time" }
  },
  {
    id: "p4",
    name: "Nolan Pierce",
    position: "F/G",
    leagueStatus: { county: "non-roster", mic: "non-roster" }
  },
  {
    id: "p5",
    name: "Avery Shah",
    position: "F/D/G",
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
    <p class="column-subtext">Update position, then expand league controls for roster statuses.</p>
    <div class="line-list" id="players-list"></div>
  `;

  const list = column.querySelector("#players-list");

  visiblePlayers.forEach((player) => {
    const row = document.createElement("div");
    row.className = "player-row";

    row.innerHTML = `
      <div class="player-row-main">
        <p class="player-name">${player.name}</p>
        <label class="inline-field" for="position-${player.id}">
          Position
          <select id="position-${player.id}" data-player-id="${player.id}" class="status-select">
            ${POSITION_OPTIONS.map((position) => `<option value="${position}" ${player.position === position ? "selected" : ""}>${position}</option>`).join("")}
          </select>
        </label>
      </div>
      <details class="status-accordion">
        <summary>League roster statuses</summary>
        <div class="accordion-content">
          ${Object.entries(LEAGUES)
            .map(
              ([leagueKey, leagueTitle]) => `
                <label class="inline-field" for="status-${player.id}-${leagueKey}">
                  ${leagueTitle}
                  <select id="status-${player.id}-${leagueKey}" data-player-id="${player.id}" data-league-key="${leagueKey}" class="status-select league-status-select">
                    ${LEAGUE_STATUS_OPTIONS.map((status) => `<option value="${status}" ${player.leagueStatus[leagueKey] === status ? "selected" : ""}>${status}</option>`).join("")}
                  </select>
                </label>
              `
            )
            .join("")}
        </div>
      </details>
    `;

    row.querySelector(`#position-${player.id}`).addEventListener("change", (event) => {
      player.position = event.target.value;
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

function buildLeagueColumn(title, description, visiblePlayers, leagueKey) {
  const assignedPlayers = visiblePlayers
    .map((player) => ({
      name: player.name,
      position: player.position,
      status: getAssignedLeagueStatus(player, leagueKey)
    }))
    .filter((player) => Boolean(player.status));

  const column = document.createElement("section");
  column.className = "roster-column";

  column.innerHTML = `
    <h2>${title} <span class="count-pill">${assignedPlayers.length}</span></h2>
    <p class="column-subtext">${description}</p>
    <div class="line-list">
      ${assignedPlayers.length > 0
        ? assignedPlayers
            .map(
              (player) => `<p class="roster-line">${player.name} - ${player.position} <span class="status-badge ${player.status.replace(" ", "-")}">${player.status}</span></p>`
            )
            .join("")
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
