
import {returnTaskFormValues, returnProjectFormValue, isFormComplete, returnEditTaskFormValues, formNotExist, populateFormForTaskToBeEdited} from "./forms";
import {addToTaskList, deleteTask, getTaskList, createNewTask, addToProject, editTask, getTaskInTaskList, getProjectThatContainsTask, setCurrentTask, getCurrentTask, findTaskAndDelete, getIndexOfTaskInList, repeatedTaskTitleExists, setCurrentTaskAsDOM, getCurrentTaskAsDOM, setTaskToComplete, setUpWeeklyTasks, setUpDailyTasks} from "./taskListModule";
import {getCurrentProject, getCurrentProjectTasks, setCurrentProject, createNewProject, addNewProjectToList, deleteProject, getProjectsList, editTaskInProject, deleteTaskInProject, findProjectSelectMatch, checkIfCurrentProjectMatchesProjectSelectValue, getProjectInProjectListFromDOM, checkTasksInCurrentProject, getCurrentProjectInProjectArray, getIndexOfTaskInProject} from "./projectList";
import {renderTaskContainer, setUpTasks, renderFormForTaskToBeEdited, renderProjectContainer, setUpProjects, renderProjectForm, renderProjectInMainDisplay, renderTaskDetailsContainer, toggleTaskDetailsDisplay, showPopup, hideTaskFormContainer, renderGeneralTaskForm, getIsInboxOrProject, setIsInboxOrProject, renderProjectTitle, setColorOfProjectInSidebar, addCompletedClassToTaskElement} from "./render";
import {populateStorage, projectsExistInStorage, setProjectListFromLocalStorage, setListsFromLocalStorage, projectArrayInStorage, taskArrayInStorage } from "./storage";
import "./style.css"
// import "./popup.css"
import "./form.css"
import { getCurrentTaskForSettingPriorityColor, setCurrentTaskForSettingPriorityColor, setPriorityColor, setPriorityColorOfCurrentTask, setPriorityOfCurrentTask, goThroughTasksAndSetDOMToComplete } from "./changingHTMLElement";

let isInboxOrDailyOrWeeklyOrProject;
let editOrAdd;

const addTodoButton = document.getElementById('add-todo-button');

addTodoButton.addEventListener('click', (e) => {
    if (formNotExist()) {
        editOrAdd = 'add';
        // renderTaskForm();
        renderGeneralTaskForm('new');
    }
})

//click on submit todo button
document.addEventListener('click', (e)=> {
    if (e.target.id == 'submit-todo-button') {

        let currentForm = returnTaskFormValues();
        if (isFormComplete(currentForm)) {

            if (repeatedTaskTitleExists()) {
                showPopup();
            } else {


                setPriorityOfCurrentTask();

                if (editOrAdd == 'add') {
                    const newTask = createNewTask(currentForm);
                    addToTaskList(newTask);
                    addToProject(newTask, findProjectSelectMatch());
                    setCurrentTaskForSettingPriorityColor(newTask);

                } else if (editOrAdd == 'edit') {
                    let task = getCurrentTaskAsDOM();
                    const clonedTask = {...getTaskInTaskList(task)};
                    editTask(getTaskInTaskList(task),returnTaskFormValues());
                    editTaskInProject(getCurrentProjectInProjectArray(),returnTaskFormValues(), clonedTask);

                    if (checkIfCurrentProjectMatchesProjectSelectValue()) {
                    } else {
                        deleteTaskInProject(getCurrentProject(), getIndexOfTaskInProject(task));
                        setCurrentProject(findProjectSelectMatch());
                        addToProject(getCurrentTask(), getCurrentProject());
                    }; 
                    setCurrentTaskForSettingPriorityColor(getCurrentTask());
                }
                populateStorage();
                setCurrentProject(findProjectSelectMatch());

                switch(getIsInboxOrProject()) {
                    case 'inbox':
                        setUpTasks(getTaskList());
                        break;
                    case 'daily':
                        setUpDailyTasks();
                        break;
                    case 'weekly':
                        setUpWeeklyTasks();
                        break;
                    case 'project':
                        setUpTasks(getCurrentProjectTasks());
                }
                goThroughTasksAndSetDOMToComplete();
                getCurrentTaskForSettingPriorityColor();
                setPriorityColorOfCurrentTask();
                hideTaskFormContainer();
                }
        }
    } 
})

//click on remove buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-button-for-task')) {
        let task = event.target.parentNode.previousSibling;

        setCurrentProject(getProjectThatContainsTask(task));
        deleteTask(getIndexOfTaskInList(task));
        deleteTaskInProject(getCurrentProjectInProjectArray(), getIndexOfTaskInProject(task));

        switch(getIsInboxOrProject()) {
            case 'inbox':
                setUpTasks(getTaskList());
                break;
            case 'daily':
                setUpDailyTasks();
                break;
            case 'weekly':
                setUpWeeklyTasks();
                break;
            case 'project':
                setUpTasks(getCurrentProjectTasks());
        }
        populateStorage();
    }
})

//click on edit buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-button-for-task')) {
        let task = event.target.parentNode.previousSibling;
        console.log(task);

        editOrAdd = 'edit';
        setCurrentTaskAsDOM(task);
        setCurrentProject(getProjectThatContainsTask(task));
        setCurrentTask(getTaskInTaskList(task));

        renderGeneralTaskForm('edit');
        populateFormForTaskToBeEdited(task, getCurrentTask());
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
            populateStorage();
        }
    }
})


//click on project in sidebar
document.addEventListener('click', function(event) {
    if (event.target.classList.contains("project-title")) {


        setIsInboxOrProject('project');
        let project = event.target.closest('.project-div');
        console.log(project)
        let projectIndex = Array.from(project.parentNode.children).indexOf(project);
        setCurrentProject(getProjectsList()[projectIndex]);
        setUpTasks(getProjectsList()[projectIndex].tasksList);
        goThroughTasksAndSetDOMToComplete();
        setColorOfProjectInSidebar(project);
    }
})


//click on inbox
document.addEventListener('click', function(event) {
    if (event.target.id == 'inbox') {
        setIsInboxOrProject('inbox');
        setUpTasks(getTaskList());
        goThroughTasksAndSetDOMToComplete();
        setColorOfProjectInSidebar(event.target);
    }
})

//click on daily
document.addEventListener('click', function(event) {
    if (event.target.id == 'daily') {
        // isInboxOrDailyOrWeeklyOrProject = 'daily';
        setIsInboxOrProject('daily');
        setUpDailyTasks();
        goThroughTasksAndSetDOMToComplete();
        setColorOfProjectInSidebar(event.target);
    }
})

//click on weekly
document.addEventListener('click', function(event) {
    if (event.target.id == 'weekly') {
        setIsInboxOrProject('weekly');
        setUpWeeklyTasks();
        goThroughTasksAndSetDOMToComplete();
        setColorOfProjectInSidebar(event.target);
    }
})

//click on x next to projects
document.addEventListener('click', function(event) {
    if (event.target.className == 'delete-project-button') {
        const project = event.target.parentNode;
        const projectNameValue = project.querySelector('.project-title').textContent;
        const projectIndex = Array.from(project.parentNode.children).indexOf(project);
        const projectToDeleteTasks = getProjectInProjectListFromDOM(projectNameValue);

        findTaskAndDelete(projectToDeleteTasks);
        console.log(projectIndex)
        deleteProject(projectIndex);
        setUpProjects(getProjectsList());
        populateStorage();
    }
})

//click on x in task form 
document.addEventListener('click', (e) => {
    if (e.target.id == 'close-task-form-button') {
        hideTaskFormContainer();
    }
})
//click on task
document.addEventListener('click', (e) => {
    const taskDiv = e.target.closest('.task-div')
    const outerTaskDiv = taskDiv.parentNode;
    if (taskDiv) {
        toggleTaskDetailsDisplay(outerTaskDiv);
        console.log('hopefully this fuckin works');
        checkIfTaskIsComplete(taskDiv);
        
    } else {
    }
})


//TEST TO SEE IF TASK IS COMPLETE
const checkIfTaskIsComplete = (taskDOM) => {
    const taskDOMTitle = taskDOM.querySelector('.task-title').textContent;
    console.log(taskDOMTitle);
    const matchTaskDOMToTask = (task) => {
        return task.title == taskDOMTitle;
    }
    console.log(getTaskList().find(matchTaskDOMToTask));
    console.log('guessing this works');

}

//click on mark complete button 
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('mark-complete-button')) {
        let taskAsDOM = e.target.parentNode.parentNode.parentNode;
        let task = getTaskInTaskList(taskAsDOM);
        setTaskToComplete(task);
        goThroughTasksAndSetDOMToComplete();
        populateStorage();
        console.log(getTaskList());
    }
})


// on page load
renderTaskContainer();
setIsInboxOrProject('inbox');
if (!projectsExistInStorage()) {
    const defaultProject = createNewProject('default');
    addNewProjectToList(defaultProject);
    setCurrentProject(defaultProject);
    populateStorage();

} else {
    setListsFromLocalStorage();
}
// renderProjectTitle();
setUpTasks(getTaskList());
goThroughTasksAndSetDOMToComplete();
// renderProjectContainer();
setUpProjects(getProjectsList());

// localStorage.clear();