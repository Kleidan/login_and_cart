const permissionsSet = new Set([
  'ADD_TO_CART',
  'REMOVE_FROM_CART',
  'EMPTY_CART',
  'DISCOUNT_15'
]);

const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail');
const usersFromSession = JSON.parse(sessionStorage.getItem('users'));

const loggedInUser = usersFromSession.find(user => user[0] === loggedInUserEmail)[1];

const userPermissions = new Set(loggedInUser.permissions);
// console.log(userPermissions);

if (!userPermissions.has('ADD_TO_CART')) {
  document.querySelectorAll('.add-to-cart').forEach(elem => elem.remove());
}
if (!userPermissions.has('REMOVE_FROM_CART')) {
  document.querySelectorAll('.remove-from-cart').forEach(elem => elem.remove());
}

if (!userPermissions.has('REMOVE_FROM_CART') && !userPermissions.has('ADD_TO_CART')) {
  document.querySelectorAll('.cart-action').forEach(elem => elem.remove());
}

if (!userPermissions.has('EMPTY_CART')) {
  document.getElementById('btnEmpty').remove();
}

updateUserDiscount();

function updateUserDiscount() {
  if (userPermissions.has('EMPTY_CART')) {
    const cartTbody = document.getElementById('cartTableBody');

    const totalAmount = document.getElementById('totalAmount');

    cartTbody.innerHTML += `
    <tr>
    <td colspan="3">Discount 15%</td>
    <td>$${Number(totalAmount.innerText.slice(1)) * 0.15}</td>
    </tr>
    `;

    totalAmount.innerText = `$${Number(totalAmount.innerText.slice(1)) * 0.85}`;
  }
}