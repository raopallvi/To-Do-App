var taskList = [];
var taskContainer = document.getElementById('task-container');
var addButton = document.getElementById('add-task-button');
var inputBox = document.querySelector('#add-task-div input');
var deleteButtons = document.querySelectorAll('.delete');
var toggleTaskButtons = document.querySelectorAll('.mark-as-complete');
// first ever API call ______________________________________________________________________________________________________________
var data1;
fetchToDos();
function fetchToDos() {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(function (response) {
            console.log(response);
            return response.json();
        }).then(function (data) {
            data1 = data;
            console.log(data);
        })
}

// INPUTTING THE TASKS ______________________________________________________________________________________________________________
addButton.addEventListener('click', () => {

    if (inputBox.value.length) {
        addButton.style.transform = 'scale(0.8)';
        setTimeout(() => {
            addButton.style.transform = 'scale(1)';
        }, 100);
        let task = {
            taskId: Date.now().toString(),
            taskValue: inputBox.value,
            done: false
        }
        inputBox.value = "";
        addTask(task);
    }
    else {
        shakeButton();
    }
});

inputBox.addEventListener('keydown', (event) => {
    if (event.keyCode == 13) {
        if (inputBox.value.length) {
            let task = {
                taskId: Date.now().toString(),
                taskValue: inputBox.value,
                done: false
            }
            inputBox.value = "";
            addTask(task);
        }
        else {
            shakeButton();
        }
    }
});
// ______________________________________________________________________________________________________________
/*
    functions to be applied:
    adding todo, deleting todo, check task, totalitemcount, 
    renderList -> this function will iterate through the list and will render the list itme to UI 
    
    data :
    list of obects 
    objects are the two do items 
    {id, task, ifDone}
    */

// ______________________________________________________________________________________________________________

function shakeButton() {
    let count = 0;
    let intervalId = setInterval(() => {
        count++;
        if (count % 2) {
            addButton.style.marginLeft = "-2px"
        }
        else {
            addButton.style.marginLeft = "0px"
        }
        if (count == 6) {
            clearInterval(intervalId);
        }
    }, 100);
}

// ______________________________________________________________________________________________________________
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.innerHTML = `
    <div class="operations-div">
        <button class="mark-as-complete" data-toggle-id = ${task.taskId}><i class="fa fa-check"></i></button>
        <button class="delete" style="color: rgb(243, 115, 115)" data-delete-id = ${task.taskId}><i class="fa fa-trash"></i></button>
    </div>
    <p>${task.taskValue}</p>`;
    li.id = "li" + task.taskId;
    li.classList.add('task-item');
    taskContainer.append(li);
    if (task.done) {
        document.querySelector(`#li${task.taskId} p`).style.textDecoration = "line-through";
        document.querySelector(`#li${task.taskId} .operations-div .mark-as-complete`).style.color = "green";
    }
    else {
        document.querySelector(`#li${task.taskId} p`).style.textDecoration = "none";
        document.querySelector(`#li${task.taskId} .operations-div .mark-as-complete`).style.color = "grey";
    }
}
// ______________________________________________________________________________________________________________
// there are tow ways to do that   1 => on any operation, by removing all the items first and then rerender the list 
//                                 2 => just remove and element or just add an element 
function renderList() {
    taskContainer.innerHTML = '';
    for (let i = 0; i < taskList.length; i++) {
        addTaskToDOM(taskList[i]);
    }
}

// ______________________________________________________________________________________________________________
function toggleTask(tasKId) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].taskId == tasKId) {
            taskList[i].done = !taskList[i].done;
            if (taskList[i].done) {
                document.querySelector(`#li${tasKId} p`).style.textDecoration = "line-through";
                return true;
            }
            else {
                document.querySelector(`#li${tasKId} p`).style.textDecoration = "none";
                return false;
            }
            return;
        }
    }
}

// ______________________________________________________________________________________________________________
function deleteTask(taskId) {
    let newTaskList = taskList.filter(function (task) {
        return task.taskId != taskId;
    })
    taskList = newTaskList;
    renderList();
    let deleteButtons = document.querySelectorAll('.delete');

    for (let i of deleteButtons) {
        i.addEventListener('click', () => {
            document.getElementById(`li${i.getAttribute('data-delete-id')}`).style.transform = "translateX(-1000PX)";
            setTimeout(deleteTask, 800, i.getAttribute('data-delete-id'));
        });
    }
    let toggleButtons = document.querySelectorAll('.mark-as-complete');

    for (let i of toggleButtons) {
        i.addEventListener('click', () => {
            if (toggleTask(i.getAttribute('data-toggle-id', i))) {
                i.style.color = "green";
            }
            else i.style.color = "grey"
            let itemId = document.getElementById(`li${i.getAttribute('data-toggle-id')}`);
            itemId.style.transform = "rotateX(45deg)"
            setTimeout(() => {
                itemId.style.transform = "rotateX(0deg)"
            }, 500);
        });
    }
}

// ______________________________________________________________________________________________________________
function addTask(task) {
    taskList.push(task);
    renderList();
    let deleteButtons = document.querySelectorAll('.delete');
    for (let i of deleteButtons) {
        i.addEventListener('click', () => {
            document.getElementById(`li${i.getAttribute('data-delete-id')}`).style.transform = "translateX(-1000PX)";
            setTimeout(deleteTask, 700, i.getAttribute('data-delete-id'));
        });
    }

    let toggleButtons = document.querySelectorAll('.mark-as-complete');

    for (let i of toggleButtons) {
        i.addEventListener('click', () => {
            if (toggleTask(i.getAttribute('data-toggle-id', i))) {
                i.style.color = "green";
            }
            else i.style.color = "grey"
            let itemId = document.getElementById(`li${i.getAttribute('data-toggle-id', i)}`);
            itemId.style.transform = "rotateX(60deg)"
            setTimeout(() => {
                itemId.style.transform = "rotateX(0deg)"
            }, 300);
        });
    }
}