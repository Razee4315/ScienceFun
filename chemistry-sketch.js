let particles = [];
const numParticles = 15; // Number of particles in the cluster
const bondDistance = 100; // Maximum distance for bonds to form
const maxSpeed = 0.5; // Slow, subtle movement
const glowIntensity = 100; // Glow intensity for bonds

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('p5-canvas-container');
  noStroke();

  // Create particles in a circular arrangement
  let centerX = width / 2;
  let centerY = height / 2;
  let radius = 150; // Radius of the initial cluster
  for (let i = 0; i < numParticles; i++) {
    let angle = map(i, 0, numParticles, 0, TWO_PI); // Distribute particles evenly around a circle
    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;
    particles.push(new Particle(x, y));
  }
}

function draw() {
  background(10); // Dark background for contrast

  // Draw bonds between particles
  stroke(255, glowIntensity, 50, 80); // Faint glowing bonds
  strokeWeight(1);
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let d = dist(
        particles[i].pos.x,
        particles[i].pos.y,
        particles[j].pos.x,
        particles[j].pos.y
      );
      if (d < bondDistance) {
        line(
          particles[i].pos.x,
          particles[i].pos.y,
          particles[j].pos.x,
          particles[j].pos.y
        );
      }
    }
  }

  // Update and display particles
  for (let p of particles) {
    p.update();
    p.display();
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(0.1, maxSpeed)); // Random slow movement
    this.size = random(6, 12); // Slight variation in particle size
  }

  update() {
    this.pos.add(this.vel);

    // Keep particles within bounds
    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;

    // Add slight randomness to movement
    this.vel.rotate(random(-0.02, 0.02));
  }

  display() {
    // Draw a glowing particle
    fill(255, glowIntensity, 50, 150); // Soft glowing color
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size, this.size);

    // Draw a smaller core for the particle
    fill(255, glowIntensity, 50); // Solid core
    ellipse(this.pos.x, this.pos.y, this.size * 0.6, this.size * 0.6);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}