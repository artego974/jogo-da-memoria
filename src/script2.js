const gameBoard = document.getElementById('gameBoard');

const pairs = [
    { question: '0,5 mol de O₂?', answer: '3,011 × 10²³ moléculas' },
    { question: '2 mols de NH₃?', answer: '1,204 × 10²⁴ moléculas' },
    { question: '0,25 mol de gás oxigênio?', answer: '1,5055 × 10²³ moléculas' },
    { question: '0,75 mol de C₂H₆?', answer: '4,5165 × 10²³ moléculas' }
];

// Criar array com perguntas e respostas
let cardsArray = [];

pairs.forEach(pair => {
    cardsArray.push({ text: pair.question, pairId: pair.question });
    cardsArray.push({ text: pair.answer, pairId: pair.question });
});

// ✅ Embaralhar com Fisher-Yates
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(cardsArray);

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Criar as cartas no DOM
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
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();

    // ✅ Verificar se todas as cartas estão viradas
    const allFlipped = document.querySelectorAll('.card.flipped').length === cardsArray.length;

    if (allFlipped) {
        setTimeout(() => {
            alert('Parabéns! Você completou o jogo!');
            document.getElementById('nextLevelBtn').style.display = 'block';
        }, 300);
    }
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
