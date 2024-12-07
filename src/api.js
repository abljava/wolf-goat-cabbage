const BASE_URL = 'http://localhost:3000/';

// Получение всех пользователей
export function getUsers() {
  return fetch(BASE_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка получения данных');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Ошибка при получении пользователей:', error);
      throw error;
    });
}

// Добавление новго пользователя
export function addUser(formData) {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка получения данных');
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
}
