import renderPage from "./dom.js";
import data from "./data.js";

const addInterestFormContainer = document.querySelector("#add-interest-form-container")
const placeContainer = document.querySelector("#place-container")

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
  if (event.target.id === "add-interest-btn") {
    renderPage.renderAddInterestForm()
  }
  if (event.target.id === "save-new-interest-btn") {
    const interestName = document.querySelector("#interest-name-input").value
    const interestDescription = document.querySelector("#interest-description-input").value
    const interestCost = parseFloat(document.querySelector("#interest-cost-input").value).toFixed(2)
    const placeSelect = document.querySelector("#interest-place-select").value
    if (interestName && interestDescription && interestCost && placeSelect !== "not selected") {
      const placeId = parseInt(placeSelect.split("--")[1])
      const newInterestObj = {
        placeId: placeId,
        name: interestName,
        description: interestDescription,
        cost: interestCost,
        review: "",
        rating: ""
      }
      renderPage.renderInterestBtn()
      data.postNewInterest(newInterestObj)
        .then(displayAllInterests(placeId))
    } else { alert("Fill out all fields") }
  }
  if (event.target.id === "cancel-new-interest-btn") {
    renderPage.renderInterestBtn()
  }
})

placeContainer.addEventListener("click", () => {
  const idNum = event.target.id.split("--")[1]
  if (event.target.id.startsWith("review-interest-btn")) {
    data.getSingleInterest(idNum)
      .then(interestObj => {
        renderPage.renderReviewForm(interestObj)
      })
  }
  if (event.target.id.startsWith("edit-interest-btn")) {
    data.getSingleInterest(idNum)
      .then(interestObj => {
        renderPage.renderEditInterestForm(interestObj)
      })
  }
  if (event.target.id.startsWith("save-edits-btn")) {
    data.getSingleInterest(idNum)
      .then(interestObj => {
        const interestCost = parseFloat(document.querySelector("#edit-interest-cost-input").value).toFixed(2)
        const interestRating = parseInt(document.querySelector("#interest-rating-select").value)
        const interestReview = document.querySelector("#edit-interest-review-input")
        interestObj.cost = interestCost
        interestObj.rating = interestRating
        if (interestReview) { interestObj.review = interestReview.value }
        const placeId = interestObj.placeId
        data.putInterest(interestObj)
          .then(() => displayAllInterests(placeId))
      })
  }
  if (event.target.id.startsWith("save-review-btn")) {
    data.getSingleInterest(idNum)
      .then(interestObj => {
        const interestRating = parseInt(document.querySelector("#interest-rating-select").value)
        const interestReview = document.querySelector("#interest-review-input").value
        interestObj.rating = interestRating
        interestObj.review = interestReview
        const placeId = interestObj.placeId
        data.putInterest(interestObj)
          .then(() => displayAllInterests(placeId))
      })
  }
  if (event.target.id.startsWith("delete-interest-btn")) {
    const confirmDelete = confirm("Are you sure you want to delete this interest?")
    if (confirmDelete) {
      data.getSingleInterest(idNum)
        .then(interestObj => {
          const placeId = interestObj.placeId
          data.deleteInterest(idNum)
            .then(() => displayAllInterests(placeId))
        })
    }
  }
})