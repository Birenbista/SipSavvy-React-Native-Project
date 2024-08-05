import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, Text, View, Alert, Image } from 'react-native'
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

    const handleRemoveItem = itemID => {
        Alert.alert(
            'Delete Item',
            'Are you sure you want to delete the item?',
            [
                {
                    text: 'Confirm',
                    style: 'destructive',
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

    const handleEmptyCart = () => {
        if (cartLists.length > 0) {
            navigation.navigate('Checkout', {
                totalAmount: total,
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
            {cartLists.length === 0 ? (
                <View style={styles.emptyMessageContainer}>
                    <Text style={styles.emptyMessage}>Cart is empty!</Text>
                </View>
            ) : (
                <ScrollView style={{ padding: 10 }}>
                    <View>
                        {cartLists.map(item => (
                            <View
                                key={item.id}
                                style={styles.listItemContainer}
                            >
                                <View key={item.id} style={styles.listItem}>
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Image
                                            style={styles.cartImage}
                                            source={{ uri: item.imageURL }}
                                            resizeMode="contain"
                                        />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={styles.itemText}>
                                                {item.name} ({item.volume})
                                            </Text>
                                            <Text style={styles.itemText}>
                                                ${item.price}/item
                                            </Text>
                                            <View
                                                style={styles.quantityContainer}
                                            >
                                                <Pressable
                                                    onPress={() =>
                                                        handleDecreaseQuantity(
                                                            item
                                                        )
                                                    }
                                                >
                                                    <Ionicons
                                                        name="remove-circle-outline"
                                                        size={24}
                                                        color="black"
                                                    />
                                                </Pressable>
                                                <Text style={{ fontSize: 16 }}>
                                                    {item.quantity}
                                                </Text>
                                                <Pressable
                                                    onPress={() =>
                                                        handleIncreaseQuantity(
                                                            item
                                                        )
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
                                    </View>
                                    <Pressable
                                        onPress={() =>
                                            handleRemoveItem(item.id)
                                        }
                                    >
                                        <Ionicons
                                            name="trash-outline"
                                            size={30}
                                            color="black"
                                        />
                                    </Pressable>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            )}
            {cartLists.length > 0 && (
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={handleEmptyCart}>
                        <View style={{ flexDirection: 'row', gap: 30 }}>
                            <Text style={styles.buttonText}>Checkout</Text>
                            <Text style={styles.buttonText}>
                                Total: ${total}
                            </Text>
                        </View>
                    </Pressable>
                </View>
            )}
        </View>
    )
}

export default CartList
