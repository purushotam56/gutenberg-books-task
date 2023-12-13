var express = require('express');
const { getBooks } = require('./books.controller');
var router = express.Router();

/* GET home page. */
router.get('/',getBooks);


module.exports = router;
