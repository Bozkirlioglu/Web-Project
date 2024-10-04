const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const User = require('./models/User');
const sequelize = require('./db');

const SECRET_KEY = 'your-secret-key';

class AuthService {
  async register(password, Name, email) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ password: hashedPassword, Name, email });
    print("User created successfully");
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    return token;
  }

  getCurrentUser(token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      return null;
    }
  }

  isAuthenticated(token) {
    const user = this.getCurrentUser(token);
    if (user) {
      return user.exp * 1000 > Date.now();
    }
    return false;
  }
}

const authServiceInstance = new AuthService();
module.exports = authServiceInstance;