// element factory function
const elFactory = (elType, attributesObj, txt) => {
  const newEl = document.createElement(elType)
  for (let attribute in attributesObj) {
    if (attribute === "classes") {
      const classesArray = attributesObj[attribute]
      classesArray.forEach(cls => {
        newEl.classList.add(cls)
      });
    }
    else {
      newEl[attribute] = attributesObj[attribute]
    }
  }
  newEl.textContent = txt || null
  return newEl
}

export default elFactory