import { Player } from './Player.js';
import { Enemy } from './Enemy.js';
import { Particle } from './Particle.js';
import { Input } from './Input.js';

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.input = new Input();
    this.player = new Player(this);
    this.projectiles = [];
    this.enemies = [];
    this.particles = [];
    this.enemyTimer = 0;
    this.enemyInterval = 1000;
    this.score = 0;
    this.lives = 3;
    this.gameOver = false;
    this.gameActive = false; // Waiting for start

    // UI Elements
    this.scoreEl = document.getElementById('score');
    this.livesEl = document.getElementById('lives');
    this.startScreen = document.getElementById('start-screen');
    this.gameOverScreen = document.getElementById('game-over-screen');
    this.finalScoreEl = document.getElementById('final-score');

    // Bind buttons
    document.getElementById('start-btn').addEventListener('click', () => this.start());
    document.getElementById('restart-btn').addEventListener('click', () => this.restart());
  }

  start() {
    this.gameActive = true;
    this.gameOver = false;
    this.score = 0;
    this.lives = 3;
    this.enemies = [];
    this.projectiles = [];
    this.particles = [];
    this.player.x = this.width / 2 - 25;
    this.startScreen.classList.remove('active');
    this.gameOverScreen.classList.remove('active');
    this.updateUI();
  }

  restart() {
    this.start();
  }

  update(deltaTime) {
    if (!this.gameActive || this.gameOver) return;

    // Player
    this.player.update(this.input);

    // Projectiles
    this.projectiles.forEach(p => p.update());
    this.projectiles = this.projectiles.filter(p => !p.markedForDeletion);

    // Enemies
    if (this.enemyTimer > this.enemyInterval) {
      this.spawnEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }

    this.enemies.forEach(enemy => {
      enemy.update();
      // Check collision with player
      if (this.player.isColliding(enemy)) {
        enemy.markedForDeletion = true;
        this.createExplosion(enemy.x, enemy.y, enemy.color);
        this.lives--;
        this.updateUI();
        if (this.lives <= 0) this.endGame();
      }
      // Check boundaries
      if (enemy.x <= 0 || enemy.x + enemy.width >= this.width) {
        enemy.direction *= -1;
        enemy.y += enemy.height; // Move down
      }
      if (enemy.y > this.height) {
        enemy.markedForDeletion = true;
        this.lives--;
        this.updateUI();
        if (this.lives <= 0) this.endGame();
      }
    });

    // Collision: Projectile vs Enemy
    this.projectiles.forEach(projectile => {
      this.enemies.forEach(enemy => {
        if (!enemy.markedForDeletion && !projectile.markedForDeletion && projectile.isColliding(enemy)) {
          enemy.markedForDeletion = true;
          projectile.markedForDeletion = true;
          this.createExplosion(enemy.x, enemy.y, enemy.color);
          this.score += 100;
          this.updateUI();
        }
      });
    });

    this.enemies = this.enemies.filter(e => !e.markedForDeletion);

    // Particles
    this.particles.forEach(p => p.update());
    this.particles = this.particles.filter(p => p.life > 0);
  }

  draw(ctx) {
    // Clear
    ctx.clearRect(0, 0, this.width, this.height);

    // Draw entities
    this.player.draw(ctx);
    this.projectiles.forEach(p => p.draw(ctx));
    this.enemies.forEach(e => e.draw(ctx));
    this.particles.forEach(p => p.draw(ctx));
  }

  spawnEnemy() {
    const x = Math.random() * (this.width - 40);
    const y = -40;
    this.enemies.push(new Enemy(this, x, y));
  }

  createExplosion(x, y, color) {
    for (let i = 0; i < 15; i++) {
      this.particles.push(new Particle(x + 20, y + 15, color));
    }
  }

  updateUI() {
    this.scoreEl.innerText = `スコア: ${this.score}`;
    this.livesEl.innerText = `ライフ: ${this.lives}`;
  }

  endGame() {
    this.gameOver = true;
    this.gameActive = false;
    this.finalScoreEl.innerText = `スコア: ${this.score}`;
    this.gameOverScreen.classList.add('active');
  }
}