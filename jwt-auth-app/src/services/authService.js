import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct named import

const API_URL = 'http://your-api-url/auth';

class AuthService {
  login(username, password) {
    return axios.post(`${API_URL}/login`, { username, password })
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