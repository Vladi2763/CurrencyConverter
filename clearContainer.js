const clearContainer = (container) => {
  const arr = Array.from(container.getElementsByClassName('elementCurrency'));
  
  arr.forEach((elem) => {
    elem.classList.remove('activeCurrency');
  })
}

export default clearContainer;