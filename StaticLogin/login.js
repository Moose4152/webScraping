import { setSession } from './auth.js';

export async function handleLoginSubmit(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorDiv = document.getElementById('loginError');
  try {
    const res = await fetch('users.json');
    const users = await res.json();
    const user = users.find(u => u.id === username && u.password === password);
    if (user) {
      setSession();
      window.location.href = 'landing.html';
    } else {
      errorDiv.textContent = 'Invalid username or password.';
      errorDiv.style.display = 'block';
    }
  } catch (err) {
    errorDiv.textContent = 'Error checking credentials. Please try again.';
    errorDiv.style.display = 'block';
  }
} 