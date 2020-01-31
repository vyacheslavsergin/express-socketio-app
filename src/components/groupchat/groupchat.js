// import io from 'socket.io';
// console.log('io', io());
import Mustache from 'mustache'

class Groupchat {
  constructor(element) {
    this.el = element;

    this.socket = io();

    this.messageFormRef = this.el.querySelector('[data-groupchat-ref="message-form"]');
    this.msgRef = this.el.querySelector('[data-groupchat-ref="msg"]');
    this.groupNameInput = this.el.querySelector('[data-groupchat-ref="groupName"]');
    this.userNameInput = this.el.querySelector('[data-groupchat-ref="userName"]');
    this.messageTemplate = this.el.querySelector('[data-groupchat-ref="message-template"]');
    this.messages = this.el.querySelector('[data-groupchat-ref="messages"]');
    this.room = this.groupNameInput.value;
    this.sender = this.userNameInput.value;

    console.log('room', this.room);
    console.log('sender', this.sender);
    console.log('messageTemplate', this.messageTemplate);

    this.init();
  }

  init = () => {
    // console.log('socket', socket);

    this.messageFormRef.addEventListener('submit', this.onMessageFormSubmit, false);

    const socket = this.socket;
    const room = this.room;
    const template = this.messageTemplate.innerHTML;

    const messages = this.messages;

    socket.on('newMessage', function (data) {
      // console.log('data', data);
      // console.log('template', template);

      const message = Mustache.render(template, {
        text: data.text,
        sender: data.from,
      });
      console.log('message', message);

      // messages.innerHTML = message;
      messages.insertAdjacentHTML('beforeend', message);
    });

    socket.on('connect', function () {
      console.log('User connected');

      const params = { room };
      console.log('params', params);

      socket.emit('join', params, function () {
        console.log('User has joined this channel');
      });
    });
  }

  onMessageFormSubmit = (event) => {
    event.preventDefault();
    // console.log('onMessageFormSubmit()');
    // console.log('value', this.msg.value);

    const room = this.room;
    const msgRef = this.msgRef;
    const sender = this.sender;

    this.socket.emit('createMessage', {
      text: this.msgRef.value,
      room,
      sender
    }, function () {
      console.log('createMessage()');
      msgRef.value = '';
    });
  }
}

export default Groupchat
