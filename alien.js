'use strict';

function Falcon (canvas) {
  var self = this;

  self.canvas = canvas;
  self.size = 50;
  self.x = canvas.width / 2;
  self.y = 50;
  self.direction = 1;
  self.speed = 3;
  self.ctx = self.canvas.getContext('2d');
  self.wallBounceCounter = 1;
  self.canGoDown = true;
  
  
  // setDirection();
  // Falcon.prototype.setDirection = function (direction) {
  //   var self = this;

  //   self.direction = direction;
    
  // };

  //collidesWithPlayer();
  
  //checkBoundariesCollision;
  
  //updatePosition() {
   // inside here we check collision
  //};
  
}

// Falcon.prototype.collidesWithBullet  = function (bullet) {
//   var self = this;
  
//   const collidesRight = self.x + self.size / 2 > bullet.x - bullet.size / 2;
//   const collidesLeft = self.x - self.size / 2 < bullet.x + bullet.size / 2;
//   const collidesTop = self.y - self.size / 2 < bullet.y + bullet.size / 2;
//   const collidesBottom = self.y + self.size / 2 > bullet.y - bullet.size / 2;

//   if (collidesLeft && collidesRight && collidesTop && collidesBottom) {
//     return true;
//   }
  
//   return false;
// }


// Falcon.prototype.collided = function () {
//   var self = this;

//   self.game.gameOver();
// };

Falcon.prototype.update = function () {
  var self = this;
  
  
  self.x = self.x + self.direction * self.speed;
  
  if (self.wallBounceCounter % 3 === 0 && self.canGoDown) {
    self.y += 25;
    self.canGoDown = false;
  }
  
  if (self.wallBounceCounter % 3 !== 0 ) self.canGoDown = true;

  // prevents alien form moving outside of the screen
  if (self.x < 0) {
    self.direction *= -1;
    self.wallBounceCounter++;
    console.log(self.wallBounceCounter)
  }

  if (self.x > self.canvas.width) {
    self.direction *= -1;
    self.wallBounceCounter++;
    console.log(self.wallBounceCounter)
  }
};


Falcon.prototype.draw = function () {
  var self = this;

  self.ctx.fillStyle = 'gray';
  self.ctx.fillRect(self.x - self.size / 2, self.y - self.size / 2, self.size, self.size);
};

