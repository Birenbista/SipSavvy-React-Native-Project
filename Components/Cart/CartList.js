import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, Text, View, Alert } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as database from '../Database'
import { useSelector, useDispatch } from 'react-redux'
import { removeData, changeQuantity } from '../Redux/CartListSlice'
import styles from './styles'
import { getAuth } from 'firebase/auth'

const CartList = ({ navigation }) => {
    const dispatch = useDispatch()
    const [total, setTotal] = useState(0)

    const cartLists = useSelector(state => state.cartList.list)

    const auth = getAuth()
    const user = auth.currentUser
    const userId = user ? user.uid : null
    // console.log(cartLists)

    const handleRemoveItem = itemID => {
        // console.log('itemID ====> ', itemID)
        Alert.alert(
            'Remove Task',
            'This action will permanently delete this task. This action cannot be undone!',
            [
                {
                    text: 'Confirm',
                    onPress: async () => {
                        dispatch(removeData(itemID))
                        const deleted = await database.remove(userId, itemID)
                    },
                },
                {
                    text: 'Cancel',
                },
            ]
        )
    }

    const handleQuantityChange = async (item, changeAmount) => {
        const quantity = item.quantity
        const updatedQuantity = quantity + changeAmount

        const updated = await database.update(userId, item.id, {
            quantity: updatedQuantity,
        })
        if (updated) {
            const data = {
                id: item.id,
                quantity: updatedQuantity,
            }
            dispatch(changeQuantity(data))
        }
    }

    const handleIncreaseQuantity = async item => {
        await handleQuantityChange(item, 1)
    }
    const handleDecreaseQuantity = async item => {
        if (item.quantity > 1) {
            await handleQuantityChange(item, -1)
        }
    }

    useEffect(() => {
        let total = 0
        cartLists.map(item => {
            total += item.price * item.quantity
        })
        setTotal(total.toFixed(2))
    }, [cartLists])

    const handleCheckout = () => {
        if (cartLists.length > 0) {
            // Perform checkout logic here
            // Clear cart
            cartLists.forEach(item => {
                dispatch(removeData(item.id))
                database.remove(item.id)
            })
            setTotal(0)
            // Navigate to checkout screen
        } else {
            Alert.alert('Cart is empty!')
        }
    }

    const handleEmptyCart = () => {
        if (cartLists.length > 0) {
            navigation.navigate('Checkout', {
                totalAmount: total,
                handleCheckout: handleCheckout,
            })
        } else {
            Alert.alert(
                'Cart is empty! Please add some items to the cart for checkout'
            )
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Cart Items</Text>
            </View>
            <ScrollView
                style={{ width: '100%', marginBottom: 10, padding: 10 }}
            >
                <View>
                    {cartLists.map(item => (
                        <View
                            key={item.id}
                            style={{
                                width: '100%',
                                display: 'flex',
                                marginBottom: 10,
                            }}
                        >
                            <View key={item.id} style={styles.listItem}>
                                <View style={{ display: 'flex', gap: 7 }}>
                                    <Text style={styles.itemText}>
                                        {item.name} ({item.volume})
                                    </Text>
                                    <Text style={styles.itemText}>
                                        ${item.price}/item
                                    </Text>
                                    <View style={styles.quantityContainer}>
                                        <Pressable
                                            onPress={() =>
                                                handleDecreaseQuantity(item)
                                            }
                                        >
                                            <Ionicons
                                                name="remove-circle-outline"
                                                size={24}
                                                color="black"
                                            />
                                        </Pressable>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                textTransform: 'capitalize',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {item.quantity}
                                        </Text>
                                        <Pressable
                                            onPress={() =>
                                                handleIncreaseQuantity(item)
                                            }
                                        >
                                            <Ionicons
                                                name="add-circle-outline"
                                                size={24}
                                                color="black"
                                            />
                                        </Pressable>
                                    </View>
                                </View>
                                <Pressable
                                    onPress={() => handleRemoveItem(item.id)}
                                >
                                    <Ionicons
                                        name="trash-outline"
                                        size={24}
                                        color="black"
                                    />
                                </Pressable>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        handleEmptyCart()
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 30,
                        }}
                    >
                        <Text style={styles.buttonText}>Checkout</Text>
                        <Text style={styles.buttonText}>Total: ${total}</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

export default CartList
