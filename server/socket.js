const { postMessage, findUser } = require('./routes/message');

module.exports = (io) => {
  
  io.on('connection', (socket) => {


    socket.on('join', (room) => {
      socket.join(room);
    })

    socket.on('msg', ({ room, msg }) => {


      postMessage({ group: room, ...msg }, socket.request.session.passport.user)
        .then((msg) => {
          io.in(room._id).emit('msg', msg)
        })
        .catch((err) => {
          console.log(err);
        })
    })

    socket.on('typing', ({ room }) => {

      findUser(socket.request.session.passport.user)
        .then((user) => {
          socket.to(room._id).emit('typing', user)
        })

    })

  });
};
