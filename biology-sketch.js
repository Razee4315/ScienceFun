let helixPoints = [];
let numHelixPoints = 100; // Number of points in the helix
let angleOffset = 0; // For animating the helix
let floatingParticles = [];
let numFloatingParticles = 50;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('p5-canvas-container');
  noStroke();

  // Initialize helix points
  for (let i = 0; i < numHelixPoints; i++) {
    helixPoints.push(new HelixPoint(i));
  }

  // Initialize floating particles
  for (let i = 0; i < numFloatingParticles; i++) {
    floatingParticles.push(new FloatingParticle());
  }
}

function draw() {
  // Gradient background
  setGradient(0, 0, width, height, color(10, 10, 30), color(30, 30, 60));

  // Update and display helix points
  for (let i = 0; i < helixPoints.length; i++) {
    helixPoints[i].update();
    helixPoints[i].display();
  }

  // Update and display floating particles
  for (let i = 0; i < floatingParticles.length; i++) {
    floatingParticles[i].update();
    floatingParticles[i].display();
  }
}

// HelixPoint class
class HelixPoint {
  constructor(index) {
    this.index = index;
    this.angle = map(this.index, 0, numHelixPoints, 0, TWO_PI * 4); // Full rotations
    this.radius = 100; // Radius of the helix
    this.ySpacing = height / numHelixPoints; // Vertical spacing
  }

  update() {
    this.angle += 0.01; // Animate the helix
  }

  display() {
    let x1 = width / 2 + cos(this.angle + angleOffset) * this.radius;
    let y = this.index * this.ySpacing;
    let x2 = width / 2 + cos(this.angle + angleOffset + PI) * this.radius;

    // Draw the two strands of the helix
    stroke(255, 50, 100); // Red for one strand
    strokeWeight(2);
    point(x1, y);
    stroke(100, 200, 255); // Blue for the other strand
    point(x2, y);

    // Draw the connection between strands
    stroke(255, 255, 255, 50); // Semi-transparent white
    line(x1, y, x2, y);
  }
}

// FloatingParticle class
class FloatingParticle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.size = random(2, 5);
    this.color = color(random(100, 255), random(100, 255), random(200, 255));
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.checkEdges();
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }

  checkEdges() {
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }
}

// Background gradient function
function setGradient(x, y, w, h, c1, c2) {
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}

// Handle window resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}