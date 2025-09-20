import { getCart, clearPart } from "./database.js";

const cartContainer = document.getElementById("cartContainer");

function renderCart() {
  const cart = getCart();
  cartContainer.innerHTML = "<h4>Giỏ hàng của bạn</h4>";
  if (cart.length === 0) {
    cartContainer.innerHTML += "<p>Chưa có sản phẩm nào...</p>";
    return;
  }

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "item border p-2 mb-2";
    div.innerHTML = `
      <img src="${item.img}" style="width:80px;margin-right:10px;">
      <b>${item.title}</b> - ${item.price}₫
    `;
    cartContainer.appendChild(div);
  });

  const clearBtn = document.createElement("button");
  clearBtn.textContent = "Xóa giỏ hàng";
  clearBtn.className = "btn btn-danger mt-2";
  clearBtn.addEventListener("click", () => {
    clearPart();
    renderCart();
  });
  cartContainer.appendChild(clearBtn);
}

document.addEventListener("DOMContentLoaded", renderCart);
