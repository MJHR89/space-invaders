'use strict';

function Game() {
  var self = this;
  var gameScreen;
  self.enemies = [];
}

Game.prototype.start = function () {
  var self = this;

  self.gameScreen = buildDom(`
    <main class="game container">
      <header>
        <div class="lives-left">
          <span class="label">Lives:</span>
          <span class="value"></span>
        </div>
        <div class="score">
          <span class="label">Score:</span>
          <span class="value"></span>
        </div>
        <div class="round">
          <span class="label">Round:</span>
          <span class="value"></span>
        </div>
      </header>
      <div class="canvas">
        <canvas></canvas>
      </div>
    </main>
  `);

  self.canvasParentElement = self.gameScreen.querySelector('.canvas');
  self.canvasElement = self.gameScreen.querySelector('canvas');

  self.livesElement = self.gameScreen.querySelector('.lives .value');
  self.scoreElement = self.gameScreen.querySelector('.score .value');
  self.roundElement = self.gameScreen.querySelector('.round .value');

  document.body.appendChild(self.gameScreen);
  
  // self.width = self.canvasParentElement.offsetWidth;
  // self.height = self.canvasParentElement.offsetHeight;

  self.width = 700;
  self.height = 700;

  self.canvasElement.setAttribute('width', self.width);
  self.canvasElement.setAttribute('height', self.height);

  self.vader = new Vader(self.canvasElement, 2);
  self.vader.draw();

  self.handleKeyDown = function (event) {
    if (event.key === 'ArrowRight') {
      self.vader.setDirection(1);
      self.vader.setSpeed(5);
    } else if (event.key === 'ArrowLeft') {
      self.vader.setDirection(-1);
      self.vader.setSpeed(5);
    } else if (event.key === ' ') {
      self.vader.shoot()
    }
  }

  self.handleKeyUp = function (event) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      self.vader.setSpeed(0);
    }
  }
  document.body.addEventListener('keydown', self.handleKeyDown);
  document.body.addEventListener('keyup', self.handleKeyUp);

  self.falcon = new Falcon(self.canvasElement);
  self.enemies.push(self.falcon)
  self.enemies.forEach(function(item) {
    item.draw();
  });
  
  self.startLoop();
};

Game.prototype.startLoop = function() {
  var self = this;

  var ctx = self.canvasElement.getContext('2d');


  function loop() {
    //create alien
    self.falcon.update();
    self.vader.update();
    self.vader.bullets.forEach(function(item) {
      item.update();
    })

    ctx.clearRect(0, 0, self.width, self.height);
    self.vader.draw();

    self.enemies.forEach(function(item) {
      item.draw();
    })

    self.vader.bullets.forEach(function(item) {
      item.draw();
    })

    self.vader.bullets = self.vader.bullets.filter(function(item) {
      return item.bulletIsInScreen();
    })

    self.checkIfBulletsCollidedEnemy();
      
    if (!self.gameIsOver) {
      window.requestAnimationFrame(loop);
    }
     
  }

  window.requestAnimationFrame(loop);
};

Game.prototype.checkIfBulletsCollidedEnemy = function () {
  var self = this;

  self.enemies.forEach(function(item) {
    self.vader.bullets.forEach(function (bullet) {
      if (item.collidesWithBullet(bullet)) {
        self.gameOver();
  
        if (!item.collided) {
          
        }
      }
    })
  });
};


Game.prototype.destroy = function () {
  var self = this;
  
  self.gameScreen.remove();
  self.gameOverScreen();
};

Game.prototype.onOver = function (callback) {
  var self = this;
  
  self.onGameOverCallback = callback;
};

Game.prototype.gameOver = function () {
  var self = this;

  self.gameIsOver = true;
  self.onGameOverCallback();
};

Game.prototype.destroy = function () {
  var self = this;
  
  self.gameScreen.remove();
};