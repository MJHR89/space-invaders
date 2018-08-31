# space-invaders

## Description
When aliens want to invade Earth, we can rely on the player to make them go away and save the day.
If the player fails to shoot them, nobody will save us from the invasion.


## MVP (DOM - CANVAS)
-3 screens: (splash, game, and game over)
-splashScreen: title and Start button
-gameScreen: 1 player, 1 alien, player shoots bullets)
-gameoverScreen: winner-invasion message and restart button)


## Backlog
-Lives and rounds
-Aliens army
-Build barricades
-Aliens shoot too
-Add music to shots
-Add music to hitAlien
-Add music to screens


## Data structure

----Main----

function main () {
  splashMain;
  gameOverMain;
  game;
}

startGame () {
  destoySplash();
  destoyGameOver();
}

destroyGame () {
  gameDestroy();
}

gameOver(score, lives) {
  destroyGame();
  buildGameOver(score, lives);
}

buildGameOver(score, lives) {
}

destoyGameOver() {
  gameOverMain.remove();
}

----GAME----
game () {
  startGame();
  handleKeyDown();
}

shootBullets();

collisionStatus();

gameOver();

removeGameScreen();

----PLAYER----
player () {
  canvas;
  lives;
  position.x;
  direction;
  speed;
}

setDirection();

collidesWithAlien();

updatePosition();

drawPlayer();


----ALIEN----

alien () {
  canvas;
  position.x;
  position.y;
  direction;
  speed;
}

setDirection();

updatePosition();

drawAlien();

reachesBottom();

----BULLET----

bullet () {
  canvas;
  size;
  position.x;
  position.y;
  direction;
  speed;
}

createBullet();

hitAlien();


## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen (startButton)
- gameScreen (hitAlien, collidesWithAlien, reachesBottom => GameOver)
- gameoverScreen (restart/Play again Button)
- winScreen (update win-invasion message | Backlog: update score, update lives)


## Task
Task definition in order of priority
-Design space for reference
-create splash screen
-create game over
-create game screen
  -create player
  -create alien
  -create bullets
-Update game over with conditions

-clean code
-add css

-backlog challenges

## Links


### Trello
https://trello.com/b/6NlRCaIT


### Git
[Link Repo] https://github.com/MJHRhacker/space-invaders.git
[Link Deploy](http://github.com)


### Slides
https://slides.com/mjhr/space-invaders
