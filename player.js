'use strict';

function Vader (canvas, lives) {
  var self = this;

  self.canvas = canvas;
  self.lives = lives;
  self.size = 50;
  self.x = canvas.width / 2;
  self.y = canvas.height -20;
  self.direction = 0;
  self.speed = 0;
  self.isShooting;
  self.ctx = self.canvas.getContext('2d');
  self.bullets = [];
};

  
  
  //setDirection();
Vader.prototype.setDirection = function (direction) {
  var self = this;

  self.direction = direction;
};

  //collidesWithAlien();
  
  //checkBoundariesCollision;
  
  //updatePosition() {
   // inside here we check collision
  //};


Vader.prototype.update = function () {
  var self = this;

  self.x = self.x + self.direction * self.speed;

  // prevents player form moving outside of the screen
  if (self.x < 0) {
    self.direction = 1;
  }

  if (self.x > self.canvas.width) {
    self.direction = -1;
  }
};

Vader.prototype.setSpeed = function(speed) {
  var self = this;

  self.speed = speed;
};


Vader.prototype.draw = function () {
  var self = this;


  self.ctx.fillStyle = 'white';
  self.ctx.fillRect(self.x - self.size / 2, self.y - self.size / 2, self.size, self.size);
};

Vader.prototype.shoot = function () {
  var self = this;

  var bullet = new Bullet(self.ctx, self.x, self.y);
  console.log(self.bullets)
  self.bullets.push(bullet);

}