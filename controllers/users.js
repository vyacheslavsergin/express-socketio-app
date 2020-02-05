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

      if (req.user) {
        res.redirect('/home');
      }

      return res.render('index', {
        title: 'Login',
        user: req.user,
        messages: errors,
        hasErrors: errors.length > 0,
      });
    },

    getSignUp: function (req, res) {
      if (req.user) {
        res.redirect('/home');
      }

      const errors = req.flash('error');

      return res.render('signup', {
        title: 'Signup',
        user: req.user,
        messages: errors,
        hasErrors: errors.length > 0,
      });
    },

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
