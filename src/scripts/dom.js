import elFactory from "./factory.js";
import data from "./data.js";

const renderPage = {
  renderPlaceCard(placeObj) {
    const placeContainer = document.querySelector("#place-container")
    const placeDiv = elFactory("div", {classes: ["place-div"], id: `place--${placeObj.id}`})
    const placeName = elFactory("h2", {classes: ["place-name-header"], id: `place-name--${placeObj.id}`}, placeObj.name)
    const interestCardsContainer = elFactory("div", {id: `interest-cards-container--${placeObj.id}`, classes: ["interest-cards-container"]})
    placeContainer.appendChild(placeDiv)
    placeDiv.appendChild(placeName)
    placeDiv.appendChild(interestCardsContainer)
  },
  renderInterestBtn() {
    const addInterestFormContainer = document.querySelector("#add-interest-form-container")
    const addInterestBtn = elFactory("button", {id: "add-interest-btn", classes: ["add-interest-btn"]}, "add an interest")
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
    const interestCostInput = elFactory("input", {id: "interest-cost-input", placeholder: "Cost", type: "number"})
    const interestPlaceSelect = elFactory("select", {id: "interest-place-select"})
    const placeholderOption = elFactory("option", {value: "not selected"}, "Select a destination")
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
      places.forEach(placeObj => this.renderPlaceOption(placeObj))
    })
  },
  renderPlaceOption(placeObj) {
    const interestPlaceSelect = document.querySelector("#interest-place-select")
    const interestPlaceOption = elFactory("option", {value: `place-option--${placeObj.id}`}, placeObj.name)
    interestPlaceSelect.appendChild(interestPlaceOption)
  },
  renderInterest(interestObj) {
    const interestCardsContainer = document.querySelector(`#interest-cards-container--${interestObj.placeId}`)
    const interestDiv = elFactory("div", {classes: ["interest-card"], id: `interest-card--${interestObj.id}`})
    const interestName = elFactory("h3", {classes: ["interest-card-name"], id: `interest-card-name--${interestObj.id}`}, interestObj.name)
    const interestDescription = elFactory("p", {classes: ["interest-card-description","interest-card-text"], id: `interest-card-description--${interestObj.id}`}, interestObj.description)
    const interestCost = elFactory("p", {classes: ["interest-card-cost","interest-card-text"], id: `interest-card-cost--${interestObj.id}`}, `Admission: $${interestObj.cost}`)
    const interestReview = elFactory("p", {classes: ["interest-card-review","interest-card-text"], id: `interest-card-review--${interestObj.id}`}, `Review: ${interestObj.review}`)
    const addReviewInterestBtn = elFactory("button", {classes: ["review-interest-btn"], id: `review-interest-btn--${interestObj.id}`}, "Leave a Review")
    const editInterestBtn = elFactory("button", {classes: ["edit-interest-btn"], id: `edit-interest-btn--${interestObj.id}`}, "Edit")
    const deleteInterestBtn = elFactory("button", {classes: ["delete-interest-btn"], id: `delete-interest-btn--${interestObj.id}`}, "Delete")
    interestCardsContainer.appendChild(interestDiv)
    interestDiv.appendChild(interestName)
    interestDiv.appendChild(interestDescription)
    interestDiv.appendChild(interestCost)
    interestObj.review ? interestDiv.appendChild(interestReview) : interestDiv.appendChild(addReviewInterestBtn)
    interestDiv.appendChild(editInterestBtn)
    interestDiv.appendChild(deleteInterestBtn)
  },
  renderReviewForm(interestObj) {
    const interestCard = document.querySelector(`#interest-card--${interestObj.id}`)
    const interestName = elFactory("h3", {classes: ["interest-card-name"]}, interestObj.name)
    const interestDescription = elFactory("p", {classes: ["interest-card-description"]}, interestObj.description)
    const interestCost = elFactory("p", {classes: ["interest-card-cost"], id: `interest-card-cost--${interestObj.id}`}, interestObj.cost)
    const interestReviewInput = elFactory("input", {id: "interest-review-input", placeholder: "Leave review here"})
    const saveBtn = elFactory("button", {classes: ["save-review-btn"], id: `save-review-btn--${interestObj.id}`}, "Save Review")
    interestCard.innerHTML = ""
    interestCard.appendChild(interestName)
    interestCard.appendChild(interestDescription)
    interestCard.appendChild(interestCost)
    interestCard.appendChild(interestReviewInput)
    interestCard.appendChild(saveBtn)
  },
  renderEditInterestForm(interestObj) {
    const interestCard = document.querySelector(`#interest-card--${interestObj.id}`)
    const interestName = elFactory("h2", {classes: ["interest-card-name"]}, interestObj.name)
    const interestDescription = elFactory("p", {classes: ["interest-card-description", "interest-card-text"]}, interestObj.description)
    const interestCostInput = elFactory("input", {id: "edit-interest-cost-input", value: interestObj.cost})
    const interestReviewInput = elFactory("input", {id: "edit-interest-review-input", value: interestObj.review})
    const saveBtn = elFactory("button", {classes: ["save-edits-btn"], id: `save-edits-btn--${interestObj.id}`}, "Save Changes")
    interestCard.innerHTML = ""
    interestCard.appendChild(interestName)
    interestCard.appendChild(interestDescription)
    interestCard.appendChild(interestCostInput)
    if (interestObj.review) {interestCard.appendChild(interestReviewInput)}
    interestCard.appendChild(saveBtn)
  }
}

export default renderPage