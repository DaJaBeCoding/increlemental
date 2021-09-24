var lastTime = Date.now();
var now = lastTime;
var deltaT = 0;
var lastCookieUpdate = 0;
console.log(document.cookie);

// load storage vars
var cookiePlaytime = 0;
var cookieGD = null;
var gamedata = null;
if (document.cookie !== null && document.cookie.length > 0) {
    cookieGD = JSON.parse(loadGamedataFromCookie());
    cookiePlaytime = cookieGD.playtime;
}
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
if (cookiePlaytime > gamedata.playtime) {
    gamedata = cookieGD;
    console.log("Loaded cookie gamedata! " + JSON.stringify(gamedata));
}


// load storage vars end


window.requestAnimationFrame(update);

const unlocks = {
    DIVITIAE: 0
}

function loadGamedataFromCookie() {
    if (document.cookie !== null) {
        var cookie = document.cookie;
        cookie = cookie.split(';')[0];
        cookie = cookie.split('=')[1];
        return cookie;
    }
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
    document.getElementById("moneyLabel").innerHTML = parseInt(gamedata.money);
    updateUnlocks();
    updateGamedata(now);
    window.requestAnimationFrame(update);
}

function updateGamedata(now) {
    window.sessionStorage.setItem("gamedata", JSON.stringify(gamedata));

    if (now - lastCookieUpdate > 2000) {
        lastCookieUpdate = now;
        const exp = new Date();
        exp.setTime(exp.getTime() + 69420);
        document.cookie = "gamedata=" + JSON.stringify(gamedata) + ";expires=" + exp.toUTCString();
        console.log("cookie written: " + document.cookie);
    }
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
    document.getElementById("nav").hidden = !gamedata.DIVITIAE_UNLOCKED;
    
}

