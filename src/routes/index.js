const { Router } = require('express');
const router = Router();
const AuthController = require('../controllers/AuthController');
const findAllProducts = require('../controllers/findAllProducts');
const getProductById = require('../controllers/getProductById');
const getProductByModel = require('../controllers/getProductByModel');
const isAdmin = require('../middlewares/isAdmin');
const postProducts = require('../controllers/postProducts.js');
const postCart = require('../controllers/postCart.js');
const paymentGateway = require('../controllers/paymentGateway.js')

//Ruta para obtener todos los productos
router.get('/products', findAllProducts);
router.get('/products/:id', getProductById);
router.get('/model', getProductByModel);

//Ruta para crear productos
router.post('/products', postProducts);

//Ruta para crear carrito y sus items
router.post('/cart', postCart)

//Ruta para el registro de administradores
router.post('/api/admin/firstregister', AuthController.firstSignUpAdmin);
router.post('/api/admin/register', isAdmin, AuthController.signUpAdmin);

// Rutas para el inicio de sesión y el registro con correo electrónico y contraseña
router.post('/api/signin', AuthController.signIn);
router.post('/api/signup', AuthController.signUp);

// Rutas para el inicio de sesión con Google y GitHub
router.get('/auth/google', AuthController.googleSignIn);
router.get('/auth/google/callback', AuthController.googleSignInCallback);
router.get('/auth/github', AuthController.githubSignIn);
router.get('/auth/github/callback', AuthController.githubSignInCallback);

// Ruta para Mercado Pago
router.post("/create_preference", paymentGateway)

module.exports = router;