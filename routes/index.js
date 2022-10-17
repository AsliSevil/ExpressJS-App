const express = require('express');
const bodyParser = require('body-parser')
const { requiresAuth } = require('express-openid-connect');
const { urlencoded } = require('body-parser');
const postgres = require('pg');
const router = express.Router();
require('dotenv').config();

const conString = process.env.POSTGRE_URL;

let encodeUrl = bodyParser.urlencoded({ extended: false })

router.get('/', (req, res) => {
    console.log(req.oidc.isAuthenticated());
    res.render('index', { 
        title: "Home Page",
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user,
    });
});

router.get('/profile', requiresAuth(), (req, res) => {
    var pool = new postgres.Client(conString);
    
    pool.connect( function (err, client, done) {
        if(err) return cancelIdleCallback(err);

        const query = 'SELECT * FROM users WHERE email=$1';
        
        client.query(query, [req.oidc.user.email], function(err, result){
            //done();
            if(err) return console.error('error running query', err);

            res.render('profile', { 
                title: "Profile Page",
                isAuthenticated: req.oidc.isAuthenticated(),
                user: req.oidc.user,
                results: result.rows[0],
    });
            console.log(result.rows[0]);
            client.end();
        });
        
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
    var pool = new postgres.Client(conString);
    
    console.log(req.oidc.user)
    pool.connect(function (err, client, done) {
        if(err) console.log(err);

        const query = 'UPDATE users SET firstname=$1, lastname=$2 WHERE email=$3';
        client.query(query, [req.body.firstname, req.body.lastname, req.oidc.user.email], function(err, result){
            //done();
            if(err) return console.error('error running query', err);
            
            client.end();
        });
        
    });
    res.redirect('/');
});

module.exports = router;