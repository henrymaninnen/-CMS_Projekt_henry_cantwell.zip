let loginIdentifier = document.querySelector("#identifier");
let loginPassword = document.querySelector("#password");

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
const body = document.querySelector("body")
const login = async () => {
    let response = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: loginIdentifier.value,
        password: loginPassword.value,
        email:registerEmail.value,
        username:registerUsername.value
    });
    console.log(response);
    sessionStorage.setItem("token", response.data.jwt);
    
   
    let profileOnly = document.querySelector(".profile-only")
    if (sessionStorage.getItem("token", response.data.jwt)) {
      profileOnly.classList.add("hidden");

      let profilePage = document.createElement("div");
      profilePage.innerHTML += `
      <li>
      <h3>Din inloggninguppgfiter</h3>
          <p>${loginIdentifier.value}</p>
          <p>${response.data.user.username}</p>
          <p>Användaren blev registread ${response.data.user.createdAt.slice(0,10)}</p
          </li> `
        body.append(profilePage);
    }
 
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


//låna böcker

let title = document.querySelector("#title");
let author = document.querySelector("#author");
let rating = document.querySelector("#rating");
let cover = document.querySelector("#cover");
let genre = document.querySelector("#genre");
let type = document.querySelector("#type");
let lenght = document.querySelector("#lenght");

let writeOutBook = document.querySelector("#writeOutBook")
const addBook = async () => {
    let response = await axios.post(
        "http://localhost:1337/api/books",
        {
          data:{
            title:title.value,
            author:author.value,
            rating:rating.value,
            genre:genre.value,
            type:type.value,
            lenght:lenght.value
          }  
        });

        let addBook = document.createElement("div");
      addBook.innerHTML += `
      <li>
      <h3>Böcker ${} hyr ut</h3>
          <p>titel ${title.value}</p>
          <p>författare ${author.value}</p>
          <p>betyg ${rating.value}</p>
          <p>genre ${genre.value}</p>
          <p>film eller bok ${type.value}</p>
          <p>längd ${lenght.value}</p>
          </li> `
        body.append(addBook);
              console.log(response);     
}
