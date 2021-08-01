module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New User!')
    socket.on('msg', (msg) => {
      console.log(msg)
      socket.broadcast.emit('msg', msg);
    })

  });
};
