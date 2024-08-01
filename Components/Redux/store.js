import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './CartListSlice'

export const store = configureStore({
    reducer: {
        cartList: cartReducer,
    },
})
