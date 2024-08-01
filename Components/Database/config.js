// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    initializeAuth,
    getReactNativePersistence,
} from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
    apiKey: 'AIzaSyB-egW8D8ig3aAgO_wWkjnXR-dnYUkawxc',
    authDomain: 'level-3--cross-platform.firebaseapp.com',
    projectId: 'level-3--cross-platform',
    storageBucket: 'level-3--cross-platform.appspot.com',
    messagingSenderId: '1034934700629',
    appId: '1:1034934700629:web:adb34392974f4a0de2a2dc',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})

const db = getFirestore(app)

export {
    db,
    app,
    auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut,
}
