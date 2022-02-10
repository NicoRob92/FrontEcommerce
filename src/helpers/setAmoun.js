const setAmount =  (dispatch,actionCreators) => {
  dispatch(actionCreators.setTotalAmount(0))
    let toGetAmount = JSON.parse(localStorage.getItem("posts"))
    let result = toGetAmount.item.reduce((acc,post) => {
      let totalInPost = post.quantity * post.unit_price
      return acc + totalInPost
    }, 0)
  dispatch(actionCreators.setTotalAmount(result))
}

export { setAmount }