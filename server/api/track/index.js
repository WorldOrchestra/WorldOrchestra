'use strict';

var express = require('express');
var util = require('../../lib/utility');
var controller = require('./track.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', util.checkUser, controller.create);
router.put('/:id', util.checkUser, controller.update);
router.patch('/:id', util.checkUser, controller.update);
router.delete('/:id', util.checkUser, controller.destroy);

module.exports = router;
