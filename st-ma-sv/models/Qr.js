import {Schema,model} from 'mongoose'


const QrSchema=new Schema({
    code:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:()=>new Date(),
        expires:10
    }
},{timestamps:true,expires:10})

export default model('QrCode',QrSchema);