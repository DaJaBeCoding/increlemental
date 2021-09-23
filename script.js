
var lastTime = Date.now();
var now = lastTime;
var deltaT = 0;
var energy = 0;
window.requestAnimationFrame(update);

const unlocks = {
    DIVITIAE: 0
}

var unlocksUnlocked = {
    DIVITIAE_UNLOCKED: false
}

function onCreateEnergy() {
	energy += 1;
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
            window.alert("You have unlocked DIVITIAE PHILOSOPHORUM! Sell your ENERGIA ARCANA and buy more complex production machines to become a great Alchemist!");
            break;
    }
}

function updateUnlocks() {
    //money
    if (energy >= 10) {
        unlock(unlocks.DIVITIAE);
    }
    document.getElementById("moneyDiv").hidden = !unlocksUnlocked.DIVITIAE_UNLOCKED;
    
}

