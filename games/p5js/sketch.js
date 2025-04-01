var theta = 0;

function setup() {
  //runs once at the beginning
  createCanvas(600, 600);
}

function draw() {
  //runs 60 times a second

  fill(random()*255, random()*255, random()*255, 100);
  ellipse(random()*600, random()*600, 25, 25);
}

function keyPressed() {
    clear();
}
