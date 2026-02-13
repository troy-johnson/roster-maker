const LEAGUES = {
  A: "League A",
  B: "League B"
};

const columns = [
  { id: "unassigned", title: "Unassigned", description: "No league selected" },
  { id: "leagueA", title: "League A", description: "Primary League A roster" },
  { id: "leagueB", title: "League B", description: "Primary League B roster" },
  { id: "both", title: "Both Leagues", description: "Assigned to League A + League B" }
];

const players = [
  { id: "p1", name: "Jordan Tate", status: "full-time", tier: 1, leagues: [] },
  { id: "p2", name: "Sasha Kim", status: "part-time", tier: 2, leagues: ["A"] },
  { id: "p3", name: "Maya Ibanez", status: "full-time", tier: 2, leagues: ["B"] },
  { id: "p4", name: "Nolan Pierce", status: "part-time", tier: 3, leagues: [] },
  { id: "p5", name: "Avery Shah", status: "full-time", tier: 1, leagues: ["A", "B"] }
];

let draggingPlayerId = null;

function getAssignmentSummary(player) {
  if (player.leagues.length === 0) return "Unassigned";
  if (player.leagues.length === 2) return "League A + League B";
  return player.leagues[0] === "A" ? LEAGUES.A : LEAGUES.B;
}

function getColumnForPlayer(player) {
  if (player.leagues.length === 0) return "unassigned";
  if (player.leagues.length === 2) return "both";
  return player.leagues[0] === "A" ? "leagueA" : "leagueB";
}

function canAssign(player, destinationId) {
  if (!player) return false;
  if (destinationId === "unassigned") return true;

  const destinationLeagues = destinationId === "leagueA"
    ? ["A"]
    : destinationId === "leagueB"
      ? ["B"]
      : ["A", "B"];

  // business rule: part-time tier 3 players cannot be in both leagues
  if (destinationLeagues.length === 2 && player.status === "part-time" && player.tier === 3) {
    return false;
  }

  // business rule: tier 3 players cannot move into League B only
  if (destinationId === "leagueB" && player.tier === 3) {
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

function renderCard(player) {
  const card = document.createElement("article");
  card.className = "player-card";
  card.draggable = true;
  card.dataset.playerId = player.id;

  card.innerHTML = `
    <h3 class="player-name">${player.name}</h3>
    <div class="badges">
      <span class="badge status-${player.status}">${player.status}</span>
      <span class="badge tier">Tier ${player.tier}</span>
    </div>
    <p class="assignment">Current assignment: ${getAssignmentSummary(player)}</p>
  `;

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

function renderColumn(column) {
  const wrapper = document.createElement("section");
  wrapper.className = "roster-column";
  wrapper.dataset.columnId = column.id;

  wrapper.innerHTML = `
    <h2>${column.title}</h2>
    <p class="column-subtext">${column.description}</p>
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
  const board = document.querySelector("#board");
  board.innerHTML = "";

  columns.forEach((column) => {
    const columnEl = renderColumn(column);
    const listEl = columnEl.querySelector(".player-list");

    players
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
