const { default: mongoose } = require("mongoose");
const websocket = require("ws");
const wss=new websocket.Server({port:9000});




wss.broadcast = function broadcast(msg) {
    console.log(msg);
    wss.clients.forEach(function each(client) {
        
        client.send(msg);
     });
 };




mongoose.connect(
    'mongodb://mongo:27017/server',
    function(err,db)
    {
        if(err)
        {
            throw err;
        }
        else
        {
            console.log("connected to mongodb..");
            var chat=db.collection('chats');
            
            wss.on("connection", ws=>{
                
                
                console.log("new cllient connected");
                
                
                chat.find().limit(50).sort({_id:1}).toArray(function(err,res)
                {
                    if(err)
                    {
                        throw err;
                    }
                    else
                    {
                        ws.send(res);
                    }
                });

                ws.on("message",data=>{
                    data=data.toString();
                    
                    data=JSON.parse(data);
                    
                    console.log(data);
                    let name=data.name;
                    let msg=data.message;
                
                    if(name===''||msg==='')
                    {
                        console.log("Please enter name and message");

                    }
                    else
                    {
                        chat.insertOne({name:name,message:msg});
                        wss.broadcast([{name:name,msg:msg}]);
                    }
                });
                ws.on("close",()=>
                {
                    console.log("client disconnected");
                })

            });


        }
    }
)


