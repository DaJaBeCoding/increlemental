window.requestAnimationFrame(update);

var gamedata = JSON.parse(window.sessionStorage.getItem("gamedata"));
var lastCookieUpdate = 0;
function update() {
    window.requestAnimationFrame(update);
    document.getElementById("energyLabel").innerHTML = gamedata.energy;
    document.getElementById("moneyLabel").innerHTML = gamedata.money;

    updateButtonBuyable();
    updateGamedata(Date.now);
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

function onSellEnergy(amount) {
    switch (amount) {
        case 10:
            gamedata.energy -= 10;
            gamedata.money += 1;
            break;
    }
}

function updateButtonBuyable() {
    document.getElementById("sellEnergy10").disabled = gamedata.energy < 10;
}