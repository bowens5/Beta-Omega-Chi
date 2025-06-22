import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '2004') {
      localStorage.setItem('loggedIn', 'yes');
      navigate('/calendar');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <section id="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </section>
  );
}

export default LoginPage;
