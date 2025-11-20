import { Game } from './Game.js';

window.addEventListener('load', () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = 800;
  canvas.height = 600;

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(animate);
  }

  animate(0);
});