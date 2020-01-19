const path = require('path');
const fs = require('fs');

module.exports = function (formidable) {
  return {
    setRouting: function (router) {
      router.get('/dashboard', this.adminPage);

      router.post('/uploadFile', this.uploadFile);
    },

    adminPage: function (req, res) {
      return res.render('admin/dashboard');
    },

    uploadFile: function (req, res) {
      const form = new formidable.IncomingForm();
      form.encoding = 'utf-8';
      form.uploadDir = path.join(__dirname, '../public/uploads');

      // console.log('form', form);
      // console.log(form.uploadDir);

      form.on('file', (field, file) => {
        // console.log('file');
        // console.log(file.path);
        // console.log(path.join(form.uploadDir, file.name));

        fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
          if (err) {
            throw err;
          }
          console.log('File renamed successfully');

          res.json({
            message: 'File renamed successfully',
          });
        });
      });

      form.on('error', (err) => {
        console.log('error', err);
      });

      form.on('end', () => {
        console.log('File upload is successful');
      });

      form.parse(req);
    },
  };
};
