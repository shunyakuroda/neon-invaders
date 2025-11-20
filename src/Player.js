import { Entity } from './Entity.js';
import { Projectile } from './Projectile.js';

export class Player extends Entity {
  constructor(game) {
    super(game.width / 2 - 25, game.height - 80, 50, 30, '#00f3ff');
    this.game = game;
    this.speed = 5;
    this.shootTimer = 0;
    this.shootInterval = 15; // Frames between shots
  }

  update(input) {
    // Movement
    if (input.isDown('ArrowLeft')) this.x -= this.speed;
    if (input.isDown('ArrowRight')) this.x += this.speed;

    // Boundaries
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > this.game.width) this.x = this.game.width - this.width;

    // Shooting
    if (this.shootTimer > 0) this.shootTimer--;
    if (input.isDown('Space') && this.shootTimer === 0) {
      this.shoot();
      this.shootTimer = this.shootInterval;
    }
  }

  shoot() {
    const projectile = new Projectile(
      this.x + this.width / 2 - 2,
      this.y,
      -10,
      '#00f3ff'
    );
    this.game.projectiles.push(projectile);
    // Add simple recoil effect or sound here if needed
  }

  draw(ctx) {
    ctx.save();
    ctx.shadowBlur = 20;
    ctx.shadowColor = this.color;
    
    // Draw ship body (simple triangle shape)
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, this.y);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.lineTo(this.x, this.y + this.height);
    ctx.closePath();
    ctx.fill();

    // Engine glow
    ctx.fillStyle = '#ff00ff';
    ctx.globalAlpha = 0.6 + Math.random() * 0.4;
    ctx.beginPath();
    ctx.moveTo(this.x + 10, this.y + this.height);
    ctx.lineTo(this.x + 25, this.y + this.height + 15);
    ctx.lineTo(this.x + 40, this.y + this.height);
    ctx.fill();

    ctx.restore();
  }
}