require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Ricely API' }));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/plaid', require('./routes/plaid'));
app.use('/api/transactions', require('./routes/transactions'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
