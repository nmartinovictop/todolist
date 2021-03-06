// const { taskCanvas } = require("./elements");
// const { showSpecificProject, currentProject } = require("./projects");

import { taskCanvas } from "./elements.js"
import { toggleModal } from "./modal.js";
import { showSpecificProject, currentProject, listOfProjects } from './projects.js'
import { showProjects } from "./renderProjects.js";
import { listOfToDos, removeTaskFromList } from "./toDoObject.js";
import { compareAsc, format, isPast, isToday,add,differenceInDays } from 'date-fns'



function renderTasks(project) {
    while (taskCanvas.firstChild) {
        taskCanvas.firstChild.remove();
    }

    var tasks
    // const tasks = project === 'All' ? listOfToDos : showSpecificProject(project)

    if (project === 'All') {
        tasks =  listOfToDos
    } else if (project === 'Today') {
        tasks = listOfToDos.filter(task => {
            let now = new Date()
            let taskDate = new Date(task.dueDate)
            return isToday(taskDate)
        })
    } else if (project == 'Overdue') {
        tasks = listOfToDos.filter(task => {
            let now = new Date()
            let taskDate = new Date(task.dueDate)
            return isPast(taskDate)
        })

    } else if (project == 'Next_7_Days') {
        tasks = listOfToDos.filter(task => {
            let now = new Date()
            let taskDate = new Date(task.dueDate)

            const next_7_days = add(now, {
                days: 7,
              })
            return differenceInDays(now,taskDate) < 0 && differenceInDays(now,taskDate) > -7


        })
    } else {
        tasks = showSpecificProject(project)
    }

    
    tasks.forEach( task => {

        const taskDiv = document.createElement('div')
        taskDiv.classList.add('tasks')
        taskCanvas.appendChild(taskDiv)
        const indDiv = document.createElement('div')
        indDiv.classList.add('task')
        indDiv.dataset.title = task.title
        const checkboxDiv = document.createElement('div')
        checkboxDiv.classList.add('checkbox')
        const editDeleteButtonDiv = document.createElement('div')
        editDeleteButtonDiv.classList.add('edit-delete')

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
                localStorage.setItem('listoftodos',JSON.stringify(listOfToDos))

            } else {
                task.isCompleted = false
                localStorage.setItem('listoftodos',JSON.stringify(listOfToDos))

            }
        })

        const date = task.dueDate
        const description = task.description
        const priority = task.priority
        const project = task.project
        const id = task.id

 

        const dateDiv = document.createElement('div')
        const descriptionDiv = document.createElement('div')
        const priorityDiv = document.createElement('div')
        const projectDiv = document.createElement('div')
        const idDiv = document.createElement('div')

        dateDiv.innerText = date
        dateDiv.classList.add('date')
        descriptionDiv.innerText = description
        descriptionDiv.classList.add('date')
        priorityDiv.innerText = priority
        priorityDiv.classList.add('priority')
        projectDiv.innerText = project
        projectDiv.classList.add('project')
        idDiv.classList.add('hidden-task')
        idDiv.innerText = id

        taskDiv.appendChild(indDiv)
        indDiv.append(checkboxDiv)
        indDiv.appendChild(descriptionDiv)
        indDiv.appendChild(dateDiv)
        indDiv.appendChild(priorityDiv)
        indDiv.appendChild(projectDiv)

        const editButton = document.createElement('span')
        editButton.classList.add('material-icons-outlined')
        editButton.innerText = 'edit'

        const trashButton = document.createElement('span')
        trashButton.classList.add('material-icons-outlined')
        trashButton.innerText = 'delete'
        indDiv.appendChild(editDeleteButtonDiv)
        indDiv.appendChild(idDiv)

        editDeleteButtonDiv.appendChild(editButton)
        editDeleteButtonDiv.appendChild(trashButton)

        trashButton.addEventListener('click', (e) => {
            removeTaskFromList(e.target.parentElement.parentElement.dataset.title)
            renderTasks(task.project)
            
        })

        editButton.addEventListener('click',(e) => {
            let div = e.target
           let newModal = toggleModal.bind(div)
           newModal()
        })
        

        
    })  

    const deleteButton = document.createElement('button')
    deleteButton.textContent = "Delete all tasks and project"
    if (project == 'All' || project == 'Inbox' || project == "Today" || project == "Next_7_Days" || project == "Overdue") {
        
    } else {
    taskCanvas.appendChild(deleteButton)
    }

    deleteButton.addEventListener('click', () => {
        const nick = listOfToDos.filter(task => task.project !== project)
        listOfToDos.splice(0,listOfToDos.length)
        nick.forEach(task => listOfToDos.push(task))
        let projectIndex = listOfProjects.findIndex(task => (task.title == project))
        console.log(projectIndex)
        listOfProjects.splice(projectIndex,1)
        showProjects()
        renderTasks("Inbox")
            localStorage.setItem('listofprojects',JSON.stringify(listOfProjects))

        
    })



    localStorage.setItem('listoftodos',JSON.stringify(listOfToDos))

}






export { renderTasks }
