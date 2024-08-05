import React, { useCallback } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../Database/config'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Alert, View } from 'react-native'

export default function Logout() {
    const navigation = useNavigation()
    const handleLogout = () => {
        navigation.navigate('HomeScreen')
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
                    style: 'destructive',
                    onPress: () => {
                        signOut(auth).then(() => {
                            navigation.navigate('HomeScreen')
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
