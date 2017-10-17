const AWS = require('aws-sdk');
const SES = new AWS.SES({
  accessKeyID: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: 'us-east-1',
  endpoint: new AWS.Endpoint('https://email.us-east-1.amazonaws.com')
});

function sendMail(email,link,cb){
  const params = {
    Destination : {
      ToAddress: [email]
    },
    Message: {
      Body: {
        Html: {
          Data: "Hey!<br/><br/>Your file has been processed!<br/>You can find it <a href=\""+link+"\">here</a><br/>"+
                "Thanks for using our service.<br/><br/>Regards,<br/>ozym4nd145",
        },
      },
      Subject: {
        Data: "WebOCR: File Ready"
      }
    },
    Source: "WebOCR \<webocr@ozym4nd145.me\>",
  };
  SES.sendEmail(params,function(err,data){
    if(err){
      setTimeout(function(){
        sendMail(email,link,cb);
      },300);
    }
    else {
      console.log("Email sent to: %s",email);
      cb();
    }
  });
}

module.exports = {
  sendMail: sendMail,
};