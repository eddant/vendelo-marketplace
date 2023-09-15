import {createSlice} from '@reduxjs/toolkit'
import * as api from '../api'

let initialState = {
    query: '',
    articulos: [],
    articulo: {},
    loading: 'idle',
    error: null
}



const articuloSlice = createSlice({
    name: 'articulos',
    initialState,
    reducers: {
        loadingState: (state, action) => {
            if(state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        setArticulos: (state, action) =>  {
           if(state.loading === 'pending') {
                state.loading = 'idle'
               state.articulos = action.payload
           }
        },
        setOneArticulo: (state, action) => {
            if(state.loading === 'pending') {
                state.loading = 'idle'
                state.articulo = action.payload
            }
        },     
        postArticulo: (state, action) => {
            return {...state, articulos: [...state.articulos, action.payload]}
        },

        searchArticulo: (state, action) => {
            if(state.loading === 'pending') {
                state.loading = 'idle'
               state.articulos = action.payload
           }
        }
    },
})

export const {setArticulos, setOneArticulo, postArticulo, searchArticulo, loadingState} = articuloSlice.actions



export const articulosGetApi = () => {
    return async dispatch => {
        dispatch(loadingState())
        const {data} = await api.fetchArticulos()
        dispatch(setArticulos(data))
    }
}

export const getOneArticulo = (id) => {
    return async dispatch => {
        dispatch(loadingState())
        const {data} = await api.fetchOneArticulo(id)
        dispatch(setOneArticulo(data))
    }
}

export const postArticuloApi = (articulo) => {
    return async dispatch => {
        const post = await api.postArticulo(articulo)
        dispatch(postArticulo(post))
    }
}

export const searchByArticuloApi = (searchQuery) => {
    return async dispatch => {
        dispatch(loadingState())
        const articulos = await api.searchForArticulo(searchQuery)
        dispatch(searchArticulo(articulos))
    }
}

export default articuloSlice.reducer

