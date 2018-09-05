'use strict';

function Falcon (canvas, x, y) {
  var self = this;

  self.canvas = canvas;
  self.size = 50;
  self.x = x;
  self.y = y;
  self.direction = 1;
  self.speed = 2;
  self.ctx = self.canvas.getContext('2d');
  self.wallBounceCounter = 1;
  self.canGoDown = true;
  
}

Falcon.prototype.collidesWithBullet  = function (bullet) {
  var self = this;
  
  var collidesRight = self.x + self.size / 2 > bullet.x - bullet.size / 2;
  var collidesLeft = self.x - self.size / 2 < bullet.x + bullet.size / 2;
  var collidesBottom = self.y + self.size / 2 > bullet.y - bullet.size / 2;

  if (collidesLeft && collidesRight && collidesBottom) {
    return true;
  }
  
  return false;
}

Falcon.prototype.collidesWithMarginBottom  = function () {
    var self = this;

    if (self.y + self.size >= self.canvas.height - 20) {
      return true;
    }
}

Falcon.prototype.update = function () {
  var self = this;
  
  
  self.x = self.x + self.direction * self.speed;

};

Falcon.prototype.draw = function () {
  var self = this;

  self.ctx.fillStyle = 'gray';
  self.ctx.fillRect(self.x - self.size / 2, self.y - self.size / 2, self.size, self.size);
};

