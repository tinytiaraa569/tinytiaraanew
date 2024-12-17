//add to cart


export const addToCart = (data) =>async(dispatch ,getState) => {
    dispatch({
        type:"addToCart",
        payload:data,
    })

    localStorage.setItem("cartItems" , JSON.stringify(getState().cart.cart))
    return data
}

// remove from cart
export const removeFromCart = (data) => async (dispatch, getState) => {
  dispatch({
      type: "removeFromCart",
      payload: {
          _id: data._id,
          selectedColor: data.selectedColor,
          showWithChain: data.showWithChain,
          selectedEnamelColor: data.selectedEnamelColor,
      },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};