const websocket = require("ws");
const wss=new websocket.Server({port:9000});

wss.on("connection", ws=>{
    console.log("new client connected");
    
    ws.on("message",data=>{
        console.log('client send :'+data);
        wss.broadcast(data.toString());
    })
    ws.on("close",()=>
    {
        console.log("client disconnected");
    })
});

wss.broadcast = function broadcast(msg) {
    console.log(msg);
    wss.clients.forEach(function each(client) {
        
        client.send(msg);
     });
 };