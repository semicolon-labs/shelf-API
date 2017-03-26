/** 
 * @author: Shubham Sharma
 * 
 * This file accounts for all products related database transactions
 * Implements
 * 1. getProducts()
 * 2. addProduct()
 * 3. editProduct()
 * 4. deleteProduct()
 * 5. viewProduct()
 */

//Include modules
var pool = require('./dataPooler');
var config = require('./../config/config.js');
var categoryData = require('./categoryData');
var async = require('async');

/**
 * Fetches product list from the database
 */
function getProducts(limit, callback){
    pool.any(`SELECT id, name, userid, author, datetime from shelf.products
                ORDER BY datetime DESC
                LIMIT $1 `, [limit])
    .then(function(data){
        if(data.length==0)
            callback("There are no products available!");
        else{
            //Asynchronous task using async.map()
            async.map(data, function(product, AsyncCallback){
                categoryData.getProductCategories(product.id, function(categories){ //mapping product with categories
                    product.categories = categories;
                    AsyncCallback(null, product);
                });
            }, function(err, result){
                if(err){
                    console.log(err);
                    callback("Error");
                }else
                    callback(result);
            });
        }
    })
    .catch(function(error){
        console.log(error);
        callback("Error");
    });
}

module.exports = {getProducts: getProducts};