const LEAGUES = {
  A: "SLC County",
  B: "Mammoth Practice Facility"
};

const STATUS_OPTIONS = ["full-time", "part-time", "not-playing"];
const TIER_OPTIONS = [1, 2, 3];
const POSITION_OPTIONS = ["F", "D", "G", "F/D", "D/G", "F/G", "F/D/G"];

const columns = [
  { id: "unassigned", title: "Unassigned", description: "No league selected" },
  { id: "leagueA", title: "SLC County", description: "Primary SLC County roster" },
  { id: "leagueB", title: "Mammoth Practice Facility", description: "Primary Mammoth Practice Facility roster" },
  { id: "both", title: "Both Sites", description: "Assigned to SLC County + Mammoth Practice Facility" }
];

const players = [
  {
    id: "p1",
    name: "Jordan Tate",
    tier: 1,
    position: "F/D",
    leagues: [],
    statuses: { A: "full-time", B: "part-time" }
  },
  {
    id: "p2",
    name: "Sasha Kim",
    tier: 2,
    position: "D/G",
    leagues: ["A"],
    statuses: { A: "part-time", B: "not-playing" }
  },
  {
    id: "p3",
    name: "Maya Ibanez",
    tier: 2,
    position: "G",
    leagues: ["B"],
    statuses: { A: "not-playing", B: "full-time" }
  },
  {
    id: "p4",
    name: "Nolan Pierce",
    tier: 3,
    position: "F/G",
    leagues: [],
    statuses: { A: "part-time", B: "not-playing" }
  },
  {
    id: "p5",
    name: "Avery Shah",
    tier: 1,
    position: "F/D/G",
    leagues: ["A", "B"],
    statuses: { A: "full-time", B: "full-time" }
  }
];

const uiState = {
  filters: {
    tier: "all",
    status: "all",
    position: "all"
  },
  sort: "priority-name"
};

let draggingPlayerId = null;

function getAssignmentSummary(player) {
  if (player.leagues.length === 0) return "Unassigned";
  if (player.leagues.length === 2) return `${LEAGUES.A} + ${LEAGUES.B}`;
  return player.leagues[0] === "A" ? LEAGUES.A : LEAGUES.B;
}

function getColumnForPlayer(player) {
  if (player.leagues.length === 0) return "unassigned";
  if (player.leagues.length === 2) return "both";
  return player.leagues[0] === "A" ? "leagueA" : "leagueB";
}

function getStatusesForDestination(player, destinationId) {
  if (destinationId === "unassigned") return [];
  if (destinationId === "leagueA") return [player.statuses.A];
  if (destinationId === "leagueB") return [player.statuses.B];
  return [player.statuses.A, player.statuses.B];
}

function canAssign(player, destinationId) {
  if (!player) return false;
  if (destinationId === "unassigned") return true;

  const destinationLeagues =
    destinationId === "leagueA"
      ? ["A"]
      : destinationId === "leagueB"
        ? ["B"]
        : ["A", "B"];

  // business rule: part-time tier 3 players cannot be in both leagues
  if (
    destinationLeagues.length === 2
    && destinationLeagues.every((league) => player.statuses[league] === "part-time")
    && player.tier === 3
  ) {
    return false;
  }

  // business rule: tier 3 players cannot move into the MIC-only column
  if (destinationId === "leagueB" && player.tier === 3) {
    return false;
  }

  // business rule: players cannot be assigned to leagues marked not-playing
  const destinationStatuses = getStatusesForDestination(player, destinationId);
  if (destinationStatuses.includes("not-playing")) {
    return false;
  }

  return true;
}

function assignPlayer(player, destinationId) {
  if (destinationId === "unassigned") {
    player.leagues = [];
    return;
  }

  if (destinationId === "leagueA") {
    player.leagues = player.leagues.includes("B") ? ["A", "B"] : ["A"];
    return;
  }

  if (destinationId === "leagueB") {
    player.leagues = player.leagues.includes("A") ? ["A", "B"] : ["B"];
    return;
  }

  player.leagues = ["A", "B"];
}

function titleizeStatus(status) {
  return status.replace("-", " ");
}

function getPositionClassSuffix(position) {
  return position.replaceAll("/", "-");
}

function getFilteredAndSortedPlayers() {
  return players
    .filter((player) => {
      if (uiState.filters.tier !== "all" && player.tier !== Number(uiState.filters.tier)) {
        return false;
      }

      if (uiState.filters.status !== "all") {
        const hasStatus = Object.values(player.statuses).includes(uiState.filters.status);
        if (!hasStatus) return false;
      }

      if (uiState.filters.position !== "all") {
        const selectedPosition = uiState.filters.position;
        if (selectedPosition.includes("/")) {
          if (player.position !== selectedPosition) return false;
        } else {
          const positions = player.position.split("/");
          if (!positions.includes(selectedPosition)) return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (uiState.sort === "priority-name") {
        if (a.tier !== b.tier) return a.tier - b.tier;
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
}

function renderCard(player) {
  const card = document.createElement("article");
  card.className = "player-card";
  card.draggable = true;
  card.dataset.playerId = player.id;

  card.innerHTML = `
    <h3 class="player-name">${player.name}</h3>
    <div class="badges">
      <span class="badge tier tier-${player.tier}">Tier ${player.tier}</span>
      <span class="badge position position-${getPositionClassSuffix(player.position)}">Position ${player.position}</span>
      <span class="badge status-${player.statuses.A}">County: ${titleizeStatus(player.statuses.A)}</span>
      <span class="badge status-${player.statuses.B}">MIC: ${titleizeStatus(player.statuses.B)}</span>
    </div>
    <p class="assignment">Current assignment: ${getAssignmentSummary(player)}</p>
    <div class="card-controls">
      <label>
        County status
        <select data-control="status" data-league="A">
          ${STATUS_OPTIONS.map((status) => `<option value="${status}" ${player.statuses.A === status ? "selected" : ""}>${titleizeStatus(status)}</option>`).join("")}
        </select>
      </label>
      <label>
        MIC status
        <select data-control="status" data-league="B">
          ${STATUS_OPTIONS.map((status) => `<option value="${status}" ${player.statuses.B === status ? "selected" : ""}>${titleizeStatus(status)}</option>`).join("")}
        </select>
      </label>
      <label>
        Priority tier
        <select data-control="tier">
          ${TIER_OPTIONS.map((tier) => `<option value="${tier}" ${player.tier === tier ? "selected" : ""}>Tier ${tier}</option>`).join("")}
        </select>
      </label>
    </div>
  `;

  card.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement)) return;

    if (target.dataset.control === "status") {
      player.statuses[target.dataset.league] = target.value;
      player.leagues = player.leagues.filter((league) => player.statuses[league] !== "not-playing");
    }

    if (target.dataset.control === "tier") {
      player.tier = Number(target.value);
    }

    renderBoard();
  });

  card.addEventListener("dragstart", (event) => {
    draggingPlayerId = player.id;
    card.classList.add("is-dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", player.id);
    updateDropTargetStates();
  });

  card.addEventListener("dragend", () => {
    draggingPlayerId = null;
    card.classList.remove("is-dragging");
    clearColumnStates();
  });

  return card;
}

function renderColumn(column, visiblePlayers) {
  const wrapper = document.createElement("section");
  wrapper.className = "roster-column";
  wrapper.dataset.columnId = column.id;
  wrapper.dataset.theme = column.theme;

  const playersInColumn = visiblePlayers.filter((player) => getColumnForPlayer(player) === column.id);
  const columnCount = playersInColumn.length;
  const columnStatuses = playersInColumn.map((player) => getStatusesForDestination(player, column.id));
  const fullTimeCount = columnStatuses.filter(
    (statuses) => statuses.length > 0 && statuses.every((status) => status === "full-time")
  ).length;
  const partTimeCount = columnStatuses.filter(
    (statuses) => statuses.length > 0 && statuses.every((status) => status === "part-time")
  ).length;
  const dualLeagueCount = playersInColumn.filter((player) => player.leagues.length === 2).length;

  wrapper.innerHTML = `
    <h2>${column.title} <span class="count-pill">${columnCount}</span></h2>
    <p class="column-subtext">${column.description}</p>
    <dl class="column-summary" aria-label="${column.title} summary">
      <div><dt>Total</dt><dd>${columnCount}</dd></div>
      <div><dt>Full-time</dt><dd>${fullTimeCount}</dd></div>
      <div><dt>Part-time</dt><dd>${partTimeCount}</dd></div>
      <div><dt>Dual league</dt><dd>${dualLeagueCount}</dd></div>
    </dl>
    <div class="player-list"></div>
  `;

  wrapper.addEventListener("dragover", (event) => {
    if (!draggingPlayerId) return;

    const player = players.find((p) => p.id === draggingPlayerId);
    const allowed = canAssign(player, column.id);

    if (allowed) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      wrapper.classList.add("is-valid-target");
      wrapper.classList.remove("is-invalid-target");
    } else {
      event.dataTransfer.dropEffect = "none";
      wrapper.classList.add("is-invalid-target");
      wrapper.classList.remove("is-valid-target");
    }
  });

  wrapper.addEventListener("dragleave", () => {
    wrapper.classList.remove("is-valid-target", "is-invalid-target");
  });

  wrapper.addEventListener("drop", (event) => {
    event.preventDefault();

    const droppedPlayerId = event.dataTransfer.getData("text/plain") || draggingPlayerId;
    const player = players.find((p) => p.id === droppedPlayerId);

    if (!player || !canAssign(player, column.id)) {
      wrapper.classList.add("is-invalid-target");
      return;
    }

    assignPlayer(player, column.id);
    renderBoard();
  });

  return wrapper;
}

function renderToolbar() {
  const toolbar = document.querySelector("#board-controls");
  const visiblePlayers = getFilteredAndSortedPlayers();

  toolbar.innerHTML = `
    <label>
      Filter by tier
      <select id="filter-tier">
        <option value="all" ${uiState.filters.tier === "all" ? "selected" : ""}>All tiers</option>
        ${TIER_OPTIONS.map((tier) => `<option value="${tier}" ${String(tier) === uiState.filters.tier ? "selected" : ""}>Tier ${tier}</option>`).join("")}
      </select>
    </label>
    <label>
      Filter by status
      <select id="filter-status">
        <option value="all" ${uiState.filters.status === "all" ? "selected" : ""}>Any status</option>
        ${STATUS_OPTIONS.map((status) => `<option value="${status}" ${uiState.filters.status === status ? "selected" : ""}>${titleizeStatus(status)}</option>`).join("")}
      </select>
    </label>
    <label>
      Filter by position
      <select id="filter-position">
        <option value="all" ${uiState.filters.position === "all" ? "selected" : ""}>All positions</option>
        ${POSITION_OPTIONS.map((position) => `<option value="${position}" ${uiState.filters.position === position ? "selected" : ""}>${position}</option>`).join("")}
      </select>
    </label>
    <label>
      Sort
      <select id="sort-order">
        <option value="priority-name" selected>Priority then alphabetical</option>
      </select>
    </label>
    <p class="result-count">Showing ${visiblePlayers.length} of ${players.length} players</p>
  `;

  toolbar.querySelector("#filter-tier").addEventListener("change", (event) => {
    uiState.filters.tier = event.target.value;
    renderBoard();
  });

  toolbar.querySelector("#filter-status").addEventListener("change", (event) => {
    uiState.filters.status = event.target.value;
    renderBoard();
  });

  toolbar.querySelector("#filter-position").addEventListener("change", (event) => {
    uiState.filters.position = event.target.value;
    renderBoard();
  });

  toolbar.querySelector("#sort-order").addEventListener("change", (event) => {
    uiState.sort = event.target.value;
    renderBoard();
  });
}

function updateDropTargetStates() {
  const player = players.find((p) => p.id === draggingPlayerId);
  const cols = document.querySelectorAll(".roster-column");

  cols.forEach((column) => {
    const allowed = canAssign(player, column.dataset.columnId);
    column.classList.toggle("is-invalid-target", !allowed);
    column.classList.toggle("is-valid-target", allowed);
  });
}

function clearColumnStates() {
  document.querySelectorAll(".roster-column").forEach((column) => {
    column.classList.remove("is-valid-target", "is-invalid-target");
  });
}

function renderBoard() {
  renderToolbar();

  const board = document.querySelector("#board");
  const visiblePlayers = getFilteredAndSortedPlayers();
  board.innerHTML = "";

  columns.forEach((column) => {
    const columnEl = renderColumn(column, visiblePlayers);
    const listEl = columnEl.querySelector(".player-list");

    visiblePlayers
      .filter((player) => getColumnForPlayer(player) === column.id)
      .forEach((player) => {
        const card = renderCard(player);
        if (draggingPlayerId) {
          const canMoveHere = canAssign(player, column.id);
          card.classList.toggle("is-disabled", !canMoveHere);
        }
        listEl.appendChild(card);
      });

    board.appendChild(columnEl);
  });

  if (draggingPlayerId) updateDropTargetStates();
}

renderBoard();
