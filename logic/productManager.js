/**
 * @author: Shubham Sharma
 * 
 * This is the product management file
 * accounts for product adding, removal, editing and fetching
 * Implements
 * 1. getProducts()
 * 2. addProduct()
 * 3. deleteProduct()
 * 4. editProduct()
 * 5. viewProduct()
 */

//Include modules
var config = require('./../config/config.js');
var productData = require('./../data/productData');

/**
 * Gets product list from the database
 * Limits to /limit=? products. 
 * DEFAULT: 10 and MAX: 20
 */
function getProducts(req, res){
    var limit = req.query.limit;
    //check for query parameter
    if(limit&&!isNaN(limit)&&limit<=20&&limit>0){
        productData.getProducts(limit, function(data){
            if(data==="Error")
                res.status(config.HTTP_CODES.SERVER_ERROR).send("Error fetching data");
            else
                res.status(config.HTTP_CODES.OK).send(JSON.stringify(data));
        });
    }else{
        res.redirect("/get-products?limit=10");
    }
}

/**
 * Adds a new product
 * POST request
 * Requires name, image[3], description, cost, condition
 * .. negotiable, category, author in body.
 * NAME: name of the book. MIN length 6 and MAX length 50.
 * IMAGE: images. Exactly 3 photos
 * DESCRIPTION: description of the book. MIN length 10 and MAX length 100.
 * COST: cost of the book. MIN cost 1 and MAX cost 5000
 * CONDITION: condition on a scale of 1 to 5
 * NEGOTIABLE: Boolean: 1 or 0
 * CATEGORIES: Should exist in our database
 * AUTHOR: author of the book. MIN length 6 and MAX length 50
 */
function addProduct(req, res){
    /**
     * Adding takes three step verification
     * 1. Verify all body requirements are satisfied or not
     * 2. Verify category is valid or not
     * 3. Check for duplicate entry
     */
    //GET all members
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var cost = req.body.cost;
    var condition = req.body.condition;
    var negotiable = req.body.negotiable;
    var categories = req.body.categories;
    var author = req.body.author;
    //Check conditions
    if(name&&name.trim().length()>5&&name.trim().length()<=50&&image&&image.length()==3&&
        description&&description.trim().length()>10&&description.trim().length()<=100&&
        cost&&!isNaN(cost)&&cost>0&&cost<=5000&&condition&&condition>=0&&condition<=5&&
        negotiable&&!isNaN(negotiable)&&negotiable>=0&&negotiable<=1&&categories&&categories.length>0&&
        author&&author.trim().length()>5&&author.trim().length()<=50){

    }else{
        res.status(config.HTTP_CODES.BAD_REQUEST).send("Bad request. Refer to API documentation for format");
    }
}

module.exports = {getProducts: getProducts};