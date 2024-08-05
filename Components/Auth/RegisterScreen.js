import React from 'react'
import {
    Text,
    SafeAreaView,
    TextInput,
    View,
    Alert,
    Image,
    Pressable,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import styles from './styles'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Database/config'

const RegisterScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets()
    const [email, onChangeEmail] = React.useState('')
    const [password, onChangePassword] = React.useState('')

    const handleSignUp = () => {
        if (
            email === '' ||
            email == null ||
            password === '' ||
            password == null
        ) {
            Alert.alert('Enter email and password to Sign Up')
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then(userCredential => {
                    const user = userCredential.user
                    console.log('User account created:', user.uid)
                    // navigation.navigate('Login')
                    Alert.alert('Signed Up Successfully')
                })
                .catch(error => {
                    if (error.code === 'auth/invalid-email') {
                        Alert.alert('Please enter the correct email')
                    } else if (error.code === 'auth/weak-password') {
                        Alert.alert(
                            'Error: Password must be at leat 6 character'
                        )
                    }
                })
        }
    }
    return (
        <SafeAreaView style={styles.SafeAreaView}>
            {/* <View style={{ display: 'flex', flexDirection: 'column' }}> */}
            {/* <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
            /> */}
            <View style={{ marginTop: 90 }}>
                <Text
                    style={{
                        margin: 12,
                        fontSize: 22,
                        fontWeight: 'bold',
                        color: 'white',
                    }}
                >
                    Create your account.
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    placeholderTextColor="white"
                    value={email}
                    placeholder="Enter email"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePassword}
                    placeholderTextColor="white"
                    value={password}
                    placeholder="Enter password"
                />
            </View>

            <View style={styles.buttonContainer}>
                <Pressable style={styles.SignUpBtn} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </Pressable>
            </View>

            <View style={styles.buttonContainer}>
                <Text style={{ fontSize: 18, margin: 5, color: 'white' }}>
                    Already have an account?
                </Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.btnAuth}>Sign in</Text>
                </Pressable>
            </View>

            {/* </View> */}
        </SafeAreaView>
    )
}

export default RegisterScreen
