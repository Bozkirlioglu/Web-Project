const express = require('express');
const router = express.Router();
const authService = require('./authService');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

router.post('/register', async (req, res) => {
  const { password, Name, email } = req.body;
  console.log('Received registration data:', { password, Name, email }); // Debugging line
  try {
    await authService.register(password, Name, email);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in register route:', error);
    res.status(500).json({ message: 'Error registering user!!' });
  }
});

module.exports = router;