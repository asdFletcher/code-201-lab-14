/* global Product, Cart */

'use strict';

// Set up a cart for use on this page.
var cart;

// if localData has no existing info create new cart
if (localStorage.getItem('localData') === null){
  cart = new Cart([]);

} else {
  // otherwise populate it with the existing cart items
  var cartItems = JSON.parse(localStorage.getItem('localData'));
  cart = new Cart(cartItems);

  // and update the preview
  updateCounter();
}


// var Product = function(filePath, name) {
//   this.filePath = filePath;
//   this.name = name;
//   Product.allProducts.push(this);
// };

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product

  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) {
    //element.appendChild(aChild);
    var o = document.createElement('option');
    o.value = Product.allProducts[i].name;
    o.textContent = Product.allProducts[i].name;
    selectElement.appendChild(o);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
 
  //prevent default behavior
  event.preventDefault();
  // TODO: Prevent the page from reloading

  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {

  // TODO: suss out the item picked from the select list
  var productName = event.target.items.value;

  var selectedProduct;
  for (var i = 0; i < Product.allProducts.length; i++){
    // console.log('test');
    
    if (productName === Product.allProducts[i].name){
      // console.log('match');
      selectedProduct = Product.allProducts[i];
    }
  }


  // TODO: get the quantity
  var quantity = event.target.quantity.value;
  // console.log(selectedProduct);
  // console.log(quantity);

  // TODO: using those, add one item to the Cart
  cart.addItem(selectedProduct, quantity);

  console.log('cart: ', cart);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var span = document.getElementById('itemCount');
  span.textContent = ` (${cart.items.length})`;

}


// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  var selectElement = document.getElementById('cartContents');
  var itemName = cart.items[cart.items.length-1].product.name;
  var itemQuantity = cart.items[cart.items.length-1].quantity;

  var p = document.createElement('p');
  p.value = itemName;
  p.textContent = `Item: ${itemName} | Amount: ${itemQuantity}`;
  selectElement.appendChild(p);

}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.

populateForm();