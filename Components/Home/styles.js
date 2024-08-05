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
        gap: 1,
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
        gap: 16,
        marginBottom: 5,
    },

    searchInput: {
        backgroundColor: '#102C57',
        height: 40,
        color: 'white',
        padding: 5,
        margin: 2,
        borderRadius: 5,
    },
    overlayContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#102C57',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
