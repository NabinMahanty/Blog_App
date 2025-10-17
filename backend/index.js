const http = require("http");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();
const { port } = require("./config/kyes");

//create server
const server = http.createServer(app);

//listen server

server.listen(port, () => console.log("Server on"));
