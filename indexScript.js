var lastTime = Date.now();
var now = lastTime;
var deltaT = 0;
var lastCookieUpdate = 0;
console.log(document.cookie);


// load gamedata
var gamedata = null;

showTab("productionTab")
if (document.cookie !== null && document.cookie.length > 0) {
    gamedata = JSON.parse(loadGamedataFromCookie());
    console.log("Loaded cookie gamedata! " + JSON.stringify(gamedata));
} else {
    gamedata = {
        energy: 0,
        money: 0,

        playtime: 0,

		GENERATOR_UNLOCKED: false,
        MONEY_UNLOCKED: false
		
    }
}
// load gamedata end


window.requestAnimationFrame(update);

const unlocks = {
    DIVITIAE: 0,
	GENERATOR: 1
}

function update() {
	document.getElementById("startDialog1").show();
    now = Date.now();
    deltaT = (now - lastTime) / 1000.0;
    lastTime = now;
    gamedata.playtime += deltaT;



    // production tab
    document.getElementById("energyLabel").innerHTML = parseInt(gamedata.energy);
    document.getElementById("moneyLabel").innerHTML = parseInt(gamedata.money);

    //market tab
    document.getElementById("energyLabel").innerHTML = gamedata.energy;
    document.getElementById("moneyLabel").innerHTML = gamedata.money;

    //global update
    updateButtonBuyable();
    updateUnlocks();
    updateGamedata(now);
    window.requestAnimationFrame(update);
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




function updateButtonBuyable() {
    // market buttons
    document.getElementById("sellEnergy10").disabled = gamedata.energy < 10;
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
		case unlocks.GENERATOR:
			if (gamedata.GENERATOR_UNLOCKED) {
                return;
            }
            gamedata.GENERATOR_UNLOCKED = true;
            document.getElementById("unlockGeneratorDialog").show();
			break;
        case unlocks.DIVITIAE:
            if (gamedata.DIVITIAE_UNLOCKED) {
                return;
            }
            gamedata.DIVITIAE_UNLOCKED = true;
            document.getElementById("unlockMoneyDialog").show();
            break;
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

function updateUnlocks() {
	// generator
	if (gamedata.energy >= 10) {
        unlock(unlocks.GENERATOR);
    }
	document.getElementById("moneyMeter").hidden = !gamedata.GENERATOR_UNLOCKED;
    //money
	
    if (gamedata.energy >= 1000000) {
        unlock(unlocks.DIVITIAE);
    }
    document.getElementById("moneyMeter").hidden = !gamedata.DIVITIAE_UNLOCKED;
    document.getElementById("nav").hidden = !gamedata.DIVITIAE_UNLOCKED;
    
}

function showTab(tabName) {
    for (let element of document.getElementsByClassName("tab")) {
        if (element.id === tabName) {
            element.style.display = "block";
            document.getElementById(tabName + "Btn").disabled = true;
        } else {
            element.style.display = "none";
            document.getElementById(element.id + "Btn").disabled = false;
        }
    }
   
}

