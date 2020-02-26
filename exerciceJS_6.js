//référence des 3 objets correspondant aux 3 boutons et au span
var start = document.getElementById("start");	// référence bouton start
var pause = document.getElementById("pause"); // référence bouton pause
var stop = document.getElementById("stop");		// référence bouton stop
var compteur = document.getElementById("compteur"); //référence span compteur

//la fonction qui suit est autoexécutable, elle s'exécute dès que le document html à été chargé
//elle permet l'initialisation des paramètres nécessaire au chronomètre
(function() {	
	//on rajoute l'attribut paramTps à l'objet start et on l'initialise
  start.paramTps = 0; 
	//on rajoute l'attribut paramTps à l'objet pause et on l'initialise
	pause.paramTps = 0; 
	//on attend une action click sur le bouton start qui déclenchera la fonction startChrono
  start.addEventListener('click', startChrono);	
	//on attend une action click sur le bouton pause qui déclenchera la fonction pauseChrono
  pause.addEventListener('click', pauseChrono);	
	//on attend une action click sur le bouton stop qui déclenchera la fonction stopChrono
  stop.addEventListener('click', stopChrono); 	
}());

function startChrono(e) {
	console.log("fonction start");
	pause.innerHTML = "Pause";	//le bouton Pause/Reprendre prend la valeur pause, car à ce moment là chrono tourne
	//on supprime le listener sur le bouton pause qui déclenche la fonction start,
	//celle-ci ne sert que lors du clic sur le bouton "Reprendre" du chrono lorsqu'on est dans la fonction pauseChrono()
	pause.removeEventListener('click', startChrono); 
	//on remet sur l'objet bouton Pause le listener qui déclenche la fonction pauseChrono()
	pause.addEventListener('click', pauseChrono);
	//on supprime le listener de l'objet bouton Start->startChrono(), ce bouton étant caché dès qu'il est cliqué.
	start.removeEventListener('click', startChrono);
	//on cache l'objet bouton Start
	start.style.visibility = "hidden";
	//on montre l'objet bouton Pause
	pause.style.visibility = "visible";
	//on montre l'objet bouton Stop
	stop.style.visibility = "visible";
	if(stop.addEventListener) {	//si le listener sur l'objet bouton Stop n'existe plus 
		stop.addEventListener('click', stopChrono);	//alors on le rajoute
	}
	//les lignes qui suivent permettent le décompte et l'affichage du chronomètre
	var startTime = new Date();
	decompte = setInterval(
		function() {
			//le calcul qui suit (new Date().getTime()-startTime.getTime()) retourne un résultat en milliseconde,
			//car la fonction anonyme appelée par setInterval est appelé chaque milliseconde
			//le paramètre e.target.paramTps cible l'attribut paramTps de l'objet bouton appelant
			//si l'objet bouton appelant est Start alors e.target.paramTps est 0
			//si l'objet bouton appelant est Pause (sous sa forme Reprendre) e.target.paramTps est le temps écoulé
			var milliSeconds = new Date().getTime()-startTime.getTime() + e.target.paramTps;
			var seconds = parseInt(milliSeconds / 1000); // pour convertir les millisecondes en secondes
			var hours = parseInt(seconds / 3600);	//pour convertir les secondes en heure
			var minutes = parseInt(seconds / 60);	//pour convertir les secondes en minutes
			milliSeconds %= 1000;	//si milliSeconds > 1000 alors milliSeconds = milliSeconds % 1000 (on ne garde que le reste)
			seconds %= 60;	//si seconds > 60 alors seconds = seconds % 60 (on ne garde que le reste)
			//les fonctions addZero() et addZeros() permettent un affichage plus propre sur la page html
			//elles rajoutent juste un zéro devant les chiffres ou nombres pour combler les espaces vides
			compteur.innerHTML = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds) + ":" + addZeros(milliSeconds);
		}, 1	//la fonction est rappelée chaque milliseconde
	);
}

function pauseChrono() {
	console.log("fonction pause");
	//le bouton Pause/Reprendre prend la valeur Reprendre, car à ce moment là le chrono est en pause
	pause.innerHTML = "Reprendre";
	clearInterval(decompte);//on arrête le décompte
	//on récupère la valeur du chrono au moment de la pause au format String
	var tempsQuiPasse = compteur.innerHTML;
	//puis on la convertit en int afin de l'utiliser avec paramTps
	pause.paramTps = convertStringToTime(tempsQuiPasse);
	//on supprime le listener sur l'objet bouton Pause->pauseChrono
	pause.removeEventListener('click', pauseChrono);
	//on ajouter un listener sur l'objet bouton Pause->startChrono
	pause.addEventListener('click', startChrono);
}

function stopChrono() {
	console.log("fonction stop");
	clearInterval(decompte);
	//si la fonction stopChrono a été appelée alors que le chrono tourne, l'objet bouton Pause à la valeur "Pause" et 
	//son listener est donc en attente d'un click sur le bouton Pause pour appeler la fonction pauseChrono
	//si la fonction stopChrono a été appelée alors que le chrono est en pause, l'objet bouton Reprendre 
	//a la valeur "Reprendre" et son listener est en attente d'un click sur le bouton Reprendre pour appeler
	//la fonction startChrono et redémarrer le chronomètre
	(pause.innerHTML=="Pause") ? pause.removeEventListener('click', pauseChrono) : pause.removeEventListener('click', startChrono);
	//on supprime le listener sur l'objet bouton Stop, celui-ci va être caché
	stop.removeEventListener('click', stopChrono);
	start.addEventListener('click', startChrono);
	pause.addEventListener('click', pauseChrono);
	start.paramTps = 0;//le chrono est stoppé, le compteur est remis à zéro
	compteur.innerHTML = "00:00:00:000";//l'affichage sur la page html est remis à zéro
 	start.style.visibility = "visible";//on montre l'objet bouton Start
 	pause.style.visibility = "hidden"; //on cache l'objet bouton Pause
	stop.style.visibility = "hidden";	 //on cache l'objet bouton Stop
	pause.innerHTML = "Pause";	//on réinitialise la bouton Stop à sa valeur d'origine
}

function addZero(nb) {
	//si c'est un chiffre, on rajoute un 0 devant, si c'est un nombre on ne fait rien
    return nb < 10 ? "0" + nb : nb;
}
//la fonction addZeros() gère uniquement le cas particulier des millisecondes
function addZeros(nb) {
	//si c'est un chiffre, on rajoute deux 0 devant, ci c'est un nombre à "2 chiffre" on rajoute un 0, sinon on ne fait rien
	return (nb < 10 ? "00"+nb : (nb < 100 ? "0" + nb : nb));
}
function convertStringToTime(stringTemps) {
	var timePass=0;
	var strToInt;
	//la string récupérée à ce format ->  00:00:00:000, on ne garde que les chiffres
	strToInt = stringTemps.slice(0,2)+stringTemps.slice(3,5)+stringTemps.slice(6,8)+stringTemps.slice(9,12);
	//une fois qu'il ne reste que les chiffres on convertit la string en int et on la retourne
	strToInt = parseInt(strToInt);
	return strToInt;
}