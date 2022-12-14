import {Project} from "./projectClass";
import {returnProjectSelectValue} from "./forms.js";
import { getCurrentTask } from "./taskListModule";

let projectsList = [];

let currentProject;

const getCurrentProject = () => {
    return currentProject;
}


const setCurrentProject = (project) => {
    currentProject = project;
}

const setProjectList = (value) => {
    projectsList = value;
}

const getProjectsList = () => {
    return projectsList;
}

const createNewProject = (title) => {
     return new Project(title);
}

const addNewProjectToList = (newProject) => {
    projectsList.push(newProject);
} 

const editTaskInProject = (project, newValues, taskToBeEdited) => {

    const projectTasks = project.tasksList;
    const isTaskMatching = (taskInProject) => {
        return taskInProject.title == taskToBeEdited.title;
    } 
    const matchingTask = projectTasks.find(isTaskMatching);
    
    console.log('new values denko');
    console.log(newValues)
    matchingTask.title = newValues.titleValue;
    matchingTask.description = newValues.descValue;
    matchingTask.dueDate = newValues.dateValue;
    matchingTask.priority = newValues.priorityValue;
    console.log('this should be the new title');
    console.log(matchingTask.title);

}

const getIndexOfTaskInProject = (task) => {
    const taskTitle = task.querySelector('.task-title').textContent;
    const matchTask = (taskInProject) => {
        return taskInProject.title == taskTitle;
    }
    const currentTask = (getCurrentProject().tasksList.find(matchTask))
    return getCurrentProject().tasksList.indexOf(currentTask);
}

const deleteTaskInProject = (project, taskIndex) => {
    project.tasksList.splice(taskIndex, 1);
}

const deleteProject = (index) => {
    projectsList.splice(index, 1);
}

const getCurrentProjectTasks = () => {
    return getCurrentProjectInProjectArray().tasksList;

}

const getCurrentProjectInProjectArray = () => {
    const getProjectInArrayThatMatchesCurrentProject = (projectFromArray) => {
        return projectFromArray.title == getCurrentProject().title;
    }
    return getProjectsList().find(getProjectInArrayThatMatchesCurrentProject);
}

const findProjectSelectMatch = () => {

    const doesProjectMatch = (projectInList) => {
        return projectInList.title == returnProjectSelectValue();
    }
    return getProjectsList().find(doesProjectMatch);
}

const checkIfCurrentProjectMatchesProjectSelectValue = () => {

    if (currentProject.title == returnProjectSelectValue()) {
        return true;
    } else {
        return false;
    }
}

const getProjectInProjectListFromDOM = (domValue) => {
    const doesProjectMatch = (projectInList) => {
        return projectInList.title == domValue;
    }

    return getProjectsList().find(doesProjectMatch)
}

const checkInProjectArray = () => {
    console.log('checking projects');
    for (const project of getProjectsList()) {
        console.log(project.title);
        for (const task of project.tasksList) {
            console.log(task);
        }
    }
}

const checkTasksInCurrentProject = (project) => {
    for (const task of project.tasksList) {
        console.log(task);
    }
}

export {
    getCurrentProject,
    getCurrentProjectTasks,
    setCurrentProject,

    createNewProject, 
    addNewProjectToList, 
    deleteProject, 
    getProjectsList,
    editTaskInProject,
    deleteTaskInProject,

    findProjectSelectMatch,
    checkIfCurrentProjectMatchesProjectSelectValue,

    setProjectList,

    checkInProjectArray,
    checkTasksInCurrentProject,

    getProjectInProjectListFromDOM,
    getCurrentProjectInProjectArray,

    getIndexOfTaskInProject,
 }
 ;
