//! Suggestions When Working With the DOM

//TODO 1. Set global selector variables at the top of the file for everyone to use
//TODO 2. Attach event listeners to the correct DOM nodes
//TODO 3. Decide if creating the callback anonymously in-place OR pass a function reference (promotes reusability)
//TODO 4. Does the callback have access to all the data it needs or should it receive parameters?



// Global variables
const TOYSURL = "http://localhost:3000/toys"
const createToyForm = document.querySelector(".add-toy-form")
const toyCollection = document.querySelector("#toy-collection")

let addToy = false;



// helper functions

const createToyCard = (toy) => {
  // create div for each toy
  const toyCard = document.createElement("div")
  toyCard.className = "card"

  // populate with card info
  const h2 = document.createElement("h2")
  h2.textContent = toy.name
  const img = document.createElement("img")
  img.src = toy.image
  img.alt = toy.name
  img.className = "toy-avatar"
  const p = document.createElement("p")
  p.textContent = `${toy.likes} Likes`
  const btn = document.createElement("button")
  btn.textContent = "Like ❤️"
  btn.className = "like-btn"
  btn.id = toy.id

  // add event listener to button
  btn.addEventListener("click", () => {
    p.textContent = `${toy.likes += 1} Likes`
    successfulLike(toy)
  })

  // append content to toy card div
  // append div to toy-collection div
  toyCard.append(h2, img, p, btn)
  toyCollection.append(toyCard)
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// Fetch requests
  // GET fetch for all toy data
const getToys = () => {
  fetch(TOYSURL)
  .then(resp => resp.json())
  .then(toyData => {
    // console.log(toyData)
    toyData.forEach(createToyCard)
  })
}
getToys()

// POST
  // when a user submits new toy, 
    // POST request to add to collection
    // add toy to DOM
createToyForm.addEventListener("submit", e => {
  e.preventDefault()
  // console.log(e)
  // grab input from form and put into obj
  // const newToy = {
      
  // }

  fetch(TOYSURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      "name": "Jessie",
      "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
      "likes": 0
    })
  })
  .then(resp => resp.json())
  .then(toyObj => createToyCard(toyObj))
})

// PATCH
  // when a user clicks a like button
    // 1. Patch to toys/id updating the number of likes
    // 2. if patch is successful, like count should update without reload
function successfulLike(toy) {
  fetch(`${TOYSURL}/${toy.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(resp => resp.json())
  .then(updateToy => console.log(updateToy))
  .catch(err => alert(err))
  // debugger
}

