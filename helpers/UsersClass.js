class Users {
  constructor() {
    this.users = [];
  }

  addUserData(id, name, room) {
    const users = { id, name, room };
    this.users.push(users);
    return users;
  }

  getUsersList(room) {
    const users = this.users.filter((user) => user.room === room);

    const namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = { Users };
