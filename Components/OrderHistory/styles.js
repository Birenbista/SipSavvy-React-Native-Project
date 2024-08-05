import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    emptyMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyMessage: {
        fontSize: 18,
        color: '#888',
    },
    orderContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    orderDate: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    orderTotal: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    listItemContainer: {
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cartImage: {
        width: 50,
        height: 50,
    },
    itemText: {
        fontSize: 16,
    },
})

export default styles
