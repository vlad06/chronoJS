var start = document.getElementById("start");
var pause = document.getElementById("pause");
var stop = document.getElementById("stop");
var compteur = document.getElementById("compteur");
var timePass=0;
(function() {
    start.paramTps = timePass;
    pause.paramTps = timePass;
    start.addEventListener('click', startChrono);
    pause.addEventListener('click', togglePauseChrono);
    stop.addEventListener('click', stopChrono);   
}());


var timer;


function startChrono(event) {
    start.removeEventListener('click', startChrono);
    start.style.visibility = "hidden";
    pause.style.visibility = "visible";
    stop.style.visibility = "visible";
    var startTime = new Date();
    decompte = setInterval(function() {
    var seconds = Math.round((new Date().getTime()-startTime.getTime()) / 1000 + event.target.paramTps);
    var hours = parseInt(seconds / 3600);
    var minutes = parseInt(seconds / 60);
    seconds = seconds % 60;
    compteur.innerHTML = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);
    timePass++;
}, 1000);
}

function togglePauseChrono() {
    if(pause.innerHTML == "Pause") {
       pause.value = "Reprendre";
    }
    if(pause.innerHTML == "Reprendre") {
        pause.innerHTML = "Pause";
        clearInterval(decompte);
    }
    console.log(pause.innerHTML=="Pause");
    console.log(pause.innerHTML);
}

function stopChrono() {

}

function addZero(nb) {
    return nb < 10 ? "0"+nb : nb;
}

// var btn = document.querySelector('input');
// var txt = document.querySelector('p');

// btn.addEventListener('click', updateBtn);

// function updateBtn() {
//     if (btn.value === 'Démarrer la machine') {
//       btn.value = 'Arrêter la machine';
//       txt.textContent = 'La machine est démarrée !';
//     } else {
//       btn.value = 'Démarrer la machine';
//       txt.textContent = 'La machine est arrêtée.';
//     }
//   }