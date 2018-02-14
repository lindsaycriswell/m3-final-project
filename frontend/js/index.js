document.addEventListener("DOMContentLoaded", function(){
  const drinkURL = "http://localhost:3000/api/v1/drinks"

  let form = document.querySelector("#drink-create-form")
  form.addEventListener("submit", createDrink)

  handleDrink()

  function handleDrink() {
    return fetch(drinkURL)
    .then(res => res.json())
    .then(drinks => renderDrinks(drinks))
  }


  function renderDrink(drink) {
    let drinksWrapper = document.querySelector("#drinks-wrapper")

    // render drink
    let drinkContainer = document.createElement("div")
    drinkContainer.id = `drink-${drink.id}`
    drinkContainer.setAttribute("class", "ui raised segment")

    // render Img section
    let drinkImg = document.createElement('img')
    drinkImg.src = drink.image_url
    drinkContainer.append(drinkImg)

    // render Name section
    let drinkName = document.createElement("h3")
    drinkName.setAttribute("class", "drink-name")
    drinkName.innerHTML = `<span>Name:</span> ${drink.name}`
    drinkContainer.append(drinkName)

    // render Description sections
    let drinkDesc = document.createElement("p")
    drinkDesc.setAttribute("class", "drink-desc")
    drinkDesc.innerHTML = `<span>Description:</span> ${drink.description}`
    drinkContainer.append(drinkDesc)

    // render Ingredients section
    let drinkIngrContainer = document.createElement("ul")
    let drinkIngrTitle = document.createElement("p")
    drinkIngrTitle.setAttribute("class", "drinkIngrTitle")
    drinkIngrTitle.innerText = "Ingredients:"
    drinkIngrContainer.append(drinkIngrTitle)
    let drinkIngr1 = document.createElement("li")
    let drinkIngr2 = document.createElement("li")
    let drinkIngr3 = document.createElement("li")
    let drinkIngr4 = document.createElement("li")
    let drinkIngr5 = document.createElement("li")
    drinkIngr1.innerText = drink.ingredient1
    drinkIngr2.innerText = drink.ingredient2
    drinkIngr3.innerText = drink.ingredient3
    drinkIngr4.innerText = drink.ingredient4
    drinkIngr5.innerText = drink.ingredient5

    drinkIngrContainer.append(drinkIngr1, drinkIngr2, drinkIngr3, drinkIngr4, drinkIngr5)
    drinkContainer.append(drinkIngrContainer)

    // render Garnish section
    let drinkGarnish = document.createElement("p")
    drinkGarnish.setAttribute("class", "drink-garnish")
    drinkGarnish.innerHTML = `<span>Garnish:</span> ${drink.garnish}`
    drinkContainer.append(drinkGarnish)

    // render Glass section
    let drinkGlass = document.createElement("p")
    drinkGlass.setAttribute("class", "drink-glass")
    drinkGlass.innerHTML = `<span>Glass:</span> ${drink.glass}`
    drinkContainer.append(drinkGlass)

    // render Instructions section
    let drinkInstructions = document.createElement("p")
    drinkInstructions.setAttribute("class", "drink-instructions")
    drinkInstructions.innerHTML = `<span>Instructions:</span> ${drink.instructions}`
    drinkContainer.append(drinkInstructions)

    // add EDIT and DELETE buttons
    let drinkOptions = document.createElement("div")
    drinkOptions.id = "drink-options"
    let renderDrinkEditFormBtn = document.createElement("button")
    renderDrinkEditFormBtn.dataset.id = `${drink.id}`
    renderDrinkEditFormBtn.setAttribute("class", "ui medium blue button")
    renderDrinkEditFormBtn.innerText = "Edit"
    let drinkDeleteBtn = document.createElement("button")
    drinkDeleteBtn.dataset.id = `${drink.id}`
    drinkDeleteBtn.setAttribute("class", "ui medium red button")
    drinkDeleteBtn.innerText = "Delete"
    drinkOptions.append(renderDrinkEditFormBtn)
    drinkOptions.append(drinkDeleteBtn)
    drinkContainer.append(drinkOptions)

    // add edit-form div
    let editFormDiv = document.createElement("div")
    editFormDiv.setAttribute("class", "ui raised segment edit-form-wrapper")
    editFormDiv.id = `edit-form-${drink.id}`
    editFormDiv.setAttribute("style", "display: none")
    editFormDiv.innerHTML = `
    <h3>Edit Cocktail</h3>
    <form id="drink-edit-form" data-id=${drink.id}>
      <div class="ui input">
        <input type="text" id="edit-name" value="${drink.name}">
      </div>
      <div class="ui input">
        <input type="text" id="edit-description" value="${drink.description}">
      </div>
      <div class="ui  input">
        <input type="text" id="edit-image-url" value=${drink.image_url}>
      </div>
      <div class="ui input">
        <input type="text" id="edit-ingredient1" value="${drink.ingredient1}">
      </div>
      <div class="ui input">
        <input type="text" id="edit-ingredient2" value="${drink.ingredient2}">
      </div>
      <div class="ui input">
        <input type="text" id="edit-ingredient3" value="${drink.ingredient3}">
      </div>
      <div class="ui input">
        <input type="text" id="edit-ingredient4" value="${drink.ingredient4}">
      </div>
      <div class="ui input">
        <input type="text" id="edit-ingredient5" value="${drink.ingredient5}">
      </div>
      <div class="ui input">
        <input type="text" id="edit-garnish" value=${drink.garnish}>
      </div>
      <div class="ui input">
        <input type="text" id="edit-glass" value="${drink.glass}">
      </div>
      <div class="ui input">
        <input type="text" id="edit-instructions" value="${drink.instructions}">
      </div>
      <button class="ui medium blue button" id="submit-edit-button" type="submit">Submit Edit</button>
    </form>
    `
    // append drinkContainer and Edit form to drink Wrapper
    drinksWrapper.append(drinkContainer)
    drinksWrapper.append(editFormDiv)

    // change EditForm visibility on Edit button click
    renderDrinkEditFormBtn.addEventListener("click", function() {
      editFormDiv.setAttribute("style", "display: block")
    })

    // add eventListener to Edit form button
    let drinkEditForm = document.querySelector("#drink-edit-form")
    drinkEditForm.addEventListener("submit", editDrink)

    // add eventListener to delete drink button
    drinkDeleteBtn.addEventListener("click", deleteDrink)

  } // end renderDrink

  // ////////////////////////////
  // ///////////////////////////
  // Edit Drink
  // //////////////////////////

  function editDrink(event){
    event.preventDefault()
    console.log(this.dataset.id) // works

    let formDiv = document.querySelector(`#edit-form-${this.dataset.id}`)

    let newName = document.querySelector("#edit-name")
    let newDesc = document.querySelector("#edit-description")
    let newImgUrl = document.querySelector("#edit-image-url")
    let newIngredient1 = document.querySelector("#edit-ingredient1")
    let newIngredient2 = document.querySelector("#edit-ingredient2")
    let newIngredient3 = document.querySelector("#edit-ingredient3")
    let newIngredient4 = document.querySelector("#edit-ingredient4")
    let newIngredient5 = document.querySelector("#edit-ingredient5")
    let newGarnish = document.querySelector("#edit-garnish")
    let newGlass = document.querySelector("#edit-glass")
    let newInstructions = document.querySelector("#edit-instructions")


    fetch(`http:/localhost:3000/api/v1/drinks/${parseInt(this.dataset.id)}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newName.value,
        image_url: newImgUrl.value,
        description: newDesc.value,
        ingredient1: newIngredient1.value,
        ingredient2: newIngredient2.value,
        ingredient3: newIngredient3.value,
        ingredient4: newIngredient4.value,
        ingredient5: newIngredient5.value,
        garnish: newGarnish.value,
        glass: newGlass.value,
        instructions: newInstructions.value
      })
    })
    .then(res => res.json())
    .then(updatedDrink => updateDrink(updatedDrink))

    formDiv.setAttribute("style", "display: none")

  }

  // ////////////////////////////
  // ////////////////////////////
  // Update Drink
  // ///////////////////////////
  function updateDrink(drink) {
    let drinkDiv = document.querySelector(`#drink-${drink.id}`)
    drinkDiv.innerHTML = `
      <img src="${drink.image_url}">
      <h3 class="drink-name"><span>Name:</span> ${drink.name}</h3>
      <p class="drink-description"><span>Description:</span> ${drink.description}</p>
      <ul>
        <p class="drinkIngTitle">Ingredients:</p>
        <li>${drink.ingredient1}</li>
        <li>${drink.ingredient2}</li>
        <li>${drink.ingredient3}</li>
        <li>${drink.ingredient4}</li>
        <li>${drink.ingredient5}</li>
      </ul>
      <p class="drink-garnish"><span>Garnish:</span> ${drink.garnish}</p>
      <p class="drink-glass"><span>Glass:</span> ${drink.glass}</p>
      <p class="drink-instructions"><span>Instructions:</span> ${drink.instructions}</p>
      <div id="drink-options">
        <button data-id="${drink.id}" class="ui medium blue button">Edit</button>
        <button data-id="${drink.id}" class="ui medium red button">Delete</button>
      </div>
    `
  }


  // ////////////////////////////
  // ////////////////////////////
  // DELETE Drink
  // ///////////////////////////

  function deleteDrink(e) {
     fetch(`http:/localhost:3000/api/v1/drinks/${this.dataset.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(json => removeDrink(json))
  }

  function removeDrink(json){
    document.querySelector(`#drink-${json.id}`).remove()
  }


  // ///////////////////////////////
  // ///////////////////////////////
  // render all Drinks on page load
  // //////////////////////////////
  function renderDrinks(drinks){
    drinks.forEach(function(drink){
      renderDrink(drink)
    })
  } // end renderDrinks



  // ///////////////////////////////
  // ///////////////////////////////
  // create Drink
  // //////////////////////////////

  function createDrink(e){
    e.preventDefault()
    let inputName = document.querySelector("#input-name")
    let inputDesc = document.querySelector("#input-description")
    let inputImgUrl = document.querySelector("#input-image-url")
    let inputIngredient1 = document.querySelector("#input-ingredient1")
    let inputIngredient2 = document.querySelector("#input-ingredient2")
    let inputIngredient3 = document.querySelector("#input-ingredient3")
    let inputIngredient4 = document.querySelector("#input-ingredient4")
    let inputIngredient5 = document.querySelector("#input-ingredient5")
    let inputGarnish = document.querySelector("#input-garnish")
    let inputGlass = document.querySelector("#input-glass")
    let inputInstructions = document.querySelector("#input-instructions")

    postDrink(inputName.value, inputDesc.value, inputImgUrl.value, inputIngredient1.value, inputIngredient2.value, inputIngredient3.value, inputIngredient4.value, inputIngredient5.value, inputGarnish.value, inputGlass.value, inputInstructions.value)

    inputName.value = ""
    inputDesc.value = ""
    inputImgUrl.value = ""
    inputIngredient1.value = ""
    inputIngredient2.value = ""
    inputIngredient3.value = ""
    inputIngredient4.value = ""
    inputIngredient5.value = ""
    inputGarnish.value = ""
    inputGlass.value = ""
    inputInstructions.value = ""
  }


  // ////////////////////////
  // ///////////////////////
  // Post Drink
  // /////////////////////

  function postDrink(inputName, inputDesc, inputImgUrl, inputIngredient1, inputIngredient2, inputIngredient3, inputIngredient4, inputIngredient5, inputGarnish, inputGlass, inputInstructions){
    return fetch(drinkURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: inputName,
        image_url: inputImgUrl,
        description: inputDesc,
        ingredient1: inputIngredient1,
        ingredient2: inputIngredient2,
        ingredient3: inputIngredient3,
        ingredient4: inputIngredient4,
        ingredient5: inputIngredient5,
        garnish: inputGarnish,
        glass: inputGlass,
        instructions: inputInstructions
        })
      }) // end fetch
      .then(res => res.json())
      .then(newDrink => {
        renderDrink(newDrink)
      })
  } // end postDrink
})
