export function setToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  localStorage.getItem('token');
}

export function deleteToken() {
  localStorage.removeItem('token');
}

export function setUsers(user) {
  const { rol, username, id} = user;
  localStorage.setItem('rol', rol);
  localStorage.setItem('username', username);
  localStorage.setItem('userId', id)
}

export function deleteUser() {
  localStorage.removeItem('type');
  localStorage.removeItem('username');
}

export function resetLogin() {
  localStorage.removeItem('token');
  localStorage.removeItem('rol');
  localStorage.removeItem('username');
  localStorage.removeItem('logged');
}

export function isLoggedIn() {
  let token = localStorage.getItem('token');
  return token ? true : false;
}
