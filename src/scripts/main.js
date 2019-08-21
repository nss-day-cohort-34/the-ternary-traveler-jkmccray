import renderPage from "./dom.js";
import data from "./data.js";

const placeContainer = document.querySelector("#place-container")
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

addInterestFormContainer.addEventListener("click", () => {
  if (event.target.id = "add-interest-btn") {
    renderPage.renderAddInterestForm()
  }
  if (event.target.id = "save-new-interest-btn") {
    const interestName = document.querySelector(`#interest-name-input--${idNum}`).value
    const interestDescription = document.querySelector(`#interest-description-input--${idNum}`).value
    const interestCost = document.querySelector(`#interest-cost-input--${idNum}`).value
    const newInterestObj = {
      placeId: idNum,
      name: interestName,
      description: interestDescription,
      cost: interestCost,
      review: ""
    }
    data.postNewInterest(newInterestObj)
      .then(displayAllInterests(idNum))
  }
  // if (event.target.id.includes("cancel-new-interest-btn")) {
  //   renderPage.renderInterestBtn()
  // }
})
