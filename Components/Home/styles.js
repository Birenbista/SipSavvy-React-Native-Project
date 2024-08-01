import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    container: {
        gap: 10,
    },
    header: {
        backgroundColor: '#088395',
        height: 30,
    },
    headerText: {
        padding: 5,
        color: 'white',
        alignSelf: 'center',
        fontSize: 16,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        color: 'black',
        fontSize: 21,
        marginTop: 10,
    },
    cardContainer: {
        flexBasis: '47%',
        backgroundColor: 'white',
        borderRadius: 8,
        width: '100%',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 20,
        shadowColor: '#52006A',
    },

    cardInfo: {
        display: 'flex',
        gap: 5,
    },
    cardImage: {
        width: '100%',
        height: 250,
    },
    cardText: {
        alignSelf: 'center',
        fontSize: 18,
        textTransform: 'capitalize',
    },
    cardGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        padding: 10,
        // justifyContent: 'space-between',
        gap: 16,
        marginBottom: 5,
    },
    buttonContainer: {
        position: 'absolute',
        opacity: 0.7,
        top: '50%',
        width: '100%',
        backgroundColor: '#102C57',
    },
    addToCart: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: 18,
        padding: 4,
        color: 'white',
    },
    searchInput: {
        backgroundColor: '#102C57',
        height: 40,
        color: 'white',
        padding: 5,
        margin: 2,
        borderRadius: 5,
    },
})
