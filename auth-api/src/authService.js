const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = []; // This should be replaced with a real database

const SECRET_KEY = 'your-secret-key';

class AuthService {
  async register(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
  }

  async login(username, password) {
    const user = users.find(u => u.username === username);
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    return token;
  }
}

module.exports = new AuthService();