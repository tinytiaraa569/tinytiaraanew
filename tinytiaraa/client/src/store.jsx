import {configureStore} from "@reduxjs/toolkit"
import { userReducer } from "./redux/reducers/user"
import { sellerReducer } from "./redux/reducers/seller"
import { productReducer } from "./redux/reducers/product"
import { eventReducer } from "./redux/reducers/event"
import { cartReducer } from "./redux/reducers/cart"
import { wishlistReducer } from "./redux/reducers/wishlist"
import { orderReducer } from "./redux/reducers/order"
// import { userReducer } from "./reducers/user"
// import { sellerReducer } from "./reducers/seller"
// import { productReducer } from "./reducers/product"
// import { eventReducer } from "./reducers/event"
import currencyReducer from './redux/reducers/currencyReducer'


const Store = configureStore({

    reducer :{
        user:userReducer,
        seller:sellerReducer,
        products:productReducer,
        events:eventReducer,
        cart:cartReducer,
        wishlist:wishlistReducer,
        order:orderReducer,
        currency: currencyReducer,
    }

})

export default Store