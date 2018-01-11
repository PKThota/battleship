const http = require('http');
const fs = require('fs');
const game = require('./Game.js');
const port = 8080;

let contentType = {
  "html" : "text/html",
  "txt" : "text/plain",
  "css" : "text/css",
  "js" : "text/javascript",
  "ico" : "image/jpg"
};

let getFileExtension = function(filename){
  return filename.substr(filename.lastIndexOf(".") + 1);
}

let getFileInfo = function(url){
  let fileInfo = {};
  let extension = "";
  if(!fs.existsSync('.'+url)) {
    fileInfo.logFile = "./errors.txt";
    fileInfo.message = url+" is not found";
    fileInfo.content = fs.readFileSync('./fileNotFound.html');
    fileInfo.statusCode = "200";
    extension = "html";
    fileInfo.contentType = contentType[extension];
    fileInfo.message += " Requested";
    return fileInfo;
  }
  fileInfo.logFile = "./log.txt";
  fileInfo.message = "Requested for "+ url;
  fileInfo.content = fs.readFileSync('.'+url);
  fileInfo.statusCode = "200";
  extension = getFileExtension(url);
  fileInfo.contentType = contentType[extension];
  return fileInfo;
}

let logData = function(logFile,message){
  let date = new Date()
  fs.appendFileSync(logFile,message+" on "+date+"\n");
}

let handleRequest = function(request,responce){
  let currentDate = new Date();
  let url = (request.url != "/") ? request.url : "/index.html";
  console.log("Requested for "+url+" on "+currentDate);
  if(url.startsWith("/submit")){
    let name = url.split("=")[1];
    responce.end();
    return ;
  }
  let fileInfo = getFileInfo(url);
  logData(fileInfo.logFile,fileInfo.message);
  responce.setHeader("Content-Type",fileInfo.contentType);
  responce.write(fileInfo.content);
  responce.end();
}

let server = http.createServer(handleRequest);
server.listen(port);

console.log("Server is running on 127.0.0.1 port "+port);
