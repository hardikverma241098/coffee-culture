const express = require('express');
const { registerCustomer, loginCustomer } = require('../controllers/customerAuthController');
const { body } = require('express-validator');
const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('firstName').isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
    body('lastName').isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long'),
  ], registerCustomer);

router.post('/login', [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
  ], loginCustomer);

module.exports = router;
