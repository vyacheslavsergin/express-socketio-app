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
      ], (err, results) => {
        const res1 = results[0];
        // console.log('res1', res1);

        const dataChunk = [];
        const chunkSize = 3;
        for (let i = 0; i < res1.length; i += chunkSize) {
          dataChunk.push(res1.slice(i, i + chunkSize));
        }
        // console.log('dataChunk', dataChunk);

        return res.render('home', { title: 'Footbalkik - Home', data: dataChunk });
      });
    },
  };
};
