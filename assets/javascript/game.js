const alphabetArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const wordArray = ['jump', 'garbage', 'mountain', 'valley', 'carrot', 'cucumber', 'hummus', 'pita'];

let targetWord = '';

const guessedLetterDisplay = document.getElementById('display-guessed-letter');
const targetWordDisplay = document.getElementById('display-target-word');
const bannerDisplay = document.getElementById('banner-text');
//const quitButton = //document.getElementById------------//

const defaultBannerDisplay = 'Press a key to begin!';
const activeBannerDisplay = 'Word Guess Game!';


// set all default states together here
bannerDisplay.innerHTML = defaultBannerDisplay;

const gameObject = {
    isActive: false,
    lettersGuessed: [],
    guessesLeft: 0,
    numUserWins: 0,
    numUserLosses: 0,
    targetWord: '',
    targetWordGameState: [],

    startGame: function () {
        // set/reset the game state
        gameObject.targetWord = gameObject.getTargetWord(wordArray);
        console.log(gameObject.targetWord);
        gameObject.targetWordGameState = gameObject.targetWord.split("");
        console.log(gameObject.targetWordGameState);
        gameObject.lettersGuessed = [];
        gameObject.guessesLeft = 10;
        gameObject.toggleBanner();
        gameObject.isActive = true;
        

        //loop to set the gameState counter, use a '_____' copy of the word
        for (i = 0; i < gameObject.targetWord.length; i++) {
            gameObject.targetWordGameState[i] = '_';
        };
        
    },

    getTargetWord: function (arr) {
        let randNum = Math.floor(Math.random() * arr.length);
        return arr[randNum];
    },

    addKeyPress: function (key) {
        this.lettersGuessed.push(key);
        guessedLetterDisplay.innerHTML = gameObject.lettersGuessed.join(', ');
    },

    keyAlreadyPressed: function (key) {
        for (i = 0; i < gameObject.lettersGuessed.length; i++) {
            if (gameObject.lettersGuessed[i] === key) {
                return true;
            };
        };
        return false;
    },

    isLetter: function (key) {
        for (i = 0; i < alphabetArray.length; i++) {
            if (key === alphabetArray[i]) {
                return true;
            };
        };
        return false;
    },

    checkValidKeyEvent: function (key) {
        if (gameObject.isActive === false) {
            gameObject.startGame();
        } else {
            let checkIfKeyPress = gameObject.keyAlreadyPressed(key);
            let checkIfLetter = gameObject.isLetter(key);

            if (checkIfKeyPress === false && checkIfLetter === true) {
                gameObject.addKeyPress(key);
                gameObject.runLetter(key);
            };
        };
    },

    toggleBanner: function () {
        if (bannerDisplay.innerHTML = defaultBannerDisplay) {
            bannerDisplay.innerHTML = activeBannerDisplay;
        } else {
            bannerDisplay.innerHTML = defaultBannerDisplay;
        };
    },

    runLetter: function (passedLetter) {
        let hasLetter = false;
        let missedGuess = false;
        let validGuess = false;

        for (i = 0; i < gameObject.targetWord.length; i++) {
            
            let currentLetter = gameObject.targetWord[i];

            if (passedLetter === currentLetter) {
                gameObject.targetWordGameState[i] = currentLetter;
                console.log(gameObject.targetWordGameState[i]);
                validGuess = true;
                console.log('you got one!')
                console.log(gameObject.targetWordGameState);

            } else if (passedLetter != currentLetter && currentLetter != '_') {
                hasLetter = true;
                missedGuess = true;
            };
        };

        targetWordDisplay.innerHTML = gameObject.targetWordGameState.join('');

        if (missedGuess === true && validGuess === false) {
            gameObject.guessesLeft = gameObject.guessesLeft - 1;
            console.log(gameObject.guessesLeft);
        }
        
        if (hasLetter === false || gameObject.guessesLeft === 0) {
            console.log('game over man!');
            gameObject.endGame();
        };

    }
};

document.addEventListener('keyup', function (event) {
    console.log(event.key);
    gameObject.checkValidKeyEvent(event.key);
});

