import { collection, getDocs } from 'firebase/firestore'
import { db } from './config'

export async function loadproducts(category) {
    const loadCategory = category.toLowerCase()
    const data = []
    const querySnapshot = await getDocs(
        collection(db, `categories/${category}/${loadCategory}`)
    )
    querySnapshot.forEach(doc => {
        data.push({
            ...doc.data(),
            id: doc.id,
        })
    })
    console.log(data)
    return data
}

export async function loadCategories() {
    const data = []
    const querySnapshot = await getDocs(collection(db, 'categories'))
    querySnapshot.forEach(doc => {
        data.push({
            ...doc.data(),
            id: doc.id,
        })
    })
    return data
}

export async function loadCartItems(userId) {
    const data = []
    const querySnapshot = await getDocs(
        collection(db, `users/${userId}/cartList`)
    )
    querySnapshot.forEach(doc => {
        data.push({
            ...doc.data(),
            id: doc.id,
        })
    })
    return data
}
