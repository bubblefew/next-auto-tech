import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import userReducer from './slices/userSlice'
import productReducer from './slices/productSlice'
import invoiceReducer from './slices/invoiceSlice'



const reducer = {
    user: userReducer,
    product: productReducer,
    invoice: invoiceReducer
}

export const store = configureStore({
    reducer,
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()


