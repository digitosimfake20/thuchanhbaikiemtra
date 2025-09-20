import { addToCart } from "./database.js";

const products = [
  { id:1, title:"Áo Thun Cotton", desc:"Áo thun form rộng", price:199000, img:"https://via.placeholder.com/300x200?text=Aothun" },
  { id:2, title:"Giày Sneaker", desc:"Giày sneaker nam", price:599000, img:"https://via.placeholder.com/300x200?text=Sneaker" },
  { id:3, title:"Túi Xách", desc:"Túi xách nữ", price:299000, img:"https://via.placeholder.com/300x200?text=Tui" },
  { id:4, title:"Mũ Lưỡi Trai", desc:"Mũ unisex", price:99000, img:"https://via.placeholder.com/300x200?text=Mu" },
];

const itemGrid = document.getElementById("itemGrid");

function displayProducts() {
  itemGrid.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.title}" style="max-width:100%;height:auto;">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <p style="font-weight:bold;">${p.price}₫</p>
      <button class="btn btn-warning">Cho Vào Giỏ Hàng</button>
      <button class="actionbutton">Mua</button>
    `;
    div.querySelector("button").addEventListener("click", () => {
      addToCart(p);
      alert(`Đã thêm ${p.title}`);
    });
    itemGrid.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
});
