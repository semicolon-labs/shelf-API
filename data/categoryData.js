/**
 * @author: Shubham Sharma
 * 
 * This file accounts for all transactions related to categories
 * Implements:
 * 1. checkCategoriesValid()
 * 2. getProductCategories()
 * 3. insertProductCategories()
 * 4. deleteProductCategories()
 * 5. editProductCategories()
 * 6. getCategories()
 */

//Include modules
var pool = require('./dataPooler');
var config = require('./../config/config.js');
var async = require('async');

/**
 * Check if categories are valid
 * Returns 1 if true and 0 if false
 * 
 * categories is array of category ids
 */
function checkCategoriesValid(categories, callback){
    pool.one('SELECT COUNT(*) FROM shelf."product-category" WHERE cid in (${data})',
    {
        data: categories
    })
    .then(function(count){
        if(count===categories.length)
            callback(1);
        else
            callback(0);
    })
    .catch(function(error){
        console.log(error);
        callback("Error");
    });
}

/**
 * Returns list of categories for a particular product
 * If there are no categories, returns None
 */
function getProductCategories(id, callback){
    pool.any(`SELECT name FROM shelf.categories WHERE id in (
            SELECT cid FROM shelf."product-category" WHERE pid = $1)`, [id])
    .then(function(categories){
        if(categories.length==0)
            callback("None");
        else{
            //Asynchronous task to map {name: xyz} to just {xyz}
            async.map(categories, function(category, AsyncCallback){
                category = category.name;
                AsyncCallback(null, category);
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

/**
 * Returns list of categories
 */
function getCategories(callback){
    pool.many(`SELECT * FROM shelf.categories`)
    .then(function(data){
        callback(data);
    })
    .catch(function(error){
        console.log(error);
        callback("Error");
    });
}

module.exports = {getProductCategories: getProductCategories,
                  checkCategoriesValid: checkCategoriesValid,
                  getCategories: getCategories};