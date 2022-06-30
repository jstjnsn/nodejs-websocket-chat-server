import WebSocket, { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 1337 }, () => {
  console.info("[INFO] WebSocketServer running on ws://localhost:1337");
});

server.on("connection", function newConnection(client) {
  client.on("message", function messageReceived(data, binary) {
    console.log("[LOG] Message received: %s", data);

    server.clients.forEach(function each(_client) {
      if (_client.readyState === WebSocket.OPEN) {
        _client.send(data, { binary });
      }
    });
  });

  client.on("close", function close(code, reason) {
    console.info(
      "[INFO] Client connection closed: Code: %s - Reason: %s",
      code,
      reason
    );
  });
});

server.on("close", function close(code, reason) {
  console.info(
    "[INFO] Server connection closed: Code: %s - Reason: %s",
    code,
    reason
  );
});

server.on("error", function error(err) {
  console.error(
    "[ERROR] Server error occurred: Name: %s - Message: %s",
    err.name,
    err.message
  );
});
