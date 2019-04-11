
const alphabetArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const wordArray = ['bootstrap', 'javascript', 'html', 'css', 'node', 'jquery', 'document', 'class', 'function', 'variable', 'object', 'browser', 'responsive', 'element', 'camelcase', 'display', 'flexbox', 'float', 'recursive', 'static', 'database', 'server', 'login'];

const fistImageArray = ['./assets/images/0.jpg', './assets/images/1.jpg', './assets/images/2.jpg', './assets/images/3.jpg', './assets/images/4.jpg', './assets/images/5.jpg', './assets/images/won.jpg'];

const defaultBannerDisplay = 'Press a key to begin!';
const activeBannerDisplay = 'Word Guess Game!';

$('#banner-display').text(defaultBannerDisplay);
$('#fist-image').attr('src', './assets/images/default.jpg');

const gameObject = {

    isActive: false,
    lettersGuessed: [],
    guessesLeft: 0,
    numUserWins: 0,
    targetWord: '',
    targetWordGameState: [],

    startGame: function () {
        this.targetWord = this.getTargetWord(wordArray);
        console.log(this.targetWord);
        this.targetWordGameState = [];
        this.lettersGuessed = [];
        this.guessesLeft = 5;
        this.isActive = true;
        this.displayFistState(this.guessesLeft);

        $('#banner-display').text(activeBannerDisplay);

        this.targetWordGameState = this.targetWord.split('').map(() => '_');

        $('#target-word-display').text(this.targetWordGameState.join(' '));
    },

    getTargetWord: arr => arr[Math.floor(Math.random() * arr.length)],

    displayFistState: num => $('#fist-image').attr('src', fistImageArray[num]),

    keyAlreadyPressed: key => gameObject.lettersGuessed.includes(key),

    isLetter: key => alphabetArray.includes(key),

    addKeyPress: function (key) {
        this.lettersGuessed.push(key);
        $('#guessed-letter-display').text(this.lettersGuessed.join(', '))
    },

    checkValidKeyEvent: function (key) {
        if (this.isActive === false) {
            this.startGame();

        } else {
            let checkIfKeyPress = this.keyAlreadyPressed(key);
            let checkIfLetter = this.isLetter(key);

            if (checkIfKeyPress === false && checkIfLetter === true) {
                this.addKeyPress(key);
                this.runLetter(key);
            };
        };
    },

    endGame: function (currentResult) {
        $('#banner-display').text(defaultBannerDisplay);
        $('#guessed-letter-display').text('');
        this.isActive = false;

        if (currentResult === true) {
            $('#fist-image').attr('src', fistImageArray[6]);
            this.numUserWins++;
            $('#wins-display').text(this.numUserWins);
        } else {
            $('#fist-image').attr('src', fistImageArray[0]);
            $('#target-word-display').text(this.targetWord);
        }
    },

    runLetter: function (passedLetter) {
        let correctGuess = '';
        // I still think that this could be done with a higher-order function
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
        
        $('#target-word-display').text(this.targetWordGameState.join(' '));

        if (this.targetWordGameState.includes('_') === false) {
            $('#guessed-letter-display').text('');
            $('#fist-image').attr('src', './assets/images/won.jpg'),
            this.endGame(true);
        };

        if (!correctGuess) {
            this.guessesLeft--;
            this.displayFistState(this.guessesLeft);
            if (this.guessesLeft === 0) {
                $('#guessed-letter-display').text('');
                this.endGame(false);
            };
        };
    }
};

document.addEventListener('keyup', function (event) {
    console.log(event.key);
    gameObject.checkValidKeyEvent(event.key);
});



