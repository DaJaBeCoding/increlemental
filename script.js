
var lastTime = Date.now();
var now = lastTime;
var deltaT = 0;
var energy = 0;
window.requestAnimationFrame(update);

function onCreateEnergy() {
	energy += 1;
}


function update() {
    now = Date.now();
    deltaT = (now - lastTime) / 1000.0;
    lastTime = now;




    document.getElementById("energyLabel").innerHTML = parseInt(energy);
    window.requestAnimationFrame(update);
}