const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const User = require('./models/User');
const sequelize = require('./db');

const SECRET_KEY = 'your-secret-key';

class AuthService {
  async register(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
  }

  async login(username, password) {
    const user = await User.findOne({ where: { username } });
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

  getCurrentUser() {
    // Implement this method based on your application's requirements
  }

  isAuthenticated() {
    const user = this.getCurrentUser();
    if (user && user.token) {
      const decodedToken = jwtDecode(user.token);
      return decodedToken.exp * 1000 > Date.now();
    }
    return false;
  }
}

const authServiceInstance = new AuthService();
module.exports = authServiceInstance;