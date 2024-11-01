class NumberGame {
    constructor() {
        this.randomNumber = this.generateRandomNumber();
        this.prevGuesses = [];
        this.numGuess = 0;
        this.maxGuesses = 10;
        this.playGame = true;

        // DOM Elements
        this.form = document.querySelector('#guess-form');
        this.userInput = document.querySelector('#guessfield');
        this.guessesDisplay = document.querySelector('.guesses');
        this.attemptsDisplay = document.querySelector('.attempts');
        this.feedbackDisplay = document.querySelector('.feedback');
        
        this.initializeGame();
    }

    generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }

    initializeGame() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.playGame) {
                const guess = parseInt(this.userInput.value);
                this.validateGuess(guess);
            }
        });
    }

    validateGuess(guess) {
        if (isNaN(guess)) {
            this.showFeedback('Please enter a valid number', 'error');
            return;
        }

        if (guess < 1 || guess > 100) {
            this.showFeedback('Please enter a number between 1 and 100', 'error');
            return;
        }

        this.processGuess(guess);
    }

    processGuess(guess) {
        this.prevGuesses.push(guess);
        this.numGuess++;
        
        this.updateUI(guess);
        
        if (this.numGuess === this.maxGuesses) {
            this.showFeedback(`Game Over! The number was ${this.randomNumber}`, 'error');
            this.endGame();
            return;
        }

        this.checkGuess(guess);
    }

    checkGuess(guess) {
        if (guess === this.randomNumber) {
            this.showFeedback('🎉 Congratulations! You got it right!', 'success');
            this.endGame();
        } else {
            const message = guess < this.randomNumber ? 
                '📈 Too low! Try a higher number' : 
                '📉 Too high! Try a lower number';
            this.showFeedback(message, 'warning');
        }
    }

    updateUI(guess) {
        this.userInput.value = '';
        this.displayGuesses();
        this.updateAttempts();
    }

    displayGuesses() {
        this.guessesDisplay.innerHTML = this.prevGuesses
            .map(guess => `<span class="guess-bubble">${guess}</span>`)
            .join('');
    }

    updateAttempts() {
        const remaining = this.maxGuesses - this.numGuess;
        this.attemptsDisplay.textContent = remaining;
        
        if (remaining <= 3) {
            this.attemptsDisplay.style.color = '#ef4444';
        }
    }

    showFeedback(message, type) {
        this.feedbackDisplay.innerHTML = `<h2 class="${type}">${message}</h2>`;
    }

    endGame() {
        this.playGame = false;
        this.userInput.disabled = true;
        this.createNewGameButton();
    }

    createNewGameButton() {
        const newGameBtn = document.createElement('div');
        newGameBtn.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
        newGameBtn.addEventListener('click', () => this.resetGame());
        this.feedbackDisplay.appendChild(newGameBtn);
    }

    resetGame() {
        this.randomNumber = this.generateRandomNumber();
        this.prevGuesses = [];
        this.numGuess = 0;
        this.playGame = true;
        
        this.userInput.disabled = false;
        this.guessesDisplay.innerHTML = '';
        this.attemptsDisplay.textContent = this.maxGuesses;
        this.attemptsDisplay.style.color = '';
        this.feedbackDisplay.innerHTML = '';
        
        this.userInput.focus();
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NumberGame();
});