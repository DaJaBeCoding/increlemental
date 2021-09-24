
var lastTime = Date.now();
var now = lastTime;
var deltaT = 0;
var lastCookieUpdate = 0;
console.log(document.cookie);

// load storage vars


if (existsStorageVar("gamedata")) {
    var gamedata = JSON.parse(window.sessionStorage.getItem("gamedata"));
} else {
    var gamedata = {
        energy: 0,
        money: 0,

        playtime: 0,

        MONEY_UNLOCKED: false
    }
}
const exp = new Date();
exp.setTime(exp.getTime() + 69420);
document.cookie = "username=dajabe"
//document.cookie = "gamedata=" + encodeURIComponent(JSON.stringify(gamedata)) + ";expires=" + exp.toUTCString();
console.log(document.cookie)

// load storage vars end


window.requestAnimationFrame(update);

const unlocks = {
    DIVITIAE: 0
}


function existsStorageVar(name) {
    return window.sessionStorage.getItem(name) !== null;
}

function onCreateEnergy() {
    gamedata.energy += 1;
}


function update() {
    now = Date.now();
    deltaT = (now - lastTime) / 1000.0;
    lastTime = now;
    gamedata.playtime += deltaT;




    document.getElementById("energyLabel").innerHTML = parseInt(gamedata.energy);
    updateUnlocks();
    updateGamedata(now);
    window.requestAnimationFrame(update);
}

function updateGamedata(now) {
    window.sessionStorage.setItem("gamedata", JSON.stringify(gamedata));
}

function unlock(unlock) {
    switch (unlock) {
        case unlocks.DIVITIAE:
            if (gamedata.DIVITIAE_UNLOCKED) {
                return;
            }
            gamedata.DIVITIAE_UNLOCKED = true;
            document.getElementById("unlockMoneyDialog").show();
            break;
    }
}

function updateUnlocks() {
    //money
    if (gamedata.energy >= 10) {
        unlock(unlocks.DIVITIAE);
    }
    document.getElementById("moneyDiv").hidden = !gamedata.DIVITIAE_UNLOCKED;
    
}

