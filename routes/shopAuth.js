const express = require('express');
const { registerShopUser, loginShopUser } = require('../controllers/shopAuthController');
const router = express.Router();

// Shop user authentication routes
router.post('/register', registerShopUser);
router.post('/login', loginShopUser);

module.exports = router;
