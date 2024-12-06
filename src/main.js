import { getUsers, register } from './api';

// Определяем начальное состояние
let leftBank = ['Волк', 'Коза', 'Капуста'];
let rightBank = [];
let currentBank = 'left'; // Текущий берег (left или right)
// let moves = []; // Для хранения истории перемещений
let moveCount = 0;
const leftBankButtons = document.getElementById('left-bank-buttons');
const rightBankButtons = document.getElementById('right-bank-buttons');
const counter = document.getElementById('count');
const user = document.getElementById('user');
const leftBankTitle = document.getElementById('left-bank');
const rightBankTitle = document.getElementById('right-bank');
const form = document.getElementById('registration-form');
const resultsList = document.getElementById('results');
const userList = document.getElementById('users');

markBank(currentBank);

function setResults() {
  getUsers().then((res) => {
    res.sort((a, b) => b.result - a.result);
    resultsList.innerHTML = '';
    userList.innerHTML = '';
    res.forEach((user) => {
      const listItem = document.createElement('li');
      listItem.textContent = user.username;
      userList.appendChild(listItem);
      const resultItem = document.createElement('li');
      resultItem.textContent = user.result; // Результат пользователя
      resultsList.appendChild(resultItem);
    });
  });
}

// Регистрируем нового юзера
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = {
    username: document.getElementById('username').value,
    result: 0,
  };
  register(formData).then(() => setResults());
  user.textContent = document.getElementById('username').value;
});

// Рендерим кнопки в текущем состоянии
function renderButtons() {
  leftBankButtons.innerHTML = ''; // Очищаем контейнер левого берега
  rightBankButtons.innerHTML = ''; // Очищаем контейнер правого берега

  // Сначала рендерим кнопки на левом берегу
  leftBank.forEach((entity) => {
    const button = document.createElement('button');
    button.textContent = entity;
    button.onclick = () => move(entity);
    leftBankButtons.appendChild(button);
  });

  // Затем рендерим кнопки на правом берегу
  rightBank.forEach((entity) => {
    const button = document.createElement('button');
    button.textContent = entity;
    button.onclick = () => move(entity);
    rightBankButtons.appendChild(button);
  });
}

// Подсвечиваем текущий берег
function markBank(currentBank) {
  leftBankTitle.classList.remove('active');
  rightBankTitle.classList.remove('active');
  currentBank === 'left'
    ? leftBankTitle.classList.add('active')
    : rightBankTitle.classList.add('active');
}

// Функция для отображения состояния
function displayState() {
  console.log(`Текущий берег: ${currentBank}`);
  console.log(`Левый берег: ${leftBank.join(', ')}`);
  console.log(`Правый берег: ${rightBank.join(', ')}`);
  // console.log('История перемещений:', moves.join(' -> '));
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
    return 'Волк съест козу';
  }
  if (
    leftBank.includes('Коза') &&
    leftBank.includes('Капуста') &&
    currentBank === 'right'
  ) {
    return 'Коза съест капусту';
  }
  if (
    rightBank.includes('Коза') &&
    rightBank.includes('Волк') &&
    currentBank === 'left'
  ) {
    return 'Волк съест козу';
  }
  if (
    rightBank.includes('Коза') &&
    rightBank.includes('Капуста') &&
    currentBank === 'left'
  ) {
    return 'Коза съест капусту';
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
    showModal(isSafe());
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
  // moves = [];
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
