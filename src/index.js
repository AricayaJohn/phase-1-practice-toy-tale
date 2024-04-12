let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector(".add-toy-form")
  form.addEventListener("submit", addNewToy)

  document.addEventListener("click", (event) => {
    if(event.target.matches(".like-btn")){
      updateLikes(event)
    }
  })
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys();
});
//getfetch data from db.json
function getToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(data => data.forEach(toy => showToy(toy)))
  }
//getpost data from db.json
function showToy(toy){
  const toyCollection = document.getElementById("toy-collection")
  const div = document.createElement("div")
  /* <div class="card">*/
  div.classList.add("card")
  /*<h2>Woody</h2>*/
  const h2 = document.createElement("h2")
  h2.textContent = toy.name
 /* <img src="[toy_image_url]" class="toy-avatar" />*/
  const img = document.createElement("img")
  img.src = toy.image
  img.classList.add("toy-avatar")
  /*<p>4 Likes</p>*/
  const p = document.createElement("p")
  p.textContent = `${toy.likes} likes`;
  //   <button class="like-btn" id="[toy_id]">Like ❤️</button>
// </div> */
  const button = document.createElement("button")
  button.classList.add("like-btn")
  button.textContent = "like"
  button.id = toy.id
  button.addEventListener("click", (event) =>{
  } )

  div.append(h2, img, p, button)
  toyCollection.append(div)
} 

//adding newtoys in the DOM
function addNewToy(event) {
  event.preventDefault()
  const [name, image] = event.target

  fetch("http://localhost:3000/toys", {
  method: "POST",
  headers: {
    "content-type": "application/json"
  },
  body: JSON.stringify({
    name: name.value,
    image: image.value,
    Likes: 0,
   })
})
  .then(response => response.json())
  .then(response => showToy(response))
  name.value = ""
  image.value = "" 
}

function updateLikes (event) {
  event.preventDefault()
    fetch(`http://localhost:3000/toys/${event.target.id}`, {
      method: "PATCH",
      headers:{
        "content-type": "application/json"
      },
      body:JSON.stringify({
        likes: parseInt(event.target.parentElement.children[2].textContent.split("")[0], 10) + 1 
      })
    } )
      .then(response => response.json())
      .then(response => {
        // event.target.parentElement.children[2] = `${response.likes}
      const p = document.getElementById(response.id)
      p.textContent = `${response.likes} likes`
      })
}

