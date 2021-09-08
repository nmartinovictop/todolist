import { trigger, closeButton,toggleModal,modal,modalProj,triggerProj,closeButtonProj } from './modal.js'
import { addProjectToList, listOfProjects, projectFactory } from './projects.js';
import { showProjects } from './renderProjects.js';

const toDoList = [];

const counterCreator = () => {
    let count = 0;
    return () => {
      return count++;
    };
  };

const counter = counterCreator()

const toDoFactory = (title, description, dueDate, priority, project, isCompleted) => {

    let id = counter()
    let projExists = false;
    listOfProjects.forEach( proj => {
        if (proj.title === project) {
            projExists = true;
        }
    })

    if (projExists === false) {
        listOfProjects.push(projectFactory(project,"NA"))
        showProjects()
    }

    return { title, description, dueDate, priority, project, isCompleted,id }
}

const listOfToDos = []

function addTaskToList() {
    const title = document.querySelector('#title')
    const description = document.querySelector('#description')
    const dueDate = document.querySelector('#date')
    const priority = document.querySelector('#priority')
    const project = document.querySelector('#project')
    listOfToDos.push(toDoFactory(title.value,description.value,dueDate.value,priority.value,project.value,false))
    console.log(listOfToDos)
    let newToggle = toggleModal.bind(this)
    newToggle()
    addTask.reset()
}

const addTask = document.querySelector('.addTask')
addTask.addEventListener('submit',addTaskToList)





export { toDoFactory, listOfToDos, addTask}


// const todo1 = toDoFactory('nick','nick\'s description', '2021-09-04',1,'inbox',false)