// Определяем начальное состояние
let leftBank = ['Волк', 'Коза', 'Капуста'];
let rightBank = [];
let currentBank = 'left'; // Текущий берег (left или right)
let moves = []; // Для хранения истории перемещений
const buttonContainer = document.querySelector('.buttons-container');
const leftBankDiv = document.getElementById('left-bank-buttons'); // Контейнер для кнопок левого берега
const rightBankDiv = document.getElementById('right-bank-buttons');

function renderButtons() {
  leftBankDiv.innerHTML = ''; // Очищаем контейнер левого берега
  rightBankDiv.innerHTML = ''; // Очищаем контейнер правого берега

  // Сначала рендерим кнопки на левом берегу
  leftBank.forEach(entity => {
    const button = document.createElement('button');
    button.textContent = entity;
    button.onclick = () => move(entity);
    leftBankDiv.appendChild(button); // Добавляем кнопку в контейнер левого берега
  });

  // Затем рендерим кнопки на правом берегу
  rightBank.forEach(entity => {
    const button = document.createElement('button');
    button.textContent = entity;
    button.onclick = () => move(entity);
    rightBankDiv.appendChild(button); // Добавляем кнопку в контейнер правого берега
  });
}

// Функция для отображения состояния
function displayState() {
  console.log(`Левый берег: ${leftBank.join(', ')}`);
  console.log(`Правый берег: ${rightBank.join(', ')}`);
  console.log(`Текущий берег: ${currentBank}`);
  console.log('История перемещений:', moves.join(' -> '));
  renderButtons();
}

// Функция для перемещения сущности

function move(entity) {
  if (currentBank === 'left') {
    if (leftBank.includes(entity)) {
      leftBank = leftBank.filter(e => e !== entity);
      rightBank.push(entity);
      moves.push(`Крестьянин перевез ${entity} from ${currentBank}`);
    }
  } else {
    if (rightBank.includes(entity)) {
      rightBank = rightBank.filter(e => e !== entity);
      leftBank.push(entity);
      moves.push(`Крестьянин перевез ${entity} from ${currentBank}`);
    }
  }
  currentBank = currentBank === 'left' ? 'right' : 'left'; // Меняем берег

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

