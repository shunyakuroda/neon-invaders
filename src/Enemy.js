import { Entity } from './Entity.js';

export class Enemy extends Entity {
  constructor(game, x, y) {
    super(x, y, 40, 30, '#ff00ff');
    this.game = game;
    this.speedX = 2;
    this.direction = 1;
  }

  update() {
    this.x += this.speedX * this.direction;
  }

  draw(ctx) {
    ctx.save();
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;
    
    // Alien shape
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Eyes
    ctx.fillStyle = '#000';
    ctx.fillRect(this.x + 10, this.y + 10, 5, 5);
    ctx.fillRect(this.x + 25, this.y + 10, 5, 5);

    ctx.restore();
  }
}