var theta = 0;

function setup() {
  //runs once at the beginning
  createCanvas(600, 600);
}

function draw() {
  //runs 60 times a second

  fill(random()*255, random()*255, random()*255, 100);
  // red, green, blue, alpha (opacity)
  ellipse(random()*600, random()*600, 25, 25);
}

// function draw() {
//   theta += 1;
//   if (theta % 5 == 0) {
//     fill(random()*255, random()*255, random()*255, random()*100);
//     ellipse(mouseX, mouseY, 25, 25);
//   }
// }

// function mouseMoved() {
//   var norm_size = norm(mouseX, 0, width);
//   // fill(mouseX*255, random()*255, random()*255, random()*100);
//   stroke(255);
//   ellipse(mouseX, mouseY, norm_size*100, norm_size*100);
// }

function keyPressed() {
    clear();
}
