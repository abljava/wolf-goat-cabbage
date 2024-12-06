const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', (req, res) => {
  const { username } = req.body;
  
  if (!username) {
    return res.status(400).json({ 
      error: 'Имя пользователя обязательно' 
    });
  }
  
  res.json({ 
    username,
    id: Date.now(),
    message: 'Регистрация успешна'
  });
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
}); 