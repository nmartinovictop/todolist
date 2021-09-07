

const modal = document.querySelectorAll(".modal");
const trigger = document.querySelectorAll(".trigger");
const closeButton = document.querySelectorAll(".close-button");
const submitButton = document.querySelectorAll(".submit-button")

function toggleModal() {
    console.log(this.nodeName)

    if (this.nodeName === 'BUTTON') {
        console.log(this.nextElementSibling)
        this.nextElementSibling.classList.toggle("show-modal");
    } else {
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
submitButton.forEach(btn => btn.addEventListener("submit",toggleModal) )
window.addEventListener("click", windowOnClick);




export { trigger, closeButton, toggleModal, modal,submitButton }