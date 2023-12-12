
function Product(id, name, price, photo) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.photo = photo;
}

const products = [
  new Product(1, 'FinePix Pro2 3D Camera', '1800.00', "camera.jpg"),
  new Product(2, 'EXP Portable HD', '800.00', "external-hard-drive.jpg"),
  new Product(3, 'Luxury Ultra thin Wrist Watch', '500.00', "watch.jpg"),
  new Product(4, 'XP 1155 Intel Core Laptop', '1000.00', "laptop.jpg"),
];

showProductGallery();

showCartTable();

function showProductGallery() {
  const productsContainer = document.querySelector("#product-items");

  let productsHTML = "";

  products.forEach((product) => {
    productsHTML += `
        <div class="item" data-product-number="${product.id}">
        <input class="product-id" type="hidden" value="${product.id}">
        <img src="./assets/${product.photo}" alt="${product.name}">
        <p class="product-name">${product.name}</p>
        <p class="product-price">$${product.price}</p>
        <div class="cart-action">
          <input type="number" class="product-quantity" name="quantity" id="quantity" value="1" min="1" size="2">
          <button class="add-to-cart" onclick="addToCart(this)">Add</button>
          <button class="remove-from-cart" onclick="removeFromCart(this)">Remove</button>
        </div>
      </div>
    `
  });

  productsContainer.innerHTML = productsHTML;
}

function addToCart(element) {
  const productParent = element.closest(".item");
  const id = productParent.querySelector('.product-id').value;
  const name = productParent.querySelector('.product-name').innerText;
  const price = productParent.querySelector('.product-price').innerText;
  const quantity = productParent.querySelector('.product-quantity').value;

  const cartItem = {
    id,
    name,
    price,
    quantity
  };

  let cartArray = new Array();

  if (sessionStorage.getItem('shopping-cart')) {
    cartArray = JSON.parse(sessionStorage.getItem('shopping-cart'));
    const index = cartArray.findIndex((item) => item.id === id);
    if (index !== -1) {
      cartArray[index].quantity = Number(cartArray[index].quantity) + Number(quantity);
    } else {
      cartArray.push(cartItem);
    }
  } else {
    cartArray.push(cartItem);
  }

  sessionStorage.setItem('shopping-cart', JSON.stringify(cartArray));
  showCartTable();
}

function removeFromCart(element) {
  const productParent = element.closest(".item");
  const id = productParent.querySelector('.product-id').value;
  const quantity = productParent.querySelector('.product-quantity').value;

  let cartArray = new Array();

  if (sessionStorage.getItem('shopping-cart')) {
    cartArray = JSON.parse(sessionStorage.getItem('shopping-cart'));

    const index = cartArray.findIndex((item) => item.id === id);
    if (index !== -1) {
      cartArray[index].quantity = Math.max(Number(cartArray[index].quantity) - Number(quantity), 0);

      if (!cartArray[index].quantity) {
        cartArray = cartArray.filter((value, i) => i !== index);
      }
    }
  }

  sessionStorage.setItem('shopping-cart', JSON.stringify(cartArray));
  showCartTable();

}

function showCartTable() {
  const shoppingCartTbody = document.getElementById('cartTableBody');
  shoppingCartTbody.innerHTML = '';

  if (sessionStorage.getItem('shopping-cart')) {
    const cartArray = JSON.parse(sessionStorage.getItem('shopping-cart'));
    let itemCount = 0;
    let total = 0;

    cartArray.forEach((item) => {
      const price = +item.price.slice(1);
      const quantity = +item.quantity;

      const subTotal = price * quantity;

      itemCount += quantity;
      total += subTotal;

      let tableRow = `
      <tr>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        <td>$${subTotal}</td>
      </tr>
      `;

      shoppingCartTbody.innerHTML += tableRow;
    });

    document.getElementById('itemCount').innerText = itemCount;
    document.getElementById('totalAmount').innerText = `$${total}`;
  } else {
    document.getElementById('itemCount').innerText = 0;
    document.getElementById('totalAmount').innerText = `$0`;
  }

  updateUserDiscount();
}

function emptyCart() {
  if (sessionStorage.getItem('shopping-cart')) {
    sessionStorage.removeItem('shopping-cart');
    showCartTable();
  }
}


