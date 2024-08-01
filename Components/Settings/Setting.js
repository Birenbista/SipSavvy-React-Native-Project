import { View, Text, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import styles from './styles'
import { auth, signOut } from '../Database/config'

const Setting = () => {
    const handleLogout = () => {
        signOut(auth).then(() => {})
    }

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            {/* <View style={{ margin: 10 }}>
                <View >
                    <Text style={styles.notificationheader}>Notification</Text>
                    <Text style={styles.notificationsubheader}>Remind me about the items in cart</Text>
                </View>

                <View style={styles.switchContainer}>
                    <Switch
                        value={reminder}
                        onValueChange={handleReminderPress}
                    />
                    <Pressable onPress={handleReminderPress}>
                        <Text>Set Daily Reminder</Text>
                    </Pressable>

                </View> */}
            <View style={styles.buttonContainer}>
                <Pressable style={styles.logout} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Sign Out</Text>
                </Pressable>
            </View>
            {/* </View> */}
        </SafeAreaView>
    )
}
export default Setting
