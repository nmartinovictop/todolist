import { listOfToDos, addTask} from './toDoObject.js'
import { addProjectToList, projectFactory, listOfProjects, showSpecificProject } from './projects.js'
import { showProjects } from './renderProjects.js'
import { renderTasks } from './renderTasks.js'




if (localStorage.length > 0 ) {

    let local = JSON.parse(localStorage['listoftodos'])
    // console.log(local)
    local.forEach(task => {
        listOfToDos.push(task)
    })

    renderTasks("Inbox")
    console.log(listOfToDos)

  }
  


showProjects()

// const project1 = document.querySelector('.project1')
// project1.addEventListener('click',() => {
//     console.log(showSpecificProject('bs'))
// })