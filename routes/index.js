var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

// router.get('/callback', function (req, res, next) {
//   return JSON.stringify(req.headers)
// });

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.isAuthenticated()
  });
});

router.get('/logout', function (req, res, next) {
  req.logout({
    returnTo: "http%3A%2F%2Flocalhost:3001",
    client_id: process.env.CLIENT_ID
    });
    res.redirect('/');
});

router.get('/profile', requiresAuth(), function (req, res, next) {
  console.log(req.openid)
  res.render('profile', {
    userProfile: JSON.stringify(req.openid.user, null, 2),
    title: 'Profile page'
  });
});

module.exports = router;
