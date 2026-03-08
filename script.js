let gameSeq = [];
let userSeq = [];

let level = 0;
let started = false;

// starting .. 

let colors = ["red", "green", "blue", "yellow"];
let h2 = document.querySelector("h2");
let body = document.querySelector("body");

// Game start
document.addEventListener("keydown", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

// Level up ++
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = colors[randIdx];
    gameSeq.push(randColor);

    playSequence();
}

// Play full sequence ..
function playSequence() {
    let i = 0;
    let interval = setInterval(() => {
        let btn = document.querySelector(`.${gameSeq[i]}`);
        flash(btn);
        i++;

        if (i >= gameSeq.length) {
            clearInterval(interval);
        }
    }, 600);
}

// Flash effect .. 
function flash(btn) {
    btn.classList.add("whiteBg");
    setTimeout(() => {
        btn.classList.remove("whiteBg");
    }, 300);
}

// Button click 
let btns = document.querySelectorAll(".container > div");

for (let btn of btns) {
    btn.addEventListener("click", function () {
        if(started){
            let userColor = this.classList[0];
            userSeq.push(userColor);
            flash(this);
    
            checkAnswer(userSeq.length - 1);
        }
    });
}

// Check answer
function checkAnswer(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        gameOver();
    }
}

// Game over
function gameOver() {
    h2.innerText = "Game Over!  Press Any Key to Restart";
    body.style.backgroundColor = "red";

    setTimeout(() => {
        body.style.backgroundColor = "white";
    }, 500);

    reset();
}

// Reset game.
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
