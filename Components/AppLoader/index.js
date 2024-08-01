import { useDispatch } from 'react-redux'
import * as database from '../Database'
import { setData } from '../Redux/CartListSlice'
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function AppLoader() {
    const dispatch = useDispatch()
    const auth = getAuth()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user)
                const userId = user.uid
                ;(async () => {
                    const fetchedData = await database.loadCartItems(userId)
                    dispatch(setData(fetchedData))
                })()
            } else {
                setUser(null)
                dispatch(setData([])) // Clear cart data when no user is logged in
            }
        })
        return unsubscribe
    }, [auth, dispatch])

    return null
}
