/* global Cart */
'use strict';

var testCart = [];
function fakeData() {

  var test1 = new CartItem(Product.allProducts[0], 3);
  //console.log('test1: ', test1);
  var test2 = new CartItem(Product.allProducts[1], 4);
  var test3 = new CartItem(Product.allProducts[2], 5);
  testCart.push(test1);
  testCart.push(test2);
  testCart.push(test3);
  //console.log('testCart: ', testCart);

  // stringify
  var stringyFakeData = JSON.stringify(testCart);
  //console.log('stringyFakeData: ', stringyFakeData);

  //add fake data to localStorage
  localStorage.setItem('fakeData', stringyFakeData);

  // retrieve fake data from localStorage
  var retrievedFakeData = localStorage.getItem('fakeData');
  //console.log('retrievedFakeData: ', retrievedFakeData);

  // parse data
  var parsed = JSON.parse(retrievedFakeData);
  //console.log('parsed: ', parsed);
}

fakeData();




// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  // var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  var cartItems = JSON.parse(localStorage.getItem('fakeData')) || [];
  // console.log(cartItems);
  cart = new Cart(cartItems);
  //console.log('cart: ', cart);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  var table = document.getElementsByTagName('tbody')[0];
  //console.log(table);
  
  // while (table.hasChildNodes() === true) {
  //   table.removeChild
  // }

  // remove all elements


}
//var = getelementbyid(tbody)
// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // get the table
  var table = document.getElementsByTagName('tbody')[0];
  console.log('table, ', table);

  for (var i = 0; i < testCart.length; i++){
    console.log('testCart[i]: ', testCart[i]);

    var trEl = document.createElement('tr');
    
    // create elements
    var tdElOne = document.createElement('td');
    var tdElTwo = document.createElement('td');
    var tdElThree = document.createElement('td');

    // give them data
    // delete link
    tdElOne.textContent = 'delete';

    // quantity
    tdElTwo.textContent = testCart[i].quantity;

    // item name
    tdElThree.textContent = testCart[i].product.name;

    // add to row
    trEl.appendChild(tdElOne);
    trEl.appendChild(tdElTwo);
    trEl.appendChild(tdElThree);

    //append to table
    table.appendChild(trEl);

  }

  // TODO: Iterate over the items in the cart
  //for i array.length {

    // TODO: Create a TR

    // TODO: Create a TD for the delete link, quantity,  and the item

    // TODO: Add the TR to the TBODY and each of the TD's to the TR 
    // }

}


function removeItemFromCart(event) {

  // remove item from cart
  var clickedElement = event.target;
  var clickedName = clickedElement.nextSibling.nextSibling.textContent;
  //console.log('clickedName: ', clickedName);
  for (var i = 0; i < cart.items.length; i++){
    //console.log('Name', cart.items[i].product.name);
    if (cart.items[i].product.name === clickedName){
      //console.log(cart.items[i].product.name);
      var selectedItem = cart.items[i];
      //console.log(cart.items[i]);
      cart.removeItem(selectedItem);
    }

  }

  // Save the cart back to local storage
  var stringyFakeData = JSON.stringify(testCart);
  localStorage.setItem('fakeData', stringyFakeData);

  // TODO: Re-draw the cart table



}

// This will initialize the page and draw the cart on screen
renderCart();
