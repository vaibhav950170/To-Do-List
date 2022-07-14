const form = document.getElementById('form');
const errorElement = document.getElementById('error');
const serviceURL = 'http://127.0.0.1:5000';

form.addEventListener('submit', (e) => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  let messages = [];

  if (password.length < 6) {
    e.preventDefault();
    messages.push('Password cannot be less than 6 characters');
  }

  if (messages.length > 0) {
    e.preventDefault();
    errorElement.innerText = messages.join(', ');
  }

  getUsers(email, password);
});

const getUsers = (email, password) => {
  axios
    .post(`${serviceURL}/user/login`, {
      email: email,
      password: password,
    })
    .then((response) => {
      console.log(response.data);
      localStorage.setItem('public_id', `${response.data.Public_Id}`);
      localStorage.setItem('email', `${response.data.Email}`);
      window.location.replace('3-choice.html');
    })
    .catch((error) => console.error(error));
};
