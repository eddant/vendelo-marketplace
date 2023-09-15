import React, { useEffect, useState } from 'react'
import { Container, Box, Button, Stack, Typography } from '@mui/material'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getOneArticulo } from '../../reducers/articulosReducer'

const Details = () => {
  const { articulo, loading } = useSelector((state) => state.articulos)
  const [imageIndex, setImageIndex] = useState(0)
  const dispatch = useDispatch()
  const { id } = useParams()

  console.log(id)

  useEffect(() => {
    dispatch(getOneArticulo(id))
  }, [dispatch])


  console.log(imageIndex)

  if (!articulo) return null

  if (loading === 'pending') {
    return 'loading'
  }

  //const {images, description, name, precio} = articulo

  return (
    <Container maxWidth='lg'>
      <Stack direction='row' spacing={12}>
        <Box>
          <Typography variant='h4'>{articulo?.nombre}</Typography>
          {articulo?.images && (
            <Box sx={{ position: 'relative' }}>
              <Box sx={{textAlign: 'center', position: 'absolute', top: '50%', left: -20, cursor: 'pointer', backgroundColor: 'gray', width: '40px', height: '40px', borderRadius: '50%' }} onClick={() => setImageIndex((prev) => prev === 0 ? prev = articulo?.images?.length - 1 : prev - 1)}>
                <KeyboardArrowLeft fontSize='large' sx={{color: 'white'}} />
              </Box>
              <img height={200} width={200} src={articulo?.images[imageIndex]?.url} />
              <Box sx={{textAlign: 'center', position: 'absolute', top: '50%', right: -20, cursor: 'pointer', backgroundColor: 'gray', width: '40px', height: '40px', borderRadius: '50%' }} onClick={() => setImageIndex((prev) => prev === articulo?.images?.length - 1 ? prev = 0 : prev + 1)}>
                <KeyboardArrowRight fontSize='large' sx={{color: 'white'}} />
              </Box>
            </Box>
          )}
          <Box>
            {articulo?.images?.map((img, indx) => (
              <img style={{ opacity: indx === imageIndex ? 0.6 : 1 }}
                key={indx} height={50} width={50} src={img.url} />
            )
            )}
          </Box>
        </Box>
        <Stack spacing={6}>
          <Box>
            <Typography variant='h5'>
              Precio
            </Typography>
            <Typography>
              RD${articulo?.precio}
            </Typography>
          </Box>
          <Box>
            <Typography variant='h5'>
              Descripcion
            </Typography>
            <Typography>
              {articulo?.descripcion}
            </Typography>
          </Box>
        </Stack>
        <Stack>
          <Typography variant='h5'>
            User info:
          </Typography>
        </Stack>
      </Stack>
    </Container>
  )
}

export default Details