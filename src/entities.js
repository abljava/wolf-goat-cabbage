const entities = ["Крестьянин", "Волк", "Коза", "Капуста"];
let leftBank = [...entities]; // Все сущности на левом берегу
let rightBank = []; // Пустой правый берег
let moveCount = 0; // Счетчик нажатий

export function isSafe(bank) {
  // Проверка совместимости сущностей на берегу
  if (
    bank.includes("Волк") &&
    bank.includes("Коза") &&
    !bank.includes("Крестьянин")
  ) {
    return false; // Волк съест козу
  }
  if (
    bank.includes("Коза") &&
    bank.includes("Капуста") &&
    !bank.includes("Крестьянин")
  ) {
    return false; // Коза съест капусту
  }
  return true; // Все в порядке
}

export function checkBanks() {
  console.log(`Левый берег: ${leftBank.join(", ")}`);
  console.log(`Правый берег: ${rightBank.join(", ")}`);
  console.log(`Количество перевозок: ${moveCount}`);

  if (!isSafe(leftBank)) {
    console.log("Опасная ситуация на левом берегу!");
  }
  if (!isSafe(rightBank)) {
    console.log("Опасная ситуация на правом берегу!");
  }
}

export function move(entitiesToMove) {
  entitiesToMove.forEach((entity) => {
    if (leftBank.includes(entity)) {
      // Перевозим с левого берега на правый
      leftBank = leftBank.filter((e) => e !== entity);
      rightBank.push(entity);
    } else {
      // Перевозим с правого берега на левый
      rightBank = rightBank.filter((e) => e !== entity);
      leftBank.push(entity);
    }
  });

  moveCount++;
  checkBanks();
}


