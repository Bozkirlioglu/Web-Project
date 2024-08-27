import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

const ProtectedPage = () => <h3>Protected Page</h3>;

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/protected" element={<ProtectedRoute component={ProtectedPage} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;