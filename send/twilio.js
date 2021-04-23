const accountSid = 'xxxx'; 
const authToken = 'xxxxx'; 
const client = require('twilio')(accountSid, authToken); 

module.exports = {
    sendToClient: function(to, content){
        client.messages 
        .create({ 
            body: content,  
            messagingServiceSid: 'MGf695fcc1179d2348ab43a35beb771d3c',      
            to: to
        }) 
        .then(message => console.log(message.sid)) 
        .done();
    },
}