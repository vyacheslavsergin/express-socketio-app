module.exports = function (_, passport, User) {
  return {
    setRouting: function (router) {
      router.get('/', this.indexPage);
      router.get('/signup', this.getSignUp);


      router.post('/', User.LoginValidation, this.postLogin);
      router.post('/signup', User.SignUpValidation, this.postSignUp);
    },

    indexPage: function (req, res) {
      const errors = req.flash('error');
      return res.render('index', {
        title: 'Login',
        messages: errors,
        hasErrors: errors.length > 0,
      });
    },

    getSignUp: function (req, res) {
      const errors = req.flash('error');
      return res.render('signup', {
        title: 'Signup',
        messages: errors,
        hasErrors: errors.length > 0,
      });
    },

    // postSignUp: function (req, res) {
    //   console.log('postSignUp')
    //   return true
    // }

    postLogin: passport.authenticate('local.login', {
      successRedirect: '/home',
      failureRedirect: '/',
      failureFlash: true,
    }),

    postSignUp: passport.authenticate('local.signup', {
      successRedirect: '/home',
      failureRedirect: '/signup',
      failureFlash: true,
    }),

  };
};
