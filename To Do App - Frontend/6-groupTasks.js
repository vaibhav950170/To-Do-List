'use strict';

const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const group_id = urlParams.get('group_id');
localStorage.setItem('group_id', group_id);

console.log(`Group ID: ${localStorage.getItem('group_id')}`);

const form1 = document.getElementById('new-task-form');
const errorElement = document.getElementById('error');
const serviceURL = 'http://127.0.0.1:5000';

let segment = '';

function render_byuser_bytask(user, tasks) {
  console.log(user.name);
  console.log(tasks);
  // tasks.forEach((task)=>{
  //   h2
  // });

  // document.querySelector(
  //   '.username'
  // ).innerHTML = `<h2 style="color: black">${user.name}</h2>`;

  let html = '';
  let html1 = '';
  let html2 = '';

  document.querySelector(
    '.displaynames'
  ).innerHTML += `<main class="displaypls">
  <div class="alert alert-light" role="alert">
  ${user.name}
</div>
  <div class="alert alert-danger" role="alert">
                            Priority: High
                          </div> 
      
  <section class="task-list hp${user.name}">
      
  </section>
  <div class="alert alert-warning" role="alert">
                            Priority: Medium
                          </div> 
  <section class="task-list mp${user.name}">
      
  </section>
  <div class="alert alert-primary" role="alert">
                            Priority: Low
                          </div> 
  <section class="task-list lp${user.name}">
      
  </section>
  </main>`;
  tasks.forEach((task) => {
    if (task.priority === 'High') {
      const d = new Date(task.duedate);
      const day = d.getDay();
      const year = d.getFullYear();
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      let month = months[d.getMonth()];
      const fullDate = `${day} ${month} ${year}`;

      var d1 = new Date();

      // To calculate the time difference of two dates
      var Difference_In_Time = d.getTime() - d1.getTime();

      // To calculate the no. of days between two dates
      var Difference_In_Days = Math.floor(
        Difference_In_Time / (1000 * 3600 * 24)
      );
      let htmlSegment = `<div id="tasks">
          <div class="task">
              <div class="content">
                  <input
                      type="text"
                      class="text"
                      value="${task.task_Desc}"
                      readonly>
                      <input
                      type="text"
                      class="text"
                      value="Due: In ${Difference_In_Days} days"
                      readonly>
              </div>
              <div class="actions">
              <button onclick="deleteTask('${task.task_id}')" class="delete">Complete</button>
                  <button onclick="deleteTask('${task.task_id}')" class="delete">Delete</button>
              </div>
          </div>
      </div>`;
      html += htmlSegment;
    }
    if (task.priority === 'Medium') {
      const d = new Date(task.duedate);
      const day = d.getDay();
      const year = d.getFullYear();
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      let month = months[d.getMonth()];
      const fullDate = `${day} ${month} ${year}`;

      var d1 = new Date();

      // To calculate the time difference of two dates
      var Difference_In_Time = d.getTime() - d1.getTime();

      // To calculate the no. of days between two dates
      var Difference_In_Days = Math.floor(
        Difference_In_Time / (1000 * 3600 * 24)
      );
      let htmlSegment1 = `<div id="tasks">
          <div class="task">
              <div class="content">
                  <input
                      type="text"
                      class="text"
                      value="${task.task_Desc}"
                      readonly>
                      <input
                      type="text"
                      class="text"
                      value="Due: In ${Difference_In_Days} days"
                      readonly>
              </div>
              <div class="actions">
              <button onclick="deleteTask('${task.task_id}')" class="delete">Complete</button>
                  <button onclick="deleteTask('${task.task_id}')" class="delete">Delete</button>
              </div>
          </div>
      </div>`;
      html1 += htmlSegment1;
    }
    if (task.priority === 'Low') {
      const d = new Date(task.duedate);
      const day = d.getDay();
      const year = d.getFullYear();
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      let month = months[d.getMonth()];
      const fullDate = `${day} ${month} ${year}`;

      var d1 = new Date();

      // To calculate the time difference of two dates
      var Difference_In_Time = d.getTime() - d1.getTime();

      // To calculate the no. of days between two dates
      var Difference_In_Days = Math.floor(
        Difference_In_Time / (1000 * 3600 * 24)
      );
      let htmlSegment2 = `<div id="tasks">
          <div class="task">
              <div class="content">
                  <input
                      type="text"
                      class="text"
                      value="${task.task_Desc}"
                      readonly>
                      <input
                      type="text"
                      class="text"
                      value="Due: In ${Difference_In_Days} days"
                      readonly>
              </div>
              <div class="actions">
              <button onclick="deleteTask('${task.task_id}')" class="delete">Complete</button>
                  <button onclick="deleteTask('${task.task_id}')" class="delete">Delete</button>
              </div>
          </div>
      </div>`;
      html2 += htmlSegment2;
    }
  });
  let section1 = document.querySelector(`.hp${user.name}`);
  console.log(section1.innerHTML);
  section1.innerHTML = html;
  console.log(section1.innerHTML);
  let section2 = document.querySelector(`.mp${user.name}`);
  section2.innerHTML = html1;
  let section3 = document.querySelector(`.lp${user.name}`);
  section3.innerHTML = html2;
}

function getUsers() {
  console.log('get users call');
  axios
    .post(`${serviceURL}/group/all_members`, {
      group_id: localStorage.getItem('group_id'),
    })
    .then((response) => {
      const users = response.data;
      console.log(users);
      let html = '';
      let html1 = '';
      users.forEach((user) => {
        let htmlSegment = `<option value="${user.name}">${user.name}</option>`;
        // let htmlSegment1 = `<h2 class="${user.name}">${user.name}</h2>`;
        html += htmlSegment;
        // html1 += htmlSegment1;
      });
      document.getElementById('new-task-input-a').innerHTML = html;
      // document.querySelector('.displaypls').innerHTML = html1;

      getTasks(users);
    })
    .catch((error) => console.error(error));
}

form1.addEventListener('submit', (e) => {
  const group_id = localStorage.getItem('group_id');
  const task_Desc = document.getElementById('new-task-input-task').value;
  const duedate = document.getElementById('new-task-input-date').value;
  const priority = document.getElementById('new-task-input-p').value;
  const assigned_to = document.getElementById('new-task-input-a').value;
  const public_id = localStorage.getItem('public_id');
  console.log(public_id);
  addTask(public_id, group_id, task_Desc, duedate, priority, assigned_to);
  // getUsers();
  // getUsers();
});

const addTask = (
  public_id,
  group_id,
  task_Desc,
  duedate,
  priority,
  assigned_to
) => {
  axios
    .post(`${serviceURL}/task/create_task/`, {
      public_id: public_id,
      group_id: group_id,
      task_Desc: task_Desc,
      priority: priority,
      duedate: duedate,
      assigned_to: assigned_to,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => console.error(error));
};

function getTasks(users) {
  console.log('get task called');
  axios
    .post(`${serviceURL}/task/list_task/`, {
      email: localStorage.getItem('email'),
      group_id: group_id,
    })
    .then((response) => {
      const tasks = response.data;
      console.log('Tasks ', tasks);
      // users.forEach((user) => {
      //   document.querySelector(
      //     '.displaynames'
      //   ).innerHTML = `<h2 class="${user.name}">${user.name}</h2>`;
      // });
      let x = [];
      console.log('All Users', users);
      users = users.reverse();
      let i = 0;
      users.forEach((user) => {
        const usertasks = [];
        tasks.forEach((task) => {
          if (user.name === task.assigned_to) {
            usertasks.push(task);
          }
        });

        console.log('User', user);
        console.log('index', i);
        console.log('tasks', usertasks);
        render_byuser_bytask(user, usertasks);
        i++;
      });

      console.log(response.data);
    })
    .catch((error) => console.error(error));
}

function deleteTask(task_id) {
  console.log(task_id);
  axios
    .post(`${serviceURL}/task/delete_task`, {
      userid: task_id,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => console.error(error));

  window.location.reload();
}

function logout() {
  localStorage.clear();
  window.location.replace('2-login.html');
}

function getID() {
  alert(`Copy your group ID: ${localStorage.getItem('group_id')}`);
}

function loadPage() {
  getUsers();
}
