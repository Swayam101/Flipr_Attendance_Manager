import nodemailer from 'nodemailer'

export default (reciever,subject,text)=>{
    const client=nodemailer.createTransport({
        service:"Gmail",
        auth:{
            user:process.env.COMPANY_MAIL,
            pass:process.env.COMPANY_MAIL_PASS
        }
    })
    client.sendMail({
        from:"swayam@attendance.com",
        to:reciever,
        subject:subject,
        html:`${text}<br>`
    })
}
