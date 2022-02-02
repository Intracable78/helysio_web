const express = require('express')
const registerController = require('./Controllers/registerController');
const loginController = require('./Controllers/loginController');
const app = express()
const port = 3000
const shopController = require('./Controllers/shopController');
const postController = require('./controllers/postController.js');
const categoryController = require('./controllers/categoryController.js');
const gameController = require('./controllers/gameController.js');
const adminCategoryController = require('./Controllers/Admin/adminCategory');
const adminGameController = require('./Controllers/Admin/adminGameController');
const adminPostController = require('./Controllers/Admin/adminPostController');
const adminShopController = require('./Controllers/Admin/adminShopController');
const adminUserController = require('./Controllers/Admin/adminUserController');
const paypalController = require('./Controllers/Payment/paypalController');

const isAdmin = require('./middleware/isAdmin');

app.use(express.json());

//user routes

app.use('/register', registerController);
app.use('/login', loginController);
app.use('/post', postController);
app.use('/category', categoryController)
app.use('/shop', shopController);
app.use('/game', gameController);

//admin routes

app.use('/admin/category', isAdmin, adminCategoryController);
app.use('admin/post', isAdmin, adminPostController);
app.use('admin/game', isAdmin, adminGameController);
app.use('admin/shop', isAdmin, adminShopController);
app.use('/admin/user', isAdmin, adminUserController);

//payement routes
app.use('/payment', paypalController);


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

