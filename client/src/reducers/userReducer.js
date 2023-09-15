import { createSlice } from "@reduxjs/toolkit";
import * as api from '../api'

let initialState = {
    user: null,
    token: null,
    error: null,
    loading: 'idle'
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loadingState: (state, action) => {
            if(state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        
        setUser: (state, action) => { 
            localStorage.setItem('profile', JSON.stringify({...action?.payload?.data}))   
            state.user = action?.payload?.data
            state.token = action?.payload?.token
        },

        logOut: (state, action) => {
            localStorage.clear()
            return {...state, user: null}
        }
    }
})

export const {setUser, logOut, loadingState} = userSlice.actions

export const logIn = (formData) => {
    return async dispatch => {
        const data = await api.signIn(formData)
        dispatch(setUser(data))
    }
}
export const signup = (formData) => {
    return async dispatch => {
        const data = await api.signUp(formData)
        dispatch(setUser(data))
    }
}

export default userSlice.reducer