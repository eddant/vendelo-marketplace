import mongoose from "mongoose";
import Articulo from "../models/articuloModel.js";
import cloudinary from 'cloudinary'


export const getArticulos = async (req, res, next) => {

    try {
        const articulos = await Articulo.find({})
        res.status(200).json(articulos)
    } catch (exception) {
        next(exception)
        console.log(exception);
    }
}

export const getArticulo = async (req, res, next) => {
    const {id} = req.params
    try {
        const articulo = await Articulo.findById(id)
        res.status(200).json(articulo)
    } catch (error) {
        next(error)
        console.log(error);
    }
}

export const postArticulo = async (req, res, next) => {
    let images = []
    //const {images} = articulo

        try {

            if(typeof req.body.images === 'string') {
                images.push(req.body.images)
            } else {
                images = req.body.images
            }

            
            const imagesLinks = []

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                  folder: "articulos",
                });

                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url
                })
            }
    
            req.body.images = imagesLinks
            const nuevoArticulo = new Articulo(req.body)
            await nuevoArticulo.save()
            res.status(201).json(nuevoArticulo)
            
        } catch (exception) {
            next(exception)
            console.log(exception);
        }
   
}

export const searchArticulos = async (req, res) => {
    const {query} = req.query
    try {
        const articulos = await Articulo.find(
           {$or: [ {nombre: {$regex: query, $options: 'i'}}, {categoria: {$regex: query, $options: 'i'}} ] }
        )
        res.json(articulos)
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'})
    }
}

export const editarArticulo = async (req, res) => {
    const {id: _id} = req.params
    const post = req.body
    

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Articulo no encontrado')
    }

    const updatedArticulo = await Articulo.findByIdAndUpdate(_id, {...post, _id}, {new: true})
    res.json(updatedArticulo)
}

export const eliminarArticulo = async (req, res) => {
    const {id} = req.params

    if(mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Articulo no encontrado')
    }

    await Articulo.findByIdAndRemove(id)

    res.json({message: 'Articulo eliminado'})
}

export const marcarFavorito = async (req, res) => {
    const {id} = req.params
    const userId = req.userId

    if(!userId) return res.status(400).json({message: 'No usuario identificado'})

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Articulo no encontrado')
    }

    const articulo = await Articulo.findById(id)
    const index = articulo.favorito.findIndex((id) => id === String(userId))

    if (index === -1) {
        articulo.favorito.push(userId)
    } else  {
        articulo.favorito = articulo.favorito.filter((id) => id !== String(userId))
    }

    const updatedArticulo = await Articulo.findByIdAndUpdate(id, articulo, {new: true})

    res.json(updatedArticulo)
    
}