import { getUsers, addUser } from './api';

const leftBankButtons = document.getElementById('left-bank-buttons');
const rightBankButtons = document.getElementById('right-bank-buttons');
const counter = document.getElementById('count');
const currentUser = document.getElementById('user');
const leftBankTitle = document.getElementById('left-bank');
const rightBankTitle = document.getElementById('right-bank');
const form = document.getElementById('registration-form');
const resultsList = document.getElementById('results');
const input = document.getElementById('username');
const boatLeft = document.getElementById('boat-left');
const boatRight = document.getElementById('boat-right');

console.log(boatLeft.textContent);

// Определяем начальное состояние
let leftBank = ['Волк', 'Коза', 'Капуста'];
let rightBank = [];
let currentBank = 'left';
let moveCount = 0;

markBank(currentBank);

// Рендерим таблицу юзеров и результатов
function setResults() {
  getUsers().then((res) => {
    res.sort((a, b) => a.result - b.result);
    resultsList.innerHTML = '';
    res.forEach((user) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${user.username}: ${user.result}`;
      resultsList.appendChild(listItem);
    });
  });
}

// Регистрируем нового юзера
form.addEventListener('submit', function (e) {
  e.preventDefault();
  currentUser.textContent = input.value;
  counter.textContent = 0;
  renderButtons();
});

// Рендерим кнопки в текущем состоянии
function renderButtons() {
  leftBankButtons.innerHTML = '';
  rightBankButtons.innerHTML = '';

  // Сначала рендерим кнопки на левом берегу
  leftBank.forEach((entity) => {
    const button = document.createElement('button');
    button.textContent = entity;
    button.onclick = () => move(entity);
    button.disabled = currentUser.textContent === '';
    leftBankButtons.appendChild(button);
  });

  // Затем рендерим кнопки на правом берегу
  rightBank.forEach((entity) => {
    const button = document.createElement('button');
    button.textContent = entity;
    button.onclick = () => move(entity);
    button.disabled = currentUser.textContent === '';

    rightBankButtons.appendChild(button);
  });
}

// Подсвечиваем текущий берег
function markBank(currentBank) {
  const isLeftBank = currentBank === 'left';

  leftBankTitle.classList.toggle('active', isLeftBank);
  rightBankTitle.classList.toggle('active', !isLeftBank);

  boatLeft.textContent = isLeftBank ? 'лодка здесь' : '';
  boatRight.textContent = isLeftBank ? '' : 'лодка здесь';
}

// Функция для отображения состояния
function displayState() {
  renderButtons();
  counter.textContent = moveCount;
}

// Функция для проверки безопасности состояния
function isSafe() {
  if (
    leftBank.includes('Коза') &&
    leftBank.includes('Волк') &&
    currentBank === 'right'
  ) {
    return 'Волк съел козу. Попробуйте ещё раз';
  }
  if (
    leftBank.includes('Коза') &&
    leftBank.includes('Капуста') &&
    currentBank === 'right'
  ) {
    return 'Коза съела капусту. Попробуйте ещё раз';
  }
  if (
    rightBank.includes('Коза') &&
    rightBank.includes('Волк') &&
    currentBank === 'left'
  ) {
    return 'Волк съел козу. Попробуйте ещё раз';
  }
  if (
    rightBank.includes('Коза') &&
    rightBank.includes('Капуста') &&
    currentBank === 'left'
  ) {
    return 'Коза съела капусту. Попробуйте ещё раз';
  }
  return 'ok';
}

// Функция для перемещения сущности
function move(entity) {
  if (currentBank === 'left') {
    if (leftBank.includes(entity)) {
      leftBank = leftBank.filter((e) => e !== entity);
      rightBank.push(entity);
    }
  } else {
    if (rightBank.includes(entity)) {
      rightBank = rightBank.filter((e) => e !== entity);
      leftBank.push(entity);
    }
  }
  currentBank = currentBank === 'left' ? 'right' : 'left'; // Меняем берег
  const message = isSafe();
  if (message !== 'ok') {
    showModal(message);
  }
  if (rightBank.length === 3) {
    const formData = {
      username: currentUser.textContent,
      result: counter.textContent,
    };
    addUser(formData).then(() => {
      setResults();
    });
    showModal(
      `Поздравляем, это победа! Ваш результат: ${counter.textContent} ходов`
    );
  }

  counter.textContent = moveCount++;
  markBank(currentBank);
  displayState();
}

// Сбрасываем состояние игры
function resetGame() {
  leftBank = ['Волк', 'Коза', 'Капуста'];
  rightBank = [];
  currentBank = 'left';
  moveCount = 0;
  displayState();
}

function showModal(message) {
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modal-message');
  const closeButton = document.querySelector('.close-button');

  modalMessage.textContent = message;
  modal.style.display = 'block';

  closeButton.onclick = function () {
    modal.style.display = 'none';
    resetGame();
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      resetGame();
    }
  };
}

// Запускаем
displayState();
setResults();
