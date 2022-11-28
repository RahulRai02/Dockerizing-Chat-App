const user_name=prompt("Enter your name:");
        const ws=new WebSocket("ws://localhost:9000");
        ws.addEventListener("open",()=>
        {
            console.log("Connected to Server");
            // ws.send(user_name);
        })
        
        function sendMsg()
        {
            var msg=document.getElementById("message").value;
            var data={name:user_name,message:msg}
            // data=user_name+":"+msg;
            console.log(JSON.stringify(data));
            ws.send(JSON.stringify(data));
            // socket.emit(data);
            
        }
        
        // })
        // var socket=io();
        // socket.connect('http://127.0.0.1:9000');
       
            console.log("Connected to Server");
            ws.addEventListener("message",e=>
            {
            // console.log(e.data);
            var chatbox=document.getElementById("chatbox");
            
            if(e.data.length!=0)
            {
                for(var i=0;i<e.data.length;i++)
                {
                    var curName=e.data[i].name;
                    var curMsg=e.data[i].msg;
                    const textnode = document.createElement("div");
                    textnode.class="messageDiv";
                    textnode.textContent=curName+" : "+curMsg;
                    chatbox.appendChild(textnode);
                }
            }
        }
            
        )
        

        // socket.on('message',function(data)
        // {
        //     console.log(data);
        // });