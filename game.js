'use strict';

function Game(selectedImage, callback, song) {
  var self = this;
  var gameScreen;
  self.enemies = [];
  self.imageSelected = selectedImage;
  self.score = 0;
  self.cb = callback;
  self.won = false;
  self.song = song;
}

Game.prototype.start = function () {
  var self = this;

  self.gameScreen = buildDom(`
    <main class="game container">
      <header>
        <div class="lives">
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
      <audio class="sounds"><source type="audio/mpeg" /></audio>
    </main>
  `);

  self.canvasParentElement = self.gameScreen.querySelector('.canvas');
  self.canvasElement = self.gameScreen.querySelector('canvas');

  self.livesElement = self.gameScreen.querySelector('.lives .value');
  self.scoreElement = self.gameScreen.querySelector('.score .value');
  self.roundElement = self.gameScreen.querySelector('.round .value');

  document.body.appendChild(self.gameScreen);

  self.audioElement = self.gameScreen.querySelector('.sounds');
  self.audioElement.src = "./sfx/" + self.song;

  self.shootAudio = new Audio ('./sfx/shoot-sfx.mp3');
  self.shipDownAudio = new Audio ('./sfx/ship-down-sfx.mp3');
  
  // self.width = self.canvasParentElement.offsetWidth;
  // self.height = self.canvasParentElement.offsetHeight;

  self.width = 700;
  self.height = 700;

  self.canvasElement.setAttribute('width', self.width);
  self.canvasElement.setAttribute('height', self.height);

  self.vader = new Vader(self.canvasElement, 2, self.imageSelected);
  self.livesElement.innerText = self.vader.lives;
  self.scoreElement.innerText = self.score;

  self.vader.draw();

  self.handleKeyDown = function (event) {
    if (event.key === 'ArrowRight') {
      self.vader.setDirection(1);
      self.vader.setSpeed(5);
    } else if (event.key === 'ArrowLeft') {
      self.vader.setDirection(-1);
      self.vader.setSpeed(5);
    } else if (event.key === ' ') {
      if (self.vader.canShoot) {
        self.vader.shoot();
        self.shootAudio.play();
        self.vader.canShoot = false;
        setTimeout(function() {
          self.vader.canShoot = true;
        }, 1000)
      }
    }
  }

  self.handleKeyUp = function (event) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      self.vader.setSpeed(0);
    }
  }
  document.body.addEventListener('keydown', self.handleKeyDown);
  document.body.addEventListener('keyup', self.handleKeyUp);


  self.newLineOfEnemies();
  
  self.startLoop();
};

Game.prototype.startLoop = function() {
  var self = this;

  var ctx = self.canvasElement.getContext('2d');
  self.audioElement.play();

  function loop() {
    
    self.enemies.forEach(function(item){
      if (item.x + item.size >= self.canvasElement.width || item.x - item.size <= 0) {
        self.enemies.forEach(function(enemy) {
          enemy.y += 25;
          enemy.direction *= -1;
        })
      }
    });

    self.enemies.forEach(function(item){
      item.update();
    })

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

    if (self.checkIfEnemysCollidesWithMarginBottom()) {
      self.gameOver();
    }
    
    if (!self.enemies.length) {
      self.gameOver();
    }
      
    if (!self.gameIsOver) {
      window.requestAnimationFrame(loop);
    }
     
  }

  window.requestAnimationFrame(loop);
};

Game.prototype.checkIfBulletsCollidedEnemy = function () {
  var self = this;

  self.enemies.forEach(function(item, index) {
    self.vader.bullets.forEach(function (bullet) {
      if (item.collidesWithBullet(bullet)) {
        self.removeEnemy(index);
        self.shipDownAudio.play();
        self.removeCollidedBullet(bullet);
        self.vader.collided();
        self.addPoint();
      }
    })
  });
};

Game.prototype.removeEnemy = function(index) {
var self = this;

  self.enemies.splice(index, 1);
}

Game.prototype.removeCollidedBullet = function(bullet) {
  var self = this;
  
    self.vader.bullets.splice(bullet, 1);
  }

Game.prototype.checkIfEnemysCollidesWithMarginBottom = function () {
  var self = this;

  var collidedEnemies = self.enemies.filter(function(item) {
    return item.collidesWithMarginBottom()
  })
  
  if (collidedEnemies.length) {
    return true;
  }
}

Game.prototype.newLineOfEnemies = function () {
  var self = this;

  for (var i = 0; i < 7; i++){
    self.enemies.push(new Falcon(self.canvasElement, i*70 +70, 50, self.imageSelected));
  }
}

Game.prototype.addPoint = function () {
  var self = this;

  self.score = self.score + 100;
  self.scoreElement.innerText = self.score;
}

Game.prototype.destroy = function () {
  var self = this;
  
  self.gameScreen.remove();
  self.gameOverScreen();
};


Game.prototype.gameOver = function () {
  var self = this;

  self.gameIsOver = true;
  if (self.enemies.length !== 0) {
    self.won = false;
  } else if (self.enemies.length === 0) {
    self.won = true;
  }
  self.cb(self);
};

Game.prototype.destroy = function () {
  var self = this;
  
  self.gameScreen.remove();
};