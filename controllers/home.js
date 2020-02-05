module.exports = function (async, Club, _) {
  return {
    setRouting: function (router) {
      router.get('/home', this.homePage);
    },

    homePage: function (req, res) {
      async.parallel([
        function (callback) {
          Club.find({}, (err, result) => {
            callback(err, result);
          });
        },

        function (callback) {
          Club.aggregate([{
            $group: {
              _id: '$country',
            },
          }], (err, newResult) => {
            callback(err, newResult);
          });
        },

      ], (err, results) => {
        const res1 = results[0];
        const res2 = results[1];

        const dataChunk = [];
        const chunkSize = 3;

        for (let i = 0; i < res1.length; i += chunkSize) {
          dataChunk.push(res1.slice(i, i + chunkSize));
        }

        const countrySort = _.sortBy(res2, '_id');

        return res.render('home', {
          title: 'Home',
          user: req.user,
          data: dataChunk,
          country: countrySort,
        });
      });
    },
  };
};
