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
localStorage.setItem('listofprojects',JSON.stringify(listOfProjects))


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
    
    if (_projects_js__WEBPACK_IMPORTED_MODULE_1__.listOfProjects.some(e => e.title === setProject)) {
        console.log(_projects_js__WEBPACK_IMPORTED_MODULE_1__.listOfProjects)
    } else {
        console.log(_projects_js__WEBPACK_IMPORTED_MODULE_1__.listOfProjects)
        _projects_js__WEBPACK_IMPORTED_MODULE_1__.listOfProjects.push((0,_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectFactory)(project,"NA"))
        localStorage.setItem('listofprojects',JSON.stringify(_projects_js__WEBPACK_IMPORTED_MODULE_1__.listOfProjects))

    }


    (0,_renderTasks_js__WEBPACK_IMPORTED_MODULE_3__.renderTasks)(setProject)
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
    // console.log(local)
    localTodos.forEach(task => {
        _toDoObject_js__WEBPACK_IMPORTED_MODULE_0__.listOfToDos.push(task)
    })
    let localProjects = JSON.parse(localStorage['listofprojects'])
    localProjects.forEach(project => {
        _projects_js__WEBPACK_IMPORTED_MODULE_1__.listOfProjects.push(project)
    })
    ;(0,_renderProjects_js__WEBPACK_IMPORTED_MODULE_2__.showProjects)()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QW1CO0FBQzNCLEtBQUs7QUFDTCxJQUFJLGlFQUFZO0FBQ2hCLElBQUksNkRBQVc7QUFDZixnQkFBZ0IsdURBQVc7O0FBRTNCO0FBQ0E7OztBQUdBLGdFQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBLElBQUksQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2VsZW1lbnRzLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL21vZGFsLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3JlbmRlclByb2plY3RzLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3JlbmRlclRhc2tzLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3RvRG9PYmplY3QuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBwcm9qZWN0c0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzJylcbmNvbnN0IHRhc2tDYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1jYW52YXMnKVxuXG5cbmV4cG9ydCB7IHByb2plY3RzRWwsdGFza0NhbnZhcyB9IiwiXG5cbmNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tb2RhbFwiKTtcbmNvbnN0IHRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRyaWdnZXJcIik7XG5jb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2xvc2UtYnV0dG9uXCIpO1xuY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zdWJtaXQtYnV0dG9uXCIpXG5cbmZ1bmN0aW9uIHRvZ2dsZU1vZGFsKCkge1xuXG4gICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCd0cmlnZ2VyJykpIHtcbiAgICAgICAgdGhpcy5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZShcInNob3ctbW9kYWxcIik7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbFwiKSl7XG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJzaG93LW1vZGFsXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcInNob3ctbW9kYWxcIilcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHdpbmRvd09uQ2xpY2soZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBtb2RhbCkge1xuICAgICAgICB0b2dnbGVNb2RhbCgpO1xuICAgIH1cbn1cblxudHJpZ2dlci5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZU1vZGFsKSk7XG5jbG9zZUJ1dHRvbi5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZU1vZGFsKSk7XG4vLyBzdWJtaXRCdXR0b24uZm9yRWFjaChidG4gPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRvZ2dsZU1vZGFsKSlcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgd2luZG93T25DbGljayk7XG5cblxuXG5cbmV4cG9ydCB7IHRyaWdnZXIsIGNsb3NlQnV0dG9uLCB0b2dnbGVNb2RhbCwgbW9kYWwsc3VibWl0QnV0dG9uIH0iLCJpbXBvcnQgeyB0cmlnZ2VyLCBjbG9zZUJ1dHRvbiwgdG9nZ2xlTW9kYWwsIG1vZGFsIH0gZnJvbSAnLi9tb2RhbC5qcydcbmltcG9ydCB7IHNob3dQcm9qZWN0cyB9IGZyb20gJy4vcmVuZGVyUHJvamVjdHMuanMnXG5pbXBvcnQgeyBsaXN0T2ZUb0RvcyB9IGZyb20gJy4vdG9Eb09iamVjdC5qcydcblxuY29uc3QgbGlzdE9mUHJvamVjdHMgPSBbe3RpdGxlOiAnQWxsJ30se3RpdGxlOiBcIkluYm94XCJ9XVxubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xpc3RvZnByb2plY3RzJyxKU09OLnN0cmluZ2lmeShsaXN0T2ZQcm9qZWN0cykpXG5cblxuY29uc3QgcHJvamVjdEZhY3RvcnkgPSAodGl0bGUsZGVzY3JpcHRpb24pID0+IHtcblxuICAgIHJldHVybiB7IHRpdGxlLCBkZXNjcmlwdGlvbiB9XG59XG5cbmZ1bmN0aW9uIGFkZFByb2plY3RUb0xpc3QoKSB7XG5cbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LXRpdGxlJylcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWRlc2NyaXB0aW9uJylcbiAgICBsaXN0T2ZQcm9qZWN0cy5wdXNoKHByb2plY3RGYWN0b3J5KHRpdGxlLnZhbHVlLGRlc2NyaXB0aW9uLnZhbHVlKSlcbiAgICBjb25zb2xlLmxvZyhsaXN0T2ZQcm9qZWN0cylcbiAgICBsZXQgbmV3VG9nZ2xlID0gdG9nZ2xlTW9kYWwuYmluZCh0aGlzKVxuICAgIG5ld1RvZ2dsZSgpXG4gICAgc3VibWl0LnJlc2V0KClcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGlzdG9mcHJvamVjdHMnLEpTT04uc3RyaW5naWZ5KGxpc3RPZlByb2plY3RzKSlcblxuICAgIHNob3dQcm9qZWN0cygpXG5cbn1cblxuLy8gY29uc3QgYWRkUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRQcm9qZWN0Jylcbi8vIGFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JyxhZGRQcm9qZWN0VG9MaXN0LmJpbmQoc3VibWl0QnV0dG9uKSlcbmNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRQcm9qZWN0JylcbnN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLGFkZFByb2plY3RUb0xpc3QpXG5cbmNvbnN0IGRpc3BsYXlMaXN0T2ZUb0RvcyA9IFtdXG5cbmZ1bmN0aW9uIHNob3dTcGVjaWZpY1Byb2plY3QocHJvamVjdCkge1xuICAgIC8vIGRpc3BsYXlMaXN0T2ZUb0Rvcy5sZW5ndGggPSAwXG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBsaXN0T2ZUb0Rvcy5maWx0ZXIoIHRvZG8gPT4ge1xuICAgICAgICByZXR1cm4gdG9kby5wcm9qZWN0ID09IHByb2plY3RcbiAgICB9KVxuICAgIHJldHVybiBwcm9qZWN0TGlzdFxufVxuXG5jb25zdCBjdXJyZW50UHJvamVjdCA9IGxpc3RPZlByb2plY3RzWzBdXG5cbmV4cG9ydCB7IGFkZFByb2plY3RUb0xpc3QsIHByb2plY3RGYWN0b3J5LCBsaXN0T2ZQcm9qZWN0cywgc2hvd1NwZWNpZmljUHJvamVjdCwgY3VycmVudFByb2plY3QgfSIsImltcG9ydCB7IGxpc3RPZlByb2plY3RzIH0gZnJvbSAnLi9wcm9qZWN0cy5qcydcbmltcG9ydCB7IHByb2plY3RzRWwgfSBmcm9tICAnLi9lbGVtZW50cy5qcydcblxuZnVuY3Rpb24gc2hvd1Byb2plY3RzKCkge1xuICAgIHdoaWxlIChwcm9qZWN0c0VsLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgcHJvamVjdHNFbC5yZW1vdmVDaGlsZChwcm9qZWN0c0VsLmZpcnN0Q2hpbGQpO1xuICAgIH1cbmxpc3RPZlByb2plY3RzLmZvckVhY2gocHJvaiA9PiB7XG5cblxuICAgIGNvbnN0IHByb2pFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJylcbiAgICBwcm9qRWwuaW5uZXJUZXh0ID0gcHJvai50aXRsZVxuICAgIHByb2plY3RzRWwuYXBwZW5kQ2hpbGQocHJvakVsKVxuXG59KX1cblxuZXhwb3J0IHsgc2hvd1Byb2plY3RzIH0iLCJjb25zdCB7IHRhc2tDYW52YXMgfSA9IHJlcXVpcmUoXCIuL2VsZW1lbnRzXCIpO1xuY29uc3QgeyBzaG93U3BlY2lmaWNQcm9qZWN0LCBjdXJyZW50UHJvamVjdCB9ID0gcmVxdWlyZShcIi4vcHJvamVjdHNcIik7XG5cbmZ1bmN0aW9uIHJlbmRlclRhc2tzKHByb2plY3QpIHtcbiAgICB3aGlsZSAodGFza0NhbnZhcy5maXJzdENoaWxkKSB7XG4gICAgICAgIHRhc2tDYW52YXMuZmlyc3RDaGlsZC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBjb25zdCB0YXNrcyA9IHNob3dTcGVjaWZpY1Byb2plY3QocHJvamVjdClcbiAgICB0YXNrcy5mb3JFYWNoKCB0YXNrID0+IHtcblxuICAgICAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgdGFza0NhbnZhcy5hcHBlbmRDaGlsZCh0YXNrRGl2KVxuICAgICAgICBjb25zdCB0YXNrQ2hlY2tCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgICAgIHRhc2tDaGVja0JveC50eXBlID0gJ2NoZWNrYm94J1xuICAgICAgICB0YXNrQ2hlY2tCb3guaWQgPSB0YXNrLnRpdGxlXG4gICAgICAgIHRhc2tDaGVja0JveC5uYW1lID0gdGFzay5pZFxuXG4gICAgICAgIGlmICh0YXNrLmlzQ29tcGxldGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0YXNrQ2hlY2tCb3guY2hlY2tlZCA9IHRydWVcbiAgICAgICAgfSBcblxuICAgICAgICBjb25zdCB0YXNrTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpXG4gICAgICAgIHRhc2tMYWJlbC5mb3IgPSB0YXNrLnRpdGxlXG4gICAgICAgIHRhc2tMYWJlbC5pbm5lclRleHQgPSB0YXNrLnRpdGxlXG5cbiAgICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrQ2hlY2tCb3gpXG4gICAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0xhYmVsKVxuICAgICAgICBcblxuICAgICAgICB0YXNrQ2hlY2tCb3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQpXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIHRhc2suaXNDb21wbGV0ZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGFzaylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFzay5pc0NvbXBsZXRlZCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGFzaylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgfSkgIFxufVxuXG5cblxuXG5cblxuZXhwb3J0IHsgcmVuZGVyVGFza3MgfVxuIiwiaW1wb3J0IHsgdHJpZ2dlciwgY2xvc2VCdXR0b24sdG9nZ2xlTW9kYWwsbW9kYWwsbW9kYWxQcm9qLHRyaWdnZXJQcm9qLGNsb3NlQnV0dG9uUHJvaiB9IGZyb20gJy4vbW9kYWwuanMnXG5pbXBvcnQgeyBhZGRQcm9qZWN0VG9MaXN0LCBsaXN0T2ZQcm9qZWN0cywgcHJvamVjdEZhY3RvcnkgfSBmcm9tICcuL3Byb2plY3RzLmpzJztcbmltcG9ydCB7IHNob3dQcm9qZWN0cyB9IGZyb20gJy4vcmVuZGVyUHJvamVjdHMuanMnO1xuaW1wb3J0IHsgcmVuZGVyVGFza3MgfSBmcm9tICcuL3JlbmRlclRhc2tzLmpzJztcblxuY29uc3QgdG9Eb0xpc3QgPSBbXTtcblxuY29uc3QgY291bnRlckNyZWF0b3IgPSAoKSA9PiB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcmV0dXJuIGNvdW50Kys7XG4gICAgfTtcbiAgfTtcblxuY29uc3QgY291bnRlciA9IGNvdW50ZXJDcmVhdG9yKClcblxuY29uc3QgdG9Eb0ZhY3RvcnkgPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCwgaXNDb21wbGV0ZWQpID0+IHtcblxuICAgIGxldCBpZCA9IGNvdW50ZXIoKVxuXG4gICAgaWYgKHByb2plY3Q9PVwiXCIpIHtcbiAgICAgICAgcHJvamVjdCA9IFwiSW5ib3hcIlxuICAgIH1cblxuICAgIGxldCBwcm9qRXhpc3RzID0gZmFsc2U7XG4gICAgbGlzdE9mUHJvamVjdHMuZm9yRWFjaCggcHJvaiA9PiB7XG4gICAgICAgIGlmIChwcm9qLnRpdGxlID09PSBwcm9qZWN0KSB7XG4gICAgICAgICAgICBwcm9qRXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAocHJvakV4aXN0cyA9PT0gZmFsc2UpIHtcbiAgICAgICAgbGlzdE9mUHJvamVjdHMucHVzaChwcm9qZWN0RmFjdG9yeShwcm9qZWN0LFwiTkFcIikpXG4gICAgICAgIHNob3dQcm9qZWN0cygpXG4gICAgfVxuXG4gICAgcmV0dXJuIHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCwgaXNDb21wbGV0ZWQsaWQgfVxufVxuXG5jb25zdCBsaXN0T2ZUb0RvcyA9IFtdXG5cbmZ1bmN0aW9uIGFkZFRhc2tUb0xpc3QoKSB7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGl0bGUnKVxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJylcbiAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RhdGUnKVxuICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaW9yaXR5JylcbiAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QnKVxuICAgIGxpc3RPZlRvRG9zLnB1c2godG9Eb0ZhY3RvcnkodGl0bGUudmFsdWUsZGVzY3JpcHRpb24udmFsdWUsZHVlRGF0ZS52YWx1ZSxwcmlvcml0eS52YWx1ZSxwcm9qZWN0LnZhbHVlLGZhbHNlKSlcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGlzdG9mdG9kb3MnLEpTT04uc3RyaW5naWZ5KGxpc3RPZlRvRG9zKSlcblxuICAgIGNvbnNvbGUubG9nKGxpc3RPZlRvRG9zKVxuICAgIGxldCBuZXdUb2dnbGUgPSB0b2dnbGVNb2RhbC5iaW5kKHRoaXMpXG4gICAgbmV3VG9nZ2xlKClcbiAgICBsZXQgc2V0UHJvamVjdCA9IHByb2plY3QudmFsdWUgPT1cIlwiID8gXCJJbmJveFwiIDogcHJvamVjdC52YWx1ZVxuICAgIFxuICAgIGlmIChsaXN0T2ZQcm9qZWN0cy5zb21lKGUgPT4gZS50aXRsZSA9PT0gc2V0UHJvamVjdCkpIHtcbiAgICAgICAgY29uc29sZS5sb2cobGlzdE9mUHJvamVjdHMpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2cobGlzdE9mUHJvamVjdHMpXG4gICAgICAgIGxpc3RPZlByb2plY3RzLnB1c2gocHJvamVjdEZhY3RvcnkocHJvamVjdCxcIk5BXCIpKVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGlzdG9mcHJvamVjdHMnLEpTT04uc3RyaW5naWZ5KGxpc3RPZlByb2plY3RzKSlcblxuICAgIH1cblxuXG4gICAgcmVuZGVyVGFza3Moc2V0UHJvamVjdClcbiAgICBhZGRUYXNrLnJlc2V0KClcbiAgICBcblxuXG59XG5cbmNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkVGFzaycpXG5hZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsYWRkVGFza1RvTGlzdClcblxuXG5cblxuXG5cbmV4cG9ydCB7IHRvRG9GYWN0b3J5LCBsaXN0T2ZUb0RvcywgYWRkVGFza31cblxuXG4vLyBjb25zdCB0b2RvMSA9IHRvRG9GYWN0b3J5KCduaWNrJywnbmlja1xcJ3MgZGVzY3JpcHRpb24nLCAnMjAyMS0wOS0wNCcsMSwnaW5ib3gnLGZhbHNlKSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgbGlzdE9mVG9Eb3MsIGFkZFRhc2ssIHRvRG9GYWN0b3J5fSBmcm9tICcuL3RvRG9PYmplY3QuanMnXG5pbXBvcnQgeyBhZGRQcm9qZWN0VG9MaXN0LCBwcm9qZWN0RmFjdG9yeSwgbGlzdE9mUHJvamVjdHMsIHNob3dTcGVjaWZpY1Byb2plY3QgfSBmcm9tICcuL3Byb2plY3RzLmpzJ1xuaW1wb3J0IHsgc2hvd1Byb2plY3RzIH0gZnJvbSAnLi9yZW5kZXJQcm9qZWN0cy5qcydcbmltcG9ydCB7IHJlbmRlclRhc2tzIH0gZnJvbSAnLi9yZW5kZXJUYXNrcy5qcydcblxuXG5cblxuaWYgKGxvY2FsU3RvcmFnZS5sZW5ndGggPiAxICkge1xuXG4gICAgbGV0IGxvY2FsVG9kb3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVsnbGlzdG9mdG9kb3MnXSlcbiAgICAvLyBjb25zb2xlLmxvZyhsb2NhbClcbiAgICBsb2NhbFRvZG9zLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgIGxpc3RPZlRvRG9zLnB1c2godGFzaylcbiAgICB9KVxuICAgIGxldCBsb2NhbFByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbJ2xpc3RvZnByb2plY3RzJ10pXG4gICAgbG9jYWxQcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICBsaXN0T2ZQcm9qZWN0cy5wdXNoKHByb2plY3QpXG4gICAgfSlcbiAgICBzaG93UHJvamVjdHMoKVxuICAgIHJlbmRlclRhc2tzKFwiSW5ib3hcIilcbiAgICBjb25zb2xlLmxvZyhsaXN0T2ZUb0RvcylcblxuICB9XG4gIFxuXG5cbnNob3dQcm9qZWN0cygpXG5cbi8vIGNvbnN0IHByb2plY3QxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QxJylcbi8vIHByb2plY3QxLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKSA9PiB7XG4vLyAgICAgY29uc29sZS5sb2coc2hvd1NwZWNpZmljUHJvamVjdCgnYnMnKSlcbi8vIH0pIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9