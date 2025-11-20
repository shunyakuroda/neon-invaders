import { Entity } from './Entity.js';

export class Projectile extends Entity {
  constructor(x, y, velocityY, color) {
    super(x, y, 4, 10, color);
    this.velocityY = velocityY;
  }

  update() {
    this.y += this.velocityY;
    if (this.y < -50 || this.y > window.innerHeight + 50) {
      this.markedForDeletion = true;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    super.draw(ctx);
    ctx.restore();
  }
}