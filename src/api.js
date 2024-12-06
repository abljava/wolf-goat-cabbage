// Получение всех пользователей
export function getUsers() {
  return fetch('http://localhost:3000/')
    .then((response) => response.json())
    .then((data) => {
      // console.log('Пользователи api:', data);
      return data;
    })
    .catch((error) => {
      console.error('Ошибка при получении пользователей:', error);
    });
}

// Регистрация новго пользователя
export function register(formData) {
  return fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('register: ', data);
    })
    .catch((error) => {
      document.getElementById('message').textContent =
        'Ошибка: ' + error.message;
    });
}
