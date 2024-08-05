import React, { useCallback } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../Database/config'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'

export default function Logout() {
    const navigation = useNavigation()
    const handleLogout = () => {
        Alert.alert(
            'Confirm Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => navigation.navigate('HomeScreen'),
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        signOut(auth).then(() => {
                            // You can add any additional logic here if needed
                        })
                    },
                },
            ],
            { cancelable: false }
        )
    }

    useFocusEffect(
        useCallback(() => {
            handleLogout()
        }, [])
    )

    return ''
}
