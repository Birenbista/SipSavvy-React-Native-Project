import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cartList',
    initialState: {
        list: [],
    },
    reducers: {
        setData: (state, action) => {
            state.list = action.payload
            // console.log("This is redux", action.payload)
        },
        addData: (state, action) => {
            const updatedData = [...state.list]
            updatedData.push(action.payload)
            // console.log(action.payload)
            state.list = updatedData
            // console.log(updatedData)
        },
        removeData: (state, action) => {
            const id = action.payload
            const filteredData = state.list.filter(data => data.id !== id)
            state.list = filteredData
        },
        changeQuantity: (state, action) => {
            const { id, quantity } = action.payload
            // console.log("Payload=>>>>>>", action.payload)
            const updateData = state.list.map(data => {
                if (data.id === action.payload.id) {
                    data.quantity = quantity
                }
                return data
            })
            // console.log(updateData)
            state.list = updateData
        },
    },
})

export const { setData, addData, removeData, changeQuantity } =
    cartSlice.actions

export default cartSlice.reducer
