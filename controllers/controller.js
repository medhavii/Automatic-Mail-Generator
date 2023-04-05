const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const { EMAIL, PASSWORD } = require('../env');

const signup = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail from testing account 
  let message = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Your registration was successful!", // plain text body
    html: "<b>Your registration was successful!</b>", // html body
  };

  transporter.sendMail(message).then((info) => {
      return res.status(201).json({
          msg: "you should recieve an email",
          info: info.messageId,
          preview: nodemailer.getTestMessageUrl(info),
        });
    }).catch((Error) => {
      return res.status(500).json({ error });
    });
  // res.status(201).json("Signup Successfull");
};


 // send mail from real gmail acc
const getbill = (req, res) => {

    const{ userEmail}=req.body;

let config={
    service : 'gmail',
    auth : {
        user: EMAIL,
        pass: PASSWORD
    }
}
let transporter = nodemailer.createTransport(config);
let Mailgenerator = new Mailgen({
    theme:"default",
    product :{
        name: 'Apple',
        link: 'https://mailgen.js/'
    }
})


let response = {
    body: {
        name:'Siddhardha',
        intro: "Your Bill is here!",
        table:{
            data:[
                {
                    item: "MacBook Air",
                    price: "68,899"
                }
            ]
        },
        outro: "Happy MacBooking!"
    }
}

let mail=Mailgenerator.generate(response)
let message = {
    from: EMAIL, // sender address
    to: userEmail, // list of receivers
    subject: "Order Placed!", // Subject line
   // text: "Your registration was successful!", // plain text body
    html: mail  // html body
  };
  transporter.sendMail(message).then(() => {
    return res.status(201).json({
        msg: "you should recieve an email",
        
      });
  }).catch((Error) => {
    return res.status(500).json({ error });
  });
};

module.exports = {
  signup,
  getbill,
};
