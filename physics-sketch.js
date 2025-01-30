let particles = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('p5-canvas-container');
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(0);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);

  for (let particle of particles) {
    particle.update();
    particle.display();
  }
}

class Particle {
  constructor() {
    this.position = createVector(random(-200, 200), random(-200, 200), random(-200, 200));
    this.velocity = p5.Vector.random3D().mult(random(1, 3));
    this.size = random(2, 5);
  }

  update() {
    this.position.add(this.velocity);
    if (this.position.mag() > 200) {
      this.position.normalize().mult(200);
      this.velocity.reflect(this.position.copy().normalize());
    }
  }

  display() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    noStroke();
    fill(255, 0, 0);
    sphere(this.size);
    pop();
  }
}