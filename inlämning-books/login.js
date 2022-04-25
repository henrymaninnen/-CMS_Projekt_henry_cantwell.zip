/* let loginIdentifier = document.querySelector("#identifier");
let loginPassword = document.querySelector("#password");

const login = async () => {
    let response = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: loginIdentifier.value,
        password: loginPassword.value
    });
    console.log(response);
    sessionStorage.setItem("token", response.data.jwt);
} */

let registerUsername = document.querySelector("#registerUsername");
let registerEmail = document.querySelector("#registerEmail");
let registerPassword = document.querySelector("#registerPassword");

const register = async () => {
    let response = await axios.post(
        "http://localhost:1337/api/auth/local/register",
    {
        username:registerUsername.value,
        password:registerPassword.value,
        email:registerEmail.value
    });
    console.log(response);
    sessionStorage.setItem("token", response.data.jwt);
    let userStatus = document.querySelector(".user");
    userStatus.innerText =`hej ${response.data.user.username} <br> Din mail är ${response.data.user.email}`;
    

}
const login = async () => {
    let response = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: loginIdentifier.value,
        password: loginPassword.value
    });
    console.log(response);
    sessionStorage.setItem("token", response.data.jwt);

 
}


const logout = () => {
    const logoutBtn = document.querySelector("logout-btn");
    let confirmlogout = confirm("Är du 100 på att du vill logga ut?")

    if (confirmlogout){
        window.sessionStorage.clear();
        loggedIn = false
        location.reload();
    }
}