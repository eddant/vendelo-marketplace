import express from 'express'
import {auth} from '../middleware/auth.js'

const router = express.Router()

import { getArticulos, getArticulo, postArticulo, searchArticulos, editarArticulo, eliminarArticulo, marcarFavorito } from "../controllers/articulo.js";

router.get('/', getArticulos)
router.get('/:id', getArticulo)
router.get('/search', searchArticulos)
router.post('/', auth, postArticulo)
router.patch('/:id', auth, editarArticulo)
router.delete('/:id', auth, eliminarArticulo)
router.patch('/:id/addFavorito', auth, marcarFavorito)

export default router