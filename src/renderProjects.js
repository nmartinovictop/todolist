import { listOfProjects } from './projects.js'
import { projectsEl } from  './elements.js'

function showProjects() {
    while (projectsEl.firstChild) {
        projectsEl.removeChild(projectsEl.firstChild);
    }
listOfProjects.forEach(proj => {


    const projEl = document.createElement('h3')
    projEl.innerText = proj.title
    projectsEl.appendChild(projEl)

})}

export { showProjects }