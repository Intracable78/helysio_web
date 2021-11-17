const express = require('express')
const registerController = require('./Controllers/registerController');
const loginController = require('./Controllers/loginController');
const app = express()
const port = 3000
const auth = require('./middleware/auth');
const shopController = require('./Controllers/shopController');
const postController = require('./controllers/postController.js');
const categoryController = require('./controllers/categoryController.js');
app.use(express.json());

app.get('/me', auth, (req, res) => {
  res.send('Hello World!')
})

app.use('/register', registerController);
app.use('/login', loginController);
app.use('/post',postController);
app.use('/category',categoryController)
app.use('/shop', shopController);


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

