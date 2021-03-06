var lastTime = Date.now();
var now = lastTime;
var deltaT = 0;
var lastCookieUpdate = 0;
console.log(document.cookie);


// load gamedata
var gamedata = null;

showTab(null);
if (document.cookie !== null && document.cookie.length > 0) {
    gamedata = JSON.parse(loadGamedataFromCookie());
    console.log("Loaded cookie gamedata! " + JSON.stringify(gamedata));
} else {
    gamedata = {
        energy: 0,
        energyPerSecond: 0,
        money: 0,

        playtime: 0,

        currentEnergyInsert: 10,
        

        GAME_UNLOCKED: false,
		GENERATOR_UNLOCKED: false,
        MONEY_UNLOCKED: false
		
    }
}
// load gamedata end


window.requestAnimationFrame(update);
document.getElementById("startDialog1").show();
const unlocks = {
    GAME: 0,
    GENERATOR: 1,
    DIVITIAE: 2
	
}

function update() {
	
    now = Date.now();
    deltaT = (now - lastTime) / 1000.0;
    lastTime = now;
    gamedata.playtime += deltaT;

    // ressources
    gamedata.energy += gamedata.energyPerSecond * deltaT;
    // ressource bar
    document.getElementById("energyLabel").innerHTML = parseInt(gamedata.energy);
    document.getElementById("moneyLabel").innerHTML = parseInt(gamedata.money);
    // production tab
    

    updateGenerator();

    //global update
    updateButtonBuyable();
    updateUnlocks();
    updateGamedata(now);
    window.requestAnimationFrame(update);
}

function updateGenerator() {
    document.getElementById("energyPerSecondLabel").innerHTML = gamedata.energyPerSecond;
    document.getElementById("insertEnergyAmountLabel").innerHTML = gamedata.currentEnergyInsert;
}

function onInsertEnergy() {
    gamedata.energy -= gamedata.currentEnergyInsert;
    gamedata.energyPerSecond++;
    gamedata.currentEnergyInsert += 10;
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
    document.getElementById("insertEnergyBtn").disabled = gamedata.energy < gamedata.currentEnergyInsert;
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
        case unlocks.GAME:
            if (gamedata.GAME_UNLOCKED) {
                return;
            }
            gamedata.GAME_UNLOCKED = true;
            showTab("productionTab");
            break;
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
    // game
    document.getElementById("energyMeter").hidden = !gamedata.GAME_UNLOCKED;
	// generator
	if (gamedata.energy >= 10) {
        unlock(unlocks.GENERATOR);
    }
    showDiv("generatorDiv", gamedata.GENERATOR_UNLOCKED);
    //money
	
    if (gamedata.energy >= 1000000) {
        unlock(unlocks.DIVITIAE);
    }
    document.getElementById("moneyMeter").hidden = !gamedata.DIVITIAE_UNLOCKED;
    document.getElementById("nav").hidden = !gamedata.DIVITIAE_UNLOCKED;
    
}

function showDiv(divId, shouldShow) {
    if (shouldShow) {
        document.getElementById(divId).style.display = "block";
    } else {
        document.getElementById(divId).style.display = "none";
    }
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

