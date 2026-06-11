// Auth helpers shared across the app

export function getStoredUser() {
  try {
    const raw = localStorage.getItem('dmh_user') || sessionStorage.getItem('dmh_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  return !!(
    (localStorage.getItem('dmh_logged_in') === 'true' || sessionStorage.getItem('dmh_logged_in') === 'true') &&
    getStoredUser()
  );
}

export function logout() {
  localStorage.removeItem('dmh_logged_in');
  sessionStorage.removeItem('dmh_logged_in');
}
