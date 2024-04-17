// Global variables
let seed;
let saveButton; 

function setup() {
  createCanvas(800, 800).center('horizontal');
  angleMode(DEGREES);
  noLoop();

  seed = prompt("Please enter a seed for your kaleidoscope:"); // Seed the pseudo-random generator again had chatgpt help me understand how to do this
  // Create saving button
  saveButton = createButton('Save Image');
  saveButton.position(400, 10);
  saveButton.mousePressed(saveKaleidoscopeImage);

  drawKaleidoscope(); // Draw seed kaleido
}

function drawKaleidoscope() {
  randomSeed(hashCode(seed)); // seed/reseed
  resetMatrix(); // Reset trans
  background(255);
  translate(width / 2, height / 2);
  
  const numSlices = 16;
  const sliceAngle = 360 / numSlices;
  
  for (let i = 0; i < numSlices; i++) {
    push();
    rotate(sliceAngle * i);
    drawSlice();
    pop();
    push();
    scale(-1, 1);
    rotate(sliceAngle * i);
    drawSlice();
    pop();
  }
}

function drawSlice() {
  let shapes = int(random(400, 600));
  
  for (let i = 0; i < shapes; i++) {
    let shapeType = int(random(6)); 
    let col = color(random(255), random(255), random(255), 100);
    fill(col);
    noStroke();
    
    let x = random(-width / 2, width / 2);
    let y = random(-height / 2, height / 2);
    let size = random(30, 120);

    switch (shapeType) {
      case 0:
        ellipse(x, y, size, size);
        break;
      case 1:
        rect(x, y, size, size);
        break;
      case 2:
        triangle(x, y, x + size, y, x + size / 2, y - size);
        break;
      case 3:
        line(x, y, x + size, y + size);
        break;
      case 4:
        arc(x, y, size, size, 0, 180);
        break;
      case 5:
        quad(x, y, x + size / 2, y + size, x + size, y + size / 2, x, y + size);
        break;
    }
  }
}

function saveKaleidoscopeImage() {
  drawKaleidoscope(); 
  drawWatermark(); 
  saveCanvas('kaleidoscope', 'png');
  drawKaleidoscope(); 
}

function drawWatermark() {
  push();
  textAlign(LEFT, BOTTOM);
  textSize(16);
  fill(255, 255, 255, 150); 
  text('Create with SEED: "' + seed + '" at https://bwarko.github.io/CC-Kaleido-Generator/ ', -390, 390);
  pop();
}

// A simple hashing function for the seed, had help developing and understanding with chatgpt
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash;
}
