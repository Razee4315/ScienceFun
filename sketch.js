let balls = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('p5-canvas-container');
  for (let i = 0; i < 3; i++) {
    balls.push(new Ball());
  }
}

function draw() {
  background(0);
  rotateX(frameCount * 0.0009);
  rotateY(frameCount * 0.001);
  noFill();
  stroke(122);
  sphere(188);

  for (let i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].display();
    for (let j = i + 1; j < balls.length; j++) {
      balls[i].checkCollision(balls[j]);
    }
  }
}

class Ball {
  constructor() {
    let r = random(0, 200);
    let theta = random(0, TWO_PI);
    let phi = random(0, PI);
    this.position = createVector(
      r * sin(phi) * cos(theta),
      r * sin(phi) * sin(theta),
      r * cos(phi)
    );
    this.velocity = p5.Vector.random3D().mult(random(1, 3));
    this.radius = 10;
  }

  update() {
    this.position.add(this.velocity);
    if (this.position.mag() > 200 - this.radius) {
      let normalDirection = this.position.copy().normalize();
      this.position = normalDirection.copy().mult(200 - this.radius);
      this.velocity.reflect(normalDirection);
    }
  }

  display() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    fill(255, 255, 0);
    noStroke();
    sphere(this.radius);
    pop();
  }

  checkCollision(other) {
    let distance = p5.Vector.dist(this.position, other.position);
    if (distance < this.radius + other.radius) {
      let tempVelocity = this.velocity.copy();
      this.velocity = other.velocity.copy();
      other.velocity = tempVelocity;
    }
  }
}