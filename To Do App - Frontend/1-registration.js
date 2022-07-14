const form = document.getElementById('form');
const errorElement = document.getElementById('error');
const serviceURL = 'http://127.0.0.1:5000';

form.addEventListener('submit', (e) => {
  const first_name = document.getElementById('first_name').value;
  const last_name = document.getElementById('last_name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmpassword = document.getElementById('confirmpassword').value;
  const errorElement = document.getElementById('error').value;

  let messages = [];

  if (password.length < 6) {
    e.preventDefault();
    messages.push('Password cannot be less than 6 characters');
  }

  if (!(password === confirmpassword)) {
    e.preventDefault();
    messages.push('Passwords do not match!');
  }

  if (messages.length > 0) {
    e.preventDefault();
    errorElement.innerText = messages.join(', ');
  }

  registerUser(email, first_name, last_name, password);
});

// const registerUser = async (email, first_name, last_name, password) => {
//   const userData = {
//     email: email,
//     first_name: first_name,
//     last_name: last_name,
//     password: password,
//   };

//   const response = await fetch('http://127.0.0.1:5000/user/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userData),
//   });
//   if (response.ok) {
//     alert('Successfully registered!');
//   } else {
//     alert('Something wrong! Please try again!');
//   }
// };

const registerUser = (email, first_name, last_name, password) => {
  axios
    .post(`${serviceURL}/user/`, {
      email: email,
      first_name: first_name,
      last_name: last_name,
      password: password,
    })
    .then((response) => {
      alert(`${response.data.Email}: User successfully created`);
      console.log(response.data);
    })
    .catch((error) => console.error(error));
};
