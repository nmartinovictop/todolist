/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),

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
/* harmony export */   "submitButton": () => (/* binding */ submitButton),
/* harmony export */   "editTaskButton": () => (/* binding */ editTaskButton)
/* harmony export */ });
/* harmony import */ var _toDoObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDoObject */ "./src/toDoObject.js");



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

        const task = (0,_toDoObject__WEBPACK_IMPORTED_MODULE_0__.findTaskById)(this.parentElement.nextElementSibling.innerText)
        const taskId = this.parentElement.nextElementSibling.innerText
        title.value = task.title
        description.value = task.description
        dueDate.value = task.dueDate
        priority.value = task.priority
        project.value = task.project

        const clickFunction = () => (0,_toDoObject__WEBPACK_IMPORTED_MODULE_0__.editTask)(taskId)
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
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal.js */ "./src/modal.js");
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");
/* harmony import */ var _toDoObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toDoObject.js */ "./src/toDoObject.js");
// const { taskCanvas } = require("./elements");
// const { showSpecificProject, currentProject } = require("./projects");






function renderTasks(project) {
    while (_elements_js__WEBPACK_IMPORTED_MODULE_0__.taskCanvas.firstChild) {
        _elements_js__WEBPACK_IMPORTED_MODULE_0__.taskCanvas.firstChild.remove();
    }


    const tasks = project === 'All' ? _toDoObject_js__WEBPACK_IMPORTED_MODULE_3__.listOfToDos : (0,_projects_js__WEBPACK_IMPORTED_MODULE_2__.showSpecificProject)(project)


    
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
                localStorage.setItem('listoftodos',JSON.stringify(_toDoObject_js__WEBPACK_IMPORTED_MODULE_3__.listOfToDos))

            } else {
                task.isCompleted = false
                localStorage.setItem('listoftodos',JSON.stringify(_toDoObject_js__WEBPACK_IMPORTED_MODULE_3__.listOfToDos))

            }
        })

        const date = task.dueDate
        const description = task.description
        const priority = task.priority
        const project = task.project
        const id = task.id

 

        const dateDiv = document.createElement('div')
        const descriptionDiv = document.createElement('div')
        const priorityDiv = document.createElement('div')
        const projectDiv = document.createElement('div')
        const idDiv = document.createElement('div')

        dateDiv.innerText = date
        dateDiv.classList.add('date')
        descriptionDiv.innerText = description
        descriptionDiv.classList.add('date')
        priorityDiv.innerText = priority
        priorityDiv.classList.add('priority')
        projectDiv.innerText = project
        projectDiv.classList.add('project')
        idDiv.classList.add('hidden-task')
        idDiv.innerText = id

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
        indDiv.appendChild(idDiv)

        editDeleteButtonDiv.appendChild(editButton)
        editDeleteButtonDiv.appendChild(trashButton)

        trashButton.addEventListener('click', (e) => {
            ;(0,_toDoObject_js__WEBPACK_IMPORTED_MODULE_3__.removeTaskFromList)(e.target.parentElement.parentElement.dataset.title)
            renderTasks(task.project)
            
        })

        editButton.addEventListener('click',(e) => {
            let div = e.target
           let newModal = _modal_js__WEBPACK_IMPORTED_MODULE_1__.toggleModal.bind(div)
           newModal()
        })
        

        
    })  
    localStorage.setItem('listoftodos',JSON.stringify(_toDoObject_js__WEBPACK_IMPORTED_MODULE_3__.listOfToDos))

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
/* harmony export */   "removeTaskFromList": () => (/* binding */ removeTaskFromList),
/* harmony export */   "findTaskById": () => (/* binding */ findTaskById),
/* harmony export */   "editTask": () => (/* binding */ editTask)
/* harmony export */ });
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ "./src/modal.js");
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");
/* harmony import */ var _renderProjects_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderProjects.js */ "./src/renderProjects.js");
/* harmony import */ var _renderTasks_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderTasks.js */ "./src/renderTasks.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");







const toDoList = [];



const toDoFactory = (title, description, dueDate, priority, project, isCompleted) => {

    let id = (0,uuid__WEBPACK_IMPORTED_MODULE_4__["default"])()

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

function editTask(id) {
    const title = document.querySelector('#editTitle')
    const description = document.querySelector('#editDescription')
    const dueDate = document.querySelector('#editDate')
    const priority = document.querySelector('#editPriority')
    const project = document.querySelector('#editProject')

    let taskIndex = listOfToDos.findIndex(task => task.id == id)
    listOfToDos[taskIndex].title = title.value
    listOfToDos[taskIndex].description = description.value
    listOfToDos[taskIndex].dueDate = dueDate.value
    listOfToDos[taskIndex].priority = priority.value
    listOfToDos[taskIndex].project = project.value
    
    const editModal = document.querySelector('.edit-modal')
    localStorage.setItem('listoftodos',JSON.stringify(listOfToDos))
    let setProject = project.value =="" ? "Inbox" : project.value

    let newToggle = _modal_js__WEBPACK_IMPORTED_MODULE_0__.toggleModal.bind(editModal)
    newToggle()
    ;(0,_renderTasks_js__WEBPACK_IMPORTED_MODULE_3__.renderTasks)(setProject)
    addTask.reset()

}



function findTaskById(id) {
    return listOfToDos.find(task => task.id == id)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLElBQUksNkRBQVc7QUFDZjs7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTs7O0FBR3VGOzs7QUFHdkY7Ozs7OztVQ3hHQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTmlGO0FBQ29DO0FBQ25FO0FBQ0o7OztBQUc5Qzs7QUFFQTtBQUNBO0FBQ0EsUUFBUSw0REFBZ0I7QUFDeEIsS0FBSztBQUNMO0FBQ0E7QUFDQSxRQUFRLDZEQUFtQjtBQUMzQixLQUFLO0FBQ0wsSUFBSSxpRUFBWTtBQUNoQixJQUFJLDZEQUFXOztBQUVmO0FBQ0E7OztBQUdBLGdFQUFZIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2VsZW1lbnRzLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL21vZGFsLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3JlbmRlclByb2plY3RzLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3JlbmRlclRhc2tzLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3RvRG9PYmplY3QuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCkkL2k7IiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG52YXIgZ2V0UmFuZG9tVmFsdWVzO1xudmFyIHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uIEFsc28sXG4gICAgLy8gZmluZCB0aGUgY29tcGxldGUgaW1wbGVtZW50YXRpb24gb2YgY3J5cHRvIChtc0NyeXB0bykgb24gSUUxMS5cbiAgICBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pIHx8IHR5cGVvZiBtc0NyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyA9PT0gJ2Z1bmN0aW9uJyAmJiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChtc0NyeXB0byk7XG5cbiAgICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKCkgbm90IHN1cHBvcnRlZC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCNnZXRyYW5kb212YWx1ZXMtbm90LXN1cHBvcnRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufSIsImltcG9ydCB2YWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcbi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xuXG52YXIgYnl0ZVRvSGV4ID0gW107XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4LnB1c2goKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKSk7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIpIHtcbiAgdmFyIG9mZnNldCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMDtcbiAgLy8gTm90ZTogQmUgY2FyZWZ1bCBlZGl0aW5nIHRoaXMgY29kZSEgIEl0J3MgYmVlbiB0dW5lZCBmb3IgcGVyZm9ybWFuY2VcbiAgLy8gYW5kIHdvcmtzIGluIHdheXMgeW91IG1heSBub3QgZXhwZWN0LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkL3B1bGwvNDM0XG4gIHZhciB1dWlkID0gKGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgM11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDVdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA3XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDhdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxM11dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNV1dKS50b0xvd2VyQ2FzZSgpOyAvLyBDb25zaXN0ZW5jeSBjaGVjayBmb3IgdmFsaWQgVVVJRC4gIElmIHRoaXMgdGhyb3dzLCBpdCdzIGxpa2VseSBkdWUgdG8gb25lXG4gIC8vIG9mIHRoZSBmb2xsb3dpbmc6XG4gIC8vIC0gT25lIG9yIG1vcmUgaW5wdXQgYXJyYXkgdmFsdWVzIGRvbid0IG1hcCB0byBhIGhleCBvY3RldCAobGVhZGluZyB0b1xuICAvLyBcInVuZGVmaW5lZFwiIGluIHRoZSB1dWlkKVxuICAvLyAtIEludmFsaWQgaW5wdXQgdmFsdWVzIGZvciB0aGUgUkZDIGB2ZXJzaW9uYCBvciBgdmFyaWFudGAgZmllbGRzXG5cbiAgaWYgKCF2YWxpZGF0ZSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignU3RyaW5naWZpZWQgVVVJRCBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICByZXR1cm4gdXVpZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RyaW5naWZ5OyIsImltcG9ydCBybmcgZnJvbSAnLi9ybmcuanMnO1xuaW1wb3J0IHN0cmluZ2lmeSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuICBybmRzWzZdID0gcm5kc1s2XSAmIDB4MGYgfCAweDQwO1xuICBybmRzWzhdID0gcm5kc1s4XSAmIDB4M2YgfCAweDgwOyAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcblxuICBpZiAoYnVmKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHJuZHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIHJldHVybiBzdHJpbmdpZnkocm5kcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHY0OyIsImltcG9ydCBSRUdFWCBmcm9tICcuL3JlZ2V4LmpzJztcblxuZnVuY3Rpb24gdmFsaWRhdGUodXVpZCkge1xuICByZXR1cm4gdHlwZW9mIHV1aWQgPT09ICdzdHJpbmcnICYmIFJFR0VYLnRlc3QodXVpZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlOyIsImNvbnN0IHByb2plY3RzRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMnKVxuY29uc3QgdGFza0NhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWNhbnZhcycpXG5cblxuZXhwb3J0IHsgcHJvamVjdHNFbCx0YXNrQ2FudmFzIH0iLCJpbXBvcnQgeyBmaW5kVGFza0J5SWQsZWRpdFRhc2sgfSBmcm9tIFwiLi90b0RvT2JqZWN0XCI7XG5cblxuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vZGFsXCIpO1xuY29uc3QgdHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudHJpZ2dlclwiKTtcbmNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jbG9zZS1idXR0b25cIik7XG5jb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnN1Ym1pdC1idXR0b25cIilcbmNvbnN0IGVkaXRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVkaXRUYXNrJylcblxuZnVuY3Rpb24gdG9nZ2xlTW9kYWwoKSB7XG5cbiAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ3RyaWdnZXInKSkge1xuICAgICAgICB0aGlzLm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKFwic2hvdy1tb2RhbFwiKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93LW1vZGFsJykpIHtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LW1vZGFsJylcbiAgICB9IFxuICAgIGVsc2UgaWYgKHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsXCIpKXtcbiAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcInNob3ctbW9kYWxcIilcbiAgICB9IGVsc2UgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdtYXRlcmlhbC1pY29ucy1vdXRsaW5lZCcpKSB7XG5cbiAgICAgICAgbGV0IGVkaXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0LW1vZGFsJylcbiAgICAgICAgZWRpdE1vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctbW9kYWwnKVxuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0VGl0bGUnKVxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0RGVzY3JpcHRpb24nKVxuICAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXREYXRlJylcbiAgICAgICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdFByaW9yaXR5JylcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0UHJvamVjdCcpXG5cbiAgICAgICAgY29uc3QgdGFzayA9IGZpbmRUYXNrQnlJZCh0aGlzLnBhcmVudEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nLmlubmVyVGV4dClcbiAgICAgICAgY29uc3QgdGFza0lkID0gdGhpcy5wYXJlbnRFbGVtZW50Lm5leHRFbGVtZW50U2libGluZy5pbm5lclRleHRcbiAgICAgICAgdGl0bGUudmFsdWUgPSB0YXNrLnRpdGxlXG4gICAgICAgIGRlc2NyaXB0aW9uLnZhbHVlID0gdGFzay5kZXNjcmlwdGlvblxuICAgICAgICBkdWVEYXRlLnZhbHVlID0gdGFzay5kdWVEYXRlXG4gICAgICAgIHByaW9yaXR5LnZhbHVlID0gdGFzay5wcmlvcml0eVxuICAgICAgICBwcm9qZWN0LnZhbHVlID0gdGFzay5wcm9qZWN0XG5cbiAgICAgICAgY29uc3QgY2xpY2tGdW5jdGlvbiA9ICgpID0+IGVkaXRUYXNrKHRhc2tJZClcbiAgICAgICAgZWRpdFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgY2xpY2tGdW5jdGlvbix7b25jZTp0cnVlfSlcblxuXG5cblxuXG4gICAgfSBcbiAgICBcbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcInNob3ctbW9kYWxcIilcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHdpbmRvd09uQ2xpY2soZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBtb2RhbCkge1xuICAgICAgICB0b2dnbGVNb2RhbCgpO1xuICAgIH1cbn1cblxudHJpZ2dlci5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZU1vZGFsKSk7XG5jbG9zZUJ1dHRvbi5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZU1vZGFsKSk7XG4vLyBzdWJtaXRCdXR0b24uZm9yRWFjaChidG4gPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRvZ2dsZU1vZGFsKSlcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgd2luZG93T25DbGljayk7XG5cblxuXG5cbmV4cG9ydCB7IHRyaWdnZXIsIGNsb3NlQnV0dG9uLCB0b2dnbGVNb2RhbCwgbW9kYWwsc3VibWl0QnV0dG9uLGVkaXRUYXNrQnV0dG9uIH0iLCJpbXBvcnQgeyB0cmlnZ2VyLCBjbG9zZUJ1dHRvbiwgdG9nZ2xlTW9kYWwsIG1vZGFsIH0gZnJvbSAnLi9tb2RhbC5qcydcbmltcG9ydCB7IHNob3dQcm9qZWN0cyB9IGZyb20gJy4vcmVuZGVyUHJvamVjdHMuanMnXG5pbXBvcnQgeyBsaXN0T2ZUb0RvcyB9IGZyb20gJy4vdG9Eb09iamVjdC5qcydcblxuY29uc3QgbGlzdE9mUHJvamVjdHMgPSBbXVxuXG5pZiAobG9jYWxTdG9yYWdlLmxlbmd0aCA9PSAwKSB7XG5cbmxldCBhZGRQcm9qZWN0cyA9IFt7dGl0bGU6ICdBbGwnfSx7dGl0bGU6IFwiSW5ib3hcIn1dXG5hZGRQcm9qZWN0cy5mb3JFYWNoKHByb2ogPT4gbGlzdE9mUHJvamVjdHMucHVzaChwcm9qKSlcbmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaXN0b2Zwcm9qZWN0cycsSlNPTi5zdHJpbmdpZnkobGlzdE9mUHJvamVjdHMpKVxufVxuXG5jb25zdCBwcm9qZWN0RmFjdG9yeSA9ICh0aXRsZSxkZXNjcmlwdGlvbikgPT4ge1xuXG4gICAgcmV0dXJuIHsgdGl0bGUsIGRlc2NyaXB0aW9uIH1cbn1cblxuZnVuY3Rpb24gYWRkUHJvamVjdFRvTGlzdCgpIHtcblxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtdGl0bGUnKVxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZGVzY3JpcHRpb24nKVxuICAgIGxpc3RPZlByb2plY3RzLnB1c2gocHJvamVjdEZhY3RvcnkodGl0bGUudmFsdWUsZGVzY3JpcHRpb24udmFsdWUpKVxuICAgIGxldCBuZXdUb2dnbGUgPSB0b2dnbGVNb2RhbC5iaW5kKHRoaXMpXG4gICAgbmV3VG9nZ2xlKClcbiAgICBzdWJtaXQucmVzZXQoKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaXN0b2Zwcm9qZWN0cycsSlNPTi5zdHJpbmdpZnkobGlzdE9mUHJvamVjdHMpKVxuXG4gICAgc2hvd1Byb2plY3RzKClcblxufVxuXG4vLyBjb25zdCBhZGRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZFByb2plY3QnKVxuLy8gYWRkUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLGFkZFByb2plY3RUb0xpc3QuYmluZChzdWJtaXRCdXR0b24pKVxuY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZFByb2plY3QnKVxuc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsYWRkUHJvamVjdFRvTGlzdClcblxuY29uc3QgZGlzcGxheUxpc3RPZlRvRG9zID0gW11cblxuZnVuY3Rpb24gc2hvd1NwZWNpZmljUHJvamVjdChwcm9qZWN0KSB7XG4gICAgLy8gZGlzcGxheUxpc3RPZlRvRG9zLmxlbmd0aCA9IDBcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGxpc3RPZlRvRG9zLmZpbHRlciggdG9kbyA9PiB7XG4gICAgICAgIHJldHVybiB0b2RvLnByb2plY3QgPT0gcHJvamVjdFxuICAgIH0pXG4gICAgcmV0dXJuIHByb2plY3RMaXN0XG59XG5cbmNvbnN0IGN1cnJlbnRQcm9qZWN0ID0gbGlzdE9mUHJvamVjdHNbMF1cblxuZXhwb3J0IHsgYWRkUHJvamVjdFRvTGlzdCwgcHJvamVjdEZhY3RvcnksIGxpc3RPZlByb2plY3RzLCBzaG93U3BlY2lmaWNQcm9qZWN0LCBjdXJyZW50UHJvamVjdCB9IiwiaW1wb3J0IHsgbGlzdE9mUHJvamVjdHMgfSBmcm9tICcuL3Byb2plY3RzLmpzJ1xuaW1wb3J0IHsgcHJvamVjdHNFbCB9IGZyb20gICcuL2VsZW1lbnRzLmpzJ1xuaW1wb3J0IHsgcmVuZGVyVGFza3MgfSBmcm9tICcuL3JlbmRlclRhc2tzLmpzJztcblxuZnVuY3Rpb24gc2hvd1Byb2plY3RzKCkge1xuICAgIHdoaWxlIChwcm9qZWN0c0VsLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgcHJvamVjdHNFbC5yZW1vdmVDaGlsZChwcm9qZWN0c0VsLmZpcnN0Q2hpbGQpO1xuICAgIH1cbmxpc3RPZlByb2plY3RzLmZvckVhY2gocHJvaiA9PiB7XG5cblxuICAgIGNvbnN0IHByb2pFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJylcbiAgICBwcm9qRWwuY2xhc3NMaXN0LmFkZChwcm9qLnRpdGxlLCdwcm9qZWN0TGlzdCcpXG4gICAgcHJvakVsLmlubmVyVGV4dCA9IHByb2oudGl0bGVcbiAgICBwcm9qZWN0c0VsLmFwcGVuZENoaWxkKHByb2pFbClcbiAgICBwcm9qRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLChlKSA9PiByZW5kZXJUYXNrcyhlLnRhcmdldC5jbGFzc0xpc3RbMF0pKVxuXG59KX1cblxuZXhwb3J0IHsgc2hvd1Byb2plY3RzIH0iLCIvLyBjb25zdCB7IHRhc2tDYW52YXMgfSA9IHJlcXVpcmUoXCIuL2VsZW1lbnRzXCIpO1xuLy8gY29uc3QgeyBzaG93U3BlY2lmaWNQcm9qZWN0LCBjdXJyZW50UHJvamVjdCB9ID0gcmVxdWlyZShcIi4vcHJvamVjdHNcIik7XG5cbmltcG9ydCB7IHRhc2tDYW52YXMgfSBmcm9tIFwiLi9lbGVtZW50cy5qc1wiXG5pbXBvcnQgeyB0b2dnbGVNb2RhbCB9IGZyb20gXCIuL21vZGFsLmpzXCI7XG5pbXBvcnQgeyBzaG93U3BlY2lmaWNQcm9qZWN0LCBjdXJyZW50UHJvamVjdCB9IGZyb20gJy4vcHJvamVjdHMuanMnXG5pbXBvcnQgeyBsaXN0T2ZUb0RvcywgcmVtb3ZlVGFza0Zyb21MaXN0IH0gZnJvbSBcIi4vdG9Eb09iamVjdC5qc1wiO1xuXG5mdW5jdGlvbiByZW5kZXJUYXNrcyhwcm9qZWN0KSB7XG4gICAgd2hpbGUgKHRhc2tDYW52YXMuZmlyc3RDaGlsZCkge1xuICAgICAgICB0YXNrQ2FudmFzLmZpcnN0Q2hpbGQucmVtb3ZlKCk7XG4gICAgfVxuXG5cbiAgICBjb25zdCB0YXNrcyA9IHByb2plY3QgPT09ICdBbGwnID8gbGlzdE9mVG9Eb3MgOiBzaG93U3BlY2lmaWNQcm9qZWN0KHByb2plY3QpXG5cblxuICAgIFxuICAgIHRhc2tzLmZvckVhY2goIHRhc2sgPT4ge1xuXG4gICAgICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2tzJylcbiAgICAgICAgdGFza0NhbnZhcy5hcHBlbmRDaGlsZCh0YXNrRGl2KVxuICAgICAgICBjb25zdCBpbmREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBpbmREaXYuY2xhc3NMaXN0LmFkZCgndGFzaycpXG4gICAgICAgIGluZERpdi5kYXRhc2V0LnRpdGxlID0gdGFzay50aXRsZVxuICAgICAgICBjb25zdCBjaGVja2JveERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGNoZWNrYm94RGl2LmNsYXNzTGlzdC5hZGQoJ2NoZWNrYm94JylcbiAgICAgICAgY29uc3QgZWRpdERlbGV0ZUJ1dHRvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGVkaXREZWxldGVCdXR0b25EaXYuY2xhc3NMaXN0LmFkZCgnZWRpdC1kZWxldGUnKVxuXG4gICAgICAgIGNvbnN0IHRhc2tDaGVja0JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICAgICAgdGFza0NoZWNrQm94LnR5cGUgPSAnY2hlY2tib3gnXG4gICAgICAgIHRhc2tDaGVja0JveC5pZCA9IHRhc2sudGl0bGVcbiAgICAgICAgdGFza0NoZWNrQm94Lm5hbWUgPSB0YXNrLmlkXG5cbiAgICAgICAgaWYgKHRhc2suaXNDb21wbGV0ZWQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGFza0NoZWNrQm94LmNoZWNrZWQgPSB0cnVlXG4gICAgICAgIH0gXG5cblxuXG4gICAgICAgIGNvbnN0IHRhc2tMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJylcbiAgICAgICAgdGFza0xhYmVsLmZvciA9IHRhc2sudGl0bGVcbiAgICAgICAgdGFza0xhYmVsLmlubmVyVGV4dCA9IHRhc2sudGl0bGVcblxuICAgICAgICBjaGVja2JveERpdi5hcHBlbmRDaGlsZCh0YXNrQ2hlY2tCb3gpXG4gICAgICAgIGNoZWNrYm94RGl2LmFwcGVuZENoaWxkKHRhc2tMYWJlbClcbiAgICAgICAgXG5cbiAgICAgICAgdGFza0NoZWNrQm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgdGFzay5pc0NvbXBsZXRlZCA9IHRydWVcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGlzdG9mdG9kb3MnLEpTT04uc3RyaW5naWZ5KGxpc3RPZlRvRG9zKSlcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXNrLmlzQ29tcGxldGVkID0gZmFsc2VcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGlzdG9mdG9kb3MnLEpTT04uc3RyaW5naWZ5KGxpc3RPZlRvRG9zKSlcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IGRhdGUgPSB0YXNrLmR1ZURhdGVcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSB0YXNrLmRlc2NyaXB0aW9uXG4gICAgICAgIGNvbnN0IHByaW9yaXR5ID0gdGFzay5wcmlvcml0eVxuICAgICAgICBjb25zdCBwcm9qZWN0ID0gdGFzay5wcm9qZWN0XG4gICAgICAgIGNvbnN0IGlkID0gdGFzay5pZFxuXG4gXG5cbiAgICAgICAgY29uc3QgZGF0ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgY29uc3QgcHJpb3JpdHlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgY29uc3QgaWREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gICAgICAgIGRhdGVEaXYuaW5uZXJUZXh0ID0gZGF0ZVxuICAgICAgICBkYXRlRGl2LmNsYXNzTGlzdC5hZGQoJ2RhdGUnKVxuICAgICAgICBkZXNjcmlwdGlvbkRpdi5pbm5lclRleHQgPSBkZXNjcmlwdGlvblxuICAgICAgICBkZXNjcmlwdGlvbkRpdi5jbGFzc0xpc3QuYWRkKCdkYXRlJylcbiAgICAgICAgcHJpb3JpdHlEaXYuaW5uZXJUZXh0ID0gcHJpb3JpdHlcbiAgICAgICAgcHJpb3JpdHlEaXYuY2xhc3NMaXN0LmFkZCgncHJpb3JpdHknKVxuICAgICAgICBwcm9qZWN0RGl2LmlubmVyVGV4dCA9IHByb2plY3RcbiAgICAgICAgcHJvamVjdERpdi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0JylcbiAgICAgICAgaWREaXYuY2xhc3NMaXN0LmFkZCgnaGlkZGVuLXRhc2snKVxuICAgICAgICBpZERpdi5pbm5lclRleHQgPSBpZFxuXG4gICAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQoaW5kRGl2KVxuICAgICAgICBpbmREaXYuYXBwZW5kKGNoZWNrYm94RGl2KVxuICAgICAgICBpbmREaXYuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25EaXYpXG4gICAgICAgIGluZERpdi5hcHBlbmRDaGlsZChkYXRlRGl2KVxuICAgICAgICBpbmREaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlEaXYpXG4gICAgICAgIGluZERpdi5hcHBlbmRDaGlsZChwcm9qZWN0RGl2KVxuXG4gICAgICAgIGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucy1vdXRsaW5lZCcpXG4gICAgICAgIGVkaXRCdXR0b24uaW5uZXJUZXh0ID0gJ2VkaXQnXG5cbiAgICAgICAgY29uc3QgdHJhc2hCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgdHJhc2hCdXR0b24uY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMtb3V0bGluZWQnKVxuICAgICAgICB0cmFzaEJ1dHRvbi5pbm5lclRleHQgPSAnZGVsZXRlJ1xuICAgICAgICBpbmREaXYuYXBwZW5kQ2hpbGQoZWRpdERlbGV0ZUJ1dHRvbkRpdilcbiAgICAgICAgaW5kRGl2LmFwcGVuZENoaWxkKGlkRGl2KVxuXG4gICAgICAgIGVkaXREZWxldGVCdXR0b25EaXYuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbilcbiAgICAgICAgZWRpdERlbGV0ZUJ1dHRvbkRpdi5hcHBlbmRDaGlsZCh0cmFzaEJ1dHRvbilcblxuICAgICAgICB0cmFzaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICByZW1vdmVUYXNrRnJvbUxpc3QoZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXQudGl0bGUpXG4gICAgICAgICAgICByZW5kZXJUYXNrcyh0YXNrLnByb2plY3QpXG4gICAgICAgICAgICBcbiAgICAgICAgfSlcblxuICAgICAgICBlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGRpdiA9IGUudGFyZ2V0XG4gICAgICAgICAgIGxldCBuZXdNb2RhbCA9IHRvZ2dsZU1vZGFsLmJpbmQoZGl2KVxuICAgICAgICAgICBuZXdNb2RhbCgpXG4gICAgICAgIH0pXG4gICAgICAgIFxuXG4gICAgICAgIFxuICAgIH0pICBcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGlzdG9mdG9kb3MnLEpTT04uc3RyaW5naWZ5KGxpc3RPZlRvRG9zKSlcblxufVxuXG5cblxuXG5cblxuZXhwb3J0IHsgcmVuZGVyVGFza3MgfVxuIiwiaW1wb3J0IHsgdHJpZ2dlciwgY2xvc2VCdXR0b24sdG9nZ2xlTW9kYWwsbW9kYWwsbW9kYWxQcm9qLHRyaWdnZXJQcm9qLGNsb3NlQnV0dG9uUHJvaixlZGl0VGFza0J1dHRvbiB9IGZyb20gJy4vbW9kYWwuanMnXG5pbXBvcnQgeyBhZGRQcm9qZWN0VG9MaXN0LCBsaXN0T2ZQcm9qZWN0cywgcHJvamVjdEZhY3RvcnkgfSBmcm9tICcuL3Byb2plY3RzLmpzJztcbmltcG9ydCB7IHNob3dQcm9qZWN0cyB9IGZyb20gJy4vcmVuZGVyUHJvamVjdHMuanMnO1xuaW1wb3J0IHsgcmVuZGVyVGFza3MgfSBmcm9tICcuL3JlbmRlclRhc2tzLmpzJztcbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnO1xuXG5cbmNvbnN0IHRvRG9MaXN0ID0gW107XG5cblxuXG5jb25zdCB0b0RvRmFjdG9yeSA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0LCBpc0NvbXBsZXRlZCkgPT4ge1xuXG4gICAgbGV0IGlkID0gdXVpZHY0KClcblxuICAgIGlmIChwcm9qZWN0PT1cIlwiKSB7XG4gICAgICAgIHByb2plY3QgPSBcIkluYm94XCJcbiAgICB9XG5cbiAgICBsZXQgcHJvakV4aXN0cyA9IGZhbHNlO1xuICAgIGxpc3RPZlByb2plY3RzLmZvckVhY2goIHByb2ogPT4ge1xuICAgICAgICBpZiAocHJvai50aXRsZSA9PT0gcHJvamVjdCkge1xuICAgICAgICAgICAgcHJvakV4aXN0cyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKHByb2pFeGlzdHMgPT09IGZhbHNlKSB7XG4gICAgICAgIGxpc3RPZlByb2plY3RzLnB1c2gocHJvamVjdEZhY3RvcnkocHJvamVjdCxcIk5BXCIpKVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGlzdG9mcHJvamVjdHMnLEpTT04uc3RyaW5naWZ5KGxpc3RPZlByb2plY3RzKSlcblxuICAgICAgICBzaG93UHJvamVjdHMoKVxuICAgIH1cblxuICAgIHJldHVybiB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QsIGlzQ29tcGxldGVkLGlkIH1cbn1cblxuY29uc3QgbGlzdE9mVG9Eb3MgPSBbXVxuXG5mdW5jdGlvbiBhZGRUYXNrVG9MaXN0KCkge1xuXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGl0bGUnKVxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJylcbiAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RhdGUnKVxuICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaW9yaXR5JylcbiAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QnKVxuICAgIGxpc3RPZlRvRG9zLnB1c2godG9Eb0ZhY3RvcnkodGl0bGUudmFsdWUsZGVzY3JpcHRpb24udmFsdWUsZHVlRGF0ZS52YWx1ZSxwcmlvcml0eS52YWx1ZSxwcm9qZWN0LnZhbHVlLGZhbHNlKSlcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGlzdG9mdG9kb3MnLEpTT04uc3RyaW5naWZ5KGxpc3RPZlRvRG9zKSlcblxuICAgIGxldCBuZXdUb2dnbGUgPSB0b2dnbGVNb2RhbC5iaW5kKHRoaXMpXG4gICAgbmV3VG9nZ2xlKClcbiAgICBsZXQgc2V0UHJvamVjdCA9IHByb2plY3QudmFsdWUgPT1cIlwiID8gXCJJbmJveFwiIDogcHJvamVjdC52YWx1ZVxuXG4gICAgcmVuZGVyVGFza3Moc2V0UHJvamVjdClcbiAgICBhZGRUYXNrLnJlc2V0KClcbiAgICBcblxuXG59XG5cbmNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkVGFzaycpXG5hZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsYWRkVGFza1RvTGlzdClcblxuXG5mdW5jdGlvbiByZW1vdmVUYXNrRnJvbUxpc3QodGl0bGUpIHtcbiAgICBsZXQgdGFza0luZGV4ID0gbGlzdE9mVG9Eb3MuZmluZEluZGV4KHRhc2sgPT4gdGFzay50aXRsZSA9PSB0aXRsZSlcbiAgICBsaXN0T2ZUb0Rvcy5zcGxpY2UodGFza0luZGV4LDEpXG4gICAgcmV0dXJuIGxpc3RPZlRvRG9zXG59XG5cbmZ1bmN0aW9uIGVkaXRUYXNrKGlkKSB7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdFRpdGxlJylcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0RGVzY3JpcHRpb24nKVxuICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdERhdGUnKVxuICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXRQcmlvcml0eScpXG4gICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0UHJvamVjdCcpXG5cbiAgICBsZXQgdGFza0luZGV4ID0gbGlzdE9mVG9Eb3MuZmluZEluZGV4KHRhc2sgPT4gdGFzay5pZCA9PSBpZClcbiAgICBsaXN0T2ZUb0Rvc1t0YXNrSW5kZXhdLnRpdGxlID0gdGl0bGUudmFsdWVcbiAgICBsaXN0T2ZUb0Rvc1t0YXNrSW5kZXhdLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24udmFsdWVcbiAgICBsaXN0T2ZUb0Rvc1t0YXNrSW5kZXhdLmR1ZURhdGUgPSBkdWVEYXRlLnZhbHVlXG4gICAgbGlzdE9mVG9Eb3NbdGFza0luZGV4XS5wcmlvcml0eSA9IHByaW9yaXR5LnZhbHVlXG4gICAgbGlzdE9mVG9Eb3NbdGFza0luZGV4XS5wcm9qZWN0ID0gcHJvamVjdC52YWx1ZVxuICAgIFxuICAgIGNvbnN0IGVkaXRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0LW1vZGFsJylcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGlzdG9mdG9kb3MnLEpTT04uc3RyaW5naWZ5KGxpc3RPZlRvRG9zKSlcbiAgICBsZXQgc2V0UHJvamVjdCA9IHByb2plY3QudmFsdWUgPT1cIlwiID8gXCJJbmJveFwiIDogcHJvamVjdC52YWx1ZVxuXG4gICAgbGV0IG5ld1RvZ2dsZSA9IHRvZ2dsZU1vZGFsLmJpbmQoZWRpdE1vZGFsKVxuICAgIG5ld1RvZ2dsZSgpXG4gICAgcmVuZGVyVGFza3Moc2V0UHJvamVjdClcbiAgICBhZGRUYXNrLnJlc2V0KClcblxufVxuXG5cblxuZnVuY3Rpb24gZmluZFRhc2tCeUlkKGlkKSB7XG4gICAgcmV0dXJuIGxpc3RPZlRvRG9zLmZpbmQodGFzayA9PiB0YXNrLmlkID09IGlkKVxufVxuXG5cbmV4cG9ydCB7IHRvRG9GYWN0b3J5LCBsaXN0T2ZUb0RvcywgYWRkVGFzaywgcmVtb3ZlVGFza0Zyb21MaXN0LCBmaW5kVGFza0J5SWQsIGVkaXRUYXNrfVxuXG5cbi8vIGNvbnN0IHRvZG8xID0gdG9Eb0ZhY3RvcnkoJ25pY2snLCduaWNrXFwncyBkZXNjcmlwdGlvbicsICcyMDIxLTA5LTA0JywxLCdpbmJveCcsZmFsc2UpIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBsaXN0T2ZUb0RvcywgYWRkVGFzaywgdG9Eb0ZhY3RvcnksZWRpdFRhc2tCdXR0b259IGZyb20gJy4vdG9Eb09iamVjdC5qcydcbmltcG9ydCB7IGFkZFByb2plY3RUb0xpc3QsIHByb2plY3RGYWN0b3J5LCBsaXN0T2ZQcm9qZWN0cywgc2hvd1NwZWNpZmljUHJvamVjdCwgY3VycmVudFByb2plY3QgfSBmcm9tICcuL3Byb2plY3RzLmpzJ1xuaW1wb3J0IHsgc2hvd1Byb2plY3RzIH0gZnJvbSAnLi9yZW5kZXJQcm9qZWN0cy5qcydcbmltcG9ydCB7IHJlbmRlclRhc2tzIH0gZnJvbSAnLi9yZW5kZXJUYXNrcy5qcydcblxuXG5pZiAobG9jYWxTdG9yYWdlLmxlbmd0aCA+IDEgKSB7XG5cbiAgICBsZXQgbG9jYWxUb2RvcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlWydsaXN0b2Z0b2RvcyddKVxuICAgIGxvY2FsVG9kb3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgbGlzdE9mVG9Eb3MucHVzaCh0YXNrKVxuICAgIH0pXG4gICAgbGV0IGxvY2FsUHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVsnbGlzdG9mcHJvamVjdHMnXSlcbiAgICBsb2NhbFByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgIGxpc3RPZlByb2plY3RzLnB1c2gocHJvamVjdClcbiAgICB9KVxuICAgIHNob3dQcm9qZWN0cygpXG4gICAgcmVuZGVyVGFza3MoXCJJbmJveFwiKVxuXG4gIH1cbiAgXG5cblxuc2hvd1Byb2plY3RzKClcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==