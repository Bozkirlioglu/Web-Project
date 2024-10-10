const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authController = require('./authController');
const sequelize = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3001' // Replace with your React app's URL
}));

app.use(bodyParser.json());

app.use('/auth', authController);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});


