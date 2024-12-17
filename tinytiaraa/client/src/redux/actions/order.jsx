import axios from "axios"
import { server } from "../../server"


// get all orders of user

// export const getAllOrdersOfUser = (userId) => async (dispatch) => {
//     try {
//       dispatch({
//         type: "getAllOrderUserRequest",
//       });
  
//       const { data } = await axios.get(
//         `${server}/order/get-all-orders/${userId}`
//       );
  
//       dispatch({
//         type: "getAllOrderUserSuccess",
//         payload: data.orders,
//       });
//     } catch (error) {
//       dispatch({
//         type: "getAllOrderUserFailed",
//         payload: error.response.data.message,
//       });
//     }
//   };

export const getAllOrdersOfUser = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrderUserRequest",
    });

    const { data } = await axios.get(
      `${server}/order/get-all-orders?email=${email}`
    );

    dispatch({
      type: "getAllOrderUserSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrderUserFailed",
      payload: error.response.data.message,
    });
  }
};


  // get all orders of user

export const getAllOrdersOfShop = (shopId) => async (dispatch) => {
    try {
      dispatch({
        type: "getAllOrderShopRequest",
      });
  
      const { data } = await axios.get(
        `${server}/order/get-seller-all-orders/${shopId}`
      );
  
      dispatch({
        type: "getAllOrderShopSuccess",
        payload: data.orders,
      });
    } catch (error) {
      dispatch({
        type: "getAllOrderShopFailed",
        payload: error.response.data.message,
      });
    }
  };


  export const placeOrder = (orderData) => async (dispatch) => {
    try {
        const response = await axios.post(`${server}/order/place-order`, orderData);
        const { orderId } = response.data; // Assuming your backend returns orderId upon successful placement

        // Dispatch an action to update the Redux store with the orderId
        dispatch({ type: 'PLACE_ORDER_SUCCESS', payload: orderId });
    } catch (error) {
        dispatch({ type: 'PLACE_ORDER_FAILURE', payload: error.message });
    }
};
