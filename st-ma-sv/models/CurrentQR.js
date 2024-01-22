import {Schema, model} from  'mongoose'

const qrSchema=new Schema({
    code:{
        type:String,
        required:true
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        index: { expires: '1m' }, // Expire documents after 30 seconds based on this field
      }, 
},{timestamps:true})

export default model("QRCode",qrSchema);
