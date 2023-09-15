import React from 'react'
import {useSelector} from 'react-redux'
import Articulo from './Articulo/Articulo'
import {Grid, CircularProgress} from '@mui/material'

const Articulos = () => {
  const {articulos, loading} = useSelector((state) => state.articulos)
 
  return (
    loading === 'pending' ? <CircularProgress size={60}/> : (
      <Grid container sx={{padding: '20px'}}>
        {articulos.map((articulo) => (
          <Grid key={articulo._id} item xs={12} sm={3}>
            <Articulo articulo={articulo}/>
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Articulos