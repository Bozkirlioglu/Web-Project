const express = require('express');
const router = express.Router();
const authService = require('./authService');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.post('/register', async (req, res) => {
  const { password, Name, email } = req.body;
  try {
    await authService.register(password, Name, email);
    res.status(201).json({ message: 'User registered successfully. Please check your email to activate your account.' });
  } catch (error) {
    console.error('Error in register route:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

router.get('/activate/:token', async (req, res) => {
  const { token } = req.params;
  try {
    await authService.activate(token);
    res.status(200).json({ message: 'User activated successfully' });
  } catch (error) {
    console.error('Error in activate route:', error);
    res.status(500).json({ message: 'Error activating user' });
  }
});

module.exports = router;