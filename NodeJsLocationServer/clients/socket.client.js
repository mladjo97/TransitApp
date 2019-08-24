import openSocket from 'socket.io-client';

export default {
    socket: openSocket('http://localhost:2525/'),
    sendUpdate(data) {
        console.log('Sending location update for busline id: ' + data.groupName);
        this.socket.emit('update_location', data);
    }
}