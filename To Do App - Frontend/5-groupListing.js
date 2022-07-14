'use strict';
const errorElement = document.getElementById('error');
const serviceURL = 'http://127.0.0.1:5000';

const groupTasks = (dataa) => {
  alert(dataa);
  // console.log(groupData);
  // console.log(groupData);
};

const render_groups = (groups) => {
  let html = '';
  groups.forEach((group) => {
    let htmlSegment = `<a href="6-groupTasks.html?group_id=${group.group_id}" style="color: aliceblue; text-decoration: none;">
    <div id="groups">
  
      <div class="group" style="text-align: center;">
        <div class="content">
            <h4>${group.group_name}</h4>
        </div>

      </div></a>`;

    html += htmlSegment;
  });

  let section1 = document.getElementById('render');
  section1.innerHTML = html;
};

const view_groups = () => {
  const email = localStorage.getItem('email');
  axios
    .post(`${serviceURL}/group/view_groups`, {
      email: email,
    })
    .then((response) => {
      console.log(response.data);
      render_groups(response.data);
    })
    .catch((error) => console.error(error));
};

view_groups();

const form1 = document.getElementById('groupform');
const form2 = document.getElementById('joinform');

form1.addEventListener('submit', (e) => {
  const group_name = document.getElementById('group_name').value;
  const group_desc = document.getElementById('group_desc').value;
  const public_id = localStorage.getItem('public_id');

  new_group(group_name, group_desc, public_id);
});

form2.addEventListener('submit', (e) => {
  const email = localStorage.getItem('email');
  const group_id = document.getElementById('group_id').value;

  join_group(email, group_id);
});

const new_group = (group_name, group_desc, public_id) => {
  axios
    .post(`${serviceURL}/group/new_group`, {
      group_name: group_name,
      group_desc: group_desc,
      public_id: public_id,
    })
    .then((response) => {
      console.log('working');
      alert(
        `Team successfully created. Please copy the team id: ${response.data.group_id}`
      );
    })
    .catch((error) => console.error(error));
};

const join_group = (email, group_id) => {
  axios
    .post(`${serviceURL}/group/add_new_user`, {
      email: email,
      group_id: group_id,
    })
    .then((response) => {
      console.log(response.data);
      alert(`Team joined!`);
    })
    .catch((error) => console.error(error));
};

// form2.addEventListener('submit', (e) => {
//   const group_id = document.getElementById('group_id').value;

//   addToGroup(group_id);
// });

// const addToGroup = async (group_id) => {
//   const data = {
//     group_id: group_id,
//   };

//   const response = await fetch('http://127.0.0.1:5000/group/add_new_user', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });
//   if (response.ok) {
//     console.log(response);
//     // alert('Successfully added!');
//     // window.location = '6-groupTasks.html';
//   } else if (!response.ok) {
//     alert('Wrong ID');
//   }
// };

function logout() {
  localStorage.clear();
  window.location.replace('2-login.html');
}
