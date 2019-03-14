// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

const colors =["#cc3300", "#0066ff", "#ffcc00", "#9933ff"]
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.color = colors[Math.floor(Math.random() * 4)]
  let clientsConnected = { clients: wss.clients.size, type: "userCount"}
  wss.clients.forEach(function each(client) {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(clientsConnected));
      console.log(clientsConnected);
    }
  });


  // ws.send(clientsConnected);

  ws.on('message', (message) =>{
    const messageObject = JSON.parse(message)
    messageObject.id = uuid();
    messageObject.color = {color: ws.color}
    if (messageObject.type === "postMessage"){
    messageObject.type = "incomingMessage";
    } else if (messageObject.type === "postNotification") {
      messageObject.type = "incomingNotification";
    }
    // ws.send(JSON.stringify(messageObject));
    wss.clients.forEach(function each(client) {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(messageObject));
      }
    });
  });
    
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    clientsConnected.clients = wss.clients.size;
    wss.clients.forEach(function each(client) {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(clientsConnected));
      }
    console.log(clientsConnected);
    // ws.send(clientsConnected);
});
  });
});