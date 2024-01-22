import {Schema,model} from 'mongoose'

const attendanceSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
        required:true
    },
    status:{
        type:String,
        enum:['Present','Absent'],
        default:'Absent'
    }
})

export default model("attendance",attendanceSchema)