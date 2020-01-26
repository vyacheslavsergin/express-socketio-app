// import io from 'socket.io';
// console.log('io', io());

class Groupchat {
  constructor(element) {
    this.element = element;

    this.init();
  }

  init = () => {
    const socket = io();
    console.log('socket', socket);

    socket.on('connect', function () {
      console.log('Yeah! User Connected');
    });
  }
}

export default Groupchat
