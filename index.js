const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use('/api/customer/auth', require('./routes/customerAuth'));
app.use('/api/shop/auth', require('./routes/shopAuth'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
