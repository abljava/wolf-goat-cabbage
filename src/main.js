// Определяем начальное состояние
let leftBank = ['Волк', 'Коза', 'Капуста'];
let rightBank = [];
let currentBank = 'left'; // Текущий берег (left или right)
let moves = []; // Для хранения истории перемещений
let moveCount = 0;
const buttonContainer = document.querySelector('.buttons-container');
const leftBankButtons = document.getElementById('left-bank-buttons');
const rightBankButtons = document.getElementById('right-bank-buttons');
const counter = document.querySelector('.count');
const leftBankTitle = document.getElementById('left-bank');
const rightBankTitle = document.getElementById('right-bank');
markBank(currentBank)

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

function markBank (currentBank) {
  leftBankTitle.classList.remove('active');
  rightBankTitle.classList.remove('active');
  currentBank === 'left' ? leftBankTitle.classList.add('active') : rightBankTitle.classList.add('active')

}

// Функция для отображения состояния
function displayState() {
  console.log(`Левый берег: ${leftBank.join(', ')}`);
  console.log(`Правый берег: ${rightBank.join(', ')}`);
  console.log(`Текущий берег: ${currentBank}`);
  console.log('История перемещений:', moves.join(' -> '));
  renderButtons();
  counter.textContent = moveCount;

}

// Функция для перемещения сущности
function move(entity) {
  if (currentBank === 'left') {
    if (leftBank.includes(entity)) {
      leftBank = leftBank.filter((e) => e !== entity);
      rightBank.push(entity);
      moves.push(`Крестьянин перевез ${entity} from ${currentBank}`);
    }
  } else {
    if (rightBank.includes(entity)) {
      rightBank = rightBank.filter((e) => e !== entity);
      leftBank.push(entity);
      moves.push(`Крестьянин перевез ${entity} from ${currentBank}`);
    }
  }
  currentBank = currentBank === 'left' ? 'right' : 'left'; // Меняем берег
  counter.textContent = moveCount++;
  markBank(currentBank)
  displayState(); // Обновляем состояние
}

// Функция для проверки безопасности состояния
function isSafe() {
  if (leftBank.includes('Коза') && leftBank.includes('Волк')) {
    console.log('Волк съест козу');
    return false; // Волк съест козу
  }
  if (leftBank.includes('Коза') && leftBank.includes('Капуста')) {
    console.log('Коза съест капусту');
    return false; // Коза съест капусту
  }
  if (rightBank.includes('Коза') && rightBank.includes('Волк')) {
    console.log('Волк съест козу');
    return false; // Волк съест козу
  }
  if (rightBank.includes('Коза') && rightBank.includes('Капуста')) {
    console.log('Коза съест капусту');
    return false; // Коза съест капусту
  }
  return true;
}

// Запускаем решение загадки
displayState();
