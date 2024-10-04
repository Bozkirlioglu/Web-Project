const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const nodemailer = require('nodemailer');
const User = require('./models/User');
const sequelize = require('./db');

const SECRET_KEY = 'your-secret-key';
const EMAIL_SECRET_KEY = 'your-email-secret-key';

class AuthService {
  async register(password, Name, email) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ password: hashedPassword, Name, email, isActive: false });

      const token = jwt.sign({ email: user.email }, EMAIL_SECRET_KEY, { expiresIn: '15m' });
      const activationUrl = `http://localhost:3000/auth/activate/${token}`;

      // Send email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'your-email@gmail.com',
          pass: 'your-email-password',
        },
      });

      const mailOptions = {
        from: 'your-email@gmail.com',
        to: user.email,
        subject: 'Account Activation',
        text: `Please activate your account by clicking the following link: ${activationUrl}`,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error in register method:', error);
      throw error;
    }
  }

  async activate(token) {
    try {
      const decoded = jwt.verify(token, EMAIL_SECRET_KEY);
      const user = await User.findOne({ where: { email: decoded.email } });
      if (!user) {
        throw new Error('User not found');
      }
      console.log('Activating user:', user); // Debugging line
      user.isActive = true;
      await user.save();
      console.log('User activated:', user); // Debugging line
    } catch (error) {
      console.error('Error in activate method:', error);
      throw error;
    }
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.isActive) {
      throw new Error('User not activated');
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