export function getCart(user) {
  if (!user) return [];
  const carts = JSON.parse(localStorage.getItem("carts")) || {};
  return carts[user] || [];
}

export function addToCart(product, user) {
  if (!user) return;
  const carts = JSON.parse(localStorage.getItem("carts")) || {};
  if (!carts[user]) carts[user] = [];
  carts[user].push(product);
  localStorage.setItem("carts", JSON.stringify(carts));
  console.log(carts[user]);
}

export function clearPart(index, user) {
  if (!user) return;
  const carts = JSON.parse(localStorage.getItem("carts")) || {};
  if (carts[user]) {
    carts[user].splice(index, 1);
    localStorage.setItem("carts", JSON.stringify(carts));
  }
}

// login, signup

export function signup(username, password) {
  const db = database();
  const user = { user: username, password: password }
  db.push(user)
  localStorage.setItem("UserAndPassword", JSON.stringify(db))
  console.log(user)
}

export function database() {
  return JSON.parse(localStorage.getItem("UserAndPassword")) || [];
}

export function login(username, password) {
  const db = JSON.parse(localStorage.getItem("UserAndPassword")) || [];
  for (let user of db) {
    console.log(user);
    if (user.user === username && user.password === password) {
      return user;
    }
  }
  return null;
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}
