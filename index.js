
let listOfTasks = [];

/*
    Esse evento ocorre quando a página realizar o seu carregamento listando as tarefas
*/

window.addEventListener('load', listTasks());


/*
    Função responsável randomizar os números para o id das tarefas
*/
function randomId() {
    return parseInt(Math.random() * 5000);
}

/*
    Função responsável por salvar o array de objetos com as tarefas no localstorage
*/
function saveTasksInLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(listOfTasks));
}


/*
    Na função listTasks é responsável por capturar os dados no localStorage e listar na dom da página
*/

function listTasks() {
    let divListOfTasks = document.querySelector('#list-of-tasks ul');

    let tasksInLocalStorage = JSON.parse(localStorage.getItem('tasks'));


    if (tasksInLocalStorage === null || tasksInLocalStorage === '' || tasksInLocalStorage.length === 0) {
        divListOfTasks.innerHTML = 'você não tem tarefas, que tal criar?';

        document.querySelector('#remove-all-tasks').style.display = 'none';
    } else {
        document.querySelector('#remove-all-tasks').style.display = 'block';
        divListOfTasks.innerHTML = '';


        listOfTasks = [];
        let count = 1;
        let statusTask;

        tasksInLocalStorage.map((task) => {

            listOfTasks.push(
                task
            );

            divListOfTasks.innerHTML += `
               
                <li class="${task.status === 0 ? 'completed': ''}">
                    <div class="description">
                        <div class="circle">${count}</div>
                        <span>${task.name}</span>
                    </div>
                    <input type="checkbox" onclick='deleteTask(${task.id})' ${task.status === 0 ? 'checked': ''}>
                </li>
            ` ;

            count++;
        });
    }
}

/*
    Nessa função estou realizando o update do status como se fosse um delete de fato mas apenas mudando o status
    da tarefa

    0 -> Concluída
    1 -> Em progresso
*/

function deleteTask(id) {

    let responseDeleteTask = confirm('Você deseja concluir essa tarefa?');
    if (responseDeleteTask) {
        
        let newListOfTasks = listOfTasks.map((task) => {
            if(task.id === id && task.status === 1) {
                task.status = 0;
            }
            return task;
        });

        listOfTasks = [];
        
        newListOfTasks.forEach(task => {
            listOfTasks.push(task);
        })

        saveTasksInLocalStorage();
        listTasks();
    }
}

function removeAllTasks() {

    let responseRemoveAllTasks = confirm('Você deseja remover todas as tarefas?');

    if(removeAllTasks) {
        listOfTasks = [];
        saveTasksInLocalStorage();
        listTasks();
    }
}



/*
    Aqui estou criando o evento do formulário para realizar o submit criar a task
*/
document.getElementById('form-create-task').addEventListener('submit', (event) => {
    event.preventDefault();

    let newTaskName = event.target.new_task.value;

    if (newTaskName === '') {
        alert('Preencha o campo!');
    } else {

        listOfTasks.unshift({
            id: randomId(),
            name: newTaskName,
            status: 1
        });

        saveTasksInLocalStorage();
        listTasks();
    }
});