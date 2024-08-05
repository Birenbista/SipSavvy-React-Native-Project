import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
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
import { store } from './Components/Redux/store'
import AppLoader from './Components/AppLoader'
import * as SplashScreen from 'expo-splash-screen'
import OrderHistoryScreen from './Components/Screens/OrderHistoryScreen'
import Logout from './Components/Screens/Logout'

SplashScreen.preventAutoHideAsync()

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function AppWrapper() {
    const cartLists = useSelector(state => state.cartList.list)
    const totalItems = cartLists.length

    const auth = getAuth(app)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const onAuthStateChangedHandler = user => {
        setUser(user)
        setLoading(false)
        SplashScreen.hideAsync()
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, onAuthStateChangedHandler)
        return unsubscribe
    }, [auth])

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#102C57',
                }}
            >
                <ActivityIndicator size="large" color="#fff" />
            </View>
        )
    }

    return (
        <NavigationContainer>
            {user ? (
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName

                            if (route.name === 'HomeScreen') {
                                iconName = focused ? 'home' : 'home-outline'
                            } else if (route.name === 'CartScreen') {
                                iconName = focused ? 'cart' : 'cart-outline'
                            } else if (route.name === 'Order History') {
                                iconName = focused
                                    ? 'document-text'
                                    : 'document-text-outline'
                            } else if (route.name === 'Logout') {
                                iconName = focused
                                    ? 'log-out'
                                    : 'log-out-outline'
                            }

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
                            color: 'black',
                            backgroundColor: '#ffffff',
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
                        name="Order History"
                        options={{
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: '#102C57',
                            },
                            headerTintColor: '#fff',
                        }}
                        component={OrderHistoryScreen}
                    />
                    <Tab.Screen name="Logout" component={Logout} />
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
