let loginIdentifier = document.querySelector("#identifier");
let loginPassword = document.querySelector("#password");

let registerUsername = document.querySelector("#registerUsername");
let registerEmail = document.querySelector("#registerEmail");
let registerPassword = document.querySelector("#registerPassword");

const register = async () => {
  let response = await axios.post(
    "http://localhost:1337/api/auth/local/register",
    {
      username: registerUsername.value,
      password: registerPassword.value,
      email: registerEmail.value,
    }
  );
  console.log(response);
  sessionStorage.setItem("token", response.data.jwt);

  let welcomeRegUser = document.querySelector("h3");
  welcomeRegUser.innerText = `Välkommen ${response.data.user.username}`;
};
const body = document.querySelector("body");
const login = async () => {
  let response = await axios.post("http://localhost:1337/api/auth/local", {
    identifier: loginIdentifier.value,
    password: loginPassword.value,
    email: registerEmail.value,
    username: registerUsername.value,
  });
  console.log(response);
  sessionStorage.setItem("token", response.data.jwt);

  let profileOnly = document.querySelector(".reg-login");
  if (sessionStorage.getItem("token", response.data.jwt)) {
    profileOnly.classList.add("hidden");

    let profilePage = document.createElement("div");
    profilePage.innerHTML += `
      <li>
      <h2>Din profilsida</h2>
      <h3>Din inloggninguppgfiter</h3>
          <p>Email: ${loginIdentifier.value}</p>
          <p>Användarnamn ${response.data.user.username}</p>
          <p>Användaren blev registread ${response.data.user.createdAt.slice(
            0,
            10
          )}</p
          </li> `;
    profilePage.style.margin = "0 auto";
    profilePage.style.display = "flex";
    profilePage.style.alignItems = "center";
    profilePage.style.flexDirection = "column";
    profilePage.style.border = "1px #1313ac solid";
    profilePage.style.padding = "20px 0px";
    profilePage.style.width = "40%";
    profilePage.style.margin = "10px auto";

    document.querySelector(".container").append(profilePage);
  }
  let welcomeRegUser = document.querySelector("h3");
  welcomeRegUser.innerText = `Välkommen ${response.data.user.username}`;
};

const logout = () => {
  const logoutBtn = document.querySelector("logout-btn");
  let confirmlogout = confirm("Är du 100 på att du vill logga ut?");

  if (confirmlogout) {
    window.sessionStorage.clear();
    loggedIn = false;
    location.reload();
  }
};

//låna böcker

// let title = document.querySelector("#title");
// let author = document.querySelector("#author");
// let rating = document.querySelector("#rating");
// let image = document.querySelector("#image");
// let genre = document.querySelector("#genre");
// let type = document.querySelector("#type");
// let lenght = document.querySelector("#lenght");

// const reloadBooks = async () => {
//   let response = await axios.get("http://localhost:1337/api/books", {

//   });
//   console.log(response.data);

//     // //     let addBook = document.createElement("div");
//     // //   addBook.innerHTML += `
//     // //   <li>
//     // //  <h3>Låna ut bok</h3>
//     // //      <p>titel: ${title.value}</p>
//     // //      <p>författare: ${author.value}</p>
//     // //      <p>betyg: ${rating.value}</p>
//     // //       <p>genre: ${genre.value}</p>
//     // //       <p>film eller bok: ${type.value}</p>
//     // //       <p>längd: ${lenght.value}</p>
//     // //   </li> `
//     // //   body.append(addBook);
//     // //           console.log(response);
// };
// reloadBooks();
//  const addBook = async () => {
//      let response = await axios.post(
//          "http://localhost:1337/api/books", {

//           data:{
//             title:title.value,
//             author:author.value,
//             rating:rating.value,
//             genre:genre.value,
//            type:type.value,
//             lenght:lenght.value
//           },

//         }

//config
//             headers: {
//                 Authorization: `Bearer ${sessionStorage.getItem("token")}`
//             }
//         })

//               let image = document.querySelector("#image").files;
//               let imgData = new FormData();
//               imgData.append('files', image[0]);

//               // Laddar upp bild till Strapi.
//               let imageId = res.data[0].id;
//            axios.post("http://localhost:1337/api/upload", imgData, {

//                        //request body
//                    data: {
//                     image:imageId

//                 }
//             },
//             {    headers: {
//                       Authorization: `Bearer ${sessionStorage.getItem("token")}`
//                   }
//                 })

//         let addBook = document.createElement("div");
//       addBook.innerHTML += `
//       <li>
//       <h3>Låna ut bok</h3>
//           <p>titel: ${title.value}</p>
//           <p>författare: ${author.value}</p>
//           <p>betyg: ${rating.value}</p>
//           <p>genre: ${genre.value}</p>
//           <p>film eller bok: ${type.value}</p>
//           <p>längd: ${lenght.value}</p>
//           </li> `
//         body.append(addBook);
//               console.log(response);
//
let renderBooks = async () => {
  let response = await axios.get("http://localhost:1337/api/books?populate=*");
  console.log(response.data);

  response.data.data.forEach((book) => {
    // let title = document.querySelector("#title");
    // let author = document.querySelector("#author");
    // let rating = document.querySelector("#rating");
    // let image = document.querySelector("#image");
    // let genre = document.querySelector("#genre");
    // let type = document.querySelector("#type");
    // let lenght = document.querySelector("#lenght");

    let bookContainer = document.createElement("div");
    let title = document.createElement("h2");
    let author = document.createElement("p");
    let rating = document.createElement("p");
    let imageDiv = document.createElement("div");
    let genre = document.createElement("p");
    let type = document.createElement("p");
    let lenght = document.createElement("p");
    let bookOwner = document.createElement("p");

    title.innerText = `titel: ${book.attributes.title}`;
    author.innerText = `författare: ${book.attributes.author}`;
    rating.innerText = `sidor: ${book.attributes.rating}`;
    imageDiv.innerHTML = `<img src="http://localhost:1337${book.attributes.image.data.attributes.url}"> `;
    genre.innerText = `genre: ${book.attributes.genre}`;
    type.innerText = `typ: ${book.attributes.type}`;
    lenght.innerText = `längd: ${book.attributes.lenght}`;
    bookOwner.innerHTML = `<strong>Gjord av:</strong> </br>
    Email: ${book.attributes.user.data.attributes.email}; </br>
    Användarnamn: ${book.attributes.user.data.attributes.username}`;

    bookContainer.append(
      title,
      author,
      rating,
      imageDiv,
      genre,
      type,
      lenght,
      bookOwner
    );
    bookContainer.style.display = "flex";
    bookContainer.style.alignItems = "center";
    bookContainer.style.flexDirection = "column";
    bookContainer.style.border = "1px #1313ac solid";
    bookContainer.style.padding = "20px 0px";
    bookContainer.style.width = "40%";
    bookContainer.style.margin = "10px auto";

    document.querySelector(".container").append(bookContainer);
  });
};
renderBooks();
