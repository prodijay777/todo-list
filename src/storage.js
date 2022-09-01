import { getProjectsList, setProjectList } from "./projectList";

const storageAvailable = () => {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            //everything except firefox
            e.code === 22 ||
            //firefox
            e.code === 1014 ||
            //check name field as well
            e.name === "QuotaExceededError" ||
            //firefox
            e.name === "NS_ERROR_DOM_QUOTA_REACHED") && 
            (storage  && storage.length !== 0);
    }
}


const populateStorage = () => {
    console.log(getProjectsList());
    const projectsList = getProjectsList();

    localStorage.setItem('projectArray', JSON.stringify(projectsList));

    console.log('the project array to be assigned to project List');
    console.log(JSON.parse(localStorage.getItem('projectArray')));
    
    setProjectList(JSON.parse(localStorage.getItem('projectArray')));
}


const checkStorage = () => {
    console.log('oh what the heck')
    console.log(localStorage)
}

export {
    storageAvailable,
    populateStorage,
    checkStorage,
}
