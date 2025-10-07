import { getCart, clearPart, getCurrentUser } from "./database.js";

const cartContainer = document.getElementById("cartContainer");

function renderCart(user) {
  const cart = getCart(user);
  cartContainer.innerHTML = "<h4>Giỏ hàng của bạn</h4>";

  if (cart.length === 0) {
    cartContainer.innerHTML += "<p>Chưa có sản phẩm nào...</p>";
    return;
  }

  cart.forEach((item, index) => {
    console.log("item:" + item)
    console.log("index:" + index)
    console.log("------")
    console.log(item, index)
    const div = document.createElement("div");
    div.className = "item border p-2 mb-2";
    div.innerHTML = `
      <img src="${item.img}" style="width:80px;margin-right:10px;">
      <b>${item.title}</b> - ${item.price}₫
    `;

    const clearBtn = document.createElement("button");
    clearBtn.textContent = "Xóa";
    clearBtn.className = "btn btn-danger mt-2 ms-2";

    clearBtn.addEventListener("click", () => {
      clearPart(index, user);
      renderCart(user);
    });

    div.appendChild(clearBtn);
    cartContainer.appendChild(div);
  });
}

// suggestion bar

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
  const currentUser = getCurrentUser();
  renderCart(currentUser ? currentUser.user : null);

  const userGreeting = document.getElementById("userGreeting");
  const logoutBtn = document.getElementById("logoutBtn");
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");

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
    window.location.href = "../index.html";
  });
});
