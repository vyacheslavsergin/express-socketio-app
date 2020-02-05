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
    this.users = this.el.querySelector('[data-groupchat-ref="users"]');
    this.numValue = this.el.querySelector('[data-groupchat-ref="num-value"]');
    this.room = this.groupNameInput.value;
    this.sender = this.userNameInput.value;

    this.init();
  }

  init = () => {
    this.messageFormRef.addEventListener('submit', this.onMessageFormSubmit, false);

    const socket = this.socket;
    const room = this.room;
    const template = this.messageTemplate.innerHTML;
    const messages = this.messages;
    const sender = this.sender;
    const usersContent = this.users;
    const numValue = this.numValue;

    socket.on('usersList', function (users) {

      usersContent.innerHTML = '';

      let node = document.createElement('div');

      for (let i = 0; i < users.length; i++) {
        node.insertAdjacentHTML('beforeend',
          `<button
                    type="button"
                    class="modal-trigger"
                    data-target="modal1"
                >
                    ${users[i]}
                </button>`);
      }

      numValue.textContent = users.length;

      usersContent.appendChild(node);
    });

    socket.on('newMessage', function (data) {

      const message = Mustache.render(template, {
        text: data.text,
        sender: data.from,
      });

      messages.insertAdjacentHTML('beforeend', message);
    });

    socket.on('connect', function () {
      const params = {
        room,
        name: sender
      };

      socket.emit('join', params, function () {
        console.log('User has joined this channel');
      });
    });
  }

  onMessageFormSubmit = (event) => {
    event.preventDefault();

    const room = this.room;
    const msgRef = this.msgRef;
    const sender = this.sender;

    this.socket.emit('createMessage', {
      text: this.msgRef.value,
      room,
      sender
    }, function () {
      msgRef.value = '';
    });
  }
}

export default Groupchat
