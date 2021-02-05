import {generateID} from '../../../helpers/utils.js';

import Component from '../../../views/component.js';

import Tasks from '../../../models/tasks.js';

class AddAndList extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`     
                <h1 class="page-title">Tasks List</h1>
                
                <div class="task-add">
                    <input class="task-add__title" type="text" placeholder="Task title">
                    
                    <textarea class="task-add__description" placeholder="Task description"></textarea>
                    
                    <button class="task-add__btn-add button" disabled>Add Task</button>
                </div>       
                  
                <div class="tasks">
                    <div class="tasks-information">
                        <p class="tasks-information__amount"><span class="tasks-information__amount_done"></span><span class="tasks-information__amount_all"></span></p>
                        <button class="task-add__btn-clear button" disabled>Clear Tasks List</button>
                    </div>
                    
                    <div class="tasks__list">
                        ${this.tasks.map(task => this.getTaskHTML(task)).join('\n ')}
                    </div>
                </div>            
            `);
        });
    }

    afterRender() {
        this.setActions();
        this.pageReload();
    }

    pageReload() {
        const tasksList = document.getElementsByClassName('tasks__list')[0],
            clearTaskBtn = document.getElementsByClassName('task-add__btn-clear')[0],
            amountTasks = document.getElementsByClassName('tasks-information__amount')[0];

        if (tasksList.children.length) {
            clearTaskBtn.disabled = false;
            amountTasks.innerHTML = `<p class="tasks-information__amount">There are <span class="tasks-information__amount_done">${this.TaskSum()}</span> tasks of <span class="tasks-information__amount_all">${tasksList.children.length}</span> are done</p>`;
        } else {
            amountTasks.innerHTML = '<p class="tasks-information__amount">Tasks list is empty</p>';
        }

        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].status === 'Done') {
                const btnDone =  tasksList.children[i].getElementsByClassName('task__btn-done')[0];

                this.doneTask(btnDone, tasksList, amountTasks)
            }
        }
    }

    setActions() {
        const addTaskTitle = document.getElementsByClassName('task-add__title')[0],
            addTaskBtn = document.getElementsByClassName('task-add__btn-add')[0],
            tasksContainer = document.getElementsByClassName('tasks')[0],
            tasksList = document.getElementsByClassName('tasks__list')[0],
            clearTaskBtn = document.getElementsByClassName('task-add__btn-clear')[0],
            amountTasks = document.getElementsByClassName('tasks-information__amount')[0],
            taskDescription = document.getElementsByClassName('task-add__description')[0];


        addTaskTitle.addEventListener('keyup', () => addTaskBtn.disabled = !addTaskTitle.value.trim());
        addTaskBtn.addEventListener('click', () => this.addTask(addTaskTitle, addTaskBtn, tasksList, clearTaskBtn, amountTasks, taskDescription));
        clearTaskBtn.addEventListener('click', () => this.removeTasks(tasksList, clearTaskBtn, amountTasks));

        tasksContainer.addEventListener('click', event => {
            const target = event.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('task'):
                case targetClassList.contains('task__title'):
                    this.redirectToTaskInfo(target.dataset.id);
                    break;

                case targetClassList.contains('task__btn-remove'):
                    this.removeTask(target.parentNode.parentNode);

                    amountTasks.innerHTML = `<p class="tasks-information__amount">There are <span class="tasks-information__amount_done">${this.TaskSum()}</span> tasks of <span class="tasks-information__amount_all">${tasksList.children.length}</span> are done</p>`;
                    if (!tasksList.children.length) {
                        amountTasks.innerHTML = `<p class="tasks-information__amount">Tasks list is empty</p>`;
                        clearTaskBtn.disabled = true;
                    }

                    break;

                case targetClassList.contains('task__btn-done'):
                    this.doneTask(target, tasksList, amountTasks);

                    break;
            }
        });
    }

    TaskSum () {
        let sum = 0;
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].status === 'Done') {
                sum += 1;
            }
        }
        return sum;
    }


    doneTask (target, tasksList, amountTasks) {
        target.parentElement.parentElement.classList.add('background-task');

        target.previousElementSibling.remove();

        this.task = this.tasks.find(task => task.id === target.parentElement.parentElement.dataset.id);
        this.task.status = 'Done';

        amountTasks.innerHTML = `<p class="tasks-information__amount">There are <span class="tasks-information__amount_done">${this.TaskSum()}</span> tasks of <span class="tasks-information__amount_all">${tasksList.children.length}</span> are done</p>`;
        Tasks.setTasksToLS(this.tasks);
        target.remove();
    }

    removeTasks (tasksList, clearTaskBtn, amountTasks) {
        if (confirm('Are you sure?') ) {
            tasksList.innerHTML = '';

            amountTasks.innerHTML = '<p class="tasks-information__amount">Tasks list is empty</p>';
            clearTaskBtn.disabled = true;

            this.tasks = [];
            Tasks.setTasksToLS(this.tasks);
        }
    }

    addTask(addTaskTitle, addTaskBtn, tasksList, clearTaskBtn, amountTasks, taskDescription) {
        const newTask = {
            id: generateID(),
            title: addTaskTitle.value.trim(),
            status: 'In Progress',
            description: taskDescription.value
        };

        this.tasks.push(newTask);
        Tasks.setTasksToLS(this.tasks);

        this.clearAddTask(addTaskTitle, addTaskBtn, taskDescription);

        tasksList.insertAdjacentHTML('beforeEnd', this.getTaskHTML(newTask));

        amountTasks.innerHTML = `<p class="tasks-information__amount">There are <span class="tasks-information__amount_done">${this.TaskSum()}</span> tasks of <span class="tasks-information__amount_all">${tasksList.children.length}</span> are done</p>`;
        clearTaskBtn.disabled = false;
    }

    getTaskHTML(task) {
        return `
            <div class="task" data-id="${task.id}">
                <a class="task__title" data-id="${task.id}">${task.title}</a>
                
                <div class="task__buttons">
                    <a class="task__btn-edit button" href="#/task/${task.id}/edit">Edit</a> 
                    <a class="task__btn-done button">Done</a> 
                    <a class="task__btn-remove button">Remove</a>   
                </div>                            
            </div>
        `;
    }

    clearAddTask(addTaskTitle, addTaskBtn, taskDescription) {
        addTaskTitle.value = '';
        addTaskBtn.disabled = true;
        taskDescription.value = '';
    }

    redirectToTaskInfo(id) {
        location.hash = `#/task/${id}`;
    }

    removeTask(taskContainer) {
        if (confirm('Are you sure?')) {
            this.tasks = this.tasks.filter(task => task.id !== taskContainer.dataset.id);
            Tasks.setTasksToLS(this.tasks);

            taskContainer.remove();
        }
    }
}

export default AddAndList;