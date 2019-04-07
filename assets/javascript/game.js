const alphabetArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const wordArray = ['jump', 'garbage', 'mountain', 'valley', 'carrot', 'cucumber', 'hummus', 'pita'];

let targetWord = '';

const guessedLetterDisplay = document.getElementById('display-guessed-letter').innerHTML;


const gameObject = {
    isActive: false,
    lettersGuessed: [],
    guessesLeft: 0,
    numUserWins: 0,
    numUserLosses: 0,
    gameTrackerWord: '',

    startGame: function () {
        // set/reset the game board
        targetWord = gameObject.getTargetWord(wordArray)
        console.log(targetWord);
    },

    getTargetWord: function (arr) {
        let randNum = Math.floor(Math.random() * arr.length);
        return arr[randNum];
    },

    addKeyPress: function (pressedKey) {
        this.lettersGuessed.push(pressedKey);
    },

    keyAlreadyPressed: function (pressedKey) {
        for (i = 0; i < gameObject.lettersGuessed.length; i++) {
            if (gameObject.lettersGuessed[i] === pressedKey) {
                return true;
            };
        };
        return false;
    },

    isLetter: function (pressedKey) {
        for (i = 0; i < alphabetArray.length; i++) {
            if (pressedKey === alphabetArray[i]) {
                return true;
            };
        };
        return false;
    },

    checkKeyEvent: function (pressedKey) {
        if (gameObject.isActive === false) {
            gameObject.isActive = true;
            gameObject.startGame();
        } else {
            let checkKeyPress = gameObject.keyAlreadyPressed(pressedKey);
            console.log('check key: ' + checkKeyPress);

            let checkLetter = gameObject.isLetter(pressedKey);
            console.log('check letter: ' + checkLetter);

            if (checkKeyPress === false && checkLetter === true) {
                gameObject.addKeyPress(pressedKey);
                console.log(gameObject.lettersGuessed);
            };
        };
    }
};


document.addEventListener('keyup', function (event) {
    console.log(event.key);
    gameObject.checkKeyEvent(event.key);
});

