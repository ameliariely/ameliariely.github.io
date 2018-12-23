var x;
var i = -1;
var estratti = [];
var numeri = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
	createNumeri();
  textAlign(CENTER);
}

function draw() {
	if (i >= 0) {
		fill(i, 255-i, 0);
		ellipse(random() * windowWidth, random() * windowHeight, 25, 25);
    ellipse(random() * windowWidth, random() * windowHeight, 25, 25);
		ellipse(random() * windowWidth, random() * windowHeight, 25, 25);
		i++;
		if (i == 300) {
			clear();
			fill(0);
			textSize(100);
			text(estrai(), windowWidth/2, windowHeight/2);
			textSize(15);
			stampaEstratti();
			i = -1;
		}
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
	nuovoNumero();
}

function mouseClicked() {
  nuovoNumero();
}

function touchStarted() {
  nuovoNumero();
}

function deviceShaken() {
  nuovoNumero();
}

function nuovoNumero() {
  fullscreen();
  i = 0;
  clear();
}

function estrai() {
	var index = Math.floor(random() * numeri.length);
	console.log(numeri.length);
	var estratto = numeri[index];
	numeri.splice(index, 1);
	estratti.push(estratto);
	estratti.sort(function(a, b){return a-b});
	return estratto;
}

function createNumeri() {
	var j;
	for (j = 0; j < 90; j++) {
		numeri.push(j+1);
	}
}

function stampaEstratti() {
	var string = "";
	var indexEstratti;
	for (indexEstratti = 0; indexEstratti < estratti.length; indexEstratti++) {
		string += estratti[indexEstratti] + " ";
		if ((indexEstratti + 1) % 20 == 0) {
			string += '\n';
		}
	}
	text(string, windowWidth/2, windowHeight-80);
}
