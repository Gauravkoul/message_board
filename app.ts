//require the express module
import express from "express";
const app = express();
import bodyParser from "body-parser";
import chat_route from "./routes/chat.route";
import auth_route from "./routes/auth.route";

//require the http module
const http = require("http").Server(app);

// require the socket.io module
var io = require("socket.io");

const port = 5000;

//bodyparser middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.use("/chats", chat_route);
app.use("/v1", auth_route);

//set the express.static middleware
app.use(express.static(__dirname + "/public"));

// Showing home page
app.get("/", function (req: any, res: any) {
  res.render("login");
});

//integrating socketio
let socket = io(http);

//database connection
import chat_model from "./models/chat.model";
import connect from "./dbconnect";

//setup event listener
socket.on("connection", (socket: any) => {
  console.log("user connected");

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });

  //Someone is typing
  socket.on("typing", (data: any) => {
    socket.broadcast.emit("notifyTyping", {
      user: data.user,
      message: data.message,
    });
  });

  //when soemone stops typing
  socket.on("stopTyping", () => {
    socket.broadcast.emit("notifyStopTyping");
  });

  socket.on("chat message", function ({ msg, username }: any) {
    console.log("message: " + msg);

    //broadcast message to everyone in port:5000 except yourself.
    socket.broadcast.emit("received", { msg, username });

    //save chat to the database
    connect.then((db: any) => {
      console.log("connected correctly to the server");
      let chatMessage = new chat_model({ message: msg, sender: username });

      chatMessage.save();
    });
  });
});

http.listen(port, () => {
  console.log("Running on Port: " + port);
});
