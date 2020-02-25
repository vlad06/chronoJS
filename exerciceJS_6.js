//référence des 3 objets correspondant aux 3 boutons et au span
var start = document.getElementById("start");	// référence bouton start
var pause = document.getElementById("pause"); // référence bouton pause
var stop = document.getElementById("stop");		// référence bouton stop
var compteur = document.getElementById("compteur"); //référence span compteur
var tpsEcoule=0;

(function() {	//fonction autoexécutable, se charge dès que le document html à été chargé
  start.paramTps = tpsEcoule; //on rajoute un attribut à l'objet 
  start.addEventListener('click', startChrono);	//on écoute les actions click sur le bouton start
  pause.addEventListener('click', pauseChrono);	//on écoute les actions click sur le bouton pause
  stop.addEventListener('click', stopChrono); 	//on écoute les actions click sur le bouton stop
}());

function startChrono(e) {
	console.log("fonction start");
	pause.innerHTML = "Pause";	//le bouton html prend la valeur pause, car à ce moment là chrono tourne
	pause.removeEventListener('click', startChrono); //on supprime le lien entre le bouton pause et la fonction start,
													//celle-ci ne sert que lors du clic sur le bouton "Reprendre" du chrono
	pause.addEventListener('click', pauseChrono);	
	start.removeEventListener('click', startChrono);
	start.style.visibility = "hidden";
	pause.style.visibility = "visible";
	stop.style.visibility = "visible";
	if(stop.addEventListener) {
		stop.addEventListener('click', stopChrono);
	}
  	// var startTime = new Date();
	// decompte = setInterval(
	// 	function() {
	// 		var seconds = Math.round((new Date().getTime()-startTime.getTime()) / 1000 + e.target.paramTps);
	// 		var hours = parseInt(seconds / 3600);
	// 		var minutes = parseInt(seconds / 60);
	// 		seconds = seconds % 60;
	// 		compteur.innerHTML = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);
	// 		tpsEcoule++;
	// 	}, 1000
	// );
	var startTime = new Date();
	decompte = setInterval(
		function() {
			// console.log(new Date().getTime()-startTime.getTime());
			var milliSeconds = new Date().getTime()-startTime.getTime() + e.target.paramTps;
			console.log(milliSeconds % 1000);
			var seconds = parseInt(milliSeconds / 1000);
			var hours = parseInt(seconds / 3600);
			var minutes = parseInt(seconds / 60);
			milliSeconds %= 1000;
			seconds %= 60;
			// console.log(seconds);
			compteur.innerHTML = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds) + ":" + addZeros(milliSeconds);
			// tpsEcoule++;
		}, 1
	);
}

function pauseChrono() {
	console.log("fonction pause");
	pause.innerHTML = "Reprendre";
	clearInterval(decompte);
	var tempsQuiPasse = compteur.innerHTML;
	console.log(tempsQuiPasse);
	// console.log(convertStringToTime(tempsQuiPasse));
	pause.paramTps = convertStringToTime(tempsQuiPasse);
	// pause.paramTps = tpsEcoule;
	// console.log(pause.paramTps);
	pause.removeEventListener('click', pauseChrono);
	pause.addEventListener('click', startChrono);
}

function stopChrono() {
	console.log("fonction stop");
	clearInterval(decompte);
	(pause.innerHTML=="Pause") ? pause.removeEventListener('click', startChrono) : pause.removeEventListener('click', pauseChrono);
	stop.removeEventListener('click', stopChrono);
	start.addEventListener('click', startChrono);
	pause.addEventListener('click', pauseChrono);
	tpsEcoule = 0;
	start.paramTps = tpsEcoule;
	compteur.innerHTML = "00:00:00:000";
 	start.style.visibility = "visible";
 	pause.style.visibility = "hidden";
	stop.style.visibility = "hidden";
	pause.innerHTML = "Pause";
}

function addZero(nb) {
	//si c'est un chiffre, on rajoute un 0 devant, si c'est un nombre on ne fait rien
    return nb < 10 ? "0" + nb : nb;
}
function addZeros(nb) {
	//si c'est un chiffre, on rajoute deux 0 devant, ci c'est un nombre à "2 chiffre" on rajoute un 0, sinon on ne fait rien
	return (nb < 10 ? "00"+nb : (nb < 100 ? "0" + nb : nb));
}
function convertStringToTime(stringTemps) {
	var timePass=0;
	var strToInt;
	//la string récupérée à ce format ->  00:00:00:000, on ne garde que les chiffres
	strToInt = stringTemps.slice(0,2)+stringTemps.slice(3,5)+stringTemps.slice(6,8)+stringTemps.slice(9,12);
	//une fois qu'il ne reste que les chiffres on convertit la string en int
	strToInt = parseInt(strToInt);
	return strToInt;
}