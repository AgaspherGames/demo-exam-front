function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}
function loadUser() {
  return JSON.parse(localStorage.getItem("user"));
}
function clearUser() {
  return localStorage.removeItem("user");
}

export default {
  saveUser,
  loadUser,
  clearUser
};
