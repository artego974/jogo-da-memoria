const gameBoard = document.getElementById('gameBoard');
const nextLevelBtn = document.getElementById('nextLevelBtn');

const pairs = [
    { question: 'Quantos mols em 88 g de CO₂?', answer: '2 mols' },
    { question: 'Quantos mols em 36 g de H₂O?', answer: '2 mols' },
    { question: 'Quantos mols em 120 g de Ca?', answer: '3 mols' },
    { question: 'Quantos mols em 111 g de CO₂?', answer: '2.5 mols' }
];

let cardsArray = [];

pairs.forEach(pair => {
    cardsArray.push({ text: pair.question, pairId: pair.question });
    cardsArray.push({ text: pair.answer, pairId: pair.question });
});

// Fisher-Yates shuffle
function shuffle(array) {
    for (let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i +1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(cardsArray);

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;

cardsArray.forEach(data => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.text = data.text;
    card.dataset.pairId = data.pairId;
    card.textContent = '';

    card.addEventListener('click', flipCard);

    gameBoard.appendChild(card);
});

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.text;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.pairId === secondCard.dataset.pairId &&
                    firstCard.dataset.text !== secondCard.dataset.text;

    if (isMatch) {
        disableCards();
        matchesFound++;
        if (matchesFound === pairs.length) {
            showNextLevelBtn();
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';

        resetBoard();
    }, 300);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function showNextLevelBtn() {
    nextLevelBtn.style.display = 'inline-block';
}

nextLevelBtn.addEventListener('click', () => {
    alert('Parabéns! Indo para a próxima fase...');
    // Aqui pode ser um redirecionamento, por exemplo:
    window.location.href = 'index2.html';
});
