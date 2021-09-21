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
            console.log(e.target.parentElement.parentElement.dataset.title)
            ;(0,_toDoObject_js__WEBPACK_IMPORTED_MODULE_2__.removeTaskFromList)(e.target.parentElement.parentElement.dataset.title)
            renderTasks()
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
    let taskIndex = listOfToDos.findIndex(task => task.title = title)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05rRTtBQUNtRDtBQUNuRTtBQUNKOzs7QUFHOUM7O0FBRUE7QUFDQTtBQUNBLFFBQVEsNERBQWdCO0FBQ3hCLEtBQUs7QUFDTDtBQUNBO0FBQ0EsUUFBUSw2REFBbUI7QUFDM0IsS0FBSztBQUNMLElBQUksaUVBQVk7QUFDaEIsSUFBSSw2REFBVzs7QUFFZjtBQUNBOzs7QUFHQSxnRUFBWSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2VsZW1lbnRzLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL21vZGFsLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3JlbmRlclByb2plY3RzLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3JlbmRlclRhc2tzLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3RvRG9PYmplY3QuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBwcm9qZWN0c0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzJylcbmNvbnN0IHRhc2tDYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1jYW52YXMnKVxuXG5cbmV4cG9ydCB7IHByb2plY3RzRWwsdGFza0NhbnZhcyB9IiwiXG5cbmNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tb2RhbFwiKTtcbmNvbnN0IHRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRyaWdnZXJcIik7XG5jb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2xvc2UtYnV0dG9uXCIpO1xuY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zdWJtaXQtYnV0dG9uXCIpXG5cbmZ1bmN0aW9uIHRvZ2dsZU1vZGFsKCkge1xuXG4gICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCd0cmlnZ2VyJykpIHtcbiAgICAgICAgdGhpcy5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZShcInNob3ctbW9kYWxcIik7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbFwiKSl7XG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJzaG93LW1vZGFsXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcInNob3ctbW9kYWxcIilcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHdpbmRvd09uQ2xpY2soZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBtb2RhbCkge1xuICAgICAgICB0b2dnbGVNb2RhbCgpO1xuICAgIH1cbn1cblxudHJpZ2dlci5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZU1vZGFsKSk7XG5jbG9zZUJ1dHRvbi5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZU1vZGFsKSk7XG4vLyBzdWJtaXRCdXR0b24uZm9yRWFjaChidG4gPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRvZ2dsZU1vZGFsKSlcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgd2luZG93T25DbGljayk7XG5cblxuXG5cbmV4cG9ydCB7IHRyaWdnZXIsIGNsb3NlQnV0dG9uLCB0b2dnbGVNb2RhbCwgbW9kYWwsc3VibWl0QnV0dG9uIH0iLCJpbXBvcnQgeyB0cmlnZ2VyLCBjbG9zZUJ1dHRvbiwgdG9nZ2xlTW9kYWwsIG1vZGFsIH0gZnJvbSAnLi9tb2RhbC5qcydcbmltcG9ydCB7IHNob3dQcm9qZWN0cyB9IGZyb20gJy4vcmVuZGVyUHJvamVjdHMuanMnXG5pbXBvcnQgeyBsaXN0T2ZUb0RvcyB9IGZyb20gJy4vdG9Eb09iamVjdC5qcydcblxuY29uc3QgbGlzdE9mUHJvamVjdHMgPSBbXVxuXG5pZiAobG9jYWxTdG9yYWdlLmxlbmd0aCA9PSAwKSB7XG5cbmxldCBhZGRQcm9qZWN0cyA9IFt7dGl0bGU6ICdBbGwnfSx7dGl0bGU6IFwiSW5ib3hcIn1dXG5hZGRQcm9qZWN0cy5mb3JFYWNoKHByb2ogPT4gbGlzdE9mUHJvamVjdHMucHVzaChwcm9qKSlcbmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaXN0b2Zwcm9qZWN0cycsSlNPTi5zdHJpbmdpZnkobGlzdE9mUHJvamVjdHMpKVxufVxuXG5jb25zdCBwcm9qZWN0RmFjdG9yeSA9ICh0aXRsZSxkZXNjcmlwdGlvbikgPT4ge1xuXG4gICAgcmV0dXJuIHsgdGl0bGUsIGRlc2NyaXB0aW9uIH1cbn1cblxuZnVuY3Rpb24gYWRkUHJvamVjdFRvTGlzdCgpIHtcblxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtdGl0bGUnKVxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZGVzY3JpcHRpb24nKVxuICAgIGxpc3RPZlByb2plY3RzLnB1c2gocHJvamVjdEZhY3RvcnkodGl0bGUudmFsdWUsZGVzY3JpcHRpb24udmFsdWUpKVxuICAgIGxldCBuZXdUb2dnbGUgPSB0b2dnbGVNb2RhbC5iaW5kKHRoaXMpXG4gICAgbmV3VG9nZ2xlKClcbiAgICBzdWJtaXQucmVzZXQoKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaXN0b2Zwcm9qZWN0cycsSlNPTi5zdHJpbmdpZnkobGlzdE9mUHJvamVjdHMpKVxuXG4gICAgc2hvd1Byb2plY3RzKClcblxufVxuXG4vLyBjb25zdCBhZGRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZFByb2plY3QnKVxuLy8gYWRkUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLGFkZFByb2plY3RUb0xpc3QuYmluZChzdWJtaXRCdXR0b24pKVxuY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZFByb2plY3QnKVxuc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsYWRkUHJvamVjdFRvTGlzdClcblxuY29uc3QgZGlzcGxheUxpc3RPZlRvRG9zID0gW11cblxuZnVuY3Rpb24gc2hvd1NwZWNpZmljUHJvamVjdChwcm9qZWN0KSB7XG4gICAgLy8gZGlzcGxheUxpc3RPZlRvRG9zLmxlbmd0aCA9IDBcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGxpc3RPZlRvRG9zLmZpbHRlciggdG9kbyA9PiB7XG4gICAgICAgIHJldHVybiB0b2RvLnByb2plY3QgPT0gcHJvamVjdFxuICAgIH0pXG4gICAgcmV0dXJuIHByb2plY3RMaXN0XG59XG5cbmNvbnN0IGN1cnJlbnRQcm9qZWN0ID0gbGlzdE9mUHJvamVjdHNbMF1cblxuZXhwb3J0IHsgYWRkUHJvamVjdFRvTGlzdCwgcHJvamVjdEZhY3RvcnksIGxpc3RPZlByb2plY3RzLCBzaG93U3BlY2lmaWNQcm9qZWN0LCBjdXJyZW50UHJvamVjdCB9IiwiaW1wb3J0IHsgbGlzdE9mUHJvamVjdHMgfSBmcm9tICcuL3Byb2plY3RzLmpzJ1xuaW1wb3J0IHsgcHJvamVjdHNFbCB9IGZyb20gICcuL2VsZW1lbnRzLmpzJ1xuaW1wb3J0IHsgcmVuZGVyVGFza3MgfSBmcm9tICcuL3JlbmRlclRhc2tzLmpzJztcblxuZnVuY3Rpb24gc2hvd1Byb2plY3RzKCkge1xuICAgIHdoaWxlIChwcm9qZWN0c0VsLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgcHJvamVjdHNFbC5yZW1vdmVDaGlsZChwcm9qZWN0c0VsLmZpcnN0Q2hpbGQpO1xuICAgIH1cbmxpc3RPZlByb2plY3RzLmZvckVhY2gocHJvaiA9PiB7XG5cblxuICAgIGNvbnN0IHByb2pFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJylcbiAgICBwcm9qRWwuY2xhc3NMaXN0LmFkZChwcm9qLnRpdGxlLCdwcm9qZWN0TGlzdCcpXG4gICAgcHJvakVsLmlubmVyVGV4dCA9IHByb2oudGl0bGVcbiAgICBwcm9qZWN0c0VsLmFwcGVuZENoaWxkKHByb2pFbClcbiAgICBwcm9qRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLChlKSA9PiByZW5kZXJUYXNrcyhlLnRhcmdldC5jbGFzc0xpc3RbMF0pKVxuXG59KX1cblxuZXhwb3J0IHsgc2hvd1Byb2plY3RzIH0iLCIvLyBjb25zdCB7IHRhc2tDYW52YXMgfSA9IHJlcXVpcmUoXCIuL2VsZW1lbnRzXCIpO1xuLy8gY29uc3QgeyBzaG93U3BlY2lmaWNQcm9qZWN0LCBjdXJyZW50UHJvamVjdCB9ID0gcmVxdWlyZShcIi4vcHJvamVjdHNcIik7XG5cbmltcG9ydCB7IHRhc2tDYW52YXMgfSBmcm9tIFwiLi9lbGVtZW50cy5qc1wiXG5pbXBvcnQgeyBzaG93U3BlY2lmaWNQcm9qZWN0LCBjdXJyZW50UHJvamVjdCB9IGZyb20gJy4vcHJvamVjdHMuanMnXG5pbXBvcnQgeyBsaXN0T2ZUb0RvcywgcmVtb3ZlVGFza0Zyb21MaXN0IH0gZnJvbSBcIi4vdG9Eb09iamVjdC5qc1wiO1xuXG5mdW5jdGlvbiByZW5kZXJUYXNrcyhwcm9qZWN0KSB7XG4gICAgd2hpbGUgKHRhc2tDYW52YXMuZmlyc3RDaGlsZCkge1xuICAgICAgICB0YXNrQ2FudmFzLmZpcnN0Q2hpbGQucmVtb3ZlKCk7XG4gICAgfVxuXG5cbiAgICBjb25zdCB0YXNrcyA9IHByb2plY3QgPT09ICdBbGwnID8gbGlzdE9mVG9Eb3MgOiBzaG93U3BlY2lmaWNQcm9qZWN0KHByb2plY3QpXG5cblxuICAgIFxuICAgIHRhc2tzLmZvckVhY2goIHRhc2sgPT4ge1xuXG4gICAgICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2tzJylcbiAgICAgICAgdGFza0NhbnZhcy5hcHBlbmRDaGlsZCh0YXNrRGl2KVxuICAgICAgICBjb25zdCBpbmREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBpbmREaXYuY2xhc3NMaXN0LmFkZCgndGFzaycpXG4gICAgICAgIGluZERpdi5kYXRhc2V0LnRpdGxlID0gdGFzay50aXRsZVxuICAgICAgICBjb25zdCBjaGVja2JveERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGNoZWNrYm94RGl2LmNsYXNzTGlzdC5hZGQoJ2NoZWNrYm94JylcbiAgICAgICAgY29uc3QgZWRpdERlbGV0ZUJ1dHRvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGVkaXREZWxldGVCdXR0b25EaXYuY2xhc3NMaXN0LmFkZCgnZWRpdC1kZWxldGUnKVxuXG4gICAgICAgIGNvbnN0IHRhc2tDaGVja0JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICAgICAgdGFza0NoZWNrQm94LnR5cGUgPSAnY2hlY2tib3gnXG4gICAgICAgIHRhc2tDaGVja0JveC5pZCA9IHRhc2sudGl0bGVcbiAgICAgICAgdGFza0NoZWNrQm94Lm5hbWUgPSB0YXNrLmlkXG5cbiAgICAgICAgaWYgKHRhc2suaXNDb21wbGV0ZWQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGFza0NoZWNrQm94LmNoZWNrZWQgPSB0cnVlXG4gICAgICAgIH0gXG5cbiAgICAgICAgY29uc3QgdGFza0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKVxuICAgICAgICB0YXNrTGFiZWwuZm9yID0gdGFzay50aXRsZVxuICAgICAgICB0YXNrTGFiZWwuaW5uZXJUZXh0ID0gdGFzay50aXRsZVxuXG4gICAgICAgIGNoZWNrYm94RGl2LmFwcGVuZENoaWxkKHRhc2tDaGVja0JveClcbiAgICAgICAgY2hlY2tib3hEaXYuYXBwZW5kQ2hpbGQodGFza0xhYmVsKVxuICAgICAgICBcblxuICAgICAgICB0YXNrQ2hlY2tCb3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICB0YXNrLmlzQ29tcGxldGVkID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaXN0b2Z0b2RvcycsSlNPTi5zdHJpbmdpZnkobGlzdE9mVG9Eb3MpKVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhc2suaXNDb21wbGV0ZWQgPSBmYWxzZVxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaXN0b2Z0b2RvcycsSlNPTi5zdHJpbmdpZnkobGlzdE9mVG9Eb3MpKVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3QgZGF0ZSA9IHRhc2suZHVlRGF0ZVxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHRhc2suZGVzY3JpcHRpb25cbiAgICAgICAgY29uc3QgcHJpb3JpdHkgPSB0YXNrLnByaW9yaXR5XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSB0YXNrLnByb2plY3RcblxuICAgICAgICBjb25zdCBkYXRlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBjb25zdCBwcmlvcml0eURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGNvbnN0IHByb2plY3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gICAgICAgIGRhdGVEaXYuaW5uZXJUZXh0ID0gZGF0ZVxuICAgICAgICBkYXRlRGl2LmNsYXNzTGlzdC5hZGQoJ2RhdGUnKVxuICAgICAgICBkZXNjcmlwdGlvbkRpdi5pbm5lclRleHQgPSBkZXNjcmlwdGlvblxuICAgICAgICBkZXNjcmlwdGlvbkRpdi5jbGFzc0xpc3QuYWRkKCdkYXRlJylcbiAgICAgICAgcHJpb3JpdHlEaXYuaW5uZXJUZXh0ID0gcHJpb3JpdHlcbiAgICAgICAgcHJpb3JpdHlEaXYuY2xhc3NMaXN0LmFkZCgncHJpb3JpdHknKVxuICAgICAgICBwcm9qZWN0RGl2LmlubmVyVGV4dCA9IHByb2plY3RcbiAgICAgICAgcHJvamVjdERpdi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0JylcblxuICAgICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKGluZERpdilcbiAgICAgICAgaW5kRGl2LmFwcGVuZChjaGVja2JveERpdilcbiAgICAgICAgaW5kRGl2LmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uRGl2KVxuICAgICAgICBpbmREaXYuYXBwZW5kQ2hpbGQoZGF0ZURpdilcbiAgICAgICAgaW5kRGl2LmFwcGVuZENoaWxkKHByaW9yaXR5RGl2KVxuICAgICAgICBpbmREaXYuYXBwZW5kQ2hpbGQocHJvamVjdERpdilcblxuICAgICAgICBjb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIGVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMtb3V0bGluZWQnKVxuICAgICAgICBlZGl0QnV0dG9uLmlubmVyVGV4dCA9ICdlZGl0J1xuXG4gICAgICAgIGNvbnN0IHRyYXNoQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIHRyYXNoQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zLW91dGxpbmVkJylcbiAgICAgICAgdHJhc2hCdXR0b24uaW5uZXJUZXh0ID0gJ2RlbGV0ZSdcbiAgICAgICAgaW5kRGl2LmFwcGVuZENoaWxkKGVkaXREZWxldGVCdXR0b25EaXYpXG5cbiAgICAgICAgZWRpdERlbGV0ZUJ1dHRvbkRpdi5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKVxuICAgICAgICBlZGl0RGVsZXRlQnV0dG9uRGl2LmFwcGVuZENoaWxkKHRyYXNoQnV0dG9uKVxuXG4gICAgICAgIHRyYXNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0LnRpdGxlKVxuICAgICAgICAgICAgcmVtb3ZlVGFza0Zyb21MaXN0KGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0LnRpdGxlKVxuICAgICAgICAgICAgcmVuZGVyVGFza3MoKVxuICAgICAgICB9KVxuICAgICAgICBcblxuICAgICAgICBcbiAgICB9KSAgXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xpc3RvZnRvZG9zJyxKU09OLnN0cmluZ2lmeShsaXN0T2ZUb0RvcykpXG5cbn1cblxuXG5cblxuXG5cbmV4cG9ydCB7IHJlbmRlclRhc2tzIH1cbiIsImltcG9ydCB7IHRyaWdnZXIsIGNsb3NlQnV0dG9uLHRvZ2dsZU1vZGFsLG1vZGFsLG1vZGFsUHJvaix0cmlnZ2VyUHJvaixjbG9zZUJ1dHRvblByb2ogfSBmcm9tICcuL21vZGFsLmpzJ1xuaW1wb3J0IHsgYWRkUHJvamVjdFRvTGlzdCwgbGlzdE9mUHJvamVjdHMsIHByb2plY3RGYWN0b3J5IH0gZnJvbSAnLi9wcm9qZWN0cy5qcyc7XG5pbXBvcnQgeyBzaG93UHJvamVjdHMgfSBmcm9tICcuL3JlbmRlclByb2plY3RzLmpzJztcbmltcG9ydCB7IHJlbmRlclRhc2tzIH0gZnJvbSAnLi9yZW5kZXJUYXNrcy5qcyc7XG5cbmNvbnN0IHRvRG9MaXN0ID0gW107XG5cbmNvbnN0IGNvdW50ZXJDcmVhdG9yID0gKCkgPT4ge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJldHVybiBjb3VudCsrO1xuICAgIH07XG4gIH07XG5cbmNvbnN0IGNvdW50ZXIgPSBjb3VudGVyQ3JlYXRvcigpXG5cbmNvbnN0IHRvRG9GYWN0b3J5ID0gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QsIGlzQ29tcGxldGVkKSA9PiB7XG5cbiAgICBsZXQgaWQgPSBjb3VudGVyKClcblxuICAgIGlmIChwcm9qZWN0PT1cIlwiKSB7XG4gICAgICAgIHByb2plY3QgPSBcIkluYm94XCJcbiAgICB9XG5cbiAgICBsZXQgcHJvakV4aXN0cyA9IGZhbHNlO1xuICAgIGxpc3RPZlByb2plY3RzLmZvckVhY2goIHByb2ogPT4ge1xuICAgICAgICBpZiAocHJvai50aXRsZSA9PT0gcHJvamVjdCkge1xuICAgICAgICAgICAgcHJvakV4aXN0cyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKHByb2pFeGlzdHMgPT09IGZhbHNlKSB7XG4gICAgICAgIGxpc3RPZlByb2plY3RzLnB1c2gocHJvamVjdEZhY3RvcnkocHJvamVjdCxcIk5BXCIpKVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGlzdG9mcHJvamVjdHMnLEpTT04uc3RyaW5naWZ5KGxpc3RPZlByb2plY3RzKSlcblxuICAgICAgICBzaG93UHJvamVjdHMoKVxuICAgIH1cblxuICAgIHJldHVybiB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QsIGlzQ29tcGxldGVkLGlkIH1cbn1cblxuY29uc3QgbGlzdE9mVG9Eb3MgPSBbXVxuXG5mdW5jdGlvbiBhZGRUYXNrVG9MaXN0KCkge1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJylcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpXG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlJylcbiAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eScpXG4gICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0JylcbiAgICBsaXN0T2ZUb0Rvcy5wdXNoKHRvRG9GYWN0b3J5KHRpdGxlLnZhbHVlLGRlc2NyaXB0aW9uLnZhbHVlLGR1ZURhdGUudmFsdWUscHJpb3JpdHkudmFsdWUscHJvamVjdC52YWx1ZSxmYWxzZSkpXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xpc3RvZnRvZG9zJyxKU09OLnN0cmluZ2lmeShsaXN0T2ZUb0RvcykpXG5cbiAgICBsZXQgbmV3VG9nZ2xlID0gdG9nZ2xlTW9kYWwuYmluZCh0aGlzKVxuICAgIG5ld1RvZ2dsZSgpXG4gICAgbGV0IHNldFByb2plY3QgPSBwcm9qZWN0LnZhbHVlID09XCJcIiA/IFwiSW5ib3hcIiA6IHByb2plY3QudmFsdWVcblxuICAgIHJlbmRlclRhc2tzKHNldFByb2plY3QpXG4gICAgYWRkVGFzay5yZXNldCgpXG4gICAgXG5cblxufVxuXG5jb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZFRhc2snKVxuYWRkVGFzay5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLGFkZFRhc2tUb0xpc3QpXG5cblxuZnVuY3Rpb24gcmVtb3ZlVGFza0Zyb21MaXN0KHRpdGxlKSB7XG4gICAgbGV0IHRhc2tJbmRleCA9IGxpc3RPZlRvRG9zLmZpbmRJbmRleCh0YXNrID0+IHRhc2sudGl0bGUgPSB0aXRsZSlcbiAgICBsaXN0T2ZUb0Rvcy5zcGxpY2UodGFza0luZGV4LDEpXG4gICAgcmV0dXJuIGxpc3RPZlRvRG9zXG59XG5cblxuXG5cbmV4cG9ydCB7IHRvRG9GYWN0b3J5LCBsaXN0T2ZUb0RvcywgYWRkVGFzaywgcmVtb3ZlVGFza0Zyb21MaXN0fVxuXG5cbi8vIGNvbnN0IHRvZG8xID0gdG9Eb0ZhY3RvcnkoJ25pY2snLCduaWNrXFwncyBkZXNjcmlwdGlvbicsICcyMDIxLTA5LTA0JywxLCdpbmJveCcsZmFsc2UpIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBsaXN0T2ZUb0RvcywgYWRkVGFzaywgdG9Eb0ZhY3Rvcnl9IGZyb20gJy4vdG9Eb09iamVjdC5qcydcbmltcG9ydCB7IGFkZFByb2plY3RUb0xpc3QsIHByb2plY3RGYWN0b3J5LCBsaXN0T2ZQcm9qZWN0cywgc2hvd1NwZWNpZmljUHJvamVjdCwgY3VycmVudFByb2plY3QgfSBmcm9tICcuL3Byb2plY3RzLmpzJ1xuaW1wb3J0IHsgc2hvd1Byb2plY3RzIH0gZnJvbSAnLi9yZW5kZXJQcm9qZWN0cy5qcydcbmltcG9ydCB7IHJlbmRlclRhc2tzIH0gZnJvbSAnLi9yZW5kZXJUYXNrcy5qcydcblxuXG5pZiAobG9jYWxTdG9yYWdlLmxlbmd0aCA+IDEgKSB7XG5cbiAgICBsZXQgbG9jYWxUb2RvcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlWydsaXN0b2Z0b2RvcyddKVxuICAgIGxvY2FsVG9kb3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgbGlzdE9mVG9Eb3MucHVzaCh0YXNrKVxuICAgIH0pXG4gICAgbGV0IGxvY2FsUHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVsnbGlzdG9mcHJvamVjdHMnXSlcbiAgICBsb2NhbFByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgIGxpc3RPZlByb2plY3RzLnB1c2gocHJvamVjdClcbiAgICB9KVxuICAgIHNob3dQcm9qZWN0cygpXG4gICAgcmVuZGVyVGFza3MoXCJJbmJveFwiKVxuXG4gIH1cbiAgXG5cblxuc2hvd1Byb2plY3RzKClcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==