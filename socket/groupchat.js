module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log('User Connected');

    socket.on('join', (params, callback) => {
      console.log('room', params.room);
      socket.join(params.room);
      callback();
    });

    socket.on('createMessage', (message, callback) => {
      console.log('message', message);

      const { text, room, sender } = message;

      io.to(room).emit('newMessage', {
        text,
        room,
        from: sender,
      });

      callback();
    });
  });
};
