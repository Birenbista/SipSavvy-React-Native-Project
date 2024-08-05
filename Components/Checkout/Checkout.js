import React from 'react'
import { View, Text, TextInput, Pressable, Alert } from 'react-native'
import styles from './styles'
import { useState } from 'react'
import { getAuth } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import * as database from '../Database'
import { removeData } from '../Redux/CartListSlice'

const postalCodeRegex = /^[A-Z0-9]{3} [A-Z0-9]{3}$/i
const phoneNumberRegex = /^\d{10}$/

const Checkout = ({ route, navigation }) => {
    const { totalAmount } = route.params
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [confirmed, setConfirmed] = useState(false)

    const auth = getAuth()
    const user = auth.currentUser
    const userId = user ? user.uid : null
    const cartLists = useSelector(state => state.cartList.list)
    const dispatch = useDispatch()

    const handleOrderConfirmation = () => {
        if (totalAmount <= 0) {
            Alert.alert(
                'No items in the Cart. Please add items to place order.'
            )
        } else if (!address.trim()) {
            Alert.alert('Please enter your address.')
        } else if (!city.trim()) {
            Alert.alert('Please enter your city.')
        } else if (!postalCode.trim() || !postalCodeRegex.test(postalCode)) {
            Alert.alert('Please enter a valid postal code.')
        } else if (!phoneNumber.trim() || !phoneNumberRegex.test(phoneNumber)) {
            Alert.alert('Please enter a valid phone number.')
        } else {
            Alert.alert('Confirm Order', 'Are your sure?', [
                {
                    text: 'Yes',
                    onPress: async () => {
                        setAddress('')
                        setCity('')
                        setPostalCode('')
                        setPhoneNumber('')
                        setConfirmed(true)
                        // handleCheckout()

                        const orderData = {
                            address,
                            city,
                            postalCode,
                            phoneNumber,
                            totalAmount,
                            items: cartLists,
                            orderDate: new Date().toISOString(),
                        }
                        await database.saveOrder(userId, orderData)

                        cartLists.forEach(item => {
                            dispatch(removeData(item.id))
                            database.remove(userId, item.id)
                        })
                        navigation.goBack()
                    },
                },
                {
                    text: 'Cancel',
                },
            ])
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Address Details</Text>
            </View>
            <TextInput
                placeholder="Enter Address"
                style={styles.input}
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                placeholder="Enter City"
                style={styles.input}
                value={city}
                onChangeText={setCity}
            />
            <TextInput
                placeholder="Enter Postal Code"
                style={styles.input}
                value={postalCode}
                onChangeText={setPostalCode}
            />
            <TextInput
                placeholder="Enter Phone Number"
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
            {confirmed ? (
                <Text style={styles.totalAmountText}>Total: $0</Text>
            ) : (
                <Text style={styles.totalAmountText}>
                    Total Amount: ${totalAmount}
                </Text>
            )}
            <Pressable
                style={styles.confirmButton}
                onPress={handleOrderConfirmation}
            >
                <Text style={styles.confirmButtonText}>Confirm Order </Text>
            </Pressable>
        </View>
    )
}

export default Checkout
