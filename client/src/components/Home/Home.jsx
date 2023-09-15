import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { articulosGetApi } from '../../reducers/articulosReducer'
import { Stack, Box, Container } from '@mui/material'
import Articulos from '../Articulos/Articulos'


import { categorias } from '../../utils/Constants'
import Sidebar from '../Sidebar/Sidebar'

const Home = () => {
    const [category, setCategory] = useState('')
    const [selectedCategory, setSelecteCategory] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(articulosGetApi())
    }, [dispatch])

    

    return (
        <Container>
                <Sidebar categorias={categorias} />
            <Box sx={{ marginLeft: '18rem'}}>
                <Articulos />
            </Box>
        </Container>
    )
}

export default Home