import { trigger, closeButton,toggleModal,modal,modalProj,triggerProj,closeButtonProj } from './modal.js'
import { addProjectToList, listOfProjects, projectFactory } from './projects.js';
import { showProjects } from './renderProjects.js';
import { renderTasks } from './renderTasks.js';
import { v4 as uuidv4 } from 'uuid';


const toDoList = [];



const toDoFactory = (title, description, dueDate, priority, project, isCompleted) => {

    let id = uuidv4()

    if (project=="") {
        project = "Inbox"
    }

    let projExists = false;
    listOfProjects.forEach( proj => {
        if (proj.title === project) {
            projExists = true;
        }
    })

    if (projExists === false) {
        listOfProjects.push(projectFactory(project,"NA"))
        localStorage.setItem('listofprojects',JSON.stringify(listOfProjects))

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
    localStorage.setItem('listoftodos',JSON.stringify(listOfToDos))

    let newToggle = toggleModal.bind(this)
    newToggle()
    let setProject = project.value =="" ? "Inbox" : project.value

    renderTasks(setProject)
    addTask.reset()
    


}

const addTask = document.querySelector('.addTask')
addTask.addEventListener('submit',addTaskToList)


function removeTaskFromList(title) {
    let taskIndex = listOfToDos.findIndex(task => task.title == title)
    listOfToDos.splice(taskIndex,1)
    return listOfToDos
}

function editTask(id) {
    const title = document.querySelector('#title')
    const description = document.querySelector('#description')
    const dueDate = document.querySelector('#date')
    const priority = document.querySelector('#priority')
    const project = document.querySelector('#project')

    let taskIndex = listOfToDos.findIndex(task => task.id == id)
    listOfToDos[taskIndex].title = title
    listOfToDos[taskIndex].description = description
    listOfToDos[taskIndex].dueDate = dueDate
    listOfToDos[taskIndex].priority = priority
    listOfToDos[taskIndex].project = project

}


function findTaskById(id) {
    return listOfToDos.find(task => task.id == id)
}


export { toDoFactory, listOfToDos, addTask, removeTaskFromList, findTaskById}


// const todo1 = toDoFactory('nick','nick\'s description', '2021-09-04',1,'inbox',false)