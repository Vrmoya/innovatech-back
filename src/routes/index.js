const { Router } = require('express');
const router = Router();
const AuthController = require('../controllers/AuthController');
// const productos = require('../../tech.json');

const  findAllProducts = require('../controllers/findAllProducts');
const getProductById = require('../controllers/getProductById');
const getProductByModel = require('../controllers/getProductByModel');

//Ruta para obtener todos los productos
router.get('/products', findAllProducts);
router.get('/products/:id', getProductById);
router.get('/products/model', getProductByModel);



// Rutas para el inicio de sesión y el registro con correo electrónico y contraseña
router.post('/api/signin', AuthController.signIn);
router.post('/api/signup', AuthController.signUp);

// Rutas para el inicio de sesión con Google y GitHub
router.get('/auth/google', AuthController.googleSignIn);
router.get('/auth/google/callback', AuthController.googleSignInCallback);
router.get('/auth/github', AuthController.githubSignIn);
router.get('/auth/github/callback', AuthController.githubSignInCallback);

module.exports = router;