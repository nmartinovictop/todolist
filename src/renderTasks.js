// const { taskCanvas } = require("./elements");
// const { showSpecificProject, currentProject } = require("./projects");

import { taskCanvas } from "./elements.js"
import { showSpecificProject, currentProject } from './projects.js'
import { listOfToDos } from "./toDoObject.js";

function renderTasks(project) {
    while (taskCanvas.firstChild) {
        taskCanvas.firstChild.remove();
    }


    const tasks = project === 'All' ? listOfToDos : showSpecificProject(project)


    
    tasks.forEach( task => {

        const taskDiv = document.createElement('div')
        taskDiv.classList.add('tasks')
        taskCanvas.appendChild(taskDiv)
        const taskCheckBox = document.createElement('input')
        taskCheckBox.type = 'checkbox'
        taskCheckBox.id = task.title
        taskCheckBox.name = task.id

        if (task.isCompleted == true) {
            taskCheckBox.checked = true
        } 

        const taskLabel = document.createElement('label')
        taskLabel.for = task.title
        taskLabel.innerText = task.title

        taskDiv.appendChild(taskCheckBox)
        taskDiv.appendChild(taskLabel)
        

        taskCheckBox.addEventListener('click', (e) => {
            console.log(e.target)
            if (e.target.checked) {
                task.isCompleted = true
                console.log(task)
            } else {
                task.isCompleted = false
                console.log(task)
            }
        })
        
    })  
    localStorage.setItem('listoftodos',JSON.stringify(listOfToDos))

}






export { renderTasks }
