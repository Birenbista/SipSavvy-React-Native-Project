import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CartList from '../Cart/CartList'
import Checkout from '../Checkout/Checkout'
import { commonHeaderOptions } from './HomeStackScreen'

const CartStack = createNativeStackNavigator()

const CartScreen = () => {
    return (
        <CartStack.Navigator>
            <CartStack.Screen
                name="Cart"
                component={CartList}
                options={commonHeaderOptions}
            />
            <CartStack.Screen
                name="Checkout"
                component={Checkout}
                options={commonHeaderOptions}
            />
        </CartStack.Navigator>
        // <CartList />
    )
}

export default CartScreen
