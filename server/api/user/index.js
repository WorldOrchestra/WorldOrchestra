'use strict';

var express = require('express');
var util = require('../../lib/utility');
var controller = require('./user.controller');

var router = express.Router();

router.post('/login', controller.login);
router.get('/logout', controller.logout);

//router.get('/', controller.index); //ADMIN USE ONLY
//router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', util.checkUser, controller.update);
router.patch('/:id', util.checkUser, controller.update);
router.delete('/:id', util.checkUser, controller.destroy);

module.exports = router;
