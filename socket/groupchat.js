module.exports = function (io, Users) {

  const users = new Users();

  io.on('connection', (socket) => {
    socket.on('join', (params, callback) => {
      socket.join(params.room);

      users.addUserData(socket.id, params.name, params.room);

      io.to(params.room).emit('usersList', users.getUsersList(params.room));

      callback();
    });

    socket.on('createMessage', (message, callback) => {
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
