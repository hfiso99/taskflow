import { useState, type FormEvent } from 'react';
import { useAuth } from './AuthContext';
import styles from './Login.module.css';

export default function Login() {
  const { state, dispatch } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch({ type: 'LOGIN_START' });

    try {
      const res = await fetch(`http://localhost:4000/users?email=${email}`);
      const users = await res.json();

      if (!users.length || users[0].password !== password) {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: 'Email ou mot de passe incorrect',
        });
        return;
      }

      const { password: _, ...user } = users[0];
      const fakeToken = btoa(
        JSON.stringify({
          userId: user.id,
          email: user.email,
          role: 'admin',
          exp: Date.now() + 3600000,
        })
      );

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { ...user, token: fakeToken },
      }); 
    } catch {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: 'Erreur serveur',
      });
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>TaskFlow</h1>

        {state.error && <p className={styles.error}>{state.error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button disabled={state.loading}>
          {state.loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
}