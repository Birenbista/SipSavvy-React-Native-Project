import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dashboard from '../Home/Dashboard'
import CategoryItems from '../Home/CategoryItems'

const HomeStack = createNativeStackNavigator()

export const commonHeaderOptions = {
    headerStyle: {
        backgroundColor: '#102C57',
    },
    headerTintColor: '#fff',
}

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="SipSavvy"
                component={Dashboard}
                options={commonHeaderOptions}
            />
            <HomeStack.Screen
                name="CategoryProducts"
                component={CategoryItems}
                options={{ ...commonHeaderOptions, title: 'Category Products' }}
            />
        </HomeStack.Navigator>
    )
}

export default HomeStackScreen
