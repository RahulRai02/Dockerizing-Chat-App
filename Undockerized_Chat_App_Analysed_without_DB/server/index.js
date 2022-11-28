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

 const http = require('http')
 const fs = require('fs')
 
 const server = http.createServer((req, res) => {
   res.writeHead(200, { 'content-type': 'text/html' })
   fs.createReadStream('../frontend/index.html').pipe(res)
 })
 
 server.listen(process.env.PORT || 3000)
 