import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:5000/api'})

export const fetchArticulos = async () => API.get('/articulos/')

export const fetchOneArticulo = async (id) => API.get(`/articulos/${id}`)

export const postArticulo = async (articulo) => {
    const response = await API.post('/articulos/', articulo)
    return response.data
} 


export const searchForArticulo = async (query) => {
    const response = await API.get(`/articulos/search?query=${query.search || 'none'}&precio=${query.precio}`)
    return response.data
}

export const updateArticulo = async (id, articulo) => {
    const response = await API.patch(`articulos/${id}`, articulo)
    return response.data
}

export const eliminarArticulo = async (id) => {
    const response = await API.delete(`articulos/${id}`)
    return response
}

export const agregarFavorito = async (id) => {
    const response = await API.patch(`articulos/${id}/addFavorito`)
    return response.data
}

export const signIn = async (formData) => {
    const response = await API.post('/user/signin', formData)
    return response.data
}

export const signUp = async (formData) => {
    const response = await API.post('/user/signup', formData)
    return response.data
}