// Third Party Packages
import { Schema, model } from "mongoose";

// Student - Mongoose Schema
const studentSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique:true
    },
    name: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin:{
      type:Boolean,
      default:false
    },
   
  },
  { versionKey: false }
);


export default model("student", studentSchema);
