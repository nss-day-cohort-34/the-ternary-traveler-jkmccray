import renderPage from "./dom.js";
import data from "./data.js";

const addInterestFormContainer = document.querySelector("#add-interest-form-container")

renderPage.renderPage()

const displayAllInterests = (placeId) => {
  data.getAllInterests(placeId)
    .then(interests => {
      const interestCardsContainer = document.querySelector(`#interest-cards-container--${placeId}`)
      interestCardsContainer.innerHTML = ""
      interests.forEach(interestObj => {
        renderPage.renderInterest(interestObj)
      })
    })
}

data.getAllDestinations()
  .then(places => {
    places.forEach(placeObj => {
      displayAllInterests(placeObj.id)
    })
  })

const interestFormHandler = () => {
    if (event.target.id === "add-interest-btn") {
      renderPage.renderAddInterestForm()
    } else if (event.target.id === "save-new-interest-btn") {
      const interestName = document.querySelector("#interest-name-input").value
      const interestDescription = document.querySelector("#interest-description-input").value
      const interestCost = document.querySelector("#interest-cost-input").value
      const placeId = document.querySelector("#interest-place-select").value.split("--")[1]
      const newInterestObj = {
        placeId: placeId,
        name: interestName,
        description: interestDescription,
        cost: interestCost,
        review: ""
      }
      renderPage.renderInterestBtn()
      data.postNewInterest(newInterestObj)
      .then(displayAllInterests(placeId))
    } else if (event.target.id === "cancel-new-interest-btn") {
      renderPage.renderInterestBtn()
    }
}

addInterestFormContainer.addEventListener("click", interestFormHandler)

