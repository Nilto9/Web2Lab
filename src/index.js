import { app } from "./app";
import { Server } from "socket.io";
import http from "http";

const port = 3000;
const server = http.createServer(app);
const io = new Server(server);

const DATA = [
  {
    id: 1,
    comentario: "Los lunes deberian ser feriados",
    autor: "Nilton Palian",
  },
];

const save = async (body) => {
  const id = DATA.length + 1;
  body.id = id;
  DATA.push(body);
  console.log(DATA);
  return {
    ok: true,
    message: body,
  };
};

io.on("connection", (socket) => {
  console.log("Conexion Chat");
  socket.on("chat", (msgfromClient) => {
    console.log("Mensaje del cliente: " + msgfromClient);
    // emit "chat" message to CLIENT
    io.emit("chat", msgfromClient);
  });
});

/*
 * connection => Es la palabra reservada la cual se encarga
 * de encender la conexion entre mi cliente y mi servidor
 * al momento de crear esta conexion le digo a mi servidor que
 * empiece a escuchar los eventos del cliente
 * socket => Es la informacion que viene de mi navegador web(client)
 */
io.on("connection", (socket) => {
  console.log(`Conexion Comentarios`);

  //* Como se que la conexion con mi cliente ya esta puede empezar a escuchar y a emitir eventos
  //* "hello:petter" es la palabra clave que me envia el cliente
  //* message es la informacion que recivo del cliente
  /**
   * params {string} : keyword
   * params {function} : Info from client
   */
  // * on => Es el encargado de recibir enventos
  socket.on("hello:petter", (message) => {
    console.log(`El doctor optopus -> ${message}`);

    //* Ahora quiero hacer que mi servidor emita un evento
    socket.emit(
      "bye:petter",
      "Un gran poder conlleva una gran responsabilidad"
    );
  });

  //? Evento para guardar comentarios
  // * Recibe el comentario desde el cliente y ademas lo guarda
  socket.on("new:comment", async (body) => {
    const res = await save(body);
    //* Una vez que se guardo el comentario le response al cliente que todo ok
    socket.emit("save:comment", res);
  });
});

server.listen(port, () => {
  console.log(`Servidor en puerto ${port}`);
});
