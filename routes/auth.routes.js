const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const { loginLimiter } = require('../middleware/rateLimiter.middleware');
const { validateAuth } = require('../middleware/validation.middleware');

// ✅ Apply validation
router.post('/register', validateAuth, authController.register);
router.post('/login', loginLimiter, validateAuth, authController.login);

module.exports = router;