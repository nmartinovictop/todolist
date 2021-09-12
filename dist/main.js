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
    console.log(listOfToDos)
    let newToggle = _modal_js__WEBPACK_IMPORTED_MODULE_0__.toggleModal.bind(this)
    newToggle()
    let setProject = project.value =="" ? "Inbox" : project.value
    ;(0,_renderTasks_js__WEBPACK_IMPORTED_MODULE_3__.renderTasks)(setProject)
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
/* harmony import */ var _renderTasks_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderTasks.js */ "./src/renderTasks.js");








if (localStorage.length > 0 ) {

    let local = JSON.parse(localStorage['listoftodos'])
    // console.log(local)
    local.forEach(task => {
        _toDoObject_js__WEBPACK_IMPORTED_MODULE_0__.listOfToDos.push(task)
    })

    ;(0,_renderTasks_js__WEBPACK_IMPORTED_MODULE_3__.renderTasks)("Inbox")
    console.log(_toDoObject_js__WEBPACK_IMPORTED_MODULE_0__.listOfToDos)

  }
  


(0,_renderProjects_js__WEBPACK_IMPORTED_MODULE_2__.showProjects)()

// const project1 = document.querySelector('.project1')
// project1.addEventListener('click',() => {
//     console.log(showSpecificProject('bs'))
// })
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0NBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0JxRTtBQUNuQjtBQUNMOztBQUU3Qyx5QkFBeUIsYUFBYSxFQUFFLGVBQWU7OztBQUd2RDs7QUFFQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsdURBQWdCO0FBQ3BDO0FBQ0E7QUFDQSxJQUFJLGlFQUFZO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsOERBQWtCO0FBQzFDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZDOEM7QUFDSDs7QUFFM0M7QUFDQSxXQUFXLCtEQUFxQjtBQUNoQyxRQUFRLGdFQUFzQixDQUFDLCtEQUFxQjtBQUNwRDtBQUNBLGdFQUFzQjs7O0FBR3RCO0FBQ0E7QUFDQSxJQUFJLGdFQUFzQjs7QUFFMUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2RELFFBQVEsYUFBYSxFQUFFLG1CQUFPLENBQUMscUNBQVk7QUFDM0MsUUFBUSxzQ0FBc0MsRUFBRSxtQkFBTyxDQUFDLHFDQUFZOztBQUVwRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDs7Ozs7OztBQU9zQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakRtRjtBQUN4QjtBQUM5QjtBQUNKOztBQUUvQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSSxnRUFBc0I7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLFFBQVEsNkRBQW1CLENBQUMsNERBQWM7QUFDMUMsUUFBUSxpRUFBWTtBQUNwQjs7QUFFQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHVEQUFnQjtBQUNwQztBQUNBO0FBQ0EsSUFBSSw2REFBVztBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FBTzJDOzs7QUFHM0M7Ozs7OztVQ3JFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTnFEO0FBQ2dEO0FBQ25EO0FBQ0o7Ozs7O0FBSzlDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNERBQWdCO0FBQ3hCLEtBQUs7O0FBRUwsSUFBSSw2REFBVztBQUNmLGdCQUFnQix1REFBVzs7QUFFM0I7QUFDQTs7O0FBR0EsZ0VBQVk7O0FBRVo7QUFDQTtBQUNBO0FBQ0EsSUFBSSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvcmVuZGVyUHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvcmVuZGVyVGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdG9Eb09iamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHByb2plY3RzRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMnKVxuY29uc3QgdGFza0NhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWNhbnZhcycpXG5cblxuZXhwb3J0IHsgcHJvamVjdHNFbCx0YXNrQ2FudmFzIH0iLCJcblxuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vZGFsXCIpO1xuY29uc3QgdHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudHJpZ2dlclwiKTtcbmNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jbG9zZS1idXR0b25cIik7XG5jb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnN1Ym1pdC1idXR0b25cIilcblxuZnVuY3Rpb24gdG9nZ2xlTW9kYWwoKSB7XG5cbiAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ3RyaWdnZXInKSkge1xuICAgICAgICB0aGlzLm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKFwic2hvdy1tb2RhbFwiKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsXCIpKXtcbiAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcInNob3ctbW9kYWxcIilcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwic2hvdy1tb2RhbFwiKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gd2luZG93T25DbGljayhldmVudCkge1xuICAgIGlmIChldmVudC50YXJnZXQgPT09IG1vZGFsKSB7XG4gICAgICAgIHRvZ2dsZU1vZGFsKCk7XG4gICAgfVxufVxuXG50cmlnZ2VyLmZvckVhY2goYnRuID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlTW9kYWwpKTtcbmNsb3NlQnV0dG9uLmZvckVhY2goYnRuID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlTW9kYWwpKTtcbi8vIHN1Ym1pdEJ1dHRvbi5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdG9nZ2xlTW9kYWwpKVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB3aW5kb3dPbkNsaWNrKTtcblxuXG5cblxuZXhwb3J0IHsgdHJpZ2dlciwgY2xvc2VCdXR0b24sIHRvZ2dsZU1vZGFsLCBtb2RhbCxzdWJtaXRCdXR0b24gfSIsImltcG9ydCB7IHRyaWdnZXIsIGNsb3NlQnV0dG9uLCB0b2dnbGVNb2RhbCwgbW9kYWwgfSBmcm9tICcuL21vZGFsLmpzJ1xuaW1wb3J0IHsgc2hvd1Byb2plY3RzIH0gZnJvbSAnLi9yZW5kZXJQcm9qZWN0cy5qcydcbmltcG9ydCB7IGxpc3RPZlRvRG9zIH0gZnJvbSAnLi90b0RvT2JqZWN0LmpzJ1xuXG5jb25zdCBsaXN0T2ZQcm9qZWN0cyA9IFt7dGl0bGU6ICdBbGwnfSx7dGl0bGU6IFwiSW5ib3hcIn1dXG5cblxuY29uc3QgcHJvamVjdEZhY3RvcnkgPSAodGl0bGUsZGVzY3JpcHRpb24pID0+IHtcblxuICAgIHJldHVybiB7IHRpdGxlLCBkZXNjcmlwdGlvbiB9XG59XG5cbmZ1bmN0aW9uIGFkZFByb2plY3RUb0xpc3QoKSB7XG5cbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LXRpdGxlJylcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWRlc2NyaXB0aW9uJylcbiAgICBsaXN0T2ZQcm9qZWN0cy5wdXNoKHByb2plY3RGYWN0b3J5KHRpdGxlLnZhbHVlLGRlc2NyaXB0aW9uLnZhbHVlKSlcbiAgICBjb25zb2xlLmxvZyhsaXN0T2ZQcm9qZWN0cylcbiAgICBsZXQgbmV3VG9nZ2xlID0gdG9nZ2xlTW9kYWwuYmluZCh0aGlzKVxuICAgIG5ld1RvZ2dsZSgpXG4gICAgc3VibWl0LnJlc2V0KClcbiAgICBzaG93UHJvamVjdHMoKVxufVxuXG4vLyBjb25zdCBhZGRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZFByb2plY3QnKVxuLy8gYWRkUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLGFkZFByb2plY3RUb0xpc3QuYmluZChzdWJtaXRCdXR0b24pKVxuY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZFByb2plY3QnKVxuc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsYWRkUHJvamVjdFRvTGlzdClcblxuY29uc3QgZGlzcGxheUxpc3RPZlRvRG9zID0gW11cblxuZnVuY3Rpb24gc2hvd1NwZWNpZmljUHJvamVjdChwcm9qZWN0KSB7XG4gICAgLy8gZGlzcGxheUxpc3RPZlRvRG9zLmxlbmd0aCA9IDBcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGxpc3RPZlRvRG9zLmZpbHRlciggdG9kbyA9PiB7XG4gICAgICAgIHJldHVybiB0b2RvLnByb2plY3QgPT0gcHJvamVjdFxuICAgIH0pXG4gICAgcmV0dXJuIHByb2plY3RMaXN0XG59XG5cbmNvbnN0IGN1cnJlbnRQcm9qZWN0ID0gbGlzdE9mUHJvamVjdHNbMF1cblxuZXhwb3J0IHsgYWRkUHJvamVjdFRvTGlzdCwgcHJvamVjdEZhY3RvcnksIGxpc3RPZlByb2plY3RzLCBzaG93U3BlY2lmaWNQcm9qZWN0LCBjdXJyZW50UHJvamVjdCB9IiwiaW1wb3J0IHsgbGlzdE9mUHJvamVjdHMgfSBmcm9tICcuL3Byb2plY3RzLmpzJ1xuaW1wb3J0IHsgcHJvamVjdHNFbCB9IGZyb20gICcuL2VsZW1lbnRzLmpzJ1xuXG5mdW5jdGlvbiBzaG93UHJvamVjdHMoKSB7XG4gICAgd2hpbGUgKHByb2plY3RzRWwuZmlyc3RDaGlsZCkge1xuICAgICAgICBwcm9qZWN0c0VsLnJlbW92ZUNoaWxkKHByb2plY3RzRWwuZmlyc3RDaGlsZCk7XG4gICAgfVxubGlzdE9mUHJvamVjdHMuZm9yRWFjaChwcm9qID0+IHtcblxuXG4gICAgY29uc3QgcHJvakVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKVxuICAgIHByb2pFbC5pbm5lclRleHQgPSBwcm9qLnRpdGxlXG4gICAgcHJvamVjdHNFbC5hcHBlbmRDaGlsZChwcm9qRWwpXG5cbn0pfVxuXG5leHBvcnQgeyBzaG93UHJvamVjdHMgfSIsImNvbnN0IHsgdGFza0NhbnZhcyB9ID0gcmVxdWlyZShcIi4vZWxlbWVudHNcIik7XG5jb25zdCB7IHNob3dTcGVjaWZpY1Byb2plY3QsIGN1cnJlbnRQcm9qZWN0IH0gPSByZXF1aXJlKFwiLi9wcm9qZWN0c1wiKTtcblxuZnVuY3Rpb24gcmVuZGVyVGFza3MocHJvamVjdCkge1xuICAgIHdoaWxlICh0YXNrQ2FudmFzLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgdGFza0NhbnZhcy5maXJzdENoaWxkLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IHRhc2tzID0gc2hvd1NwZWNpZmljUHJvamVjdChwcm9qZWN0KVxuICAgIHRhc2tzLmZvckVhY2goIHRhc2sgPT4ge1xuXG4gICAgICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICB0YXNrQ2FudmFzLmFwcGVuZENoaWxkKHRhc2tEaXYpXG4gICAgICAgIGNvbnN0IHRhc2tDaGVja0JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICAgICAgdGFza0NoZWNrQm94LnR5cGUgPSAnY2hlY2tib3gnXG4gICAgICAgIHRhc2tDaGVja0JveC5pZCA9IHRhc2sudGl0bGVcbiAgICAgICAgdGFza0NoZWNrQm94Lm5hbWUgPSB0YXNrLmlkXG5cbiAgICAgICAgaWYgKHRhc2suaXNDb21wbGV0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRhc2tDaGVja0JveC5jaGVja2VkID0gdHJ1ZVxuICAgICAgICB9IFxuXG4gICAgICAgIGNvbnN0IHRhc2tMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJylcbiAgICAgICAgdGFza0xhYmVsLmZvciA9IHRhc2sudGl0bGVcbiAgICAgICAgdGFza0xhYmVsLmlubmVyVGV4dCA9IHRhc2sudGl0bGVcblxuICAgICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tDaGVja0JveClcbiAgICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrTGFiZWwpXG4gICAgICAgIFxuXG4gICAgICAgIHRhc2tDaGVja0JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldClcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgdGFzay5pc0NvbXBsZXRlZCA9IHRydWVcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0YXNrKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXNrLmlzQ29tcGxldGVkID0gZmFsc2VcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0YXNrKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICB9KSAgXG59XG5cblxuXG5cblxuXG5leHBvcnQgeyByZW5kZXJUYXNrcyB9XG4iLCJpbXBvcnQgeyB0cmlnZ2VyLCBjbG9zZUJ1dHRvbix0b2dnbGVNb2RhbCxtb2RhbCxtb2RhbFByb2osdHJpZ2dlclByb2osY2xvc2VCdXR0b25Qcm9qIH0gZnJvbSAnLi9tb2RhbC5qcydcbmltcG9ydCB7IGFkZFByb2plY3RUb0xpc3QsIGxpc3RPZlByb2plY3RzLCBwcm9qZWN0RmFjdG9yeSB9IGZyb20gJy4vcHJvamVjdHMuanMnO1xuaW1wb3J0IHsgc2hvd1Byb2plY3RzIH0gZnJvbSAnLi9yZW5kZXJQcm9qZWN0cy5qcyc7XG5pbXBvcnQgeyByZW5kZXJUYXNrcyB9IGZyb20gJy4vcmVuZGVyVGFza3MuanMnO1xuXG5jb25zdCB0b0RvTGlzdCA9IFtdO1xuXG5jb25zdCBjb3VudGVyQ3JlYXRvciA9ICgpID0+IHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByZXR1cm4gY291bnQrKztcbiAgICB9O1xuICB9O1xuXG5jb25zdCBjb3VudGVyID0gY291bnRlckNyZWF0b3IoKVxuXG5jb25zdCB0b0RvRmFjdG9yeSA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0LCBpc0NvbXBsZXRlZCkgPT4ge1xuXG4gICAgbGV0IGlkID0gY291bnRlcigpXG5cbiAgICBpZiAocHJvamVjdD09XCJcIikge1xuICAgICAgICBwcm9qZWN0ID0gXCJJbmJveFwiXG4gICAgfVxuXG4gICAgbGV0IHByb2pFeGlzdHMgPSBmYWxzZTtcbiAgICBsaXN0T2ZQcm9qZWN0cy5mb3JFYWNoKCBwcm9qID0+IHtcbiAgICAgICAgaWYgKHByb2oudGl0bGUgPT09IHByb2plY3QpIHtcbiAgICAgICAgICAgIHByb2pFeGlzdHMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSlcblxuICAgIGlmIChwcm9qRXhpc3RzID09PSBmYWxzZSkge1xuICAgICAgICBsaXN0T2ZQcm9qZWN0cy5wdXNoKHByb2plY3RGYWN0b3J5KHByb2plY3QsXCJOQVwiKSlcbiAgICAgICAgc2hvd1Byb2plY3RzKClcbiAgICB9XG5cbiAgICByZXR1cm4geyB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0LCBpc0NvbXBsZXRlZCxpZCB9XG59XG5cbmNvbnN0IGxpc3RPZlRvRG9zID0gW11cblxuZnVuY3Rpb24gYWRkVGFza1RvTGlzdCgpIHtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKVxuICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGF0ZScpXG4gICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpb3JpdHknKVxuICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdCcpXG4gICAgbGlzdE9mVG9Eb3MucHVzaCh0b0RvRmFjdG9yeSh0aXRsZS52YWx1ZSxkZXNjcmlwdGlvbi52YWx1ZSxkdWVEYXRlLnZhbHVlLHByaW9yaXR5LnZhbHVlLHByb2plY3QudmFsdWUsZmFsc2UpKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaXN0b2Z0b2RvcycsSlNPTi5zdHJpbmdpZnkobGlzdE9mVG9Eb3MpKVxuICAgIGNvbnNvbGUubG9nKGxpc3RPZlRvRG9zKVxuICAgIGxldCBuZXdUb2dnbGUgPSB0b2dnbGVNb2RhbC5iaW5kKHRoaXMpXG4gICAgbmV3VG9nZ2xlKClcbiAgICBsZXQgc2V0UHJvamVjdCA9IHByb2plY3QudmFsdWUgPT1cIlwiID8gXCJJbmJveFwiIDogcHJvamVjdC52YWx1ZVxuICAgIHJlbmRlclRhc2tzKHNldFByb2plY3QpXG4gICAgYWRkVGFzay5yZXNldCgpXG4gICAgXG59XG5cbmNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkVGFzaycpXG5hZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsYWRkVGFza1RvTGlzdClcblxuXG5cblxuXG5cbmV4cG9ydCB7IHRvRG9GYWN0b3J5LCBsaXN0T2ZUb0RvcywgYWRkVGFza31cblxuXG4vLyBjb25zdCB0b2RvMSA9IHRvRG9GYWN0b3J5KCduaWNrJywnbmlja1xcJ3MgZGVzY3JpcHRpb24nLCAnMjAyMS0wOS0wNCcsMSwnaW5ib3gnLGZhbHNlKSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgbGlzdE9mVG9Eb3MsIGFkZFRhc2t9IGZyb20gJy4vdG9Eb09iamVjdC5qcydcbmltcG9ydCB7IGFkZFByb2plY3RUb0xpc3QsIHByb2plY3RGYWN0b3J5LCBsaXN0T2ZQcm9qZWN0cywgc2hvd1NwZWNpZmljUHJvamVjdCB9IGZyb20gJy4vcHJvamVjdHMuanMnXG5pbXBvcnQgeyBzaG93UHJvamVjdHMgfSBmcm9tICcuL3JlbmRlclByb2plY3RzLmpzJ1xuaW1wb3J0IHsgcmVuZGVyVGFza3MgfSBmcm9tICcuL3JlbmRlclRhc2tzLmpzJ1xuXG5cblxuXG5pZiAobG9jYWxTdG9yYWdlLmxlbmd0aCA+IDAgKSB7XG5cbiAgICBsZXQgbG9jYWwgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVsnbGlzdG9mdG9kb3MnXSlcbiAgICAvLyBjb25zb2xlLmxvZyhsb2NhbClcbiAgICBsb2NhbC5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBsaXN0T2ZUb0Rvcy5wdXNoKHRhc2spXG4gICAgfSlcblxuICAgIHJlbmRlclRhc2tzKFwiSW5ib3hcIilcbiAgICBjb25zb2xlLmxvZyhsaXN0T2ZUb0RvcylcblxuICB9XG4gIFxuXG5cbnNob3dQcm9qZWN0cygpXG5cbi8vIGNvbnN0IHByb2plY3QxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QxJylcbi8vIHByb2plY3QxLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKSA9PiB7XG4vLyAgICAgY29uc29sZS5sb2coc2hvd1NwZWNpZmljUHJvamVjdCgnYnMnKSlcbi8vIH0pIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9