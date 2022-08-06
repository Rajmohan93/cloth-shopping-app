let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("basket")) || [];

/**
 * ? @description - function to add the items count and to display in the cart icon
 */

function calculations() {
  let total = 0;
  total = basket.map((x) => x.item).reduce((a, b) => a + b, 0);
  document.getElementById("cart-count").innerHTML = total;
}

/**\
 * ! @description - invoking the function to calculate the count of the items everytime the page is loaded or refreshed to display the count in the cart icon
 */

calculations();

/**
 * ? @description - function to display the selected items in cart.html page
 */

function generateCartItems() {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((item) => {
        let search = shopItems.find((x) => x.id === item.id) || [];
        return `
            <div class="cart-item">
                <img src=${
                  search.img
                } alt="Image" width="150px" height="150px" />
                <div class="details">
                  <div class="item-name">
                      <h4 class="item-price">
                          <p>${search.name}</p>
                          <p><i class="bi bi-currency-rupee"></i>${
                            search.price
                          }</p>
                      </h4>
                      <i class="bi bi-x-lg" onclick="removeItem(${
                        item.id
                      })"></i>
                  </div>

                  <div class="cart-buttons">
                      <i onclick="decrement(${
                        item.id
                      })" class="bi bi-dash-lg"></i>
                      <div id=${item.id} class="quantity">
                          ${item.item}
                      </div>
                      <i onclick="increment(${
                        item.id
                      })" class="bi bi-plus-lg"></i>
                  </div>

                  <div>
                      <p id="total-amount"><i class="bi bi-currency-rupee"></i>${
                        item.item * search.price
                      }</p>
                  </div>
                </div>
            </div>
        `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h3>No items in cart</h3>
    <a href="index.html">
        <button class="HomeBtn">Go Back</button>
    </a>
    `;
  }
}

generateCartItems();

/**
 * ? @description - function to add the count of the items to the cart
 */

function increment(id) {
  let selectedId = id.id;

  let search = basket.find((item) => item.id === selectedId);

  if (search === undefined) {
    basket.push({
      id: selectedId,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  update(selectedId);
  generateCartItems();
  localStorage.setItem("basket", JSON.stringify(basket));
}

/**
 * ? @description - function to remove the count of the items to the cart
 */

function decrement(id) {
  let selectedId = id.id;

  let search = basket.find((x) => x.id === selectedId);

  if (search === undefined) {
    return;
  } else if (search.item === 0) {
    return;
  } else {
    search.item -= 1;
  }

  update(selectedId);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("basket", JSON.stringify(basket));
}

/**
 * ? @description - function to show the count in the card
 */

function update(id) {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculations();
  totalAmountInCart();
}

/**
 * ? @description - function to remove the items from the cart
 */

function removeItem(id) {
  let selectedId = id.id;
  basket = basket.filter((x) => x.id !== selectedId);
  generateCartItems();
  calculations();
  totalAmountInCart();
  localStorage.setItem("basket", JSON.stringify(basket));
}

/**
 * ? @description - function to calculate the total amount of the items in the cart
 */

function totalAmountInCart() {
  if (basket.length !== 0) {
    let total = basket
      .map((x) => {
        let search = shopItems.find((y) => y.id === x.id) || [];
        return x.item * search.price;
      })
      .reduce((a, b) => a + b, 0);
    label.innerHTML = `
      <h2>
        Total Bill : Rs.${total} /-
      </h2>
      <button id="checkOut">Checkout</button>
      <button id="removeAll" onclick="removeAll()">Remove All</button>
    `;
  } else {
    return;
  }
}

totalAmountInCart();

/**
 * ! @description - function to remove all the items from the cart
 */

function removeAll() {
  basket = [];
  localStorage.setItem("basket", JSON.stringify(basket));
  generateCartItems();
  calculations();
  totalAmountInCart();
}
