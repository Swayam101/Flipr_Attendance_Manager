import {Schema,model} from 'mongoose'


const QrSchema=new Schema({
    code:{
        type:String,
        required:true
    }
},{timestamps:true,expires:10})

export default model('QrCode',QrSchema);