const mongoose=require("mongoose");

const dummyStudents=require('./dummyData.js')
const bcrypt=require('bcrypt')


const studentSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
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
      isAdmin: {
        type: Boolean,
        default: false,
      },
      roll: {
        type: String,
        required: true,
      },
      DOB: {
        type: Date,
        default:Date.now()
      },
      country: {
        type: String,
        default:" "
      },
      address: {
        type: String,
        default:" "
      },
      phone:{
        type:String,
        default:" "
      }
    },
    { versionKey: false, timestamps: true }
  );
  
  const Student=mongoose.model("student", studentSchema);

  async function hashPasswords() {
    const saltRounds = 10;
  
    for (const student of dummyStudents) {
      const hashedPassword = await bcrypt.hash(student.password, saltRounds);
      student.password = hashedPassword;
    }
  }

  function generateRandomDate() {
    const startDate = new Date('2023-12-01');
    const endDate = new Date('2024-01-10');
    const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
    return new Date(randomTime);
  }


  async function insertDummyData() {
    await hashPasswords();
  
    try {
     
        const studentsWithCreatedAt = dummyStudents.map((student) => ({
            ...student,
            createdAt: generateRandomDate(),
          }));
      
          await Student.insertMany(studentsWithCreatedAt);
    } catch (error) {
      console.error('Error inserting dummy data:', error);
    } finally {
      mongoose.disconnect();
    }
  }

  mongoose.connect("mongodb+srv://swayamgccp:pKncTHtuSBeuBp68@cluster0.4xxl6iz.mongodb.net/").then(()=>{
    console.log("Connected To DB");
  insertDummyData()
  }).catch((err)=>console.log(err))

