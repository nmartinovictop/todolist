/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/elements.js":
/*!*************************!*\
  !*** ./src/elements.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projectsEl": () => (/* binding */ projectsEl),
/* harmony export */   "taskCanvas": () => (/* binding */ taskCanvas)
/* harmony export */ });
const projectsEl = document.querySelector('.projects')
const taskCanvas = document.querySelector('.task-canvas')




/***/ }),

/***/ "./src/modal.js":
/*!**********************!*\
  !*** ./src/modal.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "trigger": () => (/* binding */ trigger),
/* harmony export */   "closeButton": () => (/* binding */ closeButton),
/* harmony export */   "toggleModal": () => (/* binding */ toggleModal),
/* harmony export */   "modal": () => (/* binding */ modal),
/* harmony export */   "submitButton": () => (/* binding */ submitButton)
/* harmony export */ });


const modal = document.querySelectorAll(".modal");
const trigger = document.querySelectorAll(".trigger");
const closeButton = document.querySelectorAll(".close-button");
const submitButton = document.querySelectorAll(".submit-button")

function toggleModal() {

    if (this.classList.contains('trigger')) {
        this.nextElementSibling.classList.toggle("show-modal");
    } else if (this.parentElement.parentElement.classList.contains("modal")){
        this.parentElement.parentElement.classList.toggle("show-modal")
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
// submitButton.forEach(btn => btn.addEventListener("click",toggleModal))
window.addEventListener("click", windowOnClick);






/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addProjectToList": () => (/* binding */ addProjectToList),
/* harmony export */   "projectFactory": () => (/* binding */ projectFactory),
/* harmony export */   "listOfProjects": () => (/* binding */ listOfProjects),
/* harmony export */   "showSpecificProject": () => (/* binding */ showSpecificProject),
/* harmony export */   "currentProject": () => (/* binding */ currentProject)
/* harmony export */ });
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ "./src/modal.js");
/* harmony import */ var _renderProjects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderProjects.js */ "./src/renderProjects.js");
/* harmony import */ var _toDoObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toDoObject.js */ "./src/toDoObject.js");




const listOfProjects = []

if (localStorage.length == 0) {

let addProjects = [{title: 'All'},{title: "Inbox"}]
addProjects.forEach(proj => listOfProjects.push(proj))
localStorage.setItem('listofprojects',JSON.stringify(listOfProjects))
}

const projectFactory = (title,description) => {

    return { title, description }
}

function addProjectToList() {

    const title = document.querySelector('#project-title')
    const description = document.querySelector('#project-description')
    listOfProjects.push(projectFactory(title.value,description.value))
    let newToggle = _modal_js__WEBPACK_IMPORTED_MODULE_0__.toggleModal.bind(this)
    newToggle()
    submit.reset()
    localStorage.setItem('listofprojects',JSON.stringify(listOfProjects))

    ;(0,_renderProjects_js__WEBPACK_IMPORTED_MODULE_1__.showProjects)()

}

// const addProject = document.querySelector('.addProject')
// addProject.addEventListener('submit',addProjectToList.bind(submitButton))
const submit = document.querySelector('.addProject')
submit.addEventListener('submit',addProjectToList)

const displayListOfToDos = []

function showSpecificProject(project) {
    // displayListOfToDos.length = 0
    const projectList = _toDoObject_js__WEBPACK_IMPORTED_MODULE_2__.listOfToDos.filter( todo => {
        return todo.project == project
    })
    return projectList
}

const currentProject = listOfProjects[0]



/***/ }),

/***/ "./src/renderProjects.js":
/*!*******************************!*\
  !*** ./src/renderProjects.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showProjects": () => (/* binding */ showProjects)
/* harmony export */ });
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");
/* harmony import */ var _elements_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elements.js */ "./src/elements.js");
/* harmony import */ var _renderTasks_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderTasks.js */ "./src/renderTasks.js");




function showProjects() {
    while (_elements_js__WEBPACK_IMPORTED_MODULE_1__.projectsEl.firstChild) {
        _elements_js__WEBPACK_IMPORTED_MODULE_1__.projectsEl.removeChild(_elements_js__WEBPACK_IMPORTED_MODULE_1__.projectsEl.firstChild);
    }
_projects_js__WEBPACK_IMPORTED_MODULE_0__.listOfProjects.forEach(proj => {


    const projEl = document.createElement('h3')
    projEl.classList.add(proj.title,'projectList')
    projEl.innerText = proj.title
    _elements_js__WEBPACK_IMPORTED_MODULE_1__.projectsEl.appendChild(projEl)
    projEl.addEventListener('click',(e) => (0,_renderTasks_js__WEBPACK_IMPORTED_MODULE_2__.renderTasks)(e.target.classList[0]))

})}



/***/ }),

/***/ "./src/renderTasks.js":
/*!****************************!*\
  !*** ./src/renderTasks.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderTasks": () => (/* binding */ renderTasks)
/* harmony export */ });
/* harmony import */ var _elements_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements.js */ "./src/elements.js");
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");
/* harmony import */ var _toDoObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toDoObject.js */ "./src/toDoObject.js");
// const { taskCanvas } = require("./elements");
// const { showSpecificProject, currentProject } = require("./projects");





function renderTasks(project) {
    while (_elements_js__WEBPACK_IMPORTED_MODULE_0__.taskCanvas.firstChild) {
        _elements_js__WEBPACK_IMPORTED_MODULE_0__.taskCanvas.firstChild.remove();
    }


    const tasks = project === 'All' ? _toDoObject_js__WEBPACK_IMPORTED_MODULE_2__.listOfToDos : (0,_projects_js__WEBPACK_IMPORTED_MODULE_1__.showSpecificProject)(project)


    
    tasks.forEach( task => {

        const taskDiv = document.createElement('div')
        taskDiv.classList.add('tasks')
        _elements_js__WEBPACK_IMPORTED_MODULE_0__.taskCanvas.appendChild(taskDiv)
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
                localStorage.setItem('listoftodos',JSON.stringify(_toDoObject_js__WEBPACK_IMPORTED_MODULE_2__.listOfToDos))

            } else {
                task.isCompleted = false
                localStorage.setItem('listoftodos',JSON.stringify(_toDoObject_js__WEBPACK_IMPORTED_MODULE_2__.listOfToDos))

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

        const editButton = document.createElement('span')
        editButton.classList.add('material-icons-outlined')
        editButton.innerText = 'edit'

        const trashButton = document.createElement('span')
        trashButton.classList.add('material-icons-outlined')
        trashButton.innerText = 'delete'
        indDiv.appendChild(editDeleteButtonDiv)

        editDeleteButtonDiv.appendChild(editButton)
        editDeleteButtonDiv.appendChild(trashButton)

        trashButton.addEventListener('click', (e) => {
            // console.log(e.target.parentElement.parentElement.dataset.title)
            ;(0,_toDoObject_js__WEBPACK_IMPORTED_MODULE_2__.removeTaskFromList)(e.target.parentElement.parentElement.dataset.title)
            renderTasks(task.project)
            
        })
        

        
    })  
    localStorage.setItem('listoftodos',JSON.stringify(_toDoObject_js__WEBPACK_IMPORTED_MODULE_2__.listOfToDos))

}









/***/ }),

/***/ "./src/toDoObject.js":
/*!***************************!*\
  !*** ./src/toDoObject.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toDoFactory": () => (/* binding */ toDoFactory),
/* harmony export */   "listOfToDos": () => (/* binding */ listOfToDos),
/* harmony export */   "addTask": () => (/* binding */ addTask),
/* harmony export */   "removeTaskFromList": () => (/* binding */ removeTaskFromList)
/* harmony export */ });
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ "./src/modal.js");
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");
/* harmony import */ var _renderProjects_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderProjects.js */ "./src/renderProjects.js");
/* harmony import */ var _renderTasks_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderTasks.js */ "./src/renderTasks.js");





const toDoList = [];

const counterCreator = () => {
    let count = 0;
    return () => {
      return count++;
    };
  };

const counter = counterCreator()

const toDoFactory = (title, description, dueDate, priority, project, isCompleted) => {

    let id = counter()

    if (project=="") {
        project = "Inbox"
    }

    let projExists = false;
    _projects_js__WEBPACK_IMPORTED_MODULE_1__.listOfProjects.forEach( proj => {
        if (proj.title === project) {
            projExists = true;
        }
    })

    if (projExists === false) {
        _projects_js__WEBPACK_IMPORTED_MODULE_1__.listOfProjects.push((0,_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectFactory)(project,"NA"))
        localStorage.setItem('listofprojects',JSON.stringify(_projects_js__WEBPACK_IMPORTED_MODULE_1__.listOfProjects))

        ;(0,_renderProjects_js__WEBPACK_IMPORTED_MODULE_2__.showProjects)()
    }

    return { title, description, dueDate, priority, project, isCompleted,id }
}

const listOfToDos = []

function addTaskToList() {
    const title = document.querySelector('#title')
    const description = document.querySelector('#description')
    const dueDate = document.querySelector('#date')
    const priority = document.querySelector('#priority')
    const project = document.querySelector('#project')
    listOfToDos.push(toDoFactory(title.value,description.value,dueDate.value,priority.value,project.value,false))
    localStorage.setItem('listoftodos',JSON.stringify(listOfToDos))

    let newToggle = _modal_js__WEBPACK_IMPORTED_MODULE_0__.toggleModal.bind(this)
    newToggle()
    let setProject = project.value =="" ? "Inbox" : project.value

    ;(0,_renderTasks_js__WEBPACK_IMPORTED_MODULE_3__.renderTasks)(setProject)
    addTask.reset()
    


}

const addTask = document.querySelector('.addTask')
addTask.addEventListener('submit',addTaskToList)


function removeTaskFromList(title) {
    let taskIndex = listOfToDos.findIndex(task => task.title == title)
    listOfToDos.splice(taskIndex,1)
    return listOfToDos
}







// const todo1 = toDoFactory('nick','nick\'s description', '2021-09-04',1,'inbox',false)

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _toDoObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDoObject.js */ "./src/toDoObject.js");
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");
/* harmony import */ var _renderProjects_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderProjects.js */ "./src/renderProjects.js");
/* harmony import */ var _renderTasks_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderTasks.js */ "./src/renderTasks.js");






if (localStorage.length > 1 ) {

    let localTodos = JSON.parse(localStorage['listoftodos'])
    localTodos.forEach(task => {
        _toDoObject_js__WEBPACK_IMPORTED_MODULE_0__.listOfToDos.push(task)
    })
    let localProjects = JSON.parse(localStorage['listofprojects'])
    localProjects.forEach(project => {
        _projects_js__WEBPACK_IMPORTED_MODULE_1__.listOfProjects.push(project)
    })
    ;(0,_renderProjects_js__WEBPACK_IMPORTED_MODULE_2__.showProjects)()
    ;(0,_renderTasks_js__WEBPACK_IMPORTED_MODULE_3__.renderTasks)("Inbox")

  }
  


(0,_renderProjects_js__WEBPACK_IMPORTED_MODULE_2__.showProjects)()

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTmtFO0FBQ21EO0FBQ25FO0FBQ0o7OztBQUc5Qzs7QUFFQTtBQUNBO0FBQ0EsUUFBUSw0REFBZ0I7QUFDeEIsS0FBSztBQUNMO0FBQ0E7QUFDQSxRQUFRLDZEQUFtQjtBQUMzQixLQUFLO0FBQ0wsSUFBSSxpRUFBWTtBQUNoQixJQUFJLDZEQUFXOztBQUVmO0FBQ0E7OztBQUdBLGdFQUFZIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvcmVuZGVyUHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvcmVuZGVyVGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdG9Eb09iamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHByb2plY3RzRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMnKVxuY29uc3QgdGFza0NhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWNhbnZhcycpXG5cblxuZXhwb3J0IHsgcHJvamVjdHNFbCx0YXNrQ2FudmFzIH0iLCJcblxuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vZGFsXCIpO1xuY29uc3QgdHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudHJpZ2dlclwiKTtcbmNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jbG9zZS1idXR0b25cIik7XG5jb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnN1Ym1pdC1idXR0b25cIilcblxuZnVuY3Rpb24gdG9nZ2xlTW9kYWwoKSB7XG5cbiAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ3RyaWdnZXInKSkge1xuICAgICAgICB0aGlzLm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKFwic2hvdy1tb2RhbFwiKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsXCIpKXtcbiAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcInNob3ctbW9kYWxcIilcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwic2hvdy1tb2RhbFwiKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gd2luZG93T25DbGljayhldmVudCkge1xuICAgIGlmIChldmVudC50YXJnZXQgPT09IG1vZGFsKSB7XG4gICAgICAgIHRvZ2dsZU1vZGFsKCk7XG4gICAgfVxufVxuXG50cmlnZ2VyLmZvckVhY2goYnRuID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlTW9kYWwpKTtcbmNsb3NlQnV0dG9uLmZvckVhY2goYnRuID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlTW9kYWwpKTtcbi8vIHN1Ym1pdEJ1dHRvbi5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdG9nZ2xlTW9kYWwpKVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB3aW5kb3dPbkNsaWNrKTtcblxuXG5cblxuZXhwb3J0IHsgdHJpZ2dlciwgY2xvc2VCdXR0b24sIHRvZ2dsZU1vZGFsLCBtb2RhbCxzdWJtaXRCdXR0b24gfSIsImltcG9ydCB7IHRyaWdnZXIsIGNsb3NlQnV0dG9uLCB0b2dnbGVNb2RhbCwgbW9kYWwgfSBmcm9tICcuL21vZGFsLmpzJ1xuaW1wb3J0IHsgc2hvd1Byb2plY3RzIH0gZnJvbSAnLi9yZW5kZXJQcm9qZWN0cy5qcydcbmltcG9ydCB7IGxpc3RPZlRvRG9zIH0gZnJvbSAnLi90b0RvT2JqZWN0LmpzJ1xuXG5jb25zdCBsaXN0T2ZQcm9qZWN0cyA9IFtdXG5cbmlmIChsb2NhbFN0b3JhZ2UubGVuZ3RoID09IDApIHtcblxubGV0IGFkZFByb2plY3RzID0gW3t0aXRsZTogJ0FsbCd9LHt0aXRsZTogXCJJbmJveFwifV1cbmFkZFByb2plY3RzLmZvckVhY2gocHJvaiA9PiBsaXN0T2ZQcm9qZWN0cy5wdXNoKHByb2opKVxubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xpc3RvZnByb2plY3RzJyxKU09OLnN0cmluZ2lmeShsaXN0T2ZQcm9qZWN0cykpXG59XG5cbmNvbnN0IHByb2plY3RGYWN0b3J5ID0gKHRpdGxlLGRlc2NyaXB0aW9uKSA9PiB7XG5cbiAgICByZXR1cm4geyB0aXRsZSwgZGVzY3JpcHRpb24gfVxufVxuXG5mdW5jdGlvbiBhZGRQcm9qZWN0VG9MaXN0KCkge1xuXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC10aXRsZScpXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1kZXNjcmlwdGlvbicpXG4gICAgbGlzdE9mUHJvamVjdHMucHVzaChwcm9qZWN0RmFjdG9yeSh0aXRsZS52YWx1ZSxkZXNjcmlwdGlvbi52YWx1ZSkpXG4gICAgbGV0IG5ld1RvZ2dsZSA9IHRvZ2dsZU1vZGFsLmJpbmQodGhpcylcbiAgICBuZXdUb2dnbGUoKVxuICAgIHN1Ym1pdC5yZXNldCgpXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xpc3RvZnByb2plY3RzJyxKU09OLnN0cmluZ2lmeShsaXN0T2ZQcm9qZWN0cykpXG5cbiAgICBzaG93UHJvamVjdHMoKVxuXG59XG5cbi8vIGNvbnN0IGFkZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkUHJvamVjdCcpXG4vLyBhZGRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsYWRkUHJvamVjdFRvTGlzdC5iaW5kKHN1Ym1pdEJ1dHRvbikpXG5jb25zdCBzdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkUHJvamVjdCcpXG5zdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JyxhZGRQcm9qZWN0VG9MaXN0KVxuXG5jb25zdCBkaXNwbGF5TGlzdE9mVG9Eb3MgPSBbXVxuXG5mdW5jdGlvbiBzaG93U3BlY2lmaWNQcm9qZWN0KHByb2plY3QpIHtcbiAgICAvLyBkaXNwbGF5TGlzdE9mVG9Eb3MubGVuZ3RoID0gMFxuICAgIGNvbnN0IHByb2plY3RMaXN0ID0gbGlzdE9mVG9Eb3MuZmlsdGVyKCB0b2RvID0+IHtcbiAgICAgICAgcmV0dXJuIHRvZG8ucHJvamVjdCA9PSBwcm9qZWN0XG4gICAgfSlcbiAgICByZXR1cm4gcHJvamVjdExpc3Rcbn1cblxuY29uc3QgY3VycmVudFByb2plY3QgPSBsaXN0T2ZQcm9qZWN0c1swXVxuXG5leHBvcnQgeyBhZGRQcm9qZWN0VG9MaXN0LCBwcm9qZWN0RmFjdG9yeSwgbGlzdE9mUHJvamVjdHMsIHNob3dTcGVjaWZpY1Byb2plY3QsIGN1cnJlbnRQcm9qZWN0IH0iLCJpbXBvcnQgeyBsaXN0T2ZQcm9qZWN0cyB9IGZyb20gJy4vcHJvamVjdHMuanMnXG5pbXBvcnQgeyBwcm9qZWN0c0VsIH0gZnJvbSAgJy4vZWxlbWVudHMuanMnXG5pbXBvcnQgeyByZW5kZXJUYXNrcyB9IGZyb20gJy4vcmVuZGVyVGFza3MuanMnO1xuXG5mdW5jdGlvbiBzaG93UHJvamVjdHMoKSB7XG4gICAgd2hpbGUgKHByb2plY3RzRWwuZmlyc3RDaGlsZCkge1xuICAgICAgICBwcm9qZWN0c0VsLnJlbW92ZUNoaWxkKHByb2plY3RzRWwuZmlyc3RDaGlsZCk7XG4gICAgfVxubGlzdE9mUHJvamVjdHMuZm9yRWFjaChwcm9qID0+IHtcblxuXG4gICAgY29uc3QgcHJvakVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKVxuICAgIHByb2pFbC5jbGFzc0xpc3QuYWRkKHByb2oudGl0bGUsJ3Byb2plY3RMaXN0JylcbiAgICBwcm9qRWwuaW5uZXJUZXh0ID0gcHJvai50aXRsZVxuICAgIHByb2plY3RzRWwuYXBwZW5kQ2hpbGQocHJvakVsKVxuICAgIHByb2pFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKGUpID0+IHJlbmRlclRhc2tzKGUudGFyZ2V0LmNsYXNzTGlzdFswXSkpXG5cbn0pfVxuXG5leHBvcnQgeyBzaG93UHJvamVjdHMgfSIsIi8vIGNvbnN0IHsgdGFza0NhbnZhcyB9ID0gcmVxdWlyZShcIi4vZWxlbWVudHNcIik7XG4vLyBjb25zdCB7IHNob3dTcGVjaWZpY1Byb2plY3QsIGN1cnJlbnRQcm9qZWN0IH0gPSByZXF1aXJlKFwiLi9wcm9qZWN0c1wiKTtcblxuaW1wb3J0IHsgdGFza0NhbnZhcyB9IGZyb20gXCIuL2VsZW1lbnRzLmpzXCJcbmltcG9ydCB7IHNob3dTcGVjaWZpY1Byb2plY3QsIGN1cnJlbnRQcm9qZWN0IH0gZnJvbSAnLi9wcm9qZWN0cy5qcydcbmltcG9ydCB7IGxpc3RPZlRvRG9zLCByZW1vdmVUYXNrRnJvbUxpc3QgfSBmcm9tIFwiLi90b0RvT2JqZWN0LmpzXCI7XG5cbmZ1bmN0aW9uIHJlbmRlclRhc2tzKHByb2plY3QpIHtcbiAgICB3aGlsZSAodGFza0NhbnZhcy5maXJzdENoaWxkKSB7XG4gICAgICAgIHRhc2tDYW52YXMuZmlyc3RDaGlsZC5yZW1vdmUoKTtcbiAgICB9XG5cblxuICAgIGNvbnN0IHRhc2tzID0gcHJvamVjdCA9PT0gJ0FsbCcgPyBsaXN0T2ZUb0RvcyA6IHNob3dTcGVjaWZpY1Byb2plY3QocHJvamVjdClcblxuXG4gICAgXG4gICAgdGFza3MuZm9yRWFjaCggdGFzayA9PiB7XG5cbiAgICAgICAgY29uc3QgdGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZCgndGFza3MnKVxuICAgICAgICB0YXNrQ2FudmFzLmFwcGVuZENoaWxkKHRhc2tEaXYpXG4gICAgICAgIGNvbnN0IGluZERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGluZERpdi5jbGFzc0xpc3QuYWRkKCd0YXNrJylcbiAgICAgICAgaW5kRGl2LmRhdGFzZXQudGl0bGUgPSB0YXNrLnRpdGxlXG4gICAgICAgIGNvbnN0IGNoZWNrYm94RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgY2hlY2tib3hEaXYuY2xhc3NMaXN0LmFkZCgnY2hlY2tib3gnKVxuICAgICAgICBjb25zdCBlZGl0RGVsZXRlQnV0dG9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgZWRpdERlbGV0ZUJ1dHRvbkRpdi5jbGFzc0xpc3QuYWRkKCdlZGl0LWRlbGV0ZScpXG5cbiAgICAgICAgY29uc3QgdGFza0NoZWNrQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgICAgICB0YXNrQ2hlY2tCb3gudHlwZSA9ICdjaGVja2JveCdcbiAgICAgICAgdGFza0NoZWNrQm94LmlkID0gdGFzay50aXRsZVxuICAgICAgICB0YXNrQ2hlY2tCb3gubmFtZSA9IHRhc2suaWRcblxuICAgICAgICBpZiAodGFzay5pc0NvbXBsZXRlZCA9PSB0cnVlKSB7XG4gICAgICAgICAgICB0YXNrQ2hlY2tCb3guY2hlY2tlZCA9IHRydWVcbiAgICAgICAgfSBcblxuICAgICAgICBjb25zdCB0YXNrTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpXG4gICAgICAgIHRhc2tMYWJlbC5mb3IgPSB0YXNrLnRpdGxlXG4gICAgICAgIHRhc2tMYWJlbC5pbm5lclRleHQgPSB0YXNrLnRpdGxlXG5cbiAgICAgICAgY2hlY2tib3hEaXYuYXBwZW5kQ2hpbGQodGFza0NoZWNrQm94KVxuICAgICAgICBjaGVja2JveERpdi5hcHBlbmRDaGlsZCh0YXNrTGFiZWwpXG4gICAgICAgIFxuXG4gICAgICAgIHRhc2tDaGVja0JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIHRhc2suaXNDb21wbGV0ZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xpc3RvZnRvZG9zJyxKU09OLnN0cmluZ2lmeShsaXN0T2ZUb0RvcykpXG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFzay5pc0NvbXBsZXRlZCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xpc3RvZnRvZG9zJyxKU09OLnN0cmluZ2lmeShsaXN0T2ZUb0RvcykpXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBkYXRlID0gdGFzay5kdWVEYXRlXG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gdGFzay5kZXNjcmlwdGlvblxuICAgICAgICBjb25zdCBwcmlvcml0eSA9IHRhc2sucHJpb3JpdHlcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IHRhc2sucHJvamVjdFxuXG4gICAgICAgIGNvbnN0IGRhdGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGNvbnN0IHByaW9yaXR5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgY29uc3QgcHJvamVjdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgICAgICAgZGF0ZURpdi5pbm5lclRleHQgPSBkYXRlXG4gICAgICAgIGRhdGVEaXYuY2xhc3NMaXN0LmFkZCgnZGF0ZScpXG4gICAgICAgIGRlc2NyaXB0aW9uRGl2LmlubmVyVGV4dCA9IGRlc2NyaXB0aW9uXG4gICAgICAgIGRlc2NyaXB0aW9uRGl2LmNsYXNzTGlzdC5hZGQoJ2RhdGUnKVxuICAgICAgICBwcmlvcml0eURpdi5pbm5lclRleHQgPSBwcmlvcml0eVxuICAgICAgICBwcmlvcml0eURpdi5jbGFzc0xpc3QuYWRkKCdwcmlvcml0eScpXG4gICAgICAgIHByb2plY3REaXYuaW5uZXJUZXh0ID0gcHJvamVjdFxuICAgICAgICBwcm9qZWN0RGl2LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QnKVxuXG4gICAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQoaW5kRGl2KVxuICAgICAgICBpbmREaXYuYXBwZW5kKGNoZWNrYm94RGl2KVxuICAgICAgICBpbmREaXYuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25EaXYpXG4gICAgICAgIGluZERpdi5hcHBlbmRDaGlsZChkYXRlRGl2KVxuICAgICAgICBpbmREaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlEaXYpXG4gICAgICAgIGluZERpdi5hcHBlbmRDaGlsZChwcm9qZWN0RGl2KVxuXG4gICAgICAgIGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucy1vdXRsaW5lZCcpXG4gICAgICAgIGVkaXRCdXR0b24uaW5uZXJUZXh0ID0gJ2VkaXQnXG5cbiAgICAgICAgY29uc3QgdHJhc2hCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgdHJhc2hCdXR0b24uY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMtb3V0bGluZWQnKVxuICAgICAgICB0cmFzaEJ1dHRvbi5pbm5lclRleHQgPSAnZGVsZXRlJ1xuICAgICAgICBpbmREaXYuYXBwZW5kQ2hpbGQoZWRpdERlbGV0ZUJ1dHRvbkRpdilcblxuICAgICAgICBlZGl0RGVsZXRlQnV0dG9uRGl2LmFwcGVuZENoaWxkKGVkaXRCdXR0b24pXG4gICAgICAgIGVkaXREZWxldGVCdXR0b25EaXYuYXBwZW5kQ2hpbGQodHJhc2hCdXR0b24pXG5cbiAgICAgICAgdHJhc2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXQudGl0bGUpXG4gICAgICAgICAgICByZW1vdmVUYXNrRnJvbUxpc3QoZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXQudGl0bGUpXG4gICAgICAgICAgICByZW5kZXJUYXNrcyh0YXNrLnByb2plY3QpXG4gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgXG5cbiAgICAgICAgXG4gICAgfSkgIFxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaXN0b2Z0b2RvcycsSlNPTi5zdHJpbmdpZnkobGlzdE9mVG9Eb3MpKVxuXG59XG5cblxuXG5cblxuXG5leHBvcnQgeyByZW5kZXJUYXNrcyB9XG4iLCJpbXBvcnQgeyB0cmlnZ2VyLCBjbG9zZUJ1dHRvbix0b2dnbGVNb2RhbCxtb2RhbCxtb2RhbFByb2osdHJpZ2dlclByb2osY2xvc2VCdXR0b25Qcm9qIH0gZnJvbSAnLi9tb2RhbC5qcydcbmltcG9ydCB7IGFkZFByb2plY3RUb0xpc3QsIGxpc3RPZlByb2plY3RzLCBwcm9qZWN0RmFjdG9yeSB9IGZyb20gJy4vcHJvamVjdHMuanMnO1xuaW1wb3J0IHsgc2hvd1Byb2plY3RzIH0gZnJvbSAnLi9yZW5kZXJQcm9qZWN0cy5qcyc7XG5pbXBvcnQgeyByZW5kZXJUYXNrcyB9IGZyb20gJy4vcmVuZGVyVGFza3MuanMnO1xuXG5jb25zdCB0b0RvTGlzdCA9IFtdO1xuXG5jb25zdCBjb3VudGVyQ3JlYXRvciA9ICgpID0+IHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByZXR1cm4gY291bnQrKztcbiAgICB9O1xuICB9O1xuXG5jb25zdCBjb3VudGVyID0gY291bnRlckNyZWF0b3IoKVxuXG5jb25zdCB0b0RvRmFjdG9yeSA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0LCBpc0NvbXBsZXRlZCkgPT4ge1xuXG4gICAgbGV0IGlkID0gY291bnRlcigpXG5cbiAgICBpZiAocHJvamVjdD09XCJcIikge1xuICAgICAgICBwcm9qZWN0ID0gXCJJbmJveFwiXG4gICAgfVxuXG4gICAgbGV0IHByb2pFeGlzdHMgPSBmYWxzZTtcbiAgICBsaXN0T2ZQcm9qZWN0cy5mb3JFYWNoKCBwcm9qID0+IHtcbiAgICAgICAgaWYgKHByb2oudGl0bGUgPT09IHByb2plY3QpIHtcbiAgICAgICAgICAgIHByb2pFeGlzdHMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSlcblxuICAgIGlmIChwcm9qRXhpc3RzID09PSBmYWxzZSkge1xuICAgICAgICBsaXN0T2ZQcm9qZWN0cy5wdXNoKHByb2plY3RGYWN0b3J5KHByb2plY3QsXCJOQVwiKSlcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xpc3RvZnByb2plY3RzJyxKU09OLnN0cmluZ2lmeShsaXN0T2ZQcm9qZWN0cykpXG5cbiAgICAgICAgc2hvd1Byb2plY3RzKClcbiAgICB9XG5cbiAgICByZXR1cm4geyB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0LCBpc0NvbXBsZXRlZCxpZCB9XG59XG5cbmNvbnN0IGxpc3RPZlRvRG9zID0gW11cblxuZnVuY3Rpb24gYWRkVGFza1RvTGlzdCgpIHtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKVxuICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGF0ZScpXG4gICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpb3JpdHknKVxuICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdCcpXG4gICAgbGlzdE9mVG9Eb3MucHVzaCh0b0RvRmFjdG9yeSh0aXRsZS52YWx1ZSxkZXNjcmlwdGlvbi52YWx1ZSxkdWVEYXRlLnZhbHVlLHByaW9yaXR5LnZhbHVlLHByb2plY3QudmFsdWUsZmFsc2UpKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaXN0b2Z0b2RvcycsSlNPTi5zdHJpbmdpZnkobGlzdE9mVG9Eb3MpKVxuXG4gICAgbGV0IG5ld1RvZ2dsZSA9IHRvZ2dsZU1vZGFsLmJpbmQodGhpcylcbiAgICBuZXdUb2dnbGUoKVxuICAgIGxldCBzZXRQcm9qZWN0ID0gcHJvamVjdC52YWx1ZSA9PVwiXCIgPyBcIkluYm94XCIgOiBwcm9qZWN0LnZhbHVlXG5cbiAgICByZW5kZXJUYXNrcyhzZXRQcm9qZWN0KVxuICAgIGFkZFRhc2sucmVzZXQoKVxuICAgIFxuXG5cbn1cblxuY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRUYXNrJylcbmFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JyxhZGRUYXNrVG9MaXN0KVxuXG5cbmZ1bmN0aW9uIHJlbW92ZVRhc2tGcm9tTGlzdCh0aXRsZSkge1xuICAgIGxldCB0YXNrSW5kZXggPSBsaXN0T2ZUb0Rvcy5maW5kSW5kZXgodGFzayA9PiB0YXNrLnRpdGxlID09IHRpdGxlKVxuICAgIGxpc3RPZlRvRG9zLnNwbGljZSh0YXNrSW5kZXgsMSlcbiAgICByZXR1cm4gbGlzdE9mVG9Eb3Ncbn1cblxuXG5cblxuZXhwb3J0IHsgdG9Eb0ZhY3RvcnksIGxpc3RPZlRvRG9zLCBhZGRUYXNrLCByZW1vdmVUYXNrRnJvbUxpc3R9XG5cblxuLy8gY29uc3QgdG9kbzEgPSB0b0RvRmFjdG9yeSgnbmljaycsJ25pY2tcXCdzIGRlc2NyaXB0aW9uJywgJzIwMjEtMDktMDQnLDEsJ2luYm94JyxmYWxzZSkiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGxpc3RPZlRvRG9zLCBhZGRUYXNrLCB0b0RvRmFjdG9yeX0gZnJvbSAnLi90b0RvT2JqZWN0LmpzJ1xuaW1wb3J0IHsgYWRkUHJvamVjdFRvTGlzdCwgcHJvamVjdEZhY3RvcnksIGxpc3RPZlByb2plY3RzLCBzaG93U3BlY2lmaWNQcm9qZWN0LCBjdXJyZW50UHJvamVjdCB9IGZyb20gJy4vcHJvamVjdHMuanMnXG5pbXBvcnQgeyBzaG93UHJvamVjdHMgfSBmcm9tICcuL3JlbmRlclByb2plY3RzLmpzJ1xuaW1wb3J0IHsgcmVuZGVyVGFza3MgfSBmcm9tICcuL3JlbmRlclRhc2tzLmpzJ1xuXG5cbmlmIChsb2NhbFN0b3JhZ2UubGVuZ3RoID4gMSApIHtcblxuICAgIGxldCBsb2NhbFRvZG9zID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbJ2xpc3RvZnRvZG9zJ10pXG4gICAgbG9jYWxUb2Rvcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBsaXN0T2ZUb0Rvcy5wdXNoKHRhc2spXG4gICAgfSlcbiAgICBsZXQgbG9jYWxQcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlWydsaXN0b2Zwcm9qZWN0cyddKVxuICAgIGxvY2FsUHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICAgICAgbGlzdE9mUHJvamVjdHMucHVzaChwcm9qZWN0KVxuICAgIH0pXG4gICAgc2hvd1Byb2plY3RzKClcbiAgICByZW5kZXJUYXNrcyhcIkluYm94XCIpXG5cbiAgfVxuICBcblxuXG5zaG93UHJvamVjdHMoKVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9