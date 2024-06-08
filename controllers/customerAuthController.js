const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Customer = require('../models/Customer');
const { validationResult } = require('express-validator');
require('dotenv').config();

const registerCustomer = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, firstName, lastName } = req.body;
    try {
        let customer = await Customer.findOne({ email });
        if (customer) {
            return res.status(400).json({ msg: 'Customer already exists' });
        }
        customer = new Customer({ email, password, firstName, lastName });
        await customer.save();
        const payload = { id: customer.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const loginCustomer = async (req, res) => {
    const { email, password } = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        const payload = { id: customer.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { registerCustomer, loginCustomer };
