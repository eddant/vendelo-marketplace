import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useLocation, Link} from 'react-router-dom'
import {AppBar, Toolbar, Typography, Button, TextField, Box} from '@mui/material'
import {buttonStyle} from './styles'

import { searchByArticuloApi } from '../../reducers/articulosReducer'

/*const useQuery = () => {
    return new URLSearchParams(useLocation().search())
}*/

const Navbar = () => {
    const [search, setSearch] = useState('')
    const [precio, setPrecio] = useState('')
    const [user, setUser] = useState(null)
    console.log(user)
    const dispatch = useDispatch()
    //const query = useQuery()
    const navigate = useNavigate()


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [])


    const searchArticulo = () => {
        if(search.trim() || precio){
            dispatch(searchByArticuloApi({search, precio}))
            navigate(`/articulos/search?query=${search || 'none'}&price=${precio}`)
        } else {
            navigate('/')
        }
    }
    
  return (
    <AppBar sx={{backgroundColor: 'white', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
        <Toolbar>
            <Typography component={Link} to='/' reloadDocument variant='button' color='black'>Vendelo</Typography>
        </Toolbar>
        <Toolbar>
           <TextField 
           name='search'
           variant='outlined'
           label='Buscar articulo'
           value={search}
           onChange={({target}) => setSearch(target.value)}
           required
           />
           <Button
            onClick={searchArticulo}
            color='primary'
            variant='contained'
            children='Buscar'
            ></Button>
            </Toolbar>
        <Toolbar sx={{gap: '10px'}}>
            {!user ? (
            <Box>
            <Button variant="contained" component={Link} to='/signin' sx={buttonStyle}>
                <Typography variant='body2'>Iniciar Sesion</Typography>
            </Button>
            <Button variant='contained' sx={buttonStyle} >
                <Typography variant='body2'>Crear Cuenta</Typography>
            </Button>
            </Box>
             ) : (
                <Box>
                    <Typography variant='h3' sx={{color: 'black'}}>{user?.username}</Typography>
                </Box>
            )}
        </Toolbar>
    </AppBar>
  )
}

export default Navbar