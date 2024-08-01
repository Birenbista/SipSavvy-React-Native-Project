import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 3,
    },
    header: {
        backgroundColor: '#102C57',
        height: 40,
        marginBottom: 10,
        padding: 4,
        marginTop: 3,
        borderRadius: 5,
    },
    headerText: {
        padding: 5,
        color: 'white',
        alignSelf: 'center',
        fontSize: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    totalAmountText: {
        fontSize: 16,
        marginBottom: 10,
        alignSelf: 'center',
    },
    confirmButton: {
        backgroundColor: '#102C57',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: 200,
        alignSelf: 'center',
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})
