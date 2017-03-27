/**
 * @author: Shubham Sharma
 * 
 * This is the router file.
 * It manages all routing and directing!
*/

//Include modules
var express = require('express');
var router = express.Router();
var path = require('path');
var sessionManager = require('../logic/sessionManager');
var productManager = require('../logic/productManager');

//www.example.com/public/?filePath=js/jquery.js
router.get('/public', function(req, res){
	res.sendFile(path.join(__dirname, '/../public/', req.query.filePath));
});

/** SESSION routes */
router.post('/login', function(req ,res){
	sessionManager.login(req, res);
});

router.get('/logout', function(req ,res){
	sessionManager.logout(req, res);
});

router.get('/check-login', function(req, res){
	sessionManager.checkLogin(req, res);
});

/** PRODUCT routes */
router.get('/get-products', function(req, res){
	productManager.getProducts(req, res);
});

router.get('/get-categories', function(req, res){
	productManager.getCategories(req, res);
});

//INDEX redirection for / or any invalid url
router.get('/*', function(req, res){
	res.send("Shelf API. Refer www.github.com/semicolon-labs/shelf-api for more");
});

module.exports = router;
