const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.oidc.isAuthenticated());
    res.render('index', { 
        title: "Express",
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user,
    });
});

router.get('/profile', requiresAuth(), (req, res) => {
  //res.send(JSON.stringify(req.oidc.user));
  res.render('profile', { 
        title: "Profile Page",
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user,
    });
});

module.exports = router;