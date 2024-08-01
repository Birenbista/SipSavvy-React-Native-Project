import React from 'react'
import { View, Text, TextInput, Pressable, Alert } from 'react-native'
import styles from './styles'
import { useState } from 'react'

const Checkout = ({ route, navigation }) => {
    const { totalAmount, handleCheckout } = route.params
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [confirmed, setConfirmed] = useState(false)

    const handleOrderConfirmation = () => {
        if (totalAmount <= 0) {
            Alert.alert(
                'No items in the Cart. Please add items to place order.'
            )
        } else if (!address || !city || !postalCode) {
            Alert.alert('Please fill in all fields')
        } else {
            Alert.alert('Confirm Order', 'Are your sure?', [
                {
                    text: 'Yes',
                    onPress: async () => {
                        setAddress('')
                        setCity('')
                        setPostalCode('')
                        setConfirmed(true)
                        handleCheckout()
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
