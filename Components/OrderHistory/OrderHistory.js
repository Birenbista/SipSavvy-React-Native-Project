import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, Text, View, Image, SafeAreaView } from 'react-native'
import * as database from '../Database'
import styles from './styles'
import { getAuth } from 'firebase/auth'
import { useFocusEffect } from '@react-navigation/native'

const OrderHistory = () => {
    const [orders, setOrders] = useState([])
    const auth = getAuth()
    const user = auth.currentUser
    const userId = user ? user.uid : null

    const fetchOrders = async () => {
        if (userId) {
            const fetchedOrders = await database.loadOrders(userId)
            setOrders(fetchedOrders)
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchOrders()
        }, [userId])
    )

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Order Details</Text>
            </View>
            {orders.length === 0 ? (
                <View style={styles.emptyMessageContainer}>
                    <Text style={styles.emptyMessage}>No Orders Found!</Text>
                </View>
            ) : (
                <ScrollView style={{ padding: 10 }}>
                    {orders.map(order => (
                        <View key={order.id} style={styles.orderContainer}>
                            <Text style={styles.orderDate}>
                                Order Date:{' '}
                                {new Date(order.orderDate).toLocaleDateString()}
                            </Text>
                            <Text style={styles.orderTotal}>
                                Total: ${order.totalAmount}
                            </Text>
                            <View>
                                {order.items && order.items.length > 0 ? (
                                    order.items.map(item => (
                                        <View
                                            key={item.id}
                                            style={styles.listItemContainer}
                                        >
                                            <View
                                                key={item.id}
                                                style={styles.listItem}
                                            >
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Image
                                                        style={styles.cartImage}
                                                        source={{
                                                            uri: item.imageURL,
                                                        }}
                                                        resizeMode="contain"
                                                    />
                                                    <View
                                                        style={{
                                                            marginLeft: 10,
                                                        }}
                                                    >
                                                        <Text
                                                            style={
                                                                styles.itemText
                                                            }
                                                        >
                                                            {item.name} (
                                                            {item.volume})
                                                        </Text>
                                                        <Text
                                                            style={
                                                                styles.itemText
                                                            }
                                                        >
                                                            ${item.price}
                                                            /item
                                                        </Text>
                                                        <Text
                                                            style={
                                                                styles.itemText
                                                            }
                                                        >
                                                            Quantity:{' '}
                                                            {item.quantity}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    ))
                                ) : (
                                    <Text>No items found in this order.</Text>
                                )}
                            </View>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    )
}

export default OrderHistory
