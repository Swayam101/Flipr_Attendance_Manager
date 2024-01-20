import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

export const signAccessToken=(userId)=>{
    return new Promise((resolve,reject)=>{
        jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'1h',issuer:"student-manager"},(err,token)=>{
            if(err) reject(err)
            else resolve(token)
        })
    })
}