
// the alphabet array is established so that the addEventListener('keyup') 
// events can be applied to each key with a loop.
const alphabetArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// wordArray holds the array of words that the app will randomly select a target
// word from.  I would like this to link to a generic word-game word list
// if there is such a thing...there must be right?
const wordArray = ['jump', 'garbage', 'mountain', 'valley', 'carrot', 'cucumber', 'hummus', 'pita'];

//assign the relevant html elements to js variables.
const guessedLetterDisplay = document.getElementById('display-guessed-letter');
const targetWordDisplay = document.getElementById('display-target-word');
const bannerDisplay = document.getElementById('banner-text');
const winsDisplay = document.getElementById('display-number-wins')

// the banner is a title when playing, and prompts the user to press a key to start 
// a new game.
const defaultBannerDisplay = 'Press a key to begin!';
const activeBannerDisplay = 'Word Guess Game!';

// sets the initial banner state to key-prompt
bannerDisplay.innerHTML = defaultBannerDisplay;

// -----------------------------------------------------------------------------------

// the game object itself!
// 
// first are the property declarations.  mostly they are initialized as empty types.
// the names are fairly straightforward, except for targetWord vs. targetWordGameState.
// targetWord is re-set each time .getTargetWord() is called (in the .startGame()
// method), and it is the word that the user is trying to guess.  targetWordGameState is 
// an array that has a '_' for each letter in targetWord.  It serves as the game state 
// counter, each valid guess switches the '_' for the letter.  when the
// targetWordGameState has no more '_' the user has won and .endGame() is triggered.

const gameObject = {
    isActive: false,
    lettersGuessed: [],
    guessesLeft: 0,
    numUserWins: 0,
    numUserLosses: 0,
    targetWord: '',
    targetWordGameState: [],

    // .startGame is called after the user presses a key top trigger the game state
    // the method sets the gameboard up with default values, selects the targetWord, 
    // and splits it into the targetWordGameState array as '_' that will be converted to their letter values as the game progresses.
    startGame: function () {
        gameObject.targetWord = gameObject.getTargetWord(wordArray);
        console.log(this.targetWord);
        gameObject.targetWordGameState = gameObject.targetWord.split("");
        gameObject.lettersGuessed = [];
        gameObject.guessesLeft = 10;
        gameObject.isActive = true;
        guessedLetterDisplay.innerHTML = '';


        //loop to set the gameState counter, use a '_____' copy of the word
        for (i = 0; i < gameObject.targetWord.length; i++) {
            gameObject.targetWordGameState[i] = '_';
        };

        targetWordDisplay.innerHTML = gameObject.targetWordGameState.join(' ');
    },

    // getTargetWord is called by startGame() and it generates as random number between 
    // and the length of the array of words, then returns the word at the random
    // number position.
    getTargetWord: function (arr) {
        let randNum = Math.floor(Math.random() * arr.length);
        return arr[randNum];
    },

    // addKeyPress is called after the key is validated as a letter that hasnt been 
    // pressed yet.  It pushes the key onto the array of lettersGuessed and displays 
    // the list in the html.
    addKeyPress: function (key) {
        this.lettersGuessed.push(key);
        guessedLetterDisplay.innerHTML = gameObject.lettersGuessed.join(', ');
    },

    // checks whether the key has already been pressed.  
    keyAlreadyPressed: function (key) {
        for (i = 0; i < gameObject.lettersGuessed.length; i++) {
            if (gameObject.lettersGuessed[i] === key) {
                return true;
            };
        };
        return false;
    },

    // checks whether the key is a letter
    isLetter: function (key) {
        for (i = 0; i < alphabetArray.length; i++) {
            if (key === alphabetArray[i]) {
                return true;
            };
        };
        return false;
    },

    // ****the method that is called on any keyup event****
    // checks if the game is waiting for the user, if so starts the game.
    checkValidKeyEvent: function (key) {
        if (gameObject.isActive === false) {
            gameObject.startGame();

    // if the game is already active, and if the key is a valid choice, the 
    // the letter is added to the array of letters guessed and
    // 'run' through the main game logic
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
        } else if (bannerDisplay.innerHTML = activeBannerDisplay) {
            bannerDisplay.innerHTML = defaultBannerDisplay;
        };
    },

    endGame: function (currentResult) {
        if (currentResult === true) {
            this.numUserWins++;
            winsDisplay.innerHTML = gameObject.numUserWins;
            bannerDisplay.innerHTML = defaultBannerDisplay;
            this.isActive = false;
            console.log('won');
            targetWordDisplay.innerHTML = '';
            
        } else {
            console.log('lost');
            bannerDisplay.innerHTML = defaultBannerDisplay;
            targetWordDisplay.innerHTML = '';
            this.isActive = false;
        }
    },

    runLetter: function (passedLetter) {
        let correctGuess = '';
        for (i = 0; i < gameObject.targetWord.length; i++) {
            let currentLetter = gameObject.targetWord[i];
            if (passedLetter === currentLetter) {
                gameObject.targetWordGameState[i] = currentLetter;
                correctGuess = true;
            };
        };
        
        if (gameObject.targetWordGameState.includes('_') === false) {
            gameObject.endGame(true);
        };

        if (!correctGuess) {
            this.guessesLeft--;
            console.log(this.guessesLeft);
            if (this.guessesLeft === 0) {
                gameObject.endGame(false);
            }
        }

        targetWordDisplay.innerHTML = gameObject.targetWordGameState.join(' ');
    }
};

document.addEventListener('keyup', function (event) {
    console.log(event.key);
    gameObject.checkValidKeyEvent(event.key);
});

