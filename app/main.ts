import * as net from "net";
import * as fs from "fs"; // Add this line to import the 'fs' module
import * as process from "process";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
    socket.on("data" , (data)=>{
        var request = data.toString();
        var path = request.split("\r\n")[0].split(" ")[1];
        var param = path.split("/")[1];
        var response = "";

        switch(param){
            case "":
                response = "HTTP/1.1 200 OK\r\n\r\n";
                break;
            case "echo":
                var query = path.split("/")[2];
                response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${query.length}\r\n\r\n${query}`;
                break;
            case "user-agent":
                var userAgent = request.split("User-Agent: ")[1].split("\r\n")[0];
                response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${userAgent.length}\r\n\r\n${userAgent}`;
                break;
            case "files":
                var filePath = process.argv[2]
                var fileName = request.split("files/")[1];
                if(fs.existsSync(`${filePath}/${fileName}`)){
                    var fileContent = fs.readFileSync(`/tmp/${fileName}`);
                    response = `HTTP/1.1 200 OK\r\nContent-Type: application/octet-stream\r\nContent-Length: ${fileContent.length}\r\n\r\n${fileContent}`;
                }
                else
                    response = "HTTP/1.1 404 Not Found\r\n\r\n";
                break;
            default:
                response = "HTTP/1.1 404 Not Found\r\n\r\n";
                break;
        }
        socket.write(response);
    })
   socket.on("close", () => {
     socket.end();
   });
 });

 server.listen(4221, "localhost");
