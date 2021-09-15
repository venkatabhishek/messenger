const { postMessage } = require('./routes/message');

module.exports = (io) => {
  
  io.on('connection', (socket) => {


    socket.on('join', (room) => {
      socket.join(room);
    })

    socket.on('msg', ({ room, msg }) => {

      postMessage({ group: room, ...msg }, socket.request.session.passport.user)
        .then((msg) => {
          socket.to(room._id).emit('msg', msg)
        })
        .catch((err) => {
          console.log(err);
        })
    })

  });
};
