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
        const checkboxDiv = document.createElement('div')
        checkboxDiv.classList.add('checkbox')

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
            } else {
                task.isCompleted = false
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
        
    })  
    localStorage.setItem('listoftodos',JSON.stringify(_toDoObject_js__WEBPACK_IMPORTED_MODULE_2__.listOfToDos))

}








{/* <div class='task-canvas2'>
            <div class="tasks">
                <div class='task'>
                    <div class='checkbox'><input type="checkbox" id="mariners" name="0"><label>fake task</label></div>
                    <div class='date'>2021-01-01</div>
                    <div class='priority'>2</div>
                    <div class='project'>inbox</div>
                </div>
            </div>
        </div> */}


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTmtFO0FBQ21EO0FBQ25FO0FBQ0o7OztBQUc5Qzs7QUFFQTtBQUNBO0FBQ0EsUUFBUSw0REFBZ0I7QUFDeEIsS0FBSztBQUNMO0FBQ0E7QUFDQSxRQUFRLDZEQUFtQjtBQUMzQixLQUFLO0FBQ0wsSUFBSSxpRUFBWTtBQUNoQixJQUFJLDZEQUFXOztBQUVmO0FBQ0E7OztBQUdBLGdFQUFZIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvcmVuZGVyUHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvcmVuZGVyVGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdG9Eb09iamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHByb2plY3RzRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMnKVxuY29uc3QgdGFza0NhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWNhbnZhcycpXG5cblxuZXhwb3J0IHsgcHJvamVjdHNFbCx0YXNrQ2FudmFzIH0iLCJcblxuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vZGFsXCIpO1xuY29uc3QgdHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudHJpZ2dlclwiKTtcbmNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jbG9zZS1idXR0b25cIik7XG5jb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnN1Ym1pdC1idXR0b25cIilcblxuZnVuY3Rpb24gdG9nZ2xlTW9kYWwoKSB7XG5cbiAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ3RyaWdnZXInKSkge1xuICAgICAgICB0aGlzLm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKFwic2hvdy1tb2RhbFwiKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsXCIpKXtcbiAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcInNob3ctbW9kYWxcIilcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwic2hvdy1tb2RhbFwiKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gd2luZG93T25DbGljayhldmVudCkge1xuICAgIGlmIChldmVudC50YXJnZXQgPT09IG1vZGFsKSB7XG4gICAgICAgIHRvZ2dsZU1vZGFsKCk7XG4gICAgfVxufVxuXG50cmlnZ2VyLmZvckVhY2goYnRuID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlTW9kYWwpKTtcbmNsb3NlQnV0dG9uLmZvckVhY2goYnRuID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlTW9kYWwpKTtcbi8vIHN1Ym1pdEJ1dHRvbi5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdG9nZ2xlTW9kYWwpKVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB3aW5kb3dPbkNsaWNrKTtcblxuXG5cblxuZXhwb3J0IHsgdHJpZ2dlciwgY2xvc2VCdXR0b24sIHRvZ2dsZU1vZGFsLCBtb2RhbCxzdWJtaXRCdXR0b24gfSIsImltcG9ydCB7IHRyaWdnZXIsIGNsb3NlQnV0dG9uLCB0b2dnbGVNb2RhbCwgbW9kYWwgfSBmcm9tICcuL21vZGFsLmpzJ1xuaW1wb3J0IHsgc2hvd1Byb2plY3RzIH0gZnJvbSAnLi9yZW5kZXJQcm9qZWN0cy5qcydcbmltcG9ydCB7IGxpc3RPZlRvRG9zIH0gZnJvbSAnLi90b0RvT2JqZWN0LmpzJ1xuXG5jb25zdCBsaXN0T2ZQcm9qZWN0cyA9IFtdXG5cbmlmIChsb2NhbFN0b3JhZ2UubGVuZ3RoID09IDApIHtcblxubGV0IGFkZFByb2plY3RzID0gW3t0aXRsZTogJ0FsbCd9LHt0aXRsZTogXCJJbmJveFwifV1cbmFkZFByb2plY3RzLmZvckVhY2gocHJvaiA9PiBsaXN0T2ZQcm9qZWN0cy5wdXNoKHByb2opKVxubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xpc3RvZnByb2plY3RzJyxKU09OLnN0cmluZ2lmeShsaXN0T2ZQcm9qZWN0cykpXG59XG5cbmNvbnN0IHByb2plY3RGYWN0b3J5ID0gKHRpdGxlLGRlc2NyaXB0aW9uKSA9PiB7XG5cbiAgICByZXR1cm4geyB0aXRsZSwgZGVzY3JpcHRpb24gfVxufVxuXG5mdW5jdGlvbiBhZGRQcm9qZWN0VG9MaXN0KCkge1xuXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC10aXRsZScpXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1kZXNjcmlwdGlvbicpXG4gICAgbGlzdE9mUHJvamVjdHMucHVzaChwcm9qZWN0RmFjdG9yeSh0aXRsZS52YWx1ZSxkZXNjcmlwdGlvbi52YWx1ZSkpXG4gICAgbGV0IG5ld1RvZ2dsZSA9IHRvZ2dsZU1vZGFsLmJpbmQodGhpcylcbiAgICBuZXdUb2dnbGUoKVxuICAgIHN1Ym1pdC5yZXNldCgpXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xpc3RvZnByb2plY3RzJyxKU09OLnN0cmluZ2lmeShsaXN0T2ZQcm9qZWN0cykpXG5cbiAgICBzaG93UHJvamVjdHMoKVxuXG59XG5cbi8vIGNvbnN0IGFkZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkUHJvamVjdCcpXG4vLyBhZGRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsYWRkUHJvamVjdFRvTGlzdC5iaW5kKHN1Ym1pdEJ1dHRvbikpXG5jb25zdCBzdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkUHJvamVjdCcpXG5zdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JyxhZGRQcm9qZWN0VG9MaXN0KVxuXG5jb25zdCBkaXNwbGF5TGlzdE9mVG9Eb3MgPSBbXVxuXG5mdW5jdGlvbiBzaG93U3BlY2lmaWNQcm9qZWN0KHByb2plY3QpIHtcbiAgICAvLyBkaXNwbGF5TGlzdE9mVG9Eb3MubGVuZ3RoID0gMFxuICAgIGNvbnN0IHByb2plY3RMaXN0ID0gbGlzdE9mVG9Eb3MuZmlsdGVyKCB0b2RvID0+IHtcbiAgICAgICAgcmV0dXJuIHRvZG8ucHJvamVjdCA9PSBwcm9qZWN0XG4gICAgfSlcbiAgICByZXR1cm4gcHJvamVjdExpc3Rcbn1cblxuY29uc3QgY3VycmVudFByb2plY3QgPSBsaXN0T2ZQcm9qZWN0c1swXVxuXG5leHBvcnQgeyBhZGRQcm9qZWN0VG9MaXN0LCBwcm9qZWN0RmFjdG9yeSwgbGlzdE9mUHJvamVjdHMsIHNob3dTcGVjaWZpY1Byb2plY3QsIGN1cnJlbnRQcm9qZWN0IH0iLCJpbXBvcnQgeyBsaXN0T2ZQcm9qZWN0cyB9IGZyb20gJy4vcHJvamVjdHMuanMnXG5pbXBvcnQgeyBwcm9qZWN0c0VsIH0gZnJvbSAgJy4vZWxlbWVudHMuanMnXG5pbXBvcnQgeyByZW5kZXJUYXNrcyB9IGZyb20gJy4vcmVuZGVyVGFza3MuanMnO1xuXG5mdW5jdGlvbiBzaG93UHJvamVjdHMoKSB7XG4gICAgd2hpbGUgKHByb2plY3RzRWwuZmlyc3RDaGlsZCkge1xuICAgICAgICBwcm9qZWN0c0VsLnJlbW92ZUNoaWxkKHByb2plY3RzRWwuZmlyc3RDaGlsZCk7XG4gICAgfVxubGlzdE9mUHJvamVjdHMuZm9yRWFjaChwcm9qID0+IHtcblxuXG4gICAgY29uc3QgcHJvakVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKVxuICAgIHByb2pFbC5jbGFzc0xpc3QuYWRkKHByb2oudGl0bGUsJ3Byb2plY3RMaXN0JylcbiAgICBwcm9qRWwuaW5uZXJUZXh0ID0gcHJvai50aXRsZVxuICAgIHByb2plY3RzRWwuYXBwZW5kQ2hpbGQocHJvakVsKVxuICAgIHByb2pFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKGUpID0+IHJlbmRlclRhc2tzKGUudGFyZ2V0LmNsYXNzTGlzdFswXSkpXG5cbn0pfVxuXG5leHBvcnQgeyBzaG93UHJvamVjdHMgfSIsIi8vIGNvbnN0IHsgdGFza0NhbnZhcyB9ID0gcmVxdWlyZShcIi4vZWxlbWVudHNcIik7XG4vLyBjb25zdCB7IHNob3dTcGVjaWZpY1Byb2plY3QsIGN1cnJlbnRQcm9qZWN0IH0gPSByZXF1aXJlKFwiLi9wcm9qZWN0c1wiKTtcblxuaW1wb3J0IHsgdGFza0NhbnZhcyB9IGZyb20gXCIuL2VsZW1lbnRzLmpzXCJcbmltcG9ydCB7IHNob3dTcGVjaWZpY1Byb2plY3QsIGN1cnJlbnRQcm9qZWN0IH0gZnJvbSAnLi9wcm9qZWN0cy5qcydcbmltcG9ydCB7IGxpc3RPZlRvRG9zIH0gZnJvbSBcIi4vdG9Eb09iamVjdC5qc1wiO1xuXG5mdW5jdGlvbiByZW5kZXJUYXNrcyhwcm9qZWN0KSB7XG4gICAgd2hpbGUgKHRhc2tDYW52YXMuZmlyc3RDaGlsZCkge1xuICAgICAgICB0YXNrQ2FudmFzLmZpcnN0Q2hpbGQucmVtb3ZlKCk7XG4gICAgfVxuXG5cbiAgICBjb25zdCB0YXNrcyA9IHByb2plY3QgPT09ICdBbGwnID8gbGlzdE9mVG9Eb3MgOiBzaG93U3BlY2lmaWNQcm9qZWN0KHByb2plY3QpXG5cblxuICAgIFxuICAgIHRhc2tzLmZvckVhY2goIHRhc2sgPT4ge1xuXG4gICAgICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2tzJylcbiAgICAgICAgdGFza0NhbnZhcy5hcHBlbmRDaGlsZCh0YXNrRGl2KVxuICAgICAgICBjb25zdCBpbmREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBpbmREaXYuY2xhc3NMaXN0LmFkZCgndGFzaycpXG4gICAgICAgIGNvbnN0IGNoZWNrYm94RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgY2hlY2tib3hEaXYuY2xhc3NMaXN0LmFkZCgnY2hlY2tib3gnKVxuXG4gICAgICAgIGNvbnN0IHRhc2tDaGVja0JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICAgICAgdGFza0NoZWNrQm94LnR5cGUgPSAnY2hlY2tib3gnXG4gICAgICAgIHRhc2tDaGVja0JveC5pZCA9IHRhc2sudGl0bGVcbiAgICAgICAgdGFza0NoZWNrQm94Lm5hbWUgPSB0YXNrLmlkXG5cbiAgICAgICAgaWYgKHRhc2suaXNDb21wbGV0ZWQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGFza0NoZWNrQm94LmNoZWNrZWQgPSB0cnVlXG4gICAgICAgIH0gXG5cbiAgICAgICAgY29uc3QgdGFza0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKVxuICAgICAgICB0YXNrTGFiZWwuZm9yID0gdGFzay50aXRsZVxuICAgICAgICB0YXNrTGFiZWwuaW5uZXJUZXh0ID0gdGFzay50aXRsZVxuXG4gICAgICAgIGNoZWNrYm94RGl2LmFwcGVuZENoaWxkKHRhc2tDaGVja0JveClcbiAgICAgICAgY2hlY2tib3hEaXYuYXBwZW5kQ2hpbGQodGFza0xhYmVsKVxuICAgICAgICBcblxuICAgICAgICB0YXNrQ2hlY2tCb3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICB0YXNrLmlzQ29tcGxldGVkID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXNrLmlzQ29tcGxldGVkID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBkYXRlID0gdGFzay5kdWVEYXRlXG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gdGFzay5kZXNjcmlwdGlvblxuICAgICAgICBjb25zdCBwcmlvcml0eSA9IHRhc2sucHJpb3JpdHlcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IHRhc2sucHJvamVjdFxuXG4gICAgICAgIGNvbnN0IGRhdGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGNvbnN0IHByaW9yaXR5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgY29uc3QgcHJvamVjdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgICAgICAgZGF0ZURpdi5pbm5lclRleHQgPSBkYXRlXG4gICAgICAgIGRhdGVEaXYuY2xhc3NMaXN0LmFkZCgnZGF0ZScpXG4gICAgICAgIGRlc2NyaXB0aW9uRGl2LmlubmVyVGV4dCA9IGRlc2NyaXB0aW9uXG4gICAgICAgIGRlc2NyaXB0aW9uRGl2LmNsYXNzTGlzdC5hZGQoJ2RhdGUnKVxuICAgICAgICBwcmlvcml0eURpdi5pbm5lclRleHQgPSBwcmlvcml0eVxuICAgICAgICBwcmlvcml0eURpdi5jbGFzc0xpc3QuYWRkKCdwcmlvcml0eScpXG4gICAgICAgIHByb2plY3REaXYuaW5uZXJUZXh0ID0gcHJvamVjdFxuICAgICAgICBwcm9qZWN0RGl2LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QnKVxuXG4gICAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQoaW5kRGl2KVxuICAgICAgICBpbmREaXYuYXBwZW5kKGNoZWNrYm94RGl2KVxuICAgICAgICBpbmREaXYuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25EaXYpXG4gICAgICAgIGluZERpdi5hcHBlbmRDaGlsZChkYXRlRGl2KVxuICAgICAgICBpbmREaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlEaXYpXG4gICAgICAgIGluZERpdi5hcHBlbmRDaGlsZChwcm9qZWN0RGl2KVxuICAgICAgICBcbiAgICB9KSAgXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xpc3RvZnRvZG9zJyxKU09OLnN0cmluZ2lmeShsaXN0T2ZUb0RvcykpXG5cbn1cblxuXG5cblxuXG5cbmV4cG9ydCB7IHJlbmRlclRhc2tzIH1cblxuey8qIDxkaXYgY2xhc3M9J3Rhc2stY2FudmFzMic+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFza3NcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSd0YXNrJz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY2hlY2tib3gnPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cIm1hcmluZXJzXCIgbmFtZT1cIjBcIj48bGFiZWw+ZmFrZSB0YXNrPC9sYWJlbD48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nZGF0ZSc+MjAyMS0wMS0wMTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdwcmlvcml0eSc+MjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdwcm9qZWN0Jz5pbmJveDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PiAqL31cbiIsImltcG9ydCB7IHRyaWdnZXIsIGNsb3NlQnV0dG9uLHRvZ2dsZU1vZGFsLG1vZGFsLG1vZGFsUHJvaix0cmlnZ2VyUHJvaixjbG9zZUJ1dHRvblByb2ogfSBmcm9tICcuL21vZGFsLmpzJ1xuaW1wb3J0IHsgYWRkUHJvamVjdFRvTGlzdCwgbGlzdE9mUHJvamVjdHMsIHByb2plY3RGYWN0b3J5IH0gZnJvbSAnLi9wcm9qZWN0cy5qcyc7XG5pbXBvcnQgeyBzaG93UHJvamVjdHMgfSBmcm9tICcuL3JlbmRlclByb2plY3RzLmpzJztcbmltcG9ydCB7IHJlbmRlclRhc2tzIH0gZnJvbSAnLi9yZW5kZXJUYXNrcy5qcyc7XG5cbmNvbnN0IHRvRG9MaXN0ID0gW107XG5cbmNvbnN0IGNvdW50ZXJDcmVhdG9yID0gKCkgPT4ge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJldHVybiBjb3VudCsrO1xuICAgIH07XG4gIH07XG5cbmNvbnN0IGNvdW50ZXIgPSBjb3VudGVyQ3JlYXRvcigpXG5cbmNvbnN0IHRvRG9GYWN0b3J5ID0gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QsIGlzQ29tcGxldGVkKSA9PiB7XG5cbiAgICBsZXQgaWQgPSBjb3VudGVyKClcblxuICAgIGlmIChwcm9qZWN0PT1cIlwiKSB7XG4gICAgICAgIHByb2plY3QgPSBcIkluYm94XCJcbiAgICB9XG5cbiAgICBsZXQgcHJvakV4aXN0cyA9IGZhbHNlO1xuICAgIGxpc3RPZlByb2plY3RzLmZvckVhY2goIHByb2ogPT4ge1xuICAgICAgICBpZiAocHJvai50aXRsZSA9PT0gcHJvamVjdCkge1xuICAgICAgICAgICAgcHJvakV4aXN0cyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKHByb2pFeGlzdHMgPT09IGZhbHNlKSB7XG4gICAgICAgIGxpc3RPZlByb2plY3RzLnB1c2gocHJvamVjdEZhY3RvcnkocHJvamVjdCxcIk5BXCIpKVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGlzdG9mcHJvamVjdHMnLEpTT04uc3RyaW5naWZ5KGxpc3RPZlByb2plY3RzKSlcblxuICAgICAgICBzaG93UHJvamVjdHMoKVxuICAgIH1cblxuICAgIHJldHVybiB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QsIGlzQ29tcGxldGVkLGlkIH1cbn1cblxuY29uc3QgbGlzdE9mVG9Eb3MgPSBbXVxuXG5mdW5jdGlvbiBhZGRUYXNrVG9MaXN0KCkge1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJylcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpXG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlJylcbiAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eScpXG4gICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0JylcbiAgICBsaXN0T2ZUb0Rvcy5wdXNoKHRvRG9GYWN0b3J5KHRpdGxlLnZhbHVlLGRlc2NyaXB0aW9uLnZhbHVlLGR1ZURhdGUudmFsdWUscHJpb3JpdHkudmFsdWUscHJvamVjdC52YWx1ZSxmYWxzZSkpXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xpc3RvZnRvZG9zJyxKU09OLnN0cmluZ2lmeShsaXN0T2ZUb0RvcykpXG5cbiAgICBsZXQgbmV3VG9nZ2xlID0gdG9nZ2xlTW9kYWwuYmluZCh0aGlzKVxuICAgIG5ld1RvZ2dsZSgpXG4gICAgbGV0IHNldFByb2plY3QgPSBwcm9qZWN0LnZhbHVlID09XCJcIiA/IFwiSW5ib3hcIiA6IHByb2plY3QudmFsdWVcblxuICAgIHJlbmRlclRhc2tzKHNldFByb2plY3QpXG4gICAgYWRkVGFzay5yZXNldCgpXG4gICAgXG5cblxufVxuXG5jb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZFRhc2snKVxuYWRkVGFzay5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLGFkZFRhc2tUb0xpc3QpXG5cblxuXG5cblxuXG5leHBvcnQgeyB0b0RvRmFjdG9yeSwgbGlzdE9mVG9Eb3MsIGFkZFRhc2t9XG5cblxuLy8gY29uc3QgdG9kbzEgPSB0b0RvRmFjdG9yeSgnbmljaycsJ25pY2tcXCdzIGRlc2NyaXB0aW9uJywgJzIwMjEtMDktMDQnLDEsJ2luYm94JyxmYWxzZSkiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGxpc3RPZlRvRG9zLCBhZGRUYXNrLCB0b0RvRmFjdG9yeX0gZnJvbSAnLi90b0RvT2JqZWN0LmpzJ1xuaW1wb3J0IHsgYWRkUHJvamVjdFRvTGlzdCwgcHJvamVjdEZhY3RvcnksIGxpc3RPZlByb2plY3RzLCBzaG93U3BlY2lmaWNQcm9qZWN0LCBjdXJyZW50UHJvamVjdCB9IGZyb20gJy4vcHJvamVjdHMuanMnXG5pbXBvcnQgeyBzaG93UHJvamVjdHMgfSBmcm9tICcuL3JlbmRlclByb2plY3RzLmpzJ1xuaW1wb3J0IHsgcmVuZGVyVGFza3MgfSBmcm9tICcuL3JlbmRlclRhc2tzLmpzJ1xuXG5cbmlmIChsb2NhbFN0b3JhZ2UubGVuZ3RoID4gMSApIHtcblxuICAgIGxldCBsb2NhbFRvZG9zID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbJ2xpc3RvZnRvZG9zJ10pXG4gICAgbG9jYWxUb2Rvcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBsaXN0T2ZUb0Rvcy5wdXNoKHRhc2spXG4gICAgfSlcbiAgICBsZXQgbG9jYWxQcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlWydsaXN0b2Zwcm9qZWN0cyddKVxuICAgIGxvY2FsUHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICAgICAgbGlzdE9mUHJvamVjdHMucHVzaChwcm9qZWN0KVxuICAgIH0pXG4gICAgc2hvd1Byb2plY3RzKClcbiAgICByZW5kZXJUYXNrcyhcIkluYm94XCIpXG5cbiAgfVxuICBcblxuXG5zaG93UHJvamVjdHMoKVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9