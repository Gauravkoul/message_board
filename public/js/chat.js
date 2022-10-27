//const axios = require('axios')
var socket = io();
var messages = document.getElementById("messages");
(function () {
  $("form").submit(function (e) {
    let username = document.getElementById("userName").innerText
    let li = document.createElement("li");
    e.preventDefault(); // prevents page reloading
    socket.emit("chat message", { msg: $("#message").val(), username });

    // console.log(username);
    messages.appendChild(li).append($("#message").val());
    let span = document.createElement("span");
    messages.appendChild(span).append("by " + username + ": " + "just now");

    $("#message").val("");

    return false;
  });

  socket.on("received", ({ msg, username }) => {
    console.log(username);
    let li = document.createElement("li");
    let span = document.createElement("span");
    var messages = document.getElementById("messages");
    messages.appendChild(li).append(msg);
    messages.appendChild(span).append("by " + username + ": " + "just now");
    console.log("Hello bingo!");
  });
})();

// fetching initial chat messages from the database
(function () {
  let username = document.getElementById("userName").innerText
  fetch("/chats")
    .then(data => {
      return data.json();
    })

    .then(json => {

      json.map(data => {

        let li = document.createElement("li");
        let span = document.createElement("span");
        // messages.append()
        if (username == data.sender)
          li.innerHTML = `${data.message}  <button  onclick="deleteFunction('${data._id}')" id="delete_${data._id}}">delete</button>`

        else
          li.innerHTML = `${data.message}`
        messages.appendChild(li)
        messages
          .appendChild(span)
          .append("by " + data.sender + ": " + formatTimeAgo(data.createdAt));

      });
    });
})();

//is typing...

let messageInput = document.getElementById("message");
let typing = document.getElementById("typing");

//isTyping event
messageInput.addEventListener("keypress", () => {
  socket.emit("typing", { user: "Someone", message: "is typing..." });
});

socket.on("notifyTyping", data => {
  typing.innerText = data.user + " " + data.message;
  console.log(data.user + data.message);
});

//stop typing
messageInput.addEventListener("keyup", () => {
  socket.emit("stopTyping", "");
});

socket.on("notifyStopTyping", () => {
  typing.innerText = "";
});
function deleteFunction(id) {
  fetch(`http://localhost:5000/chats/delete/` + id)
}