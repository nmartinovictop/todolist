import { trigger, closeButton, toggleModal, modal } from './modal.js'

const listOfProjects = []


const projectFactory = (title,description) => {

    return { title, description }
}

function addProjectToList() {
    const title = document.querySelector('#project-title')
    const description = document.querySelector('#project-description')
    listOfProjects.push(projectFactory(title.value,description.value))
    console.log(listOfProjects)
    // toggleModal()
}

// const addProject = document.querySelector('.addProject')
// addProject.addEventListener('submit',addProjectToList.bind(submitButton))
const submit = document.querySelector('#project-submit')
submit.addEventListener('click',toggleModal)


export { addProjectToList, projectFactory, listOfProjects }