import { listOfProjects } from './projects.js'
import { projectsEl } from  './elements.js'
import { renderTasks } from './renderTasks.js';

function showProjects() {
    while (projectsEl.firstChild) {
        projectsEl.removeChild(projectsEl.firstChild);
    }
listOfProjects.forEach(proj => {


    const projEl = document.createElement('h3')
    projEl.classList.add(proj.title,'projectList')
    projEl.innerText = proj.title
    projectsEl.appendChild(projEl)
    projEl.addEventListener('click',(e) => renderTasks(e.target.classList[0]))

})}

export { showProjects }