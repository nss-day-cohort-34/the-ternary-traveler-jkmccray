import elFactory from "./factory.js";
import data from "./data.js";

const renderPage = {
  renderPlaceCard(placeObj) {
    const placeContainer = document.querySelector("#place-container")
    const placeDiv = elFactory("div", {classList: ["place-div"], id: `place--${placeObj.id}`})
    const placeName = elFactory("h2", {classList: ["place-name-header"], id: `place-name--${placeObj.id}`}, placeObj.name)
    const interestCardsContainer = elFactory("div", {id: `interest-cards-container--${placeObj.id}`, classList: ["interest-cards-container"]})
    placeContainer.appendChild(placeDiv)
    placeDiv.appendChild(placeName)
    placeDiv.appendChild(interestCardsContainer)
  },
  renderInterestBtn() {
    const addInterestFormContainer = document.querySelector("#add-interest-form-container")
    const addInterestBtn = elFactory("button", {id: "add-interest-btn", classList: ["add-interest-btn"]}, "Add an Interest")
    addInterestFormContainer.innerHTML = ""
    addInterestFormContainer.appendChild(addInterestBtn)
  },
  renderPage() {
    this.renderInterestBtn()
    data.getAllDestinations()
    .then(places => {
      places.forEach(place => {
        this.renderPlaceCard(place)
      })
    })
  },
  renderAddInterestForm() {
    const addInterestFormContainer = document.querySelector("#add-interest-form-container")
    const formDiv = elFactory("div", {id: "form-div"})
    const interestNameInput = elFactory("input", {id: "interest-name-input", placeholder: "Interest Name"})
    const interestDescriptionInput = elFactory("input", {id: "interest-description-input", placeholder: "Interest Description"})
    const interestCostInput = elFactory("input", {id: "interest-cost-input", placeholder: "Cost"})
    const interestPlaceSelect = elFactory("select", {id: "interest-place-select"})
    const placeholderOption = elFactory("option", {}, "Select a destination")
    const saveNewInterestBtn = elFactory("button", {id: "save-new-interest-btn"}, "Save New Interest")
    const cancelNewInterestBtn = elFactory("button", {id: "cancel-new-interest-btn"}, "Cancel")
    addInterestFormContainer.innerHTML = ""
    addInterestFormContainer.appendChild(formDiv)
    formDiv.appendChild(interestNameInput)
    formDiv.appendChild(interestDescriptionInput)
    formDiv.appendChild(interestCostInput)
    formDiv.appendChild(interestPlaceSelect)
    interestPlaceSelect.appendChild(placeholderOption)
    formDiv.appendChild(saveNewInterestBtn)
    formDiv.appendChild(cancelNewInterestBtn)
    data.getAllDestinations()
    .then(places => {
      places.forEach(placeObj => this.renderPlaceOptions(placeObj))
    })
  },
  renderPlaceOptions(placeObj) {
    const interestPlaceSelect = document.querySelector("#interest-place-select")
    const interestPlaceOption = elFactory("option", {value: `place-option--${placeObj.id}`}, placeObj.name)
    interestPlaceSelect.appendChild(interestPlaceOption)
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