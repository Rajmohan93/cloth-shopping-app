let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("basket")) || [];

/**
 * ? @description - function to add the items to the card view using map function
 */

function generateMaterial() {
  return (shop.innerHTML = shopItems
    .map((item) => {
      const { id, name, price, desc, img } = item;

      let search;

      search = basket.find((x) => x.id === id) || [];

      return `
        <div class="item" id=product-${id} key=${id}>
            <img src=${img} alt="Image One" width="298" height="298" class="image-edit">
            <div class="details">
                <h3>
                    ${name}
                </h3>
                <p class="about">
                    ${desc}
                </p>
                <div class="price-quantity">
                    <h2>
                        <i class="bi bi-currency-rupee"></i>${price}
                    </h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">
                            ${search.item === undefined ? 0 : search.item}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
        `;
    })
    .join(""));
}

generateMaterial();

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

  localStorage.setItem("basket", JSON.stringify(basket));
}

/**
 * ? @description - function to show the count in the card
 */

function update(id) {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculations();
}

/**
 * ? @description - function to add the items count and to display in the cart icon
 */

function calculations() {
  let total = 0;

  /**
   * ! @description - function to add the items count - one way to calculate
   */

  //   basket.forEach((item) => {
  //     total += item.item;
  //   });

  /**
   * ! @description - function to add the items count - another way to calculate
   */

  total = basket.map((x) => x.item).reduce((a, b) => a + b, 0);

  document.getElementById("cart-count").innerHTML = total;
}

/**\
 * ! @description - invoking the function to calculate the count of the items everytime the page is loaded or refreshed to display the count in the cart icon
 */

calculations();
