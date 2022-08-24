// import { createTodoModule } from "./TodoModule"

import {getProjectsList} from "./projectList";
import { Task } from "./taskClass";


let taskList = [];

const addToTaskList = (task) => {
    taskList.push(task);
}

const getTaskList = () => {
    return taskList;
}

const editTask = (index, newTitle, newDesc, newDueDate) => {
    const toEdit = getTaskInListFromIndex(index);
    toEdit.title = newTitle;
    toEdit.description = newDesc;
    toEdit.dueDate = newDueDate;
}

const getTaskInListFromIndex = (index) => {
    return getTaskList()[index];

}

const deleteTask = (taskIndex) => {
    taskList.splice(taskIndex, 1)
}

const createNewTask = (formValues) => {
    return new Task(
        formValues.titleValue,
        formValues.descValue, 
        formValues.dueDateValue,
        formValues.priorityValue,
        );
} 

const checkAvailableProjects = () => {
    console.log(getProjectsList());
}

const chooseProjectToBeAddedTo = (index) => {
    return getProjectsList()[index];
}

const addToProject = (task, projectToBeAddedTo) => {
    checkAvailableProjects();
    projectToBeAddedTo.tasksList.push(task);
}

export {addToTaskList, getTaskList, deleteTask, editTask, createNewTask, addToProject};