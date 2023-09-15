import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { postArticuloApi } from '../../reducers/articulosReducer'
import {Paper, TextField, Button, Select, MenuItem, InputLabel, OutlinedInput, Box } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
import {categorias} from '../../utils/Constants'

/*import FileBase from 'react-file-base64'
import ImageUploader from 'react-image-upload'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';*/

/*const initialState = {
    nombre: '',
    precio: '',
    imagen: '',
    descripcion: '', 
    favorito: ''
}*/

const Form = () => {
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState()
    const [descripcion, setDescripcion] = useState('')
    const [categoria, setCategoria] = useState('')
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    console.log(imagesPreview);
    
    const dispatch = useDispatch()

    const handleImagesChange = (e) => {
       const files = Array.from(e.target.files)

       //setImages([])
       //setImagesPreview([])

       files.forEach((file) => {
        const reader = new FileReader()

        reader.onload = () => {
            if(reader.readyState === 2) {
                setImagesPreview((old) => [...old, reader.result])
                setImages((old) => [...old, reader.result])
            }
        }

        reader.readAsDataURL(file)
       })
    }

    const deleteImageFromPreview = (index) => {
      imagesPreview.splice(index, 1)
      setImagesPreview([...imagesPreview])
    }



    const submitArticulo = (e) => {
        e.preventDefault()

        const articulosForm = new FormData()

        articulosForm.set('nombre', nombre)
        articulosForm.set('precio', precio)
        articulosForm.set('descripcion', descripcion)
        articulosForm.set('categoria', categoria)

        images.forEach((image) => {
            articulosForm.append("images", image);
          });

        dispatch(postArticuloApi(articulosForm))

        setNombre('')
        setPrecio('')
        setCategoria('')
        setDescripcion('')
        setImages([])
        setImagesPreview([])
        
    }

    /*const handleCategoriaChange = e => {
        e.preventDefault()
        setCategoria(e.target.value)
    }*/

  return (
    <Paper elevation={3}>
    <form onSubmit={submitArticulo} encType='multipart/form-data'>
            <TextField name='nombre' label='Articulo' placeholder='Que vendes?' value={nombre} onChange={({target}) => setNombre(target.value)}/>
            <TextField name='precio' label='Precio' placeholder='Cuanto pides por ello?' value={precio} onChange={({target}) => setPrecio(target.value)}/>
            <TextField name='descripcion' label='Descripcion' placeholder='Describe tu articulo' value={descripcion} onChange={({target}) => setDescripcion(target.value)}/>
            <InputLabel>Categoria</InputLabel>
            <Select
            name='categoria'
            value={categoria}
            onChange={({target}) => setCategoria(target.value)}
            input={<OutlinedInput label='Categoria'/> }
            >
                {categorias.map((item) => (
                    <MenuItem
                    key={item.categoria}
                    value={item.categoria}>
                        {item.categoria}
                    </MenuItem>
                ))}
            </Select>
              {imagesPreview.length < 5 ? 
            <Box>
              <InputLabel sx={{backgroundColor: '#5072A7'}}
               htmlFor='imagesUpload'>Seleccione las imagenes a subir</InputLabel>
            <input style={{display: 'none'}}
             type='file' id='imagesUpload' multiple onChange={handleImagesChange} accept='image/*'
            />
            </Box>
                : <p>Haz alcanzado el numero maximo de imagenes</p> } 
            <Box>
              {imagesPreview.map((image, index) => (
                <Box key={index} sx={{position: 'relative', width: 60}}>
                <img height={50} width={50} key={index} src={image} alt="Image Preview" />
                <CancelIcon onClick={() => deleteImageFromPreview(index, 1)}
                sx={{position: 'absolute', top: '-5px', right: '4px', cursor: 'pointer', color: 'red'}} fontSize='small'/>
                </Box>
              ))}
            </Box>
        <Button variant='contained' fullWidth type='submit'>publicar</Button>
    </form>
    </Paper>
  )
}

export default Form