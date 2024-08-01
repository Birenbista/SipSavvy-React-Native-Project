import {
    Image,
    Text,
    Pressable,
    View,
    ScrollView,
    Alert,
    ActivityIndicator,
    TextInput,
} from 'react-native'
import { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as database from '../Database'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles'
import { addData, changeQuantity } from '../Redux/CartListSlice'
import { getAuth } from 'firebase/auth'

const CategoryItems = ({ route, navigation }) => {
    const { category } = route.params
    const cartLists = useSelector(state => state.cartList.list)

    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loadingData, setLoadingData] = useState(false)

    const auth = getAuth()
    const user = auth.currentUser
    const userId = user ? user.uid : null

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingData(true)
                const fetchedData = await database.loadproducts(category)
                console.log(fetchedData)
                setData(fetchedData)
                const timeout = setTimeout(() => {
                    setLoadingData(false)
                }, 1000)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])
    if (loadingData) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#adbaa6" />
                <Text style={styles.loadingText}>Loading data!</Text>
                <Text style={styles.loadingText}>Please wait!</Text>
            </View>
        )
    }
    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleAddToCart = async item => {
        console.log(userId)
        const existingItem = cartLists.find(
            cartItem => cartItem.name === item.name
        )

        if (existingItem) {
            const updatedQuantity = existingItem.quantity + 1
            const updated = await database.update(userId, existingItem.id, {
                quantity: updatedQuantity,
            })
            if (updated) {
                const updatedItem = {
                    ...existingItem,
                    quantity: updatedQuantity,
                }
                dispatch(changeQuantity(updatedItem))
                Alert.alert(
                    `Product already available in Cart. Quantity increased by 1 for ${existingItem.name}!`
                )
            } else {
                Alert.alert('Failed to update quantity in Database.')
            }
        } else {
            const addItems = {
                name: item.name,
                price: item.price,
                volume: item.volume,
                quantity: 1,
            }
            try {
                const productId = await database.saveProduct(userId, addItems)
                let item = {
                    id: productId,
                    ...addItems,
                }
                dispatch(addData(item))
                Alert.alert(`${addItems.name} Added to Cart!!`)
            } catch (error) {
                console.error('Error adding product to cart:', error)
                Alert.alert(
                    'Failed to add product to cart. Please try again later.'
                )
            }
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search Items"
                placeholderTextColor="#a6a6a6"
                onChangeText={text => setSearchQuery(text)}
                value={searchQuery}
            />
            <ScrollView>
                <View style={styles.cardGrid}>
                    {filteredData.map(item => (
                        <View key={item.id} style={styles.cardContainer}>
                            <View>
                                <View style={styles.cardInfo}>
                                    <Image
                                        style={styles.cardImage}
                                        src={`https://drive.google.com/uc?export=view&id=${item.image}`}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.cardText}>
                                        {item.name} ({item.volume})
                                    </Text>
                                    <Text style={styles.cardText}>
                                        ${item.price}/item
                                    </Text>
                                </View>
                                <Pressable
                                    onPress={() => handleAddToCart(item)}
                                    style={styles.buttonContainer}
                                >
                                    <View style={styles.addToCart}>
                                        <Ionicons
                                            name="cart-outline"
                                            size={24}
                                            color="white"
                                            style={{
                                                alignSelf: 'center',
                                                padding: 4,
                                            }}
                                        />
                                        <Text style={styles.buttonText}>
                                            Add To Cart
                                        </Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default CategoryItems
