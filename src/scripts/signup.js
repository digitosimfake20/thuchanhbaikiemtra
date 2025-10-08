
import { signup, database } from "./database.js";

let db = []

function addUserPassWord(username, password) {
    let user = {
        user: username, password: password
    };

    db.push(user);
    console.log(db)
}




document.addEventListener("DOMContentLoaded", () => {
    const submitbutton = document.getElementById("submitsignup");
    submitbutton.addEventListener("click", (event) => {
        event.preventDefault();
        let buguser = document.getElementById("logging");
        let username = document.getElementById("usernameSignUp").value;
        let password = document.getElementById("passwordSignUp").value;
        let confirmpassword = document.getElementById("ConfirmPasswordSignUp").value;

        console.log(username)
        console.log(password)
        console.log(confirmpassword)
        let lengthuser = username.length

        buguser.innerHTML = '';
        if (lengthuser < 8) {
            buguser.innerHTML = `
            <h5>Tên tài khoản ngắn hơn 8 ký tự.<h5>
            `
            return
        }

        if (password !== confirmpassword) {
            buguser.innerHTML = `
            <h5>Mật khẩu không khớp.<h5>
            `
            return
        } else {
            buguser.innerHTML = `
            <h4 class="container bg-success">Đăng ký thành công!<h4>
            `
            addUserPassWord(username, password)
            signup(username,password)


            return
        }

        

    });
    

});

// ignore this one idk man

function hideall() {
    const forms = ['signupform', 'signinform'];
    forms.forEach(id => {
        document.getElementById(id).classList.add("hidden")
    })
}

function showsignup() {
    
}

//hideall()

