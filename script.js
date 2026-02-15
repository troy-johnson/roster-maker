const LEAGUES = {
  county: {
    name: "SLC County"
  },
  mic: {
    name: "Mammoth Ice Center"
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
    id: "p6",
    name: "Troy Johnson",
    notes: "",
    primaryPosition: "D",
    secondaryPosition: "D",
    priorityTier: "Tier 1",
    leagueStatus: { county: "full time", mic: "full time" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p7",
    name: "Eric Capps",
    notes: "",
    primaryPosition: "F",
    secondaryPosition: "F",
    priorityTier: "Tier 1",
    leagueStatus: { county: "full time", mic: "full time" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p8",
    name: "Gracie Capps",
    notes: "",
    primaryPosition: "F",
    secondaryPosition: "F",
    priorityTier: "Tier 1",
    leagueStatus: { county: "full time", mic: "full time" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p9",
    name: "Mike Thompson",
    notes: "",
    primaryPosition: "F",
    secondaryPosition: "F",
    priorityTier: "Tier 1",
    leagueStatus: { county: "full time", mic: "full time" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p10",
    name: "Stefan Wilson",
    notes: "",
    primaryPosition: "D",
    secondaryPosition: "D",
    priorityTier: "Tier 1",
    leagueStatus: { county: "full time", mic: "full time" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p11",
    name: "Marcus Capps",
    notes: "",
    primaryPosition: "F",
    secondaryPosition: "F",
    priorityTier: "Tier 1",
    leagueStatus: { county: "full time", mic: "full time" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p12",
    name: "Jay Bartlett",
    notes: "",
    primaryPosition: "F",
    secondaryPosition: "F",
    priorityTier: "Tier 1",
    leagueStatus: { county: "full time", mic: "full time" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p13",
    name: "Chris Browne",
    notes: "",
    primaryPosition: "F",
    secondaryPosition: "D",
    priorityTier: "Tier 1",
    leagueStatus: { county: "full time", mic: "full time" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p14",
    name: "Ned White",
    notes: "",
    primaryPosition: "F",
    secondaryPosition: "F",
    priorityTier: "Tier 1",
    leagueStatus: { county: "non-roster", mic: "non-roster" },
    isOnVacation: true,
    isInjuredReserve: false,
  },
  {
    id: "p15",
    name: "John Pereira",
    notes: "",
    primaryPosition: "D",
    secondaryPosition: "F",
    priorityTier: "Tier 1",
    leagueStatus: { county: "full time", mic: "full time" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p16",
    name: "Scott Wade",
    notes: "",
    primaryPosition: "G",
    secondaryPosition: "G",
    priorityTier: "Tier 1",
    leagueStatus: { county: "full time", mic: "full time" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p17",
    name: "Christiaan O'Connor",
    notes: "",
    primaryPosition: "F",
    secondaryPosition: "D",
    priorityTier: "Tier 1",
    leagueStatus: { county: "full time", mic: "full time" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p18",
    name: "Chad Linville",
    notes: "",
    primaryPosition: "D",
    secondaryPosition: "D",
    priorityTier: "Tier 1",
    leagueStatus: { county: "part time", mic: "full time" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p19",
    name: "Ben Smith",
    notes: "",
    primaryPosition: "F",
    secondaryPosition: "D",
    priorityTier: "Tier 1",
    leagueStatus: { county: "full time", mic: "non-roster" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p20",
    name: "Blake Moss",
    notes: "",
    primaryPosition: "F",
    secondaryPosition: "F",
    priorityTier: "Tier 1",
    leagueStatus: { county: "non-roster", mic: "non-roster" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p21",
    name: "Dave Mohr",
    notes: "",
    primaryPosition: "F",
    secondaryPosition: "F",
    priorityTier: "Tier 1",
    leagueStatus: { county: "non-roster", mic: "non-roster" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p22",
    name: "Max Gesteland",
    notes: "",
    primaryPosition: "D",
    secondaryPosition: "D",
    priorityTier: "Tier 1",
    leagueStatus: { county: "non-roster", mic: "non-roster" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p23",
    name: "Mikko Anderson",
    notes: "",
    primaryPosition: "F",
    secondaryPosition: "F",
    priorityTier: "Tier 1",
    leagueStatus: { county: "non-roster", mic: "non-roster" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p24",
    name: "Per Gesteland",
    notes: "",
    primaryPosition: "F",
    secondaryPosition: "D",
    priorityTier: "Tier 1",
    leagueStatus: { county: "non-roster", mic: "non-roster" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p25",
    name: "Quinn Pereira",
    notes: "",
    primaryPosition: "F",
    secondaryPosition: "D",
    priorityTier: "Tier 1",
    leagueStatus: { county: "full time", mic: "full time" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p26",
    name: "Rich Greenberg",
    notes: "",
    primaryPosition: "F",
    secondaryPosition: "F",
    priorityTier: "Tier 1",
    leagueStatus: { county: "non-roster", mic: "non-roster" },
    isInjuredReserve: true,
    isOnVacation: false,
  },
  {
    id: "p27",
    name: "Jake Barnes",
    notes: "",
    primaryPosition: "F",
    secondaryPosition: "F",
    priorityTier: "Tier 1",
    leagueStatus: { county: "non-roster", mic: "non-roster" },
    isInjuredReserve: true,
    isOnVacation: false,
  },
  {
    id: "p28",
    name: "Reid Jacobson",
    notes: "",
    primaryPosition: "G",
    secondaryPosition: "D",
    priorityTier: "Tier 1",
    leagueStatus: { county: "part time", mic: "part time" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p29",
    name: "Jack Cantarella",
    notes: "",
    primaryPosition: "F",
    secondaryPosition: "F",
    priorityTier: "Tier 2",
    leagueStatus: { county: "part time", mic: "part time" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p30",
    name: "Grayson Cantarella",
    notes: "",
    primaryPosition: "F",
    secondaryPosition: "F",
    priorityTier: "Tier 2",
    leagueStatus: { county: "part time", mic: "part time" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p31",
    name: "Charlie Capps",
    notes: "",
    primaryPosition: "F",
    secondaryPosition: "F",
    priorityTier: "Tier 2",
    leagueStatus: { county: "non-roster", mic: "non-roster" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p32",
    name: "Tim Bywater",
    notes: "Morning skates",
    primaryPosition: "F",
    secondaryPosition: "F",
    priorityTier: "Tier 3",
    leagueStatus: { county: "non-roster", mic: "non-roster" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p33",
    name: "Tara Riley",
    notes: "COVID cup goalie",
    primaryPosition: "G",
    secondaryPosition: "G",
    priorityTier: "Tier 3",
    leagueStatus: { county: "non-roster", mic: "non-roster" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p34",
    name: "Jon Solomon",
    notes: "Morning skates",
    primaryPosition: "F",
    secondaryPosition: "F",
    priorityTier: "Tier 3",
    leagueStatus: { county: "non-roster", mic: "non-roster" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p35",
    name: "Rob Kramer",
    notes: "Jay/Troy PC teammate",
    primaryPosition: "F",
    secondaryPosition: "F",
    priorityTier: "Tier 3",
    leagueStatus: { county: "non-roster", mic: "non-roster" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p36",
    name: "Tony Baker",
    notes: "Jay/Troy PC teammate",
    primaryPosition: "F",
    secondaryPosition: "F",
    priorityTier: "Tier 3",
    leagueStatus: { county: "non-roster", mic: "non-roster" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p37",
    name: "Robbie Heath",
    notes: "Jay/Troy PC teammate",
    primaryPosition: "F",
    secondaryPosition: "F",
    priorityTier: "Tier 3",
    leagueStatus: { county: "non-roster", mic: "non-roster" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
  {
    id: "p38",
    name: "John Nigro",
    notes: "Jay/Troy PC teammate",
    primaryPosition: "F",
    secondaryPosition: "F",
    priorityTier: "Tier 3",
    leagueStatus: { county: "non-roster", mic: "non-roster" },
    isInjuredReserve: false,
    isOnVacation: false,
  },
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

function getLastName(name) {
  const nameParts = name.trim().split(/\s+/);
  return nameParts[nameParts.length - 1].toLowerCase();
}

function getMobileRosterName(name) {
  const nameParts = name.trim().split(/\s+/);
  if (nameParts.length <= 1) return name;

  const firstInitial = `${nameParts[0][0]}.`;
  const lastName = nameParts[nameParts.length - 1];
  return `${firstInitial} ${lastName}`;
}

function getRosterDisplayName(name) {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  return isMobile ? getMobileRosterName(name) : name;
}

function sortPlayersByLastName(a, b) {
  const lastNameComparison = getLastName(a.name).localeCompare(getLastName(b.name));
  if (lastNameComparison !== 0) return lastNameComparison;

  return a.name.localeCompare(b.name);
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
    <div class="line-list" id="players-list"></div>
  `;

  const list = column.querySelector("#players-list");

  const sortedPlayers = [...visiblePlayers].sort(sortPlayersByLastName);

  sortedPlayers.forEach((player) => {
    const isCountyOptedIn = player.leagueStatus.county !== "non-roster";
    const isMicOptedIn = player.leagueStatus.mic !== "non-roster";
    const isInjuredReserve = Boolean(player.isInjuredReserve);
    const isOnVacation = Boolean(player.isOnVacation);
    const row = document.createElement("div");
    row.className = "player-row";

    row.innerHTML = `
      <details class="status-accordion">
        <summary>
          <span class="summary-main">
            <span class="player-name">${player.name}</span>
            <span class="team-tags" aria-label="Team signup status">
              <span class="team-tag ${isCountyOptedIn ? "team-tag-active-county" : ""}">CTY</span>
              <span class="team-tag ${isMicOptedIn ? "team-tag-active-mic" : ""}">MIC</span>
              ${
                isInjuredReserve
                  ? `<span class="team-tag team-tag-ir" aria-label="Injured reserve" title="Injured reserve">
                      <svg viewBox="0 0 16 16" role="img" aria-hidden="true" focusable="false">
                        <circle cx="8" cy="8" r="7" />
                        <path d="M8 4.3v7.4M4.3 8h7.4" />
                      </svg>
                    </span>`
                  : ""
              }
              ${
                isOnVacation
                  ? `<span class="team-tag team-tag-vacation" aria-label="On vacation" title="On vacation">
                      <svg viewBox="0 0 16 16" role="img" aria-hidden="true" focusable="false">
                        <rect x="2.5" y="5" width="11" height="8.5" rx="1.6" />
                        <path d="M5 5V4a3 3 0 0 1 6 0v1" />
                        <path d="M2.5 8h11" />
                      </svg>
                    </span>`
                  : ""
              }
            </span>
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

    const accordion = row.querySelector(".status-accordion");
    row.addEventListener("click", (event) => {
      if (event.target.closest(".accordion-content")) return;
      if (event.target.closest("summary")) return;
      accordion.open = !accordion.open;
    });

    list.appendChild(row);
  });

  return column;
}

function chunkPlayers(players, size) {
  if (size <= 0) return [players];

  const chunks = [];
  for (let i = 0; i < players.length; i += size) {
    chunks.push(players.slice(i, i + size));
  }

  return chunks;
}

function buildRosterSection(title, sectionPlayers, className = "", playersPerLine = 1) {
  const playerLines = chunkPlayers(sectionPlayers, playersPerLine);

  return `
    <section class="roster-group ${className}">
      <h3>${title} <span class="count-pill">${sectionPlayers.length}</span></h3>
      ${sectionPlayers.length > 0
        ? playerLines
            .map(
              (linePlayers) => `
                <p class="roster-line" style="--line-columns: ${playersPerLine};">
                  ${linePlayers
                    .map((player) => `<span class="roster-player-slot">${getRosterDisplayName(player.name)}</span>`)
                    .join("")}
                </p>
              `
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
    F: fullTimePlayers.filter((player) => player.primaryPosition === "F").sort(sortPlayersByLastName),
    D: fullTimePlayers.filter((player) => player.primaryPosition === "D").sort(sortPlayersByLastName),
    G: fullTimePlayers.filter((player) => player.primaryPosition === "G").sort(sortPlayersByLastName)
  };

  const sortedPartTimePlayers = [...partTimePlayers].sort(sortPlayersByLastName);


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
    <div class="line-list roster-sections">
      ${buildRosterSection("Forward", byPosition.F, "forward-section", 3)}
      ${buildRosterSection("Defense", byPosition.D, "defense-section", 2)}
      ${buildRosterSection("Goalie", byPosition.G, "goalie-section")}
      ${buildRosterSection("Part Time", sortedPartTimePlayers, "subs-section")}
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

window.addEventListener("resize", renderBoard);
