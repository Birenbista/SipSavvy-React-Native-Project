import { useState } from 'react'
import {
    SafeAreaView,
    Text,
    TextInput,
    Pressable,
    View,
    Image,
    Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styles from './styles'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Database/config'

const LoginScreen = ({ navigation }) => {
    // const insets = useSafeAreaInsets()
    const [email, setEmailChange] = useState('')
    const [password, setPasswordChange] = useState('')

    const handleLogin = () => {
        if (
            email === '' ||
            email == null ||
            password === '' ||
            password == null
        ) {
            Alert.alert('Enter email and password to sign in!')
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then(userCredential => {
                    // Login successful
                })
                .catch(error => {
                    // console.error('Error logging in:', error.message);
                    setEmailChange('')
                    setPasswordChange('')
                    Alert.alert(
                        'Error',
                        'Invalid email or password. Please try again.'
                    )
                })
        }
    }
    return (
        <SafeAreaView style={styles.SafeAreaView}>
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
                    Sign in to your account
                </Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="white"
                    onChangeText={setEmailChange}
                    value={email}
                    placeholder="Email"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="white"
                    secureTextEntry={true}
                    onChangeText={setPasswordChange}
                    value={password}
                    placeholder="Password"
                />

                <View style={styles.buttonContainer}>
                    <Pressable style={styles.loginBtn} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </Pressable>
                </View>
                <View style={styles.buttonContainer}>
                    <Text style={{ fontSize: 18, margin: 5, color: 'white' }}>
                        Don't have an account yet?
                        <Pressable
                            onPress={() => navigation.navigate('Register')}
                        >
                            <Text
                                style={{
                                    color: '#37B7C3',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                }}
                            >
                                Sign Up
                            </Text>
                        </Pressable>
                    </Text>
                </View>
            </View>
            {/* </View> */}
        </SafeAreaView>
    )
}

export default LoginScreen
