/im too tired ill be back in an hour/
var http = require("http");
var express = require("express");
var io = require("socket").io;

var router = express();
var server = http.createServer(router);server.listen(80);

var socket = io(server);

var messages = [];
var clients = [];

socket.on('connection', function(socket){
    clients.push(socket);
var name;
   socket.on('message', function(data){
       for(var i = 0; i<clients.length;i++){
           clients[i].emit('message', data);
       };
   }) 
   
   socket.on('join', function(data) {
       name = data.name;
       for(var i= 0;i<clients.length;i++){
           clients[i].emit('join', {
               "name":name
           })
       }
   })
   
   socket.on('disconnect', function(){
       for(var i=0;i<clients.length; i++)
       clients[i].emit('exit',{
           "name":name
       })
   })
   
});

router.get('/', function (req,res) {
    res.send("Hello world");
});
