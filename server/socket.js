module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('join', (room) => {
      socket.join(room);
    })

    socket.on('msg', ({ room, msg }) => {
      socket.to(room).emit('msg', msg)
    })

  });
};
