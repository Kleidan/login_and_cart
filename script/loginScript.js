const loginForm = document.getElementById('login-form');

// create a user class:
function User(username, email, fullname, password, lastLoginDate, permissions) {
  this.username = username;
  this.email = email;
  this.fullname = fullname;
  this.password = password;
  this.lastLoginDate = lastLoginDate;
  this.permissions = permissions;
};

const users = getUsers();

function getUsers() {
  if (!!sessionStorage.getItem('users')) {

    const users = JSON.parse(sessionStorage.getItem('users'));

    users.forEach(user => user[1].permissions = new Set(user[1].permissions));

    return new Map(users);

  } else {
    const user1 = new User('user1', 'user1@gmail.com', 'User 1', 'Abc123', null, ['ADD_TO_CART', 'DISCOUNT_15']);
    const user2 = new User('user2', 'user2@gmail.com', 'User 2', 'Abc123', null, ['ADD_TO_CART', 'EMPTY_CART']);
    const user3 = new User('user3', 'user3@gmail.com', 'User 3', 'Abc123', null, ['ADD_TO_CART', 'EMPTY_CART', 'DISCOUNT_15']);
    const user4 = new User('user4', 'user4@gmail.com', 'User 4', 'Abc123', null, ['ADD_TO_CART', 'REMOVE_FROM_CART', 'EMPTY_CART', 'DISCOUNT_15']);
    const user5 = new User('user5', 'user5@gmail.com', 'User 5', 'Abc123', null, ['DISCOUNT_15']);

    const users = [
      [user1.email, user1],
      [user2.email, user2],
      [user3.email, user3],
      [user4.email, user4],
      [user5.email, user5],
    ];

    sessionStorage.setItem('users', JSON.stringify(users));

    users.forEach((user) => user[1].permissions = new Set(user[1].permissions));

    return new Map(users);
  }
}

loginForm.addEventListener("submit", function (event) {
  event.preventDefault(function isLoggedin() {
    if (!sessionStorage.getItem("loggedInUserEmail")) {
      window.location.href = 'login.html'
      return;
    }
  });

  // get the values from the login input
  const emailInput = document.getElementById('email').value;
  const passwordInput = document.getElementById('password').value;

  if (!validateLogin(emailInput, passwordInput)) {
    alert('please enter a valid email addres, Password must be at least 6 characters long and at least 1 uppercase letter');
  } else if (!validateUser(emailInput, passwordInput)) {
    alert('user was not found');
  } else {
    updateUserLastLoginDate(emailInput);
    sessionStorage.setItem('loggedInUserEmail', emailInput);
    window.location.href = 'index.html';
    console.log(users);
  }
});

function validateLogin(email, password) {
  // check for valid email
  let mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  // checks if it contains at least one uppercase and at least 6 charachters and can have any or no digits
  let passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(\d*).{6,}$/g;

  return (mailRegex.test(email) && passRegex.test(password));
};

function validateUser(email, password) {
  if (users.has(email)) {
    return users.get(email).password === password;
  }
  return false;
}

function updateUserLastLoginDate(email) {
  const now = new Date();
  const day = now.getDate < 10 ? '0' + now.getDate() : '' + now.getDate();
  const month = now.getMonth < 10 ? '0' + (now.getMonth() + 1) : '' + (now.getMonth() + 1);
  const year = '' + now.getFullYear();
  const hours = now.getHours() < 10 ? '0' + now.getHours() : '' + now.getHours();
  const minuts = now.getMinutes() < 10 ? '0' + now.getMinutes() : '' + now.getMinutes();

  let datetime = `${day}-${month}-${year} ${hours}:${minuts}`;
  users.get(email).lastLoginDate = datetime;
}