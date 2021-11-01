const express = require('express')
const registerController = require('./Controllers/registerController');
const loginController = require('./Controllers/loginController');
const app = express()
const port = 3000
const auth = require('./middleware/auth');


app.use(express.json());

app.get('/me', auth, (req, res) => {
  res.send('Hello World!')
})

app.use('/register', registerController);
app.use('/login', loginController);




app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

