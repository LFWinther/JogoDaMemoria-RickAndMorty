const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const menu = document.querySelector('.menu-screen')
const button = document.querySelector('.btn-play')
const bestScore = document.querySelector('.best-score-value')
const lastScore = document.querySelector('.best-score-value2')
const score = document.querySelector('.timer')


let firstCard = '';
let secondCard = '';


const characters = [
  'beth',
  'jerry',
  'jessica',
  'morty',
  'pessoa-passaro',
  'pickle-rick',
  'rick',
  'summer',
  'meeseeks',
  'scroopy',
  'space-beth',
  'poopybuthole',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card')

  if (disabledCards.length === 4) {
    setTimeout(() => {
      clearInterval(this.loop)
      updateBestScore(parseInt(timer.innerText))
      menu.style.display = "flex"
    }, 500)
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }  
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [ ...characters, ...characters ];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTimer = +timer.innerHTML
    timer.innerHTML = currentTimer + 1
  }, 1000)
}

const updateBestScore = (score) => {
  const currentBestScore = localStorage.getItem("bestScore")
  
  if (currentBestScore === !null || score < parseInt(currentBestScore)) {
    localStorage.setItem("bestScore", score)
    bestScore.innerText = score
  }

  lastScore.innerText = timer.innerText
}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}

const resetGame = () => {
  clearInterval(this.loop)
  firstCard = ''
  secondCard = ''
  grid.innerHTML = ''
  loadGame();
  timer.innerHTML = '0'
  startTimer();
  menu.style.display = 'none'
};

button.addEventListener('click', resetGame);

