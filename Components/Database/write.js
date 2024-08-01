import {
    collection,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore'
import { db } from './config'

export async function saveProduct(userId, data) {
    try {
        console.log(userId)
        console.log('This is data', data)
        const dbCollection = collection(db, `users/${userId}/cartList`)
        const docRef = await addDoc(dbCollection, data)
        return docRef.id
    } catch (e) {
        console.error('Error adding document: ', e)
    }
}
export async function remove(userId, id) {
    try {
        const docRef = doc(db, `users/${userId}/cartList`, id)
        await deleteDoc(docRef)
        return true
    } catch (e) {
        return false
    }
}
export async function update(userId, id, data) {
    try {
        const docRef = doc(db, `users/${userId}/cartList`, id)
        await updateDoc(docRef, data)
        return true
    } catch (e) {
        return false
    }
}
