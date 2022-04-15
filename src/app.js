import express from "express";

export const app = express();

app.use(express.static("src/public"));
//? Esto sirve para poder leer el body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Chat
app.get("/chat", (req, res) => {
  res.sendFile(__dirname + "/public/chat.html");
});

//Comentarios
app.get("/comments", (req, res) => {
  res.sendFile(__dirname + "/public/comments.html");
});