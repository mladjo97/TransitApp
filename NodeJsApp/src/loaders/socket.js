import socket from 'socket.io';

const socketLoader = (server) => {
    const io = socket(server);

    io.sockets.on('connection', (socket) => {
        console.log('CONNECTED');

        socket.on('update_location', data => {
            console.log(data);

            io.sockets.emit(`${data.groupName}`, data.coordinates);
        });
    });

    console.log('Successfully loaded Socket.IO');
};

export default socketLoader;