const express = require('express')
const app = express()
const port = 3000

const postController = require('./controllers/postController.js');
app.use(express.json());

app.use('/post',postController);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})