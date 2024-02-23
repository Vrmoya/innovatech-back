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
router.get("/auth/google", (req, res, next) => {
  console.log("Request to start Google authentication received");
  // Agregar registros de depuración para verificar los parámetros de la solicitud, si es necesario
  next(); // Pasa al siguiente middleware, que es passport.authenticate("google")
}, passport.authenticate("google", { scope: ["profile", "email"] }));


router.get(
  "/auth/google/callback",
  (req, res, next) => {
    console.log('Request to /auth/google/callback received');
    console.log('Request query parameters:', req.query);
    console.log('User authenticated by Google:', req.user);
    next(); // Llama a la siguiente función en la cadena de middlewares
  },
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Llamar a googleSignInCallback pasando req.user como argumento
    googleSignInCallback(req.user, res);
  }
);



router.get('/auth/github', passport.authenticate('github'), githubSignIn);
router.get('/auth/github/callback', passport.authenticate('github'), githubSignInCallback);
module.exports = router;