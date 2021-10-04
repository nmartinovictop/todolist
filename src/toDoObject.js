import { trigger, closeButton,toggleModal,modal,modalProj,triggerProj,closeButtonProj,editTaskButton } from './modal.js'
import { addProjectToList, listOfProjects, projectFactory } from './projects.js';
import { showProjects } from './renderProjects.js';
import { renderTasks } from './renderTasks.js';
import { v4 as uuidv4 } from 'uuid';
import { compareAsc, format } from 'date-fns'


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

    dueDate = format(new Date(dueDate),"MM/dd/yyyy")

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
    const title = document.querySelector('#editTitle')
    const description = document.querySelector('#editDescription')
    const dueDate = document.querySelector('#editDate')
    const priority = document.querySelector('#editPriority')
    const project = document.querySelector('#editProject')

    let taskIndex = listOfToDos.findIndex(task => task.id == id)
    listOfToDos[taskIndex].title = title.value
    listOfToDos[taskIndex].description = description.value
    listOfToDos[taskIndex].dueDate = dueDate.value
    listOfToDos[taskIndex].priority = priority.value
    listOfToDos[taskIndex].project = project.value
    
    const editModal = document.querySelector('.edit-modal')
    localStorage.setItem('listoftodos',JSON.stringify(listOfToDos))
    let setProject = project.value =="" ? "Inbox" : project.value

    let newToggle = toggleModal.bind(editModal)
    newToggle()
    renderTasks(setProject)
    addTask.reset()

}



function findTaskById(id) {
    return listOfToDos.find(task => task.id == id)
}


export { toDoFactory, listOfToDos, addTask, removeTaskFromList, findTaskById, editTask}


// const todo1 = toDoFactory('nick','nick\'s description', '2021-09-04',1,'inbox',false)