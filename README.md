# space-invaders

## Description
When aliens want to invade Earth, we can rely on the player to make them go away and save the day.
If the player fails to shoot them, nobody will save us from the invasion.


## MVP (DOM - CANVAS)
  - 3 screens: (splash, game, and game over)
  - splashScreen: title and Start button
  - gameScreen: 1 player, 1 alien, player shoots bullets)
  - gameoverScreen: winner-invasion message and restart button)


## Backlog
 - Lives and rounds
 - Aliens army
 - Build barricades
 - Aliens shoot too
 - Add music to shots
 - Add music to hitAlien
 - Add music to screens


## Data structure

### Main

```
function main () {
  splashMain;
  gameOverMain;
  game;
}

buildSplash() {}
destroySplach() {}

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
```
### Game

```
game () {
  startGame();
  handleKeyDown();
}

start () {
  here we initialize player and alien.
}

startLoop() {
  update();
}

shootBullets();

collisionStatus();

gameOver();

removeGameScreen();
```

### Player
```
player () {
  canvas;
  lives;
  position.x;
  direction;
  speed;
  isShooting; ???
  size;
}

setDirection();

collidesWithAlien();

checkBoundariesCollision;

updatePosition() {
  inside here we check collision
};

drawPlayer();
```

### Alien
```
alien () {
  canvas;
  position.x;
  position.y;
  direction;
  speed;
}

setDirection();

updatePosition() {
  here we check collision with boundaries
};

checkCollisionWithPlayer () {};

drawAlien();

checkCollisionWithBottom();
```
### Bullet
```
bullet () {
  canvas;
  size;
  position.x;
  position.y;
  speed;
  isActive;
}

createBullet();

hitAlien();

draw()

update()

```

## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen (startButton)
- gameScreen (hitAlien, collidesWithAlien, checkCollisionWithBottom => GameOver)
- gameoverScreen (restart/Play again Button - dynamic message if win or lose)
- winScreen (update win-invasion message | Backlog: update score, update lives)


## Task
Task definition in order of priority
- Design space for reference (wireframing)
- create splash screen
- create game over
- create game (split in tiny tasks)
  - create game screen (canvas)
  - create loop 
  - players movement
  - alien movement
  - bullet movement
- create player
- create alien
- create bullets
- Update game over with conditions
- clean code
- add css
- backlog challenges

## Links


### Trello
[Trello](https://trello.com/b/6NlRCaIT)


### Git
[Link Repo](https://github.com/MJHRhacker/space-invaders.git)
[Link Deploy](http://github.com)


### Slides
[Slides](https://slides.com/mjhr/space-invaders)
