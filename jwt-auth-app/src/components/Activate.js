
import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Activate = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        await axios.get(`http://130.61.209.76:3000/auth/activate/${token}`);
        alert('Account activated successfully!');
        navigate('/login');
      } catch (error) {
        console.error('Error activating account:', error);
      }
    };

    activateAccount();
  }, [token, navigate]);

  return (
    <div>
      <h2>Activating your account...</h2>
    </div>
  );
};

export default Activate;