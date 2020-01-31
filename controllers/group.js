module.exports = function () {
  return {
    setRouting: function (router) {
      router.get('/group/:name', this.groupPage);
    },

    groupPage: function (req, res) {
      const { name } = req.params;
      // console.log('name', name);

      // console.log('req', req)
      // console.log('user', req.user)

      res.render('groupchat/group', {
        title: 'Title',
        user: req.user,
        groupName: name,
      });
    },
  };
};
