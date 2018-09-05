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

  // --splash Screen

  function buildSplash() {

    splashScreen = buildDom(`
      <main class="splash">
        <h1>space invaders</h1>
        <h2>Choose your player<h2>
        <div class="choose-player">
          <div>
            <img src="./img/pollito-02.png">
          </div>
          <div>
          <img src="./img/car-02.png">
          </div>
        </div>
        <button>Start</button>
      </main>
    `);

    document.body.appendChild(splashScreen);

    var button = splashScreen.querySelector('button');
    button.addEventListener('click', startGame);
    
    var character = splashScreen.querySelector('.choose-player');
    character.addEventListener('click', function(event){
      var selectedIcon = character.querySelector('.selected');
      if(selectedIcon) {
        selectedIcon.classList.remove('selected');
      }
      event.target.classList.toggle('selected');
      selectedImage = event.target.src;
    });
  
  }

  function destroySplash () {
    splashScreen.remove();
  }

  // -- game

  function startGame() {
    destroySplash();
    destroyGameOver();

    game = new Game(selectedImage);
    game.start();
    game.onOver(function () {
      gameOver();
    });  
  }

  function destroyGame() {
    game.destroy();
  }

  // -- gameOver

  function gameOver(lives, score, round) {
    destroyGame();
    buildGameOver(lives, score, round);
  }

  function buildGameOver() {
    gameOverScreen = buildDom(`
      <main>
        <h1>Game Over</h1>
        <p class="force-wins"></p>
        <p class="dark-side-wins"></p>
        <button>Play Again</button>
      </main>
    `);

    var button = gameOverScreen.querySelector('button');
    button.addEventListener('click', startGame);

    // var forceWins = gameOverScreen.querySelector('p.force-wins')
    // forceWins.innerText = score;

    // var darkSideWins = gameOverScreen.querySelector('p.dark-side-wins')
    // darkSideWins.innerText = score;

    document.body.appendChild(gameOverScreen);

  }

  function destroyGameOver() {
    if (gameOverScreen) {
      gameOverScreen.remove();
    }
  }

  // -- initialize game

  buildSplash();
}

window.addEventListener('load', main);