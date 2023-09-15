import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

import User from '../models/users.js'

const tokenSecret = process.env.TOKEN_SECRET

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).populate('articulos')
        res.json(users)
    } catch (error) {
        console.log(error)
    }
}

export const signUp = async (req, res) => {
    const {firstname, lastname, email, username, password, confirmPassword} = req.body

    try {
        const userExist = await User.findOne({$or : [{email}, {username}] })
    
        if(userExist) {
            return res.status(400).json({message: 'usuario ya registrado'})
        }
     
        if(password !== confirmPassword) {
            return res.status(400).json({message: 'Contrasenas no coinciden'})
        }

        const hashPassword =  await bcrypt.hash(password, 12)

        const newUser = new User({email, username, password: hashPassword, name: `${firstname} ${lastname}`, profileImage: '', phonenumber: '', ciudad: ''})
        const user = await newUser.save()
        const token = jwt.sign({email: user.email || user.username, id: user._id}, tokenSecret, {expiresIn: '1h'})
        
        res.status(201).json({data, token})
    } catch (error) {
        res.status(500).json({message: 'No se puedo crear el usuario'})
        console.log(error)
    }

}   

export const signIn = async (req, res) => {
    const {password, username} = req.body

    try {
        const userExist = await User.findOne({username})
        if(!userExist) {
            return res.status(404).json({message: 'usuario no registrado'})
        }

        const correctPassword = await bcrypt.compare(password, userExist.password)

        if(!correctPassword) {
            return res.status(400).json({message: 'email o contrasena incorrecta'})
        }

        const token = jwt.sign({username: userExist.username, id: userExist._id}, tokenSecret, {expiresIn: '1h'})

        res.status(200).json({data: userExist, token})
    } catch (error) {
        res.status(500).json({message: 'No fue posible ingresar, intentenlo de nuevo'})
    }
}