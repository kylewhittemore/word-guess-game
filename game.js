// the alphabet array is created to check the input letter against when determining whether the input is a valid letter.
const alphabetArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// wordArray holds the array of words that the app will randomly select a target word from.  I would like this to somehow link to a generic word-game word list if there is such a thing...there must be right?
const wordArray = ['bootstrap', 'javascript', 'html', 'css', 'node', 'jquery', 'document', 'class', 'function', 'variable', 'object', 'browser', 'responsive', 'element', 'camelcase', 'display', 'flexbox', 'float', 'recursive', 'static', 'database', 'server', 'login'];

const fistImageArray = ['./assets/images/0.jpg', './assets/images/1.jpg', './assets/images/2.jpg', './assets/images/3.jpg', './assets/images/4.jpg', './assets/images/5.jpg', './assets/images/won.jpg'];

//assign the relevant html elements to js variables.
const guessedLetterDisplay = document.getElementById('display-guessed-letter');
const targetWordDisplay = document.getElementById('display-target-word');
const bannerDisplay = document.getElementById('banner-text');
const winsDisplay = document.getElementById('display-number-wins');
const fistDisplay = document.getElementById('fist');
const resultWord = document.getElementById('result-word');

// the banner is a title when playing, and prompts the user to press a key to start a new game.
const defaultBannerDisplay = 'Press a key to begin!';
const activeBannerDisplay = 'Word Guess Game!';

// sets the initial banner state to key-prompt the user
bannerDisplay.innerHTML = defaultBannerDisplay;
fistDisplay.src = './assets/images/default.jpg';

// the game object itself!
//first are the property declarations.  mostly they are initialized as empty types. the names are fairly straightforward, except for targetWord vs. targetWordGameState. targetWord is re-set each time .getTargetWord() is called (in the .startGame() method), and it is the word that the user is trying to guess.  targetWordGameState is an array that has a '_' for each letter in targetWord.  It serves as the game state counter, each valid guess switches the '_' for the letter guessed.  when the targetWordGameState has no more '_' the user has won and .endGame() is triggered.
const gameObject = {

    isActive: false,
    lettersGuessed: [],
    guessesLeft: 0,
    numUserWins: 0,
    targetWord: '',
    targetWordGameState: [],

    // .startGame is called after the user presses a key top trigger the game state the method sets the gameboard up with default values, selects the targetWord, and splits it into the targetWordGameState array as '_' that will be converted to their letter values as the game progresses.
    startGame: function () {
        this.targetWord = this.getTargetWord(wordArray);
        console.log(this.targetWord);
        this.targetWordGameState = [];
        this.lettersGuessed = [];
        this.guessesLeft = 5;
        this.isActive = true;
        this.displayFistState(this.guessesLeft);
        bannerDisplay.innerHTML = activeBannerDisplay;

        // loop to set the gameState counter, uses a '_____' copy of the word, and converts each letter to '_'
        for (i = 0; i < this.targetWord.length; i++) {
            this.targetWordGameState[i] = '_';
        };
        
        // the target word is then displayed as '_'s 
        targetWordDisplay.innerHTML = this.targetWordGameState.join(' ');
    },

    // getTargetWord is called by startGame() and it generates as random number between and the length of the array of words, then returns the word at the random number position.
    getTargetWord: function (arr) {
        let randNum = Math.floor(Math.random() * arr.length);
        return arr[randNum];
    },

    // addKeyPress is called after the key is validated as a letter that hasnt been pressed yet.  It pushes the key onto the array of lettersGuessed and displays the list in the html.
    addKeyPress: function (key) {
        this.lettersGuessed.push(key);
        guessedLetterDisplay.innerHTML = this.lettersGuessed.join(',  ');
    },

    // checks whether the key has already been pressed.  
    keyAlreadyPressed: function (key) {
        for (i = 0; i < this.lettersGuessed.length; i++) {
            if (this.lettersGuessed[i] === key) {
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
        if (this.isActive === false) {
            this.startGame();

        // if the game is already active, and if the key is a valid choice, the the letter is added to the array of letters guessed and 'run' through the main game logic
        } else {
            let checkIfKeyPress = this.keyAlreadyPressed(key);
            let checkIfLetter = this.isLetter(key);

            if (checkIfKeyPress === false && checkIfLetter === true) {
                this.addKeyPress(key);
                this.runLetter(key);
            };
        };
    },

    // the endGame() method is called by the runLetter() method when the user has either enterd the entire word correctly, or run out of guesses.  It is passed currentResult which if true triggers a win.
    endGame: function (currentResult) {
        bannerDisplay.innerText = defaultBannerDisplay;
        guessedLetterDisplay.innerHTML = '';
        this.isActive = false;
        
        if (currentResult === true) {
            fistDisplay.src = fistImageArray[6];
            this.numUserWins++;
            winsDisplay.innerHTML = this.numUserWins;
        } else {
            fistDisplay.src = fistImageArray[0];
            console.log(this.targetWord);
        }
    },

    // switch statement displays the appropriate fist image for the guesses left
    displayFistState: function (num) {
        switch (num) {
            case 0:
                fistDisplay.src = fistImageArray[0];
                break;
            case 1:
                fistDisplay.src = fistImageArray[1];
                break;
            case 2:
                fistDisplay.src = fistImageArray[2];
                break;
            case 3:
                fistDisplay.src = fistImageArray[3];
                break;
            case 4:
                fistDisplay.src = fistImageArray[4];
                break;
            case 5:
                fistDisplay.src = fistImageArray[5];
                break;
        };
    },

    // runLetter is called by the checkValidKeyEvent and is passed the input letter. it is composed of a for loop that iterates over the targetWord with a nested conditional that checks each time if the passedLetter = the current target letter.  if so, it converts the letter in targetWordGameState at the same position that the loop is at in iterating the targetWord.  it then sets correctGuess to true to avoid triggering the default incorrect guess condition. 
    runLetter: function (passedLetter) {
        let correctGuess = '';
        for (i = 0; i < this.targetWord.length; i++) {
            let currentLetter = this.targetWord[i];
            if (passedLetter === currentLetter) {
                this.targetWordGameState[i] = currentLetter;
                if (this.guessesLeft < 5) {
                    this.guessesLeft++;
                };
                this.displayFistState(this.guessesLeft);
                correctGuess = true;
            };
        };

        //if this letter filled the last remaining '_' in targetWordGameState then the game is over and endGame(true) is called.
        if (this.targetWordGameState.includes('_') === false) {
            guessedLetterDisplay.innerHTML = '';
            fistDisplay.src = './assets/images/won.jpg'
            this.endGame(true);
        };

        if (!correctGuess) {
            this.guessesLeft--;
            this.displayFistState(this.guessesLeft);
            console.log(this.guessesLeft);

            if (this.guessesLeft === 0) {
                guessedLetterDisplay.innerHTML = '';
                this.endGame(false);
            };
        };
        targetWordDisplay.innerHTML = this.targetWordGameState.join(' ');
    }
};

document.addEventListener('keyup', function (event) {
    console.log(event.key);
    gameObject.checkValidKeyEvent(event.key);
});

