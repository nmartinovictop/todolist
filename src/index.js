import { listOfToDos, addTask, toDoFactory,editTaskButton} from './toDoObject.js'
import { addProjectToList, projectFactory, listOfProjects, showSpecificProject, currentProject } from './projects.js'
import { showProjects } from './renderProjects.js'
import { renderTasks } from './renderTasks.js'


if (localStorage.length > 1 ) {
    let localTodos = JSON.parse(localStorage['listoftodos'])
    localTodos.forEach(task => {
        listOfToDos.push(task)
    })
    let localProjects = JSON.parse(localStorage['listofprojects'])
    localProjects.forEach(project => {
        listOfProjects.push(project)
    })
    showProjects()
    renderTasks("Inbox")

  }
  


showProjects()
