/**
 * @author: Shubham Sharma
 * 
 * This file accounts for all the image related file handling
 * Images are saved as as follows:
 *  The folder name is a randomly generated string of length 50
 *  Every product has a unique folder name
 *  It contains the images as "image" followed by an index {1,2,3}
 * Implements:
 * getImage()
 * saveImage()
 */

//Include modules
var config = require('./../config/config.js');
var crypto = require('crypto');

/**
 * Queries the database for folder name and returns image urls
 * @param: product-id
 */
function getImages(pid, callback){
    pool.one('SELECT image from shelf.products WHERE id = $1', [pid])
    .then(function(folder){
        images = []
        var prefix = "static";
        var imageBase = "image";
        for(var i=0;i<3;i++){
            images.push("/" + prefix + "/" + folder.image + "/" + imageBase + (i+1) + ".jpeg");
        }
        callback(images);
    })
    .catch(function(error){
        console.log(error);
        callback("Error");
    });
}

module.exports = {getImages: getImages};