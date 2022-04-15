const socket = io();
const form = document.querySelector("form");
const input = document.querySelector("input");

let mensajes = document.querySelector("ul");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    // emit "chat" message to SERVER
    socket.emit("chat", input.value);
    input.value = "";
  }
});

socket.on("chat", (msgfromServer) => {
  console.log(msgfromServer);
  let item = document.createElement("li");
  item.textContent = msgfromServer;
  mensajes.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
