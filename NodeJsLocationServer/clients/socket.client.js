import openSocket from 'socket.io-client';

export default {
    socket: openSocket('http://localhost:2525/'),
    sendUpdate(position) {
        this.socket.emit('update_location', position);
    }
}