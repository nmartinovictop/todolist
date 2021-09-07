import { listOfToDos, addTask} from './toDoObject.js'
import { addProjectToList, projectFactory, listOfProjects } from './projects.js'




const displayListOfToDos = []


function showSpecificProject(project) {
    displayListOfToDos.length = 0
    displayListOfToDos.push(listOfToDos.filter( todo => {
        return todo.project == project
    }))
    return displayListOfToDos
}


// const project1 = document.querySelector('.project1')
// project1.addEventListener('click',() => {
//     console.log(showSpecificProject('bs'))
// })