const express = require('express')
const registerController = require('./Controllers/registerController');
const app = express()
const port = 3000


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/register', registerController);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

