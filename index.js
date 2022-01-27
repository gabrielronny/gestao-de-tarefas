
let listOfTasks = [];

window.addEventListener('load', listTasks());

function randomId() {
    return parseInt(Math.random() * 5000);
}

function saveTasksInLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(listOfTasks));
}

function listTasks() {
    let divListOfTasks = document.querySelector('#list-of-tasks ul');
    
    let tasksInLocalStorage = JSON.parse(localStorage.getItem('tasks'));


    if(tasksInLocalStorage === null || tasksInLocalStorage === '' || tasksInLocalStorage.length === 0 ) {
        divListOfTasks.innerHTML = 'você não tem tarefas, que tal criar?';
    } else {
        divListOfTasks.innerHTML = '';

        listOfTasks = [];
        
        tasksInLocalStorage.map((task) => {
            listOfTasks.push(
                task
            );
            divListOfTasks.innerHTML += `
                <li>
                    <p>${task.name}</p>
                    <button onclick='deleteTask(${task.id})'>Concluir</button>
                </li>
            ` ;
        });
    }   
}

function deleteTask(id) {

    let newListOfTasks = listOfTasks.filter((task) => {
        return task.id != id ? true : false
    })

    listOfTasks = [];
    newListOfTasks.forEach(newListTask => {
        listOfTasks.push(newListTask);
    })

    saveTasksInLocalStorage();
    listTasks();
   
    // console.log(id)
}


document.getElementById('form-create-task').addEventListener('submit', (event) => {
    event.preventDefault();
    
    let newTaskName = event.target.new_task.value;
    
    if(newTaskName === '') {
        alert('Preencha o campo!');
    } else {
      
        listOfTasks.unshift({
            id: randomId(),
            name: newTaskName
        });
        
        saveTasksInLocalStorage();
        listTasks();
    }   
});

