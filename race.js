// render the track with tortoise and hare emojis
// start the race with a button click
// trigger the move of the turtosie and hare every second
// move the tortoise randomly every second
// move the hare randomly every second
// fix the position if they go beyond the race track
// render the track again with the new positions
// when one of the animals reach the end if the track, show result

const startBtn = document.getElementById("startBtn");
const messageEl = document.getElementById("message");
const trackEl = document.getElementById("track");
const scoreboardEl = document.getElementById("scoreboard");

const TRACK_LENGTH = 70;
let tortoisePosition = 1;
let harePosition = 1;
let raceIntervalId = null;
let tortoiseWins = 0;
let hareWins = 0;

startBtn.addEventListener("click", startRace);
// start the race with a button click
function startRace() {
    tortoisePosition = 1;
    harePosition = 1;

    messageEl.textContent = "BANG! THEY ARE OFF!!!";

    // disabled is a property
    startBtn.disabled = true;

    // avoid double races
    if (raceIntervalId != null) {
        clearInterval(raceIntervalId);
    }

    // trigger the move of the turtosie and hare every second
    raceIntervalId = setInterval(raceStep, 1000);
}

// render the track again with the new positions

function raceStep() {
    moveTortoise(); // move the tortoise randomly every second
    moveHare(); // move the hare randomly every second
    clampPosition(); // fix the position if they go beyond the race track
    renderTrack(); // render the track again with the new positions

    // check finish
    if (tortoisePosition >= TRACK_LENGTH || harePosition >= TRACK_LENGTH) {
        clearInterval(raceIntervalId);
        raceIntervalId = null;
        startBtn.disabled = false;
        showResult();
    }
}

function moveTortoise() {
    // random integer 1 - 10
    let roll = Math.floor(Math.random() * 10) + 1;

    if (roll >= 1 && roll <= 5) {
        // 1-5 fast plod
        tortoisePosition += 4;
    } else if (roll >= 6 && roll <= 7) {
        // 6-7 slip
        tortoisePosition -= 5;
    } else {
        // 8-10 slow plod
        tortoisePosition += 1;
    }
}

// ge
function moveHare() {
    let roll = Math.floor(Math.random() * 10) + 1;

    if (roll <= 2) {
        // 1–2: Sleep
        harePosition += 0;
    } else if (roll <= 4) {
        // 3–4: Big hop (+8)
        harePosition += 8;
    } else if (roll === 5) {
        // 5: Big slip (-5)
        harePosition -= 5;
    } else if (roll <= 8) {
        // 6–8: Small hop (+4)
        harePosition += 4;
    } else {
        // 9–10: Small slip (-2)
        harePosition -= 2;
    }
}

function clampPosition() {
    // fit the position with the track
    const MIN_POSITION = 1;
    const MAX_POSITION = TRACK_LENGTH;

    // no negative number and choose the small number compared to the bigger numnber
    tortoisePosition = Math.min(
        MAX_POSITION,
        Math.max(MIN_POSITION, tortoisePosition),
    );

    harePosition = Math.min(MAX_POSITION, Math.max(MIN_POSITION, harePosition));
}

// render the track with tortoise and hare emojis
function renderTrack() {
    trackEl.innerHTML = "";

    for (let i = 1; i <= TRACK_LENGTH; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        const isTortoiseHere = tortoisePosition === i;
        const isHareHere = harePosition === i;

        if (isTortoiseHere && isHareHere) {
            cell.textContent = "🫨";
            cell.classList.add("both");
        } else if (isTortoiseHere) {
            cell.textContent = "🐢";
            cell.classList.add("tortoise");
        } else if (isHareHere) {
            cell.textContent = "🐰";
            cell.classList.add("hare");
        }
        trackEl.appendChild(cell);
    }
}

function showResult() {
    if (tortoisePosition >= TRACK_LENGTH && harePosition >= TRACK_LENGTH) {
        messageEl.textContent = "It is a tie";
    } else if (tortoisePosition >= TRACK_LENGTH) {
        messageEl.textContent = "Tortoise wins";
    } else if (harePosition >= TRACK_LENGTH) {
        messageEl.textContent = "Hare wins";
    } else {
        messageEl.textContent = "Race stopped";
    }
}

function renderScoreboard() {
    scoreboardEl.textContent = `Tortoise: ${tortoiseWins} wins - Hare: ${hareWins} wins`;
}

renderTrack();
renderScoreboard();