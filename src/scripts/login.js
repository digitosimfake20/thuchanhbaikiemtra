import { login } from "./database.js";

document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("submitlogin");
  const logging = document.getElementById("logging");

  submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const username = document.getElementById("usernameLogin").value.trim();
    const password = document.getElementById("passwordLogin").value.trim();

    logging.innerHTML = "";

    if (!username || !password) {
      logging.innerHTML = `<h5>Vui lòng nhập đầy đủ tên người dùng hoặc mật khẩu.</h5>`;
      return;
    }

    const user = login(username, password);
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "/duan/src/foldertrang/main/mainmenu.html";
    } else {
      logging.innerHTML = `<h5>Tên người dùng hoặc mật khẩu không đúng</h5>`;
    }
  });
});
