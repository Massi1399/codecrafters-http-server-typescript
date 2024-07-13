import * as net from "net";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
    socket.on("data" , (data)=>{
        var request = data.toString();
        var path = request.split("\r\n")[0].split(" ")[1];
        var response = "HTTP/1.1 404 Not Found\r\n\r\n";
        if(path === "/") 
            response = "HTTP/1.1 200 OK\r\n\r\n";
        else if(path.includes('echo')){
            var query = path.split("/")[2];
            response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${query.length}\r\n\r\n${query}`;
        }
        socket.write(response);
    })
   socket.on("close", () => {
     socket.end();
   });
 });

 server.listen(4221, "localhost");
