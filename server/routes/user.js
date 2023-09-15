import express from 'express'

const router = express.Router()

import { signUp, signIn, getUsers } from '../controllers/user.js'

router.get('/', getUsers)
router.post('/signup', signUp)
router.post('/signin', signIn)

export default router