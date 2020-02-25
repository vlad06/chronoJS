//référence des 3 objets correspondant aux 3 boutons et au span
var start = document.getElementById("start");	// référence bouton start
var pause = document.getElementById("pause"); // référence bouton pause
var stop = document.getElementById("stop");		// référence bouton stop
var compteur = document.getElementById("compteur"); //référence span compteur
var tpsEcoule=0;

(function() {
  start.paramTps = tpsEcoule;
  start.addEventListener('click', startChrono);
  pause.addEventListener('click', togglePauseChrono);
  stop.addEventListener('click', stopChrono); 
}());

function startChrono(e) {
	console.log("fonction start");
	if(pause.innerHTML == "Reprendre") {
		pause.innerHTML = "Pause";
		pause.removeEventListener('click', startChrono);
		pause.addEventListener('click', togglePauseChrono);
	}
	start.removeEventListener('click', startChrono);
	start.style.visibility = "hidden";
	pause.style.visibility = "visible";
	stop.style.visibility = "visible";
	if(stop.addEventListener) {
		stop.addEventListener('click', stopChrono);
	}
  var startTime = new Date();
		decompte = setInterval(
		function() {
			var seconds = Math.round((new Date().getTime()-startTime.getTime()) / 1000 + e.target.paramTps);
			var hours = parseInt(seconds / 3600);
			var minutes = parseInt(seconds / 60);
			seconds = seconds % 60;
			compteur.innerHTML = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);
			tpsEcoule++;
		}, 1000
	);
}

function togglePauseChrono() {
	console.log("fonction pause");
	if(pause.innerHTML == "Pause") {
		pause.innerHTML = "Reprendre";
		clearInterval(decompte);
		pause.paramTps = tpsEcoule;
		pause.removeEventListener('click', togglePauseChrono);
		pause.addEventListener('click', startChrono);
	}
}

function stopChrono() {
	console.log("fonction stop");
	clearInterval(decompte);
	pause.removeEventListener('click', startChrono);
	pause.removeEventListener('click', togglePauseChrono);
	stop.removeEventListener('click', stopChrono);
	start.addEventListener('click', startChrono);
	pause.addEventListener('click', togglePauseChrono);
	
	pause.innerHTML = "Pause";
	compteur.innerHTML = "00:00:00";
  start.style.visibility = "visible";
  pause.style.visibility = "hidden";
  stop.style.visibility = "hidden";	
}

function addZero(nb) {
    return nb < 10 ? "0"+nb : nb;
}
