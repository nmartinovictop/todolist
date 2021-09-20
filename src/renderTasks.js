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
        const indDiv = document.createElement('div')
        indDiv.classList.add('task')
        const checkboxDiv = document.createElement('div')
        checkboxDiv.classList.add('checkbox')

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

        checkboxDiv.appendChild(taskCheckBox)
        checkboxDiv.appendChild(taskLabel)
        

        taskCheckBox.addEventListener('click', (e) => {
            if (e.target.checked) {
                task.isCompleted = true
            } else {
                task.isCompleted = false
            }
        })

        const date = task.dueDate
        const description = task.description
        const priority = task.priority
        const project = task.project

        const dateDiv = document.createElement('div')
        const descriptionDiv = document.createElement('div')
        const priorityDiv = document.createElement('div')
        const projectDiv = document.createElement('div')

        dateDiv.innerText = date
        dateDiv.classList.add('date')
        descriptionDiv.innerText = description
        descriptionDiv.classList.add('date')
        priorityDiv.innerText = priority
        priorityDiv.classList.add('priority')
        projectDiv.innerText = project
        projectDiv.classList.add('project')

        taskDiv.appendChild(indDiv)
        indDiv.append(checkboxDiv)
        indDiv.appendChild(descriptionDiv)
        indDiv.appendChild(dateDiv)
        indDiv.appendChild(priorityDiv)
        indDiv.appendChild(projectDiv)
        
    })  
    localStorage.setItem('listoftodos',JSON.stringify(listOfToDos))

}






export { renderTasks }

{/* <div class='task-canvas2'>
            <div class="tasks">
                <div class='task'>
                    <div class='checkbox'><input type="checkbox" id="mariners" name="0"><label>fake task</label></div>
                    <div class='date'>2021-01-01</div>
                    <div class='priority'>2</div>
                    <div class='project'>inbox</div>
                </div>
            </div>
        </div> */}
