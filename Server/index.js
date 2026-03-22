require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoConnect = require('./config/db.js');
const authRoutes = require('./controllers/authController');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
mongoConnect();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);

app.get('/', (req, res) => {
    res.send('Recipe Sharing Platform API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});