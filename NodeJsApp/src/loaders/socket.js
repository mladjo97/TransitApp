import socket from 'socket.io';

const socketLoader = (server) => {
    const io = socket(server);

    io.sockets.on('connection', (socket) => {
        socket.on('update_location', data => {
            console.log(data);
        });
    });

    console.log('Successfully loaded Socket.IO');
};

export default socketLoader;