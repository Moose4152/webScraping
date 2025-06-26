function generateSessionId() {
  return Math.random().toString(36).substr(2, 16) + Date.now().toString(36);
}

export function setSession() {
  const sessionId = generateSessionId();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 30 minutes
  sessionStorage.setItem('loggedIn', 'true');
  sessionStorage.setItem('sessionId', sessionId);
  sessionStorage.setItem('expiresAt', expiresAt.toString());
}

export function clearSession() {
  sessionStorage.removeItem('loggedIn');
  sessionStorage.removeItem('sessionId');
  sessionStorage.removeItem('expiresAt');
}

export function isLoggedIn() {
  const loggedIn = sessionStorage.getItem('loggedIn') === 'true';
  const expiresAt = parseInt(sessionStorage.getItem('expiresAt'), 10);
  if (!loggedIn || !expiresAt || Date.now() > expiresAt) {
    clearSession();
    return false;
  }
  return true;
}

export function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = 'index.html';
  }
}

export function getSessionId() {
  return sessionStorage.getItem('sessionId');
} 