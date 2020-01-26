module.exports = function () {
  return {
    setRouting: function (router) {
      router.get('/group/:name', this.groupPage);
    },

    groupPage: function (req, res) {
      const { name } = req.params;
      // console.log('name', name);

      res.render('groupchat/group', {
        title: 'Title',
        name,
      });
    },
  };
};
