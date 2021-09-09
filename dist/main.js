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




const listOfProjects = [{title: 'All'},{title: "Inbox"}]


const projectFactory = (title,description) => {

    return { title, description }
}

function addProjectToList() {

    const title = document.querySelector('#project-title')
    const description = document.querySelector('#project-description')
    listOfProjects.push(projectFactory(title.value,description.value))
    console.log(listOfProjects)
    let newToggle = _modal_js__WEBPACK_IMPORTED_MODULE_0__.toggleModal.bind(this)
    newToggle()
    submit.reset()
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



function showProjects() {
    while (_elements_js__WEBPACK_IMPORTED_MODULE_1__.projectsEl.firstChild) {
        _elements_js__WEBPACK_IMPORTED_MODULE_1__.projectsEl.removeChild(_elements_js__WEBPACK_IMPORTED_MODULE_1__.projectsEl.firstChild);
    }
_projects_js__WEBPACK_IMPORTED_MODULE_0__.listOfProjects.forEach(proj => {


    const projEl = document.createElement('h3')
    projEl.innerText = proj.title
    _elements_js__WEBPACK_IMPORTED_MODULE_1__.projectsEl.appendChild(projEl)

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
const { taskCanvas } = __webpack_require__(/*! ./elements */ "./src/elements.js");
const { showSpecificProject, currentProject } = __webpack_require__(/*! ./projects */ "./src/projects.js");

function renderTasks(project) {
    while (taskCanvas.firstChild) {
        taskCanvas.firstChild.remove();
    }

    const tasks = showSpecificProject(project)
    tasks.forEach( task => {

        const taskDiv = document.createElement('div')
        taskCanvas.appendChild(taskDiv)
        const taskCheckBox = document.createElement('input')
        taskCheckBox.type = 'checkbox'
        taskCheckBox.id = task.title
        taskCheckBox.name = task.id

        if (task.isCompleted === true) {
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
/* harmony export */   "addTask": () => (/* binding */ addTask)
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
    let projExists = false;
    _projects_js__WEBPACK_IMPORTED_MODULE_1__.listOfProjects.forEach( proj => {
        if (proj.title === project) {
            projExists = true;
        }
    })

    if (projExists === false) {
        _projects_js__WEBPACK_IMPORTED_MODULE_1__.listOfProjects.push((0,_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectFactory)(project,"NA"))
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
    console.log(listOfToDos)
    let newToggle = _modal_js__WEBPACK_IMPORTED_MODULE_0__.toggleModal.bind(this)
    newToggle()
    ;(0,_renderTasks_js__WEBPACK_IMPORTED_MODULE_3__.renderTasks)(project.value)
    addTask.reset()
    
}

const addTask = document.querySelector('.addTask')
addTask.addEventListener('submit',addTaskToList)









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





(0,_renderProjects_js__WEBPACK_IMPORTED_MODULE_2__.showProjects)()






// const project1 = document.querySelector('.project1')
// project1.addEventListener('click',() => {
//     console.log(showSpecificProject('bs'))
// })
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0NBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0JxRTtBQUNuQjtBQUNMOztBQUU3Qyx5QkFBeUIsYUFBYSxFQUFFLGVBQWU7OztBQUd2RDs7QUFFQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsdURBQWdCO0FBQ3BDO0FBQ0E7QUFDQSxJQUFJLGlFQUFZO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsOERBQWtCO0FBQzFDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZDOEM7QUFDSDs7QUFFM0M7QUFDQSxXQUFXLCtEQUFxQjtBQUNoQyxRQUFRLGdFQUFzQixDQUFDLCtEQUFxQjtBQUNwRDtBQUNBLGdFQUFzQjs7O0FBR3RCO0FBQ0E7QUFDQSxJQUFJLGdFQUFzQjs7QUFFMUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2RELFFBQVEsYUFBYSxFQUFFLG1CQUFPLENBQUMscUNBQVk7QUFDM0MsUUFBUSxzQ0FBc0MsRUFBRSxtQkFBTyxDQUFDLHFDQUFZOztBQUVwRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDs7Ozs7OztBQU9zQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakRtRjtBQUN4QjtBQUM5QjtBQUNKOztBQUUvQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLElBQUksZ0VBQXNCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxRQUFRLDZEQUFtQixDQUFDLDREQUFjO0FBQzFDLFFBQVEsaUVBQVk7QUFDcEI7O0FBRUEsYUFBYTtBQUNiOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsdURBQWdCO0FBQ3BDO0FBQ0EsSUFBSSw2REFBVztBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FBTzJDOzs7QUFHM0M7Ozs7OztVQzlEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOcUQ7QUFDZ0Q7QUFDbkQ7OztBQUdsRCxnRUFBWTs7Ozs7OztBQU9aO0FBQ0E7QUFDQTtBQUNBLElBQUksQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2VsZW1lbnRzLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL21vZGFsLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3JlbmRlclByb2plY3RzLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3JlbmRlclRhc2tzLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3RvRG9PYmplY3QuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBwcm9qZWN0c0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzJylcbmNvbnN0IHRhc2tDYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1jYW52YXMnKVxuXG5cbmV4cG9ydCB7IHByb2plY3RzRWwsdGFza0NhbnZhcyB9IiwiXG5cbmNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tb2RhbFwiKTtcbmNvbnN0IHRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRyaWdnZXJcIik7XG5jb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2xvc2UtYnV0dG9uXCIpO1xuY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zdWJtaXQtYnV0dG9uXCIpXG5cbmZ1bmN0aW9uIHRvZ2dsZU1vZGFsKCkge1xuXG4gICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCd0cmlnZ2VyJykpIHtcbiAgICAgICAgdGhpcy5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZShcInNob3ctbW9kYWxcIik7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbFwiKSl7XG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJzaG93LW1vZGFsXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcInNob3ctbW9kYWxcIilcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHdpbmRvd09uQ2xpY2soZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBtb2RhbCkge1xuICAgICAgICB0b2dnbGVNb2RhbCgpO1xuICAgIH1cbn1cblxudHJpZ2dlci5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZU1vZGFsKSk7XG5jbG9zZUJ1dHRvbi5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZU1vZGFsKSk7XG4vLyBzdWJtaXRCdXR0b24uZm9yRWFjaChidG4gPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRvZ2dsZU1vZGFsKSlcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgd2luZG93T25DbGljayk7XG5cblxuXG5cbmV4cG9ydCB7IHRyaWdnZXIsIGNsb3NlQnV0dG9uLCB0b2dnbGVNb2RhbCwgbW9kYWwsc3VibWl0QnV0dG9uIH0iLCJpbXBvcnQgeyB0cmlnZ2VyLCBjbG9zZUJ1dHRvbiwgdG9nZ2xlTW9kYWwsIG1vZGFsIH0gZnJvbSAnLi9tb2RhbC5qcydcbmltcG9ydCB7IHNob3dQcm9qZWN0cyB9IGZyb20gJy4vcmVuZGVyUHJvamVjdHMuanMnXG5pbXBvcnQgeyBsaXN0T2ZUb0RvcyB9IGZyb20gJy4vdG9Eb09iamVjdC5qcydcblxuY29uc3QgbGlzdE9mUHJvamVjdHMgPSBbe3RpdGxlOiAnQWxsJ30se3RpdGxlOiBcIkluYm94XCJ9XVxuXG5cbmNvbnN0IHByb2plY3RGYWN0b3J5ID0gKHRpdGxlLGRlc2NyaXB0aW9uKSA9PiB7XG5cbiAgICByZXR1cm4geyB0aXRsZSwgZGVzY3JpcHRpb24gfVxufVxuXG5mdW5jdGlvbiBhZGRQcm9qZWN0VG9MaXN0KCkge1xuXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC10aXRsZScpXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1kZXNjcmlwdGlvbicpXG4gICAgbGlzdE9mUHJvamVjdHMucHVzaChwcm9qZWN0RmFjdG9yeSh0aXRsZS52YWx1ZSxkZXNjcmlwdGlvbi52YWx1ZSkpXG4gICAgY29uc29sZS5sb2cobGlzdE9mUHJvamVjdHMpXG4gICAgbGV0IG5ld1RvZ2dsZSA9IHRvZ2dsZU1vZGFsLmJpbmQodGhpcylcbiAgICBuZXdUb2dnbGUoKVxuICAgIHN1Ym1pdC5yZXNldCgpXG4gICAgc2hvd1Byb2plY3RzKClcbn1cblxuLy8gY29uc3QgYWRkUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRQcm9qZWN0Jylcbi8vIGFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JyxhZGRQcm9qZWN0VG9MaXN0LmJpbmQoc3VibWl0QnV0dG9uKSlcbmNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRQcm9qZWN0JylcbnN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLGFkZFByb2plY3RUb0xpc3QpXG5cbmNvbnN0IGRpc3BsYXlMaXN0T2ZUb0RvcyA9IFtdXG5cbmZ1bmN0aW9uIHNob3dTcGVjaWZpY1Byb2plY3QocHJvamVjdCkge1xuICAgIC8vIGRpc3BsYXlMaXN0T2ZUb0Rvcy5sZW5ndGggPSAwXG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBsaXN0T2ZUb0Rvcy5maWx0ZXIoIHRvZG8gPT4ge1xuICAgICAgICByZXR1cm4gdG9kby5wcm9qZWN0ID09IHByb2plY3RcbiAgICB9KVxuICAgIHJldHVybiBwcm9qZWN0TGlzdFxufVxuXG5jb25zdCBjdXJyZW50UHJvamVjdCA9IGxpc3RPZlByb2plY3RzWzBdXG5cbmV4cG9ydCB7IGFkZFByb2plY3RUb0xpc3QsIHByb2plY3RGYWN0b3J5LCBsaXN0T2ZQcm9qZWN0cywgc2hvd1NwZWNpZmljUHJvamVjdCwgY3VycmVudFByb2plY3QgfSIsImltcG9ydCB7IGxpc3RPZlByb2plY3RzIH0gZnJvbSAnLi9wcm9qZWN0cy5qcydcbmltcG9ydCB7IHByb2plY3RzRWwgfSBmcm9tICAnLi9lbGVtZW50cy5qcydcblxuZnVuY3Rpb24gc2hvd1Byb2plY3RzKCkge1xuICAgIHdoaWxlIChwcm9qZWN0c0VsLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgcHJvamVjdHNFbC5yZW1vdmVDaGlsZChwcm9qZWN0c0VsLmZpcnN0Q2hpbGQpO1xuICAgIH1cbmxpc3RPZlByb2plY3RzLmZvckVhY2gocHJvaiA9PiB7XG5cblxuICAgIGNvbnN0IHByb2pFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJylcbiAgICBwcm9qRWwuaW5uZXJUZXh0ID0gcHJvai50aXRsZVxuICAgIHByb2plY3RzRWwuYXBwZW5kQ2hpbGQocHJvakVsKVxuXG59KX1cblxuZXhwb3J0IHsgc2hvd1Byb2plY3RzIH0iLCJjb25zdCB7IHRhc2tDYW52YXMgfSA9IHJlcXVpcmUoXCIuL2VsZW1lbnRzXCIpO1xuY29uc3QgeyBzaG93U3BlY2lmaWNQcm9qZWN0LCBjdXJyZW50UHJvamVjdCB9ID0gcmVxdWlyZShcIi4vcHJvamVjdHNcIik7XG5cbmZ1bmN0aW9uIHJlbmRlclRhc2tzKHByb2plY3QpIHtcbiAgICB3aGlsZSAodGFza0NhbnZhcy5maXJzdENoaWxkKSB7XG4gICAgICAgIHRhc2tDYW52YXMuZmlyc3RDaGlsZC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBjb25zdCB0YXNrcyA9IHNob3dTcGVjaWZpY1Byb2plY3QocHJvamVjdClcbiAgICB0YXNrcy5mb3JFYWNoKCB0YXNrID0+IHtcblxuICAgICAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgdGFza0NhbnZhcy5hcHBlbmRDaGlsZCh0YXNrRGl2KVxuICAgICAgICBjb25zdCB0YXNrQ2hlY2tCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgICAgIHRhc2tDaGVja0JveC50eXBlID0gJ2NoZWNrYm94J1xuICAgICAgICB0YXNrQ2hlY2tCb3guaWQgPSB0YXNrLnRpdGxlXG4gICAgICAgIHRhc2tDaGVja0JveC5uYW1lID0gdGFzay5pZFxuXG4gICAgICAgIGlmICh0YXNrLmlzQ29tcGxldGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0YXNrQ2hlY2tCb3guY2hlY2tlZCA9IHRydWVcbiAgICAgICAgfSBcblxuICAgICAgICBjb25zdCB0YXNrTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpXG4gICAgICAgIHRhc2tMYWJlbC5mb3IgPSB0YXNrLnRpdGxlXG4gICAgICAgIHRhc2tMYWJlbC5pbm5lclRleHQgPSB0YXNrLnRpdGxlXG5cbiAgICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrQ2hlY2tCb3gpXG4gICAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0xhYmVsKVxuICAgICAgICBcblxuICAgICAgICB0YXNrQ2hlY2tCb3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQpXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIHRhc2suaXNDb21wbGV0ZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGFzaylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFzay5pc0NvbXBsZXRlZCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGFzaylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgfSkgIFxufVxuXG5cblxuXG5cblxuZXhwb3J0IHsgcmVuZGVyVGFza3MgfVxuIiwiaW1wb3J0IHsgdHJpZ2dlciwgY2xvc2VCdXR0b24sdG9nZ2xlTW9kYWwsbW9kYWwsbW9kYWxQcm9qLHRyaWdnZXJQcm9qLGNsb3NlQnV0dG9uUHJvaiB9IGZyb20gJy4vbW9kYWwuanMnXG5pbXBvcnQgeyBhZGRQcm9qZWN0VG9MaXN0LCBsaXN0T2ZQcm9qZWN0cywgcHJvamVjdEZhY3RvcnkgfSBmcm9tICcuL3Byb2plY3RzLmpzJztcbmltcG9ydCB7IHNob3dQcm9qZWN0cyB9IGZyb20gJy4vcmVuZGVyUHJvamVjdHMuanMnO1xuaW1wb3J0IHsgcmVuZGVyVGFza3MgfSBmcm9tICcuL3JlbmRlclRhc2tzLmpzJztcblxuY29uc3QgdG9Eb0xpc3QgPSBbXTtcblxuY29uc3QgY291bnRlckNyZWF0b3IgPSAoKSA9PiB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcmV0dXJuIGNvdW50Kys7XG4gICAgfTtcbiAgfTtcblxuY29uc3QgY291bnRlciA9IGNvdW50ZXJDcmVhdG9yKClcblxuY29uc3QgdG9Eb0ZhY3RvcnkgPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCwgaXNDb21wbGV0ZWQpID0+IHtcblxuICAgIGxldCBpZCA9IGNvdW50ZXIoKVxuICAgIGxldCBwcm9qRXhpc3RzID0gZmFsc2U7XG4gICAgbGlzdE9mUHJvamVjdHMuZm9yRWFjaCggcHJvaiA9PiB7XG4gICAgICAgIGlmIChwcm9qLnRpdGxlID09PSBwcm9qZWN0KSB7XG4gICAgICAgICAgICBwcm9qRXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAocHJvakV4aXN0cyA9PT0gZmFsc2UpIHtcbiAgICAgICAgbGlzdE9mUHJvamVjdHMucHVzaChwcm9qZWN0RmFjdG9yeShwcm9qZWN0LFwiTkFcIikpXG4gICAgICAgIHNob3dQcm9qZWN0cygpXG4gICAgfVxuXG4gICAgcmV0dXJuIHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCwgaXNDb21wbGV0ZWQsaWQgfVxufVxuXG5jb25zdCBsaXN0T2ZUb0RvcyA9IFtdXG5cbmZ1bmN0aW9uIGFkZFRhc2tUb0xpc3QoKSB7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGl0bGUnKVxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJylcbiAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RhdGUnKVxuICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaW9yaXR5JylcbiAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QnKVxuICAgIGxpc3RPZlRvRG9zLnB1c2godG9Eb0ZhY3RvcnkodGl0bGUudmFsdWUsZGVzY3JpcHRpb24udmFsdWUsZHVlRGF0ZS52YWx1ZSxwcmlvcml0eS52YWx1ZSxwcm9qZWN0LnZhbHVlLGZhbHNlKSlcbiAgICBjb25zb2xlLmxvZyhsaXN0T2ZUb0RvcylcbiAgICBsZXQgbmV3VG9nZ2xlID0gdG9nZ2xlTW9kYWwuYmluZCh0aGlzKVxuICAgIG5ld1RvZ2dsZSgpXG4gICAgcmVuZGVyVGFza3MocHJvamVjdC52YWx1ZSlcbiAgICBhZGRUYXNrLnJlc2V0KClcbiAgICBcbn1cblxuY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRUYXNrJylcbmFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JyxhZGRUYXNrVG9MaXN0KVxuXG5cblxuXG5cblxuZXhwb3J0IHsgdG9Eb0ZhY3RvcnksIGxpc3RPZlRvRG9zLCBhZGRUYXNrfVxuXG5cbi8vIGNvbnN0IHRvZG8xID0gdG9Eb0ZhY3RvcnkoJ25pY2snLCduaWNrXFwncyBkZXNjcmlwdGlvbicsICcyMDIxLTA5LTA0JywxLCdpbmJveCcsZmFsc2UpIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBsaXN0T2ZUb0RvcywgYWRkVGFza30gZnJvbSAnLi90b0RvT2JqZWN0LmpzJ1xuaW1wb3J0IHsgYWRkUHJvamVjdFRvTGlzdCwgcHJvamVjdEZhY3RvcnksIGxpc3RPZlByb2plY3RzLCBzaG93U3BlY2lmaWNQcm9qZWN0IH0gZnJvbSAnLi9wcm9qZWN0cy5qcydcbmltcG9ydCB7IHNob3dQcm9qZWN0cyB9IGZyb20gJy4vcmVuZGVyUHJvamVjdHMuanMnXG5cblxuc2hvd1Byb2plY3RzKClcblxuXG5cblxuXG5cbi8vIGNvbnN0IHByb2plY3QxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QxJylcbi8vIHByb2plY3QxLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKSA9PiB7XG4vLyAgICAgY29uc29sZS5sb2coc2hvd1NwZWNpZmljUHJvamVjdCgnYnMnKSlcbi8vIH0pIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9