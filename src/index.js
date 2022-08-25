
import {returnTaskFormValues, returnProjectFormValue, isFormComplete} from "./forms";
import {addToTaskList, deleteTask, getTaskList, createNewTask, addToProject, editTask} from "./taskListModule";
import {Task} from "./taskClass";
import { Project } from "./projectClass";
import { createNewProject, addNewProjectToList, deleteProject, getProjectsList, editTaskInProject } from "./projectList";
import {renderTaskForm, renderTaskContainer, setUpTasks, renderFormForTaskToBeEdited, renderProjectContainer, setUpProjects, renderProjectForm, renderProjectInMainDisplay} from "./render";
import "./style.css"

let currentProject;
let indexOfTaskToBeEdited;

let currentTaskData;
let matchingProject;

const addTodoButton = document.getElementById('add-todo-button');
addTodoButton.addEventListener('click', (e) => {
    renderTaskForm();
})

//click on submit todo button
document.addEventListener('click', (e)=> {
    if (e.target.id == 'submit-todo-button') {

        let currentForm = returnTaskFormValues();
        if (isFormComplete(currentForm)) {
            const newTask = createNewTask(currentForm);
            addToTaskList(newTask);
            addToProject(newTask, matchingProject);
            setUpTasks(getTaskList());
        }
    } 
})

//click on remove buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-button-for-task')) {
        let task = event.target.parentNode;
        let indexOfTaskToBeRemoved = Array.from(task.parentNode.children).indexOf(task);

       deleteTask(indexOfTaskToBeRemoved);
       setUpTasks(getTaskList());
    }
})

//click on edit buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-button-for-task')) {
        let task = event.target.parentNode;
        let indexOfTaskToBeEdited = Array.from(task.parentNode.children).indexOf(task);
        let currentTasks = currentProject[0].tasksList;
        currentTaskData = currentTasks[indexOfTaskToBeEdited];

        renderFormForTaskToBeEdited(task, currentTaskData);
    }
})

//click on submit edit task
document.addEventListener('click', function(event) {
    if (event.target.id == 'submit-edit-todo-button') {
        let task = event.target.parentNode.parentNode;

        let newTitle = document.querySelector('#edit-task-title').value;
        let newDesc = document.querySelector('#edit-task-desc').value;
        let newDueDate = document.querySelector('#edit-task-due-date').value;
        let newPriority = document.querySelector('#edit-task-priority').value;

        
        indexOfTaskToBeEdited = Array.from(task.parentNode.children).indexOf(task);


        editTask(
            indexOfTaskToBeEdited,
            newTitle,
            newDesc,
            newDueDate,
            newPriority,
            );

        editTaskInProject(
            currentProject, 
            currentTaskData, 
            newTitle, 
            newDesc, 
            newDueDate, 
            newPriority
            );

        console.log(currentProject[0].tasksList);

        
        // setUpTasks(getTaskList());
        console.log(currentProject[0].tasksList[indexOfTaskToBeEdited]);
        setUpTasks(currentProject[0].tasksList);
        console.log('this not iterable?');

    }
})

//open project form
document.addEventListener('click', function(event) {
    if (event.target.id == 'add-project-in-sidebar') {
        renderProjectForm();

    }
})

//submit new project
document.addEventListener('click', function(event) {
    if (event.target.id == 'submit-new-project-button') {

        let currentProjectValues = returnProjectFormValue();
        if (isFormComplete(currentProjectValues)) {
            const newProject = createNewProject(currentProjectValues);
            addNewProjectToList(newProject);
            setUpProjects(getProjectsList());
        }
    }
})

//click on project in sidebar
document.addEventListener('click', function(event) {
    if (event.target.classList.contains("project-title")) {
        let project = event.target.parentNode;
        let projectIndex = Array.from(project.parentNode.children).indexOf(project);
        renderProjectInMainDisplay(projectIndex);

        currentProject = getProjectsList(projectIndex);
        
    }
})

//click on add task for project
document.addEventListener('click', function(event) {
    if (event.target.id == 'add-task-to-project-button') {
        let project = event.target.parentNode;
        let projectTitle = project.querySelector('.project-title').textContent;

        const projectsList = getProjectsList();

        const titlesMatch = (project) => {
            return projectTitle == project.title;
        }

        matchingProject = projectsList.find(titlesMatch)

        renderTaskForm();
    }

})



// on page load


renderTaskContainer();

const project1 = createNewProject('the great reckoning');
addNewProjectToList(project1);

const testTodo1 = new Task("walk", "til me feet hurt", "tomorrow", "high");
const testTodo2 = new Task("fish", "catch 50", "tomorrow", "low");
const testTodo3 = new Task("sing", "for the queen", "tomorrow","chicalo");
const testTodo4 = new Task("play", "the donkey game", "tomorrow","mcdonalds");

addToTaskList(testTodo1);
addToTaskList(testTodo2);
addToTaskList(testTodo3);
addToTaskList(testTodo4);

project1.addTasktoProject(getTaskList()[0]);
project1.addTasktoProject(getTaskList()[1]);
project1.addTasktoProject(getTaskList()[2]);
project1.addTasktoProject(getTaskList()[3]);


setUpTasks(getTaskList());

renderProjectContainer();

setUpProjects(getProjectsList());
