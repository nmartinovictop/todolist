import { trigger, closeButton, toggleModal, modal } from './modal.js'
import { showProjects } from './renderProjects.js'
import { listOfToDos } from './toDoObject.js'

const listOfProjects = []

if (localStorage.length == 0) {

let addProjects = [{title: 'All'},{title: "Inbox"},{title:"Today"},{title:"Overdue"}, {title: "Next_7_Days"}]
addProjects.forEach(proj => listOfProjects.push(proj))
localStorage.setItem('listofprojects',JSON.stringify(listOfProjects))
}

const projectFactory = (title,description) => {

    return { title, description }
}

function addProjectToList() {

    const title = document.querySelector('#project-title')
    const description = document.querySelector('#project-description')
    listOfProjects.push(projectFactory(title.value,description.value))
    console.log(listOfProjects)
    let newToggle = toggleModal.bind(this)
    newToggle()
    submit.reset()
    localStorage.setItem('listofprojects',JSON.stringify(listOfProjects))

    showProjects()

}

// const addProject = document.querySelector('.addProject')
// addProject.addEventListener('submit',addProjectToList.bind(submitButton))
const submit = document.querySelector('.addProject')
submit.addEventListener('submit',addProjectToList)

const displayListOfToDos = []

function showSpecificProject(project) {
    // displayListOfToDos.length = 0
    var projectList

    if (project == "Today" ) {
        
    } else {

    projectList = listOfToDos.filter( todo => {
        return todo.project == project
    })
    }



    return projectList
}

const currentProject = listOfProjects[0]

export { addProjectToList, projectFactory, listOfProjects, showSpecificProject, currentProject }