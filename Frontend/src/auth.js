export function isAuthenticated() {
    return localStorage.getItem('auth_token') !== null;
  }

export function retrieveRole(){
  return localStorage.getItem('entity');
}
  
  export function loginUser(token) {
    localStorage.setItem('auth_token', token);  // Sauvegarder le token dans localStorage
  }
  
  export function logoutUser() {
    localStorage.removeItem('auth_token');  // Supprimer le token du localStorage
  }