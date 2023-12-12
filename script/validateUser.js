// check if there is a loged-in user, if not move user to login page

function isUserLoggedin() {
  if (!sessionStorage.getItem("loggedInUserEmail")) {
    window.location.href = 'login.html';
    return;
  }
}

isUserLoggedin();

function initSession() {
  const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail');
  const users = JSON.parse(sessionStorage.getItem('users'));

  const loggedInUser = users.find(user => user[0] === loggedInUserEmail)[1];

  document.getElementById('user-greeting').innerText = `Welcome ${loggedInUser.fullname}`;
}

function logout() {
  sessionStorage.removeItem('loggedInUserEmail');
  window.location.href = 'login.html'

  // or you can call the function:
  // isUserLoggedin();
}