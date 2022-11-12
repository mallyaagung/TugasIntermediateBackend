const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const { protect } = require('../middleware/auth');


router.post('/registrasi', userController.registrasi);
router.post('/login', userController.login);
router.post('/refreshtoken',protect, userController.refreshToken);
router.get('/profile',protect, userController.profile);


module.exports = router