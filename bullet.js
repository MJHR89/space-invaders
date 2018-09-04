'use strict';

function Bullet (canvas, playerX, playerY) {
  var self = this;

  self.canvas = canvas;
  self.size = 10;
  self.x = playerX;
  self.y = playerY - 30;
  self.direction = -1;
  self.speed = 3;
  self.isShooting;
  self.ctx = canvas;
}

Bullet.prototype.update = function () {
  var self = this;
  
  self.y = self.y + self.direction * self.speed;
};

Bullet.prototype.draw = function () {
  var self = this;

  self.ctx.fillStyle = 'red';
  self.ctx.fillRect(self.x - self.size / 2, self.y - self.size / 2, self.size, self.size);
};

