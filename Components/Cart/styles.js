import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#102C57',
        height: 40,
        marginBottom: 10,
        padding: 4,
        margin: 3,
        borderRadius: 5,
    },
    headerText: {
        padding: 5,
        color: 'white',
        alignSelf: 'center',
        fontSize: 18,
    },
    listItemContainer: {
        width: '100%',
        marginBottom: 10,
    },
    listItem: {
        padding: 5,
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textContainer: {
        display: 'flex',
        gap: 7,
    },
    itemText: {
        fontSize: 16,
        textTransform: 'capitalize',
    },
    quantityContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#102C57',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: 210,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
    },
    cartListContainer: {
        diplay: 'flex',
        flexDirection: 'column',
    },

    cartImage: {
        width: 80,
        height: 80,
    },
    emptyMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyMessage: {
        fontSize: 18,

        color: 'gray',
    },
})
