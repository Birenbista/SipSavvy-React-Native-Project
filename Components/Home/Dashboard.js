import { useEffect, useState } from 'react'
import * as database from '../Database'
import {
    Button,
    Image,
    Pressable,
    Text,
    View,
    ActivityIndicator,
    ScrollView,
} from 'react-native'
import styles from './styles'

const Dashboard = ({ navigation }) => {
    const [data, setData] = useState([])
    const [loadingData, setLoadingData] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingData(true)
                const fetchedData = await database.loadCategories()
                setData(fetchedData)
                setLoadingData(false)
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

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.cardGrid}>
                    {data.map(item => (
                        <Pressable
                            key={item.id}
                            onPress={() =>
                                navigation.navigate('CategoryProducts', {
                                    category: item.id,
                                })
                            }
                            style={styles.cardContainer} // Apply the same styles
                        >
                            <View style={styles.cardInfo}>
                                <Image
                                    style={styles.cardImage}
                                    source={{
                                        uri: item.image,
                                    }}
                                    resizeMode="contain"
                                />
                                <Text style={styles.cardText}>{item.id}</Text>
                            </View>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default Dashboard
