class Users {
  constructor() {
    this.users = [];
  }

  addUserData(id, name, room) {
    const users = { id, name, room };
    this.users.push(users);
    return users;
  }

  removeUser(id) {
    const user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }

  getUser(id) {
    const getUser = this.users.filter((userId) => userId.id === id)[0];

    return getUser;
  }

  getUsersList(room) {
    const users = this.users.filter((user) => user.room === room);

    const namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = { Users };
