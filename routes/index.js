const express = require('express');
const bodyParser = require('body-parser')
const { requiresAuth } = require('express-openid-connect');
const { urlencoded } = require('body-parser');
const router = express.Router();

let encodeUrl = bodyParser.urlencoded({ extended: false })

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

router.get('/update', requiresAuth(), (req, res) => {
  //res.send(JSON.stringify(req.oidc.user));
  res.render('update', { 
        title: "Update Profile",
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user,
    });
});

router.post('/', encodeUrl, (req, res) => {
    console.log('Got body: ', req.body)
    res.sendStatus(200);
});

module.exports = router;