const { Router } = require('express');
const router = Router();
const {
    signIn,
    signUp,
    signUpAdmin,
    firstSignUpAdmin,
    googleSignIn,
    googleSignInCallback,
    githubSignIn,
    githubSignInCallback  
  } = require('../controllers/AuthController');
const findAllProducts = require('../controllers/findAllProducts');
const getProductById = require('../controllers/getProductById');
const getProductByModel = require('../controllers/getProductByModel');
const isAdmin = require('../middlewares/isAdmin');
const postProducts = require('../controllers/postProducts.js');

//Ruta para obtener todos los productos
router.get('/products', findAllProducts);
router.get('/products/:id', getProductById);
router.get('/model', getProductByModel);

//Ruta para crear productos
router.post('/products', postProducts);

//Ruta para el registro de administradores
router.post('/api/admin/firstregister', firstSignUpAdmin);
router.post('/api/admin/register', isAdmin, signUpAdmin);

// Rutas para el inicio de sesión y el registro con correo electrónico y contraseña
router.post('/api/signin', signIn);
router.post('/api/signup', signUp);

// Rutas para el inicio de sesión con Google y GitHub
router.get('/auth/google', googleSignIn, googleSignInCallback);
router.get('/auth/google/callback', googleSignInCallback);
router.get('/auth/github', githubSignIn, githubSignInCallback);
router.get('/auth/github/callback', githubSignInCallback);
module.exports = router;