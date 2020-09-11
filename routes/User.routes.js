const router = require('express').Router();
const jwt = require('jsonwebtoken');

require('dotenv').config();

let User = require('../model/User.model');

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err=> res.status(400).json('error: ' + err));
});


router.route('/add').post((req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const newUser = new User({userName, password});

    newUser.save().then(() => {
        res.json('User created succesfully');
    }).catch((err) => {
        res.status(400).json('Something went wrong');
    })
});

router.route('/login').post((req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    User.find({userName: userName}).then((data) => {
        if(password == data[0].password){
            const payload = {
                check:  true
               };
            const token = jwt.sign(payload, process.env.SECRETKEY,{expiresIn:1440});
            res.json({message:"Access granted",token:token});
        }
        else{
            //acces denied
            res.status(400).json('Something went Wrong');
        }
    }).catch((err) => {
        res.status(400).json('Something went wrong');
    })
});

router.route('/confirmPermission').post((req, res)=>{
    const token = req.body.token;
    jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {      
        if (err) {
          res.json({message: 'Invalid Token' });    
        } else {   
          res.json({message: "Access Granted"});
        }
      });
});

module.exports = router;