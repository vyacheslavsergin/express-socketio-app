module.exports = function () {
  return {
    SignUpValidation: (req, res, next) => {
      // console.log('req', req)

      req.checkBody('username', 'Username is Required').notEmpty();
      req.checkBody('username', 'Username Must Not Be Less Than 5').isLength({ min: 5 });
      req.checkBody('email', 'Email is Required').notEmpty();
      req.checkBody('email', 'Email is Invalid').isEmail();
      req.checkBody('password', 'Password is Required').notEmpty();
      req.checkBody('password', 'Password Must Not Be Less Than 5').isLength({ min: 5 });

      req.getValidationResult()
        .then((result) => {
          const errors = result.array();
          const messages = [];
          errors.forEach((error) => {
            messages.push(error.msg);
          });

          req.flash('error', messages);
          res.redirect('/signup');
        })
        .catch((err) => next());
    },

    LoginValidation: (req, res, next) => {
      console.log('req', req.body);
      req.checkBody('email', 'Email is Required').notEmpty();
      req.checkBody('email', 'Email is Invalid').isEmail();
      req.checkBody('password', 'Password is Required').notEmpty();
      req.checkBody('password', 'Password Must Not Be Less Than 5').isLength({ min: 5 });

      req.getValidationResult()
        .then((result) => {
          const errors = result.array();
          const messages = [];
          errors.forEach((error) => {
            messages.push(error.msg);
          });

          console.log('messages', messages);

          req.flash('error', messages);
          res.redirect('/');
        })
        .catch((err) => next());
    },
  };
};
