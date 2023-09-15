import React, {useState, useEffect} from 'react'
import { Box, Stack } from '@mui/material'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { searchByArticuloApi } from '../../reducers/articulosReducer'

import './Sidebar.css'

const Sidebar = ({categorias}) => {

    const [search, setSearch] = useState('')

    console.log(search)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(search.trim()) {
            dispatch(searchByArticuloApi({search}))
            navigate(`/articulos/search?query=${search}`)
        } else {
            navigate('/')
        }
    }, [search])

  return (
    <Stack sx={{display: {xs: 'none', md: 'block'}, position: 'fixed', top: '100px'}}>
            {categorias.map((item, index) => (
                <Box onClick={() => setSearch(item.categoria)} 
                className='category_class' 
                sx={{display: 'flex', flexDirection: 'row', justifyContent: 'start', gap: '10px',
                alignItems: 'center', padding: '10px 50px 10px 10px', border: 'solid 1px' , cursor: 'pointer',
                backgroundColor: item.categoria === search && 'aqua'
            }}
                key={index}>{item.categoria} <img src={item.icono} height={50} width={50} alt="" />
                </Box>
                ))}
        </Stack>
  )
}

export default Sidebar