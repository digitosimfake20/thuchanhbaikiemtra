import { addToCart, getCurrentUser } from "./database.js";

const currentUser = getCurrentUser();
const userKey = currentUser ? currentUser.user : null;

const products = [
  { id:1, title:"Áo Thun Cotton", desc:"Áo thun form rộng", price:199000, img:"https://www.uniqlo.com/jp/ja/contents/feature/masterpiece/common/img/product/item_05_kv.jpg?240112" },
  { id:2, title:"Giày Sneaker", desc:"Giày sneaker nam", price:599000, img:"https://file.hstatic.net/1000284478/file/giay-sneaker-la-gi-1_6192e17604054d5db0d09d7d8491852f.png" },
  { id:3, title:"Túi Xách", desc:"Túi xách nữ", price:299000, img:"https://www.velisa.vn/wp-content/uploads/2021/12/O1CN01x5IQrR1ndLMJuzMdP_2211113695112-0-cib-600x600.jpeg" },
  { id:4, title:"Mũ Lưỡi Trai", desc:"Mũ unisex", price:99000, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpHYkNzf-M90gbOYDQtXRB6V0kR0ez14r9Vg&s" },
  { id:5, title:"Túi Xách", desc:"Túi xách nữ", price:299000, img:"https://www.velisa.vn/wp-content/uploads/2021/12/O1CN01x5IQrR1ndLMJuzMdP_2211113695112-0-cib-600x600.jpeg" },
  { id:6, title:"Mũ Lưỡi Trai", desc:"Mũ unisex", price:99000, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpHYkNzf-M90gbOYDQtXRB6V0kR0ez14r9Vg&s" },
];

const itemGrid = document.getElementById("itemGrid");

function displayProducts() {
  itemGrid.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.title}" style="max-width:100%;height:150px;">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <p style="font-weight:bold;">${p.price}₫</p>
      <button class="btn btn-warning">Cho Vào Giỏ Hàng</button>
      <button class="actionbutton">Mua</button>
    `;
    div.querySelector("button").addEventListener("click", () => {
      if (userKey) {
        addToCart(p, userKey);
        alert(`Đã thêm ${p.title}`);
      } else {
        alert("Vui lòng đăng nhập để thêm vào giỏ hàng.");
      }
    });
    itemGrid.appendChild(div);
  });
}

//suggestbar
const suggestions = ["Áo thun cotton", "Giày Sneaker nam", "Túi xách thời trang", "Mũ lưỡi trai unisex"];

const searchInput = document.getElementById("searchinput");
const suggestionBox = document.getElementById("suggestions");

function showSuggestions(query) {
  suggestionBox.innerHTML = "";
  if (!query.trim()) {
    suggestionBox.classList.add("d-none");
    return;
  }
  const results = suggestions.filter(item => item.toLowerCase().includes(query.toLowerCase()));
  if (results.length === 0) {
    suggestionBox.classList.add("d-none");
    return;
  }

  results.forEach(item => {
    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.textContent = item;

    div.addEventListener("click", () => {
      searchInput.value = item;
      suggestionBox.classList.add("d-none");
    });

    suggestionBox.appendChild(div);
  });

  suggestionBox.classList.remove("d-none");
}

searchInput.addEventListener("input", () => {
  showSuggestions(searchInput.value);
});

document.addEventListener("click", (e) => {
  if (!e.target.closest("#searchinput") && !e.target.closest("#suggestions")) {
    suggestionBox.classList.add("d-none");
  }
});


document.addEventListener("DOMContentLoaded", () => {
  displayProducts();

  const userGreeting = document.getElementById("userGreeting");
  const logoutBtn = document.getElementById("logoutBtn");
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");

  const currentUser = getCurrentUser();

  if (currentUser && currentUser.user) {
    userGreeting.innerHTML = `<h5 style="color: white; font-weight: bold; ">Chào mừng bạn! ${currentUser.user}<h5>`;
    userGreeting.style.display = "inline-block";
    logoutBtn.style.display = "inline-block";
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";
  } else {
    userGreeting.textContent = "";
    userGreeting.style.display = "none";
    logoutBtn.style.display = "none";
    loginBtn.style.display = "inline-block";
    signupBtn.style.display = "inline-block";
  }

  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("currentUser");
    window.location.reload();
  });
});
