const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./authController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/auth', authController);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
