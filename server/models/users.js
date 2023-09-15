import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profileImage: String,
    name: {
        type: String,
        default: ''
    },
    phonenumber: String,
    ciudad: String,
    articulos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Articulos',
    }
})

const User =  mongoose.model('User', UserSchema)

export default User