import elFactory from "./factory.js";

const renderPage = {
  renderPlaceCard(name, id) {
    const placeContainer = document.querySelector("#place-container")
    const placeDiv = elFactory("div", {classList: ["place-div"], id: `place--${id}`})
    const placeName = elFactory("h2", {classList: ["place-name-header"], id: `place-name--${id}`}, name)
    const interestCardsContainer = elFactory("div", {id: `interest-cards-container--${id}`, classList: ["interest-cards-container"]})
    placeContainer.appendChild(placeDiv)
    placeDiv.appendChild(placeName)
    placeDiv.appendChild(interestCardsContainer)
  },
  renderInterestBtn() {
    const addInterestFormContainer = document.querySelector("#add-interest-form-container")
    const addInterestBtn = elFactory("button", {id: "add-interest-btn", classList: ["add-interest-btn"]}, "Add an Interest")
    addInterestFormContainer.appendChild(addInterestBtn)
  },
  renderPage() {
    this.renderInterestBtn()
    this.renderPlaceCard("Italy", 1)
    this.renderPlaceCard("Switzerland", 2)
    this.renderPlaceCard("France", 3)
  },
  renderAddInterestForm(id) {
    const formContainer = document.querySelector(`#add-form-container--${id}`)
    const addInterestBtn = document.querySelector(`#add-interest-btn--${id}`)
    const formDiv = elFactory("div", {id: `form-div--${id}`})
    const interestNameInput = elFactory("input", {id: `interest-name-input--${id}`, placeholder: "Interest Name"})
    const interestDescriptionInput = elFactory("input", {id: `interest-description-input--${id}`, placeholder: "Interest Description"})
    const interestCostInput = elFactory("input", {id: `interest-cost-input--${id}`, placeholder: "Cost"})
    const saveNewInterestBtn = elFactory("button", {id: `save-new-interest-btn--${id}`}, "Save New Interest")
    const cancelNewInterestBtn = elFactory("button", {id: `cancel-new-interest-btn--${id}`}, "Cancel")
    formContainer.removeChild(addInterestBtn)
    formContainer.appendChild(formDiv)
    formDiv.appendChild(interestNameInput)
    formDiv.appendChild(interestDescriptionInput)
    formDiv.appendChild(interestCostInput)
    formDiv.appendChild(saveNewInterestBtn)
    formDiv.appendChild(cancelNewInterestBtn)
  },
  renderInterest(interestObj) {
    const interestCardsContainer = document.querySelector(`#interest-cards-container--${interestObj.placeId}`)
    const interestDiv = elFactory("div", {classList: ["interest-card"]})
    const interestName = elFactory("h2", {classList: ["interest-card-name"]}, interestObj.name)
    const interestDescription = elFactory("p", {classList: ["interest-card-description"]}, interestObj.description)
    const interestCost = elFactory("p", {classList: ["interest-card-cost"]}, interestObj.cost)
    const interestReview = elFactory("p", {classList: ["interest-card-review"]}, "Review: ")
    const editInterestBtn = elFactory("button", {classList: ["edit-interest-btn"], id: `edit-interest-btn--${interestObj.id}`}, "Edit")
    interestCardsContainer.appendChild(interestDiv)
    interestDiv.appendChild(interestName)
    interestDiv.appendChild(interestDescription)
    interestDiv.appendChild(interestCost)
    if (interestObj.review) {
      interestDiv.appendChild(interestReview)
    }
    interestDiv.appendChild(editInterestBtn)
  }
}

export default renderPage