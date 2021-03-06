const clients=[];

const generateUID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};


function addChatUser(data) {
    if(data==undefined) return;

    console.log("adding chat user:-"+data);
    clients.push({"chatname":data});
    showUserList();
};

function showUserList(){
    console.log("clients:-"+clients);
    for(var i=0;i<clients.length;i++){
        console.log(clients[i]);
    }
    return JSON.stringify(clients);
};


function startWebSocket(port){

    const WebSocket = require('ws')
     
    const wss = new WebSocket.Server({ port: port })
     
    wss.on('connection', ws => {
      ws.on('message', message => {
        console.log('Received message =>'+message);
        if(message.includes('Client Online:-')){
            console.log("online-----"+message.split("-")[1]);
            usr=message.split("-")[1];
            if(usr!="")addChatUser();
        }
      })
      ws.send('Hello! Message From Server!!')
    })
};

module.exports={addChatUser,showUserList,startWebSocket};