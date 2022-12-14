import {getTaskList} from "./taskListModule"
import { addCompletedClassToTaskElement} from "./render";
let priorityOfCurrentTask;

const getPriorityOfCurrentTask = () => {
    return priorityOfCurrentTask;
}

let currentTaskForSettingPriorityColor;

const getCurrentTaskForSettingPriorityColor = () => {
    return currentTaskForSettingPriorityColor;
}

const setCurrentTaskForSettingPriorityColor = (task) => {
    currentTaskForSettingPriorityColor = task;
}

const setPriorityOfCurrentTask = () => {
    const priorityValue = document.getElementById('priority-select').value;
    priorityOfCurrentTask = priorityValue;
    console.log(priorityOfCurrentTask);
}

const setPriorityColorOfCurrentTask = () => {
    const currentTask = getCurrentTaskForSettingPriorityColor();
    console.log(currentTask)

    const taskElementsCollection = Array.from(document.getElementsByClassName('task-title'));
    console.log(taskElementsCollection);
    
    const matchingTaskDOM = taskElementsCollection.find(taskElement => {
        return taskElement.textContent == currentTask.title;
    })


    console.log(
        matchingTaskDOM.parentNode.previousSibling
    )
        const taskPriorityColor = matchingTaskDOM.parentNode.previousSibling;
    switch (currentTask.priority) {
        case 'high':
            taskPriorityColor.classList.add('high-priority');
            break;
        case 'med':
            taskPriorityColor.classList.add('med-priority');
            break;
        case 'low':
            taskPriorityColor.classList.add('low-priority');
            break;
    }
}



const goThroughTasksAndSetDOMToComplete = () => {
    let completedTasks = (getTaskList().filter(task => {
        return task.taskDone == 'complete';
    }))

    const matchTasksToDOM = (task) => {
        const taskDOMs = Array.from(document.querySelectorAll('.outer-task-div'));

        let matchingDOM = taskDOMs.find(taskDOM => {
            return taskDOM.querySelector('.task-title').textContent == task.title;
        })
        addCompletedClassToTaskElement(matchingDOM);
    }
    completedTasks.forEach(matchTasksToDOM);
}



export {
    setPriorityOfCurrentTask,
    setPriorityColorOfCurrentTask,

    setCurrentTaskForSettingPriorityColor,
    getCurrentTaskForSettingPriorityColor, 
    goThroughTasksAndSetDOMToComplete,
}