window.requestAnimationFrame(update);
var mutter = 0.0;
var vater = 0.0;
var grossmutter = 0.0;
var lastTime = Date.now();
var now = lastTime;
var deltaT = 0;

function onMutter() {
    mutter += 1.0;
}

function onVater() {
    vater += 1.0;
    mutter -= 10.0;
}

function onGrossmutter() {
    grossmutter += 1.0;
    mutter -= 500.0;
}

function update() {
    now = Date.now();
    deltaT = (now - lastTime) / 1000.0;
    lastTime = now;

    vater += deltaT * grossmutter;
    mutter += deltaT * vater;

    document.getElementById("vaterBtn").disabled = mutter < 10
    document.getElementById("grossmutterBtn").disabled = mutter < 500
    document.getElementById("mutterLabel").innerHTML = parseInt(mutter);
    document.getElementById("vaterLabel").innerHTML = parseInt(vater);
    document.getElementById("grossmutterLabel").innerHTML = parseInt(grossmutter);
    window.requestAnimationFrame(update);
}