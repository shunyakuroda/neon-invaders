export class Particle {
  constructor(x, y, color, velocity) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = velocity || { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 };
    this.alpha = 1;
    this.life = 1.0;
    this.decay = 0.02 + Math.random() * 0.02;
    this.size = Math.random() * 3 + 1;
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.life -= this.decay;
    this.alpha = Math.max(0, this.life);
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}