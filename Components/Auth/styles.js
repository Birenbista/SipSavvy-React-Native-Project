import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#088395',
        color: 'white',
    },
    SafeAreaView: {
        flex: 1,
        backgroundColor: '#102C57',

        padding: 10,
    },
    loginBtn: {
        backgroundColor: '#088395',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        width: 110,
        alignItems: 'center',
    },

    SignUpBtn: {
        backgroundColor: '#088395',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 1,
        width: 110,
        alignItems: 'center',
    },
    goToLogin: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 1,
        width: 130,
        alignItems: 'center',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        alignContent: 'center',
        gap: 2,
        flexDirection: 'row',
    },
    btnAuth: {
        color: '#37B7C3',
        fontSize: 18,
        fontWeight: 'bold',
    },

    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logo: {
        width: '100%',
        height: 300,
        marginBottom: 30,
    },
    title: {
        padding: 5,
        color: 'white',
        alignSelf: 'center',
        fontSize: 30,
    },
})
