const passport = require('passport');
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
    githubSignInCallback,
    forgotPassword,
    resetPassword  
  } = require('../controllers/AuthController');
  
const findAllProducts = require('../controllers/findAllProducts');
const getProductById = require('../controllers/getProductById');
const getProductByModel = require('../controllers/getProductByModel');
const isAdmin = require('../middlewares/isAdmin');
const postProducts = require('../controllers/postProducts.js');
const postCart = require('../controllers/postCart.js');
const paymentGateway = require('../controllers/paymentGateway.js')
const userGithub = require('../controllers/userGithubById.js')
const userGoogle = require('../controllers/userGoogleById.js');
const getUserByName = require('../controllers/getUserByName.js');
const findAllUsers = require('../controllers/findAllUsers.js');
const deleteProducts = require('../controllers/deleteProducts.js')


//Ruta para obtener todos los productos
router.get('/products', findAllProducts);
router.get('/products/:id', getProductById);
router.get('/model', getProductByModel);

//Ruta para crear productos
router.post('/products', postProducts);

//Ruta para eliminar productos
router.delete('/products/:id', deleteProducts);

//Ruta para crear carrito y sus items
router.post('/cart', postCart)

//Ruta para el registro de administradores
router.post('/api/admin/firstregister', firstSignUpAdmin);
router.post('/api/admin/register', isAdmin, signUpAdmin);

// Rutas para el inicio de sesión y el registro con correo electrónico y contraseña
router.post('/api/signin', signIn);
router.post('/api/signup', signUp);

// Rutas para el inicio de sesión con Google y GitHub
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);


router.get(
  "/auth/google/callback",
  (req, res, next) => {
    console.log('Request to /auth/google/callback received');
    console.log('Request query parameters:', req.query);
    console.log('User authenticated by Google:', req.user);
    next(); // Llama a la siguiente función en la cadena de middlewares
  },
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res, next) => { // <- Agrega 'next' como argumento
    // Llamar a googleSignInCallback pasando req.user como argumento
    googleSignInCallback(req, res, next); // <- Pasa 'next'
  },

 );

router.get('/auth/github', passport.authenticate('github', { scope: ["profile", "email"] }));
router.get(
  "/auth/github/callback",
  (req, res, next) => {
    console.log('Request to /auth/github/callback received');
    console.log('Request query parameters:', req.query);
    console.log('User authenticated by Github:', req.user);
    next(); // Llama a la siguiente función en la cadena de middlewares
  },
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res, next) => { // <- Agrega 'next' como argumento
    // Llamar a googleSignInCallback pasando req.user como argumento
    githubSignInCallback(req, res, next); // <- Pasa 'next'
  }
);
router.get('/get/github/:githubId', userGithub);
router.get('/get/google/:googleId', userGoogle)

// Ruta para Mercado Pago
router.post("/create_preference", paymentGateway)


//Ruta para traer todos los usuarios
router.get('/users', findAllUsers);

 //Ruta para buscar usuarios por nombre
 router.get('/get/user/:name', getUserByName)

 // Ruta para reset password
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/reset-password/:token', resetPassword);

module.exports = router;