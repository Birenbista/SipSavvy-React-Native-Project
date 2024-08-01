import { Button, StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    logout: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 1,
        width: 120,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 400,
    },

    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    header: {
        marginTop: 5,
        backgroundColor: '#adbaa6',

        alignContent: 'center',
        alignItems: 'center',
        fontSize: 25,
        padding: 2,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    notificationheader: {
        marginTop: 10,
        backgroundColor: '#386C0B',
        fontSize: 20,
        color: 'white',
        height: 30,
        padding: 3,
    },
    notificationsubheader: {
        marginTop: 3,
        opacity: 0.5,
    },
})
