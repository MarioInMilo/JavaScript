let users = [
    {
        'id': 1,
        'login': 'user1',
        'password': 12345,
        'fio': 'Иванов Иван Иванович',
        'role': 'читатель'
    },
    { 'id': 2, 'login': 'user2', 'password': 98765, 'fio': 'Петров Иван Иванович', 'role': 'писатель' },
    { 'id': 3, 'login': 'user3', 'password': 76529, 'fio': 'Семенов Иван Иванович', 'role': 'админ' }
];

let roles = ['читатель', 'писатель', 'админ'];
init();
addListenerForDeleteButtons();
getMaxId();
function getMaxId() {
    let maxId = 0;
    for (let index = 0; index < users.length; index++) {
        if (maxId < users[index].id) {
            maxId = users[index].id;
        }
    }
    console.log("maxId " + maxId);
    return maxId;
}
function init() {
    let userRoleList = document.querySelector('#user__role');
    for (let index = 0; index < roles.length; index++) {
        let option = document.createElement('option');
        option.text = roles[index];
        option.value = roles[index];
        userRoleList.add(option);
    }

    for (let index = 0; index < users.length; index++) {
        let user_obj = users[index];
        addRow(user_obj);
    }
};
function addRow(obj) {
    let row = `<tr class="tr-${obj.id}">
    <td id="login__id">${obj.login}</td>
    <td id="password__id">${obj.password}</td>
    <td id = "fio__id">${obj.fio}</td>
    <td id = "role__id">${obj.role}</td>
    <td>
        <button class="button__delete" id="button__${obj.id}" data-userid="${obj.id}">Delete</button>
        <button class="button__update" id="button__update__${obj.id}" data-userid="${obj.id}" onclick="update('${obj.id}')">Update</button>
    </td>
    </tr>`;
    let tbody = document.querySelector('.table__users');
    tbody.innerHTML = tbody.innerHTML + row;
    //$('.table__users').append(row);

};
function update(userid) {
    let user = getUserById(userid);
    let button = document.getElementById(`button__update__${user.id}`);
    but(user); // - плохо работает
    if (button.innerText == "Update") {
        //написать и вызвать функцию, которая по userid возвращает обеъкт из массива users
        document.getElementById("user__id").value = user.login;
        document.getElementById("user__pass").value = user.password;
        document.getElementById("fio").value = user.fio;
        document.getElementById("user__role").value = user.role;
        button.innerText = "Save";
    } else if (button.innerText == "Save") {
        saveNewInfo(user, createUser());
    }
};
function getUserById(userid) {
    for (let index = 0; index < users.length; index++) {
        let user = users[index];
        if (user.id == userid) {
            return user;
        }
    }
};
function addListenerForDeleteButtons() {
    let arrButtonsDelete = document.querySelectorAll('.button__delete');


    for (let index = 0; index < arrButtonsDelete.length; index++) {
        arrButtonsDelete[index].onclick = function (e) {
            let userId = e.target.dataset.userid; // 1 2 3
            let rowForDelete = document.querySelector(`.tr-${userId}`);
            rowForDelete.remove();
        }
    }
};
function addNewUser() {
    let tempCreate = createUser();
    addRow(tempCreate);
    clear();
    addListenerForDeleteButtons();
};
function createUser() {
    let login = document.getElementById('user__id');
    let userPass = document.getElementsByName('user__pass')[0];
    let fio = document.querySelector('#fio');
    let role = document.querySelector("#user__role");

    let newUser = new Object();
    newUser.id = (getMaxId() * 1) + 2;
    newUser.login = login.value;
    newUser.password = userPass.value;
    newUser.fio = fio.value;
    newUser.role = role.value;
    return newUser;
};
function clear() {
    document.getElementById("user__form").reset();
    // document.querySelector("#user__id").value="";
    // document.querySelector("#user__pass").value="";
    // document.querySelector("#fio").value="";
};
// function saveNewUserInfo(person) {
//     alert("www");
//     let tempCreateUser = person;
//     console.log(tempCreateUser);
//     for (let index = 0; index < users.length; index++) {
//         if (users[index].id == tempCreateUser.id) {
//             alert("qqq");
//             users[index].login = tempCreateUser.login;
//             users[index].password = tempCreateUser.password;
//             users[index].fio = tempCreateUser.fio;
//             users[index].role = tempCreateUser.role;
//         }

//     }
// };

function saveNewInfo(user, newInfo) {
    for (let i = 0; i < users.length; i++) {
        if (user.id == users[i].id) {
            users[i].login = newInfo.login;
            users[i].password = newInfo.password;
            users[i].fio = newInfo.fio;
            users[i].role = newInfo.role;
        }
    }

    let objectPath = document.querySelector(`.tr-${user.id}`);
    let inObj = objectPath.innerHTML;
    console.log(user.id);

    let row = `<tr class="tr-${user.id}">
    <td id="login__id">${newInfo.login}</td>
    <td id="password__id">${newInfo.password}</td>
    <td id = "fio__id">${newInfo.fio}</td>
    <td id = "role__id">${newInfo.role}</td>
    <td>
        <button class="button__delete" id="button__${user.id}" data-userid="${user.id}">Delete</button>
        <button class="button__update" id="button__update__${user.id}" data-userid="${user.id}" onclick="update('${user.id}')">Update</button>
    </td>
    </tr>`;
    objectPath.innerHTML = row;
    addListenerForDeleteButtons();
    cleaningInput();
};

function but(user) {
    for (let k = 0; k < users.length; k++) {
        var but = document.getElementById(`button__update__${users[k].id}`)
        if (users[k].id != user.id) {
            but.innerText = "Update";
        }
    }
};

function cleaningInput() {
    document.getElementById("user__id").value = '';
    document.getElementById("user__pass").value = '';
    document.getElementById("fio").value = '';
    document.getElementById("user__role").value = '';
};