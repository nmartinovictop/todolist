import { listOfToDos, addTask, toDoFactory} from './toDoObject.js'
import { addProjectToList, projectFactory, listOfProjects, showSpecificProject, currentProject } from './projects.js'
import { showProjects } from './renderProjects.js'
import { renderTasks } from './renderTasks.js'


if (localStorage.length > 1 ) {

    let localTodos = JSON.parse(localStorage['listoftodos'])
    // console.log(local)
    localTodos.forEach(task => {
        listOfToDos.push(task)
    })
    let localProjects = JSON.parse(localStorage['listofprojects'])
    localProjects.forEach(project => {
        listOfProjects.push(project)
    })
    showProjects()
    renderTasks("Inbox")
    console.log(listOfToDos)

  }
  


showProjects()

// const project1 = document.querySelector('.project1')
// project1.addEventListener('click',() => {
//     console.log(showSpecificProject('bs'))
// })