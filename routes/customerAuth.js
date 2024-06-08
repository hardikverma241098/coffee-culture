const express = require('express');
const { registerCustomer, loginCustomer } = require('../controllers/customerAuthController');
const router = express.Router();

// Customer authentication routes
router.post('/register', registerCustomer);
router.post('/login', loginCustomer);

module.exports = router;
