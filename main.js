'use strict';

function buildDom(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

function main () {

  var splashScreen;
  var gameOverScreen;
  var game;
  var selectedImage;
  var song;

  // --------------------splash Screen-------------------

  function buildSplash() {
    destroyGameOver();

    splashScreen = buildDom(`
      <main class="splash">
        <h1>space invaders</h1>
        <h2>Choose your player</h2>
        <div class="choose-player">
          <div>
            <img class="luke" src="./img/Luke-Skywalker.png" song="luke-music.mp3">
          </div>
          <div>
          <img class="vader" src="./img/Darth-Vader.png" song="vader-music.mp3">
          </div>
        </div>
        <button>Start</button>
        <div class="instructions">
          <div class="arrows">
            <img src="./img/arrows.png"><p>Move the player with the arrow keys</p>
          </div>
          <div class="space-bar">
            <img src="./img/space-bar.png"><p>Shoot your enemy's ship</p>
          </div>
        </div>
        <audio class="sounds"><source src="./sfx/splash-music.mp3" type="audio/mpeg" /></audio>
      </main>
    `);

    document.body.appendChild(splashScreen);
    var splashElement = splashScreen.querySelector('audio');
    splashElement.autoplay = true;
    
    var character = splashScreen.querySelector('.choose-player');
    character.addEventListener('click', function(event){
      var selectedIcon = character.querySelector('.selected');
      if(selectedIcon) {
        selectedIcon.classList.remove('selected');
      }
      event.target.classList.toggle('selected');
      selectedImage = event.target.src;
      song = event.target.getAttribute('song');

      var button = splashScreen.querySelector('button');
      button.addEventListener('click', startGame);
    });
    
  }

  function destroySplash () {
    splashScreen.remove();
  }

  // -------------------game-------------------

  function startGame() {
    destroySplash();
    destroyGameOver();

    game = new Game(selectedImage, gameOver, song);
    game.start();
    // game.onOver(function () {
    //   gameOver();
    // });  
  }

  function destroyGame() {
    game.destroy();
  }

  // -------------------gameOver-------------------

  function gameOver(game) {
    destroyGame();
    buildGameOver(game);
  }

  function buildGameOver(game) {
    gameOverScreen = buildDom(`
      <main class="gameover">
        <h1>Game Over</h1>
        <h2 class="score"></h2>
        <p class="winner"></p>
        <span class="winner-img">
          <img class="image" src="" alt="">
        </span>
        <div class="buttons">
          <button class="play-again">Play Again</button>
          <button class="change-sides">Change Sides</button>
        </div>
        <audio class="sounds"><source src="./sfx/gameover-music.mp3" type="audio/mpeg" /></audio>
      </main>
    `);
    
    var winnerElement = gameOverScreen.querySelector('.winner');
    var src;

    if (selectedImage.indexOf('Luke-Skywalker') !== -1 && game.won) {
      winnerElement.innerText = 'May the force be with You!';
      src = './img/Luke-Skywalker.png'
    } else if (selectedImage.indexOf('Luke-Skywalker') !== -1 && !game.won) {
      winnerElement.innerText = 'Welcome to the Dark Side!';
      src = './img/Darth-Vader.png'
    } else if (selectedImage.indexOf('Darth-Vader') !== -1 && game.won) {
      winnerElement.innerText = 'Welcome to the Dark Side!';
      src = './img/Darth-Vader.png'
    } else if (selectedImage.indexOf('Darth-Vader') !== -1 && !game.won) {
      winnerElement.innerText = 'May the force be with You!';
      src = './img/Luke-Skywalker.png'
    }

    var gameOverElement = gameOverScreen.querySelector('audio');
    gameOverElement.play();

    var scoreElement = gameOverScreen.querySelector('.score');
    scoreElement.innerText = game.score + " points"

    var winnerImgElement = gameOverScreen.querySelector('.image');
    winnerImgElement.src = src;


    var button = gameOverScreen.querySelector('.play-again');
    button.addEventListener('click', startGame);

    var change = gameOverScreen.querySelector('.change-sides');
    change.addEventListener('click', buildSplash);

    document.body.appendChild(gameOverScreen);

  }

  function destroyGameOver() {
    if (gameOverScreen) {
      gameOverScreen.remove();
    }
  }

  // -------------------initialize game-------------------

  buildSplash();
}

window.addEventListener('load', main);