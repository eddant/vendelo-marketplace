import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Typography, Paper} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

//import { articulosGetApi } from '../../../reducers/articulos'

const Articulo = ({ articulo }) => {

  return (
    <Paper  elevation={3} sx={{width: '250px', }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10px'}} >
        <Link to={`articulos/details/${articulo._id}`}>
        <img height={200} width={230} src={articulo?.images[0]?.url} /> 
        </Link>
      <Box>
        <Typography><em>RD$</em> {articulo.precio} </Typography>
        <Typography variant='h5'>{articulo.nombre}</Typography>
      </Box>
      <Box sx={{marginInline: '80%', cursor: 'pointer'}}>
        <FavoriteBorderIcon  sx={{color: 'red'}} fontSize='large' />
      </Box>
    </Box>
    </Paper>
  )
}

export default Articulo