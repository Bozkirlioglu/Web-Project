import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct named import

const API_URL = 'http://130.61.209.76:3000/auth/';

class AuthService {
  login(email, password) {
    return axios.post(`${API_URL}/login`, { email, password })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
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
export default authServiceInstance;