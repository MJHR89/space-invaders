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
    destroyGameOver();

    splashScreen = buildDom(`
      <main class="splash">
        <h1>space invaders</h1>
        <h2>Choose your player</h2>
        <div class="choose-player">
          <div>
            <img class="luke" src="./img/Luke-Skywalker.png">
          </div>
          <div>
          <img class="vader" src="./img/Darth-Vader.png">
          </div>
        </div>
        <button>Start</button>
      </main>
    `);

    document.body.appendChild(splashScreen);

    
    var character = splashScreen.querySelector('.choose-player');
    character.addEventListener('click', function(event){
      var selectedIcon = character.querySelector('.selected');
      if(selectedIcon) {
        selectedIcon.classList.remove('selected');
      }
      event.target.classList.toggle('selected');
      selectedImage = event.target.src;
    });
    
    var button = splashScreen.querySelector('button');
    button.addEventListener('click', startGame);
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

  function gameOver(lives, score, win) {
    destroyGame();
    buildGameOver(lives, score, win);
  }

  function buildGameOver(lives, score, win) {
    gameOverScreen = buildDom(`
      <main class="gameover">
        <h1>Game Over</h1>
        <h2 class="score"></h2>
        <p class="winner"></p>
        <div class="buttons">
          <button class="play-again">Play Again</button>
          <button class="change-sides">Change Sides</button>
        </div>
      </main>
    `);

    var winnerElement = gameOverScreen.querySelector('.winner');

    if (selectedImage.indexOf('Luke-Skywalker') !== -1 && win) {
      winnerElement.innerText = 'May the force be with You!';
    } else if (selectedImage.indexOf('Luke-Skywalker') !== -1 && !win) {
        winnerElement.innerText = 'Welcome to the Dark Side!';
    } else if (selectedImage.indexOf('Darth-Vader') !== -1 && win) {
      winnerElement.innerText = 'Welcome to the Dark Side!';
    } else if (selectedImage.indexOf('Darth-Vader') !== -1 && !win) {
      winnerElement.innerText = 'May the force be with You!';
    }

    

    var button = gameOverScreen.querySelector('.play-again');
    button.addEventListener('click', startGame);

    var change = gameOverScreen.querySelector('.change-sides');
    change.addEventListener('click', buildSplash);

    // var forceWins = gameOverScreen.  ('p.force-wins')
    // forceWins.innerText = score;

    // var darkSideWins = gameOverScreen.  ('p.dark-side-wins')
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