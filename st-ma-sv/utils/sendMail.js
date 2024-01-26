import nodemailer from 'nodemailer'

export default (reciever,subject,text)=>{
    const client=nodemailer.createTransport({
        service:"Gmail",
        auth:{
            user:"swayamprajapat21@gmail.com",
            pass:"suhxxwjudzvgnvtx"
        }
    })
    client.sendMail({
        from:"swayam@attendance.com",
        to:reciever,
        subject:subject,
        html:`${text}<br>`
    })
}
