import { StatusBar } from 'expo-status-bar'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider, useSelector } from 'react-redux'
import { app } from './Components/Database/config'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterScreen from './Components/Auth/RegisterScreen'
import LoginScreen from './Components/Auth/LoginScreen'
import HomeStackScreen from './Components/Screens/HomeStackScreen'
import CartScreen from './Components/Screens/CartScreen'
import SettingScreen from './Components/Screens/SettingsScreen'
import CategoryItems from './Components/Home/CategoryItems'
import { store } from './Components/Redux/store'
import AppLoader from './Components/AppLoader'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function AppWrapper() {
    const cartLists = useSelector(state => state.cartList.list)
    const totalItems = cartLists.length

    const auth = getAuth(app)
    const [user, setUser] = useState(null)

    // Handle user state changes
    const onAuthStateChangedHandler = user => {
        setUser(user)

        // SplashScreen.hideAsync()
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, onAuthStateChangedHandler)
        return unsubscribe
    }, [])

    return (
        <NavigationContainer>
            {user ? (
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName

                            if (route.name === 'HomeScreen') {
                                iconName = focused ? 'home' : 'home-outline'
                            } else if (route.name === 'Settings') {
                                iconName = focused ? 'settings' : 'settings'
                            } else if (route.name === 'CartScreen') {
                                iconName = focused ? 'cart' : 'cart-outline'
                            }

                            // You can return any component that you like here!
                            return (
                                <Ionicons
                                    name={iconName}
                                    size={size}
                                    color={color}
                                />
                            )
                        },
                        headerShown: false,
                        tabBarActiveTintColor: '#088395',
                        tabBarInactiveTintColor: '#fff',
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            backgroundColor: '#102C57',
                        },
                        tabBarBadgeStyle: {
                            color: 'black', // Change this to your desired color
                            backgroundColor: '#ffffff', // Optional: Change badge background color
                        },
                    })}
                >
                    <Tab.Screen name="HomeScreen" component={HomeStackScreen} />
                    <Tab.Screen
                        name="CartScreen"
                        options={{ tabBarBadge: totalItems }}
                        component={CartScreen}
                    />
                    <Tab.Screen
                        name="Settings"
                        options={{ headerShown: true }}
                        component={SettingScreen}
                    />
                </Tab.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    )
}

export default function App() {
    return (
        <Provider store={store}>
            <View style={{ flex: 1 }}>
                <AppLoader />
                <AppWrapper />
            </View>
        </Provider>
    )
}
