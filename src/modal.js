import { findTaskById,editTask } from "./toDoObject";


const modal = document.querySelectorAll(".modal");
const trigger = document.querySelectorAll(".trigger");
const closeButton = document.querySelectorAll(".close-button");
const submitButton = document.querySelectorAll(".submit-button")
const editTaskButton = document.querySelector('.editTask')

function toggleModal() {

    if (this.classList.contains('trigger')) {
        this.nextElementSibling.classList.toggle("show-modal");
    } else if (this.classList.contains('show-modal')) {
        this.classList.toggle('show-modal')
    } 
    else if (this.parentElement.parentElement.classList.contains("modal")){
        this.parentElement.parentElement.classList.toggle("show-modal")
    } else if (this.classList.contains('material-icons-outlined')) {

        let editModal = document.querySelector('.edit-modal')
        editModal.classList.toggle('show-modal')
        const title = document.querySelector('#editTitle')
        const description = document.querySelector('#editDescription')
        const dueDate = document.querySelector('#editDate')
        const priority = document.querySelector('#editPriority')
        const project = document.querySelector('#editProject')

        const task = findTaskById(this.parentElement.nextElementSibling.innerText)
        const taskId = this.parentElement.nextElementSibling.innerText
        title.value = task.title
        description.value = task.description
        dueDate.value = task.dueDate
        priority.value = task.priority
        project.value = task.project

        const clickFunction = () => editTask(taskId)
        editTaskButton.addEventListener('submit', clickFunction,{once:true})





    } 
    
    else {
        this.parentElement.parentElement.classList.toggle("show-modal")
    }
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.forEach(btn => btn.addEventListener("click", toggleModal));
closeButton.forEach(btn => btn.addEventListener("click", toggleModal));
// submitButton.forEach(btn => btn.addEventListener("click",toggleModal))
window.addEventListener("click", windowOnClick);




export { trigger, closeButton, toggleModal, modal,submitButton,editTaskButton }