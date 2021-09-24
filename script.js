
var lastTime = Date.now();
var now = lastTime;
var deltaT = 0;

// load storage vars
if (existsStorageVar("energy")) {
    var energy = parseFloat(window.sessionStorage.getItem("energy"));
} else {
    var energy = 0;
}

if (existsStorageVar("unlocks")) {
    var unlocksUnlocked = JSON.parse(window.sessionStorage.getItem("unlocks"));
} else {
    var unlocksUnlocked = {
        DIVITIAE_UNLOCKED: false
    } 
}

// load storage vars end


window.requestAnimationFrame(update);

const unlocks = {
    DIVITIAE: 0
}


function existsStorageVar(name) {
    return window.sessionStorage.getItem(name) !== null;
}

function onCreateEnergy() {
    energy += 1;
    window.sessionStorage.setItem("energy", energy);
}


function update() {
    now = Date.now();
    deltaT = (now - lastTime) / 1000.0;
    lastTime = now;




    document.getElementById("energyLabel").innerHTML = parseInt(energy);
    updateUnlocks();
    window.requestAnimationFrame(update);
}

function onProductionClick() {
    document.getElementById("productionBtn").innerHTML = "whatever";
}

function onMarketClick() {

}

function unlock(unlock) {
    switch (unlock) {
        case unlocks.DIVITIAE:
            if (unlocksUnlocked.DIVITIAE_UNLOCKED) {
                return;
            }
            unlocksUnlocked.DIVITIAE_UNLOCKED = true;
            document.getElementById("unlockMoneyDialog").show();
            break;
    }
    window.sessionStorage.setItem("unlocks", JSON.stringify(unlocksUnlocked));
}

function updateUnlocks() {
    //money
    if (energy >= 10) {
        unlock(unlocks.DIVITIAE);
    }
    document.getElementById("moneyDiv").hidden = !unlocksUnlocked.DIVITIAE_UNLOCKED;
    
}

