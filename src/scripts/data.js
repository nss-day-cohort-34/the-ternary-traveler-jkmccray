const data = {
  postNewInterest(interestObj) {
    return fetch("http://localhost:8088/interests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(interestObj)
    })
      .then(newInterest => newInterest.json())
  },
  deleteInterest(id) {
    return fetch(`http://localhost:8088/interests/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },

    })
      .then(deletedInterest => deletedInterest.json())
  },
  putInterest(interestObj) {
    return fetch(`http://localhost:8088/interests/${interestObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(interestObj)
    })
  },
  getSingleInterest(id) {
    return fetch(`http://localhost:8088/interests/${id}`)
      .then(interests => interests.json())
  },
  getAllInterests(placeId) {
    return fetch(`http://localhost:8088/interests?placeId=${placeId}`)
      .then(interests => interests.json())
    },
    getAllDestinations() {
      return fetch("http://localhost:8088/places")
      .then(interests => interests.json())
    }
}

export default data