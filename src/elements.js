const projectsEl = document.querySelector('.projects')
const taskCanvas = document.querySelector('.task-canvas')
const projects = document.querySelectorAll('.projectList')

projects.forEach(proj => {
    proj.addEventListener('click',() => console.log('nick'))
})


export { projectsEl,taskCanvas }