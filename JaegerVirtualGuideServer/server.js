// Se crea el servidor tanto para express como para el websocket
const app = require('express')();
const http = require('http');
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

// Puertos del app
const port = 10018 // puerto para peticiones web
const port_socket = 10019 // puerto para peticiones socket
let log = ''

// Respuesta HTTP para veificar el estado del servidor
app.get('/Log', (req, res) => {
    res.send(`Log de mensajes enviados desde los dispositivos => <br> ${log}`)
})

// Respuesta HTTP para el aplicativo web
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

// Web Socket para que registra la conexión de un nuevo listener
io.on('connection', (socket) => {
    console.log(socket.id)
    log += 'A user connected <br>'

    // Web Socket para comunicar los comandos del Jaeger
    socket.on('jeager', msg => {
        log += `${new Date().toString()}:${msg} <br>`
        io.emit('jeager', msg);
    });

    // Web Socket para comunicar la transmición de video
    socket.on('jeager-video', msg => {
        io.emit('jeager-video', msg);
    });
});

// Se pone en marcha el servidor Web
app.listen(port, () => {
    console.log(`Corriendo servidor en el puerto ${port}`)
})

// Se pone en marcha el WebSocket
server.listen(port_socket, () => {
    console.log(`Socket corriendo en ${port_socket}`);
});