import mongoose from "mongoose";

const articuloModel = mongoose.Schema({
    nombre: {
        type: String, 
        required: [true, 'Introduzca el nombre de su articulo'],
        maxLength: [20, 'No puede exceder 10 caracteres']
    },
    precio: {
        type: Number, 
        required: [true, 'Introduzca el precio de su articulo']
    },
    categoria: {
        type: String,
        required: [true, 'Seleccione una categoria']
    },
    images: [
        {
       public_id: {
        type: String,
        required: true
       },
       url: {
        type: String,
        required: true
       }
    }
    ],
    descripcion: {
        type: String, 
        required: [true, 'Describea su articulo'],
        minLenght: [20, 'Tiene que tener 20 caracters o mas']
    },
    favorito: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
})

const Articulo = mongoose.model('Articulo', articuloModel)

export default Articulo