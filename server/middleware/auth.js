import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const tokenSecret = process.env.TOKEN_SECRET

export const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]

        let decodeData;

        decodeData = jwt.verify(token, tokenSecret)
        req.userId = decodeData?.id
    } catch (error) {
        console.log(error)
    }
} 