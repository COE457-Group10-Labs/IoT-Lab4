// Lab 4 Exercise 2: Simple HTTP server using TCP sockets - Modified for Smart Lab Webpage

//create server socket
var net = require('net');
var fs = require('fs');
var server = net.createServer(function(socket) {
    
    socket.on('data', function(data) {

        //receiving data function
        console.log('\nReceived: ' + data);
        r = data.toString();
        
        console.log(r.length); // figure out the length for the first GET
        
        if(r.substring(0,3)=="GET" || r.substring(0,4)=="POST") {  
            // Server here is not checking to make sure that the client actually sent a well-formed header

            socket.write("HTTP/1.1 200 OK\n");

            fs.readFile('Lab4_Ex1.html', 'utf8', function(err, contents) {
                console.log(contents + "\n");
                
                socket.write("Content-Length:"+ contents.length);
                socket.write("\n\n"); // two carriage returns
                socket.write(contents);
            })
            
        }
        else console.log(r); // show the actual message
    });  

    //close function
    socket.on('close', function() {
        console.log('\nConnection closed.');
    });

    //end function
    socket.on('end', function() {
        console.log('\nclient disconnected.');
     });

     //error function
    socket.on('error', function() {
        console.log('\nclient disconnected.');
     });
});

//listening function
server.listen(8080, function() { 
    console.log('\nserver is listening on port 8080.');
});