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
/* harmony import */ var _renderProjects_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderProjects.js */ "./src/renderProjects.js");
/* harmony import */ var _toDoObject_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toDoObject.js */ "./src/toDoObject.js");
// const { taskCanvas } = require("./elements");
// const { showSpecificProject, currentProject } = require("./projects");







function renderTasks(project) {
    while (_elements_js__WEBPACK_IMPORTED_MODULE_0__.taskCanvas.firstChild) {
        _elements_js__WEBPACK_IMPORTED_MODULE_0__.taskCanvas.firstChild.remove();
    }


    const tasks = project === 'All' ? _toDoObject_js__WEBPACK_IMPORTED_MODULE_4__.listOfToDos : (0,_projects_js__WEBPACK_IMPORTED_MODULE_2__.showSpecificProject)(project)


    
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
                localStorage.setItem('listoftodos',JSON.stringify(_toDoObject_js__WEBPACK_IMPORTED_MODULE_4__.listOfToDos))

            } else {
                task.isCompleted = false
                localStorage.setItem('listoftodos',JSON.stringify(_toDoObject_js__WEBPACK_IMPORTED_MODULE_4__.listOfToDos))

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
            ;(0,_toDoObject_js__WEBPACK_IMPORTED_MODULE_4__.removeTaskFromList)(e.target.parentElement.parentElement.dataset.title)
            renderTasks(task.project)
            
        })

        editButton.addEventListener('click',(e) => {
            let div = e.target
           let newModal = _modal_js__WEBPACK_IMPORTED_MODULE_1__.toggleModal.bind(div)
           newModal()
        })
        

        
    })  

    const deleteButton = document.createElement('button')
    deleteButton.textContent = "Delete all tasks and project"
    if (project == 'All' || project == 'Inbox' ) {

    } else {
    _elements_js__WEBPACK_IMPORTED_MODULE_0__.taskCanvas.appendChild(deleteButton)
    }

    deleteButton.addEventListener('click', () => {
        const nick = _toDoObject_js__WEBPACK_IMPORTED_MODULE_4__.listOfToDos.filter(task => task.project !== project)
        _toDoObject_js__WEBPACK_IMPORTED_MODULE_4__.listOfToDos.splice(0,_toDoObject_js__WEBPACK_IMPORTED_MODULE_4__.listOfToDos.length)
        nick.forEach(task => _toDoObject_js__WEBPACK_IMPORTED_MODULE_4__.listOfToDos.push(task))
        let projectIndex = _projects_js__WEBPACK_IMPORTED_MODULE_2__.listOfProjects.find(task => console.log(task.title == project))
        _projects_js__WEBPACK_IMPORTED_MODULE_2__.listOfProjects.splice(projectIndex,1)
        ;(0,_renderProjects_js__WEBPACK_IMPORTED_MODULE_3__.showProjects)()
        renderTasks("Inbox")
        
    })



    localStorage.setItem('listoftodos',JSON.stringify(_toDoObject_js__WEBPACK_IMPORTED_MODULE_4__.listOfToDos))

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQSxvQkFBb0IsdURBQWdCO0FBQ3BDO0FBQ0E7O0FBRUEsSUFBSSw2REFBVztBQUNmO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQix1REFBZ0I7QUFDcEM7QUFDQSxJQUFJLDZEQUFXO0FBQ2Y7O0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7OztBQUd1Rjs7O0FBR3ZGOzs7Ozs7VUN4R0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05pRjtBQUNvQztBQUNuRTtBQUNKOzs7QUFHOUM7O0FBRUE7QUFDQTtBQUNBLFFBQVEsNERBQWdCO0FBQ3hCLEtBQUs7QUFDTDtBQUNBO0FBQ0EsUUFBUSw2REFBbUI7QUFDM0IsS0FBSztBQUNMLElBQUksaUVBQVk7QUFDaEIsSUFBSSw2REFBVzs7QUFFZjtBQUNBOzs7QUFHQSxnRUFBWSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9saXN0Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9yZWdleC5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcm5nLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3Y0LmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9lbGVtZW50cy5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9tb2RhbC5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9yZW5kZXJQcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9yZW5kZXJUYXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy90b0RvT2JqZWN0LmpzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxudmFyIGdldFJhbmRvbVZhbHVlcztcbnZhciBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLiBBbHNvLFxuICAgIC8vIGZpbmQgdGhlIGNvbXBsZXRlIGltcGxlbWVudGF0aW9uIG9mIGNyeXB0byAobXNDcnlwdG8pIG9uIElFMTEuXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKSB8fCB0eXBlb2YgbXNDcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT09ICdmdW5jdGlvbicgJiYgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQobXNDcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG4vKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cblxudmFyIGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSkpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyKSB7XG4gIHZhciBvZmZzZXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDA7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICB2YXIgdXVpZCA9IChieXRlVG9IZXhbYXJyW29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDNdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA1XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDZdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgN11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDldXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTNdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTVdXSkudG9Mb3dlckNhc2UoKTsgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuXG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ2lmeTsiLCJpbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCBzdHJpbmdpZnkgZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpOyAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG5cbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDsgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG5cbiAgaWYgKGJ1Zikge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICBidWZbb2Zmc2V0ICsgaV0gPSBybmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICByZXR1cm4gc3RyaW5naWZ5KHJuZHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2NDsiLCJpbXBvcnQgUkVHRVggZnJvbSAnLi9yZWdleC5qcyc7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlKHV1aWQpIHtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyAmJiBSRUdFWC50ZXN0KHV1aWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZTsiLCJjb25zdCBwcm9qZWN0c0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzJylcbmNvbnN0IHRhc2tDYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1jYW52YXMnKVxuXG5cbmV4cG9ydCB7IHByb2plY3RzRWwsdGFza0NhbnZhcyB9IiwiaW1wb3J0IHsgZmluZFRhc2tCeUlkLGVkaXRUYXNrIH0gZnJvbSBcIi4vdG9Eb09iamVjdFwiO1xuXG5cbmNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tb2RhbFwiKTtcbmNvbnN0IHRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRyaWdnZXJcIik7XG5jb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2xvc2UtYnV0dG9uXCIpO1xuY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zdWJtaXQtYnV0dG9uXCIpXG5jb25zdCBlZGl0VGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0VGFzaycpXG5cbmZ1bmN0aW9uIHRvZ2dsZU1vZGFsKCkge1xuXG4gICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCd0cmlnZ2VyJykpIHtcbiAgICAgICAgdGhpcy5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZShcInNob3ctbW9kYWxcIik7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnc2hvdy1tb2RhbCcpKSB7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1tb2RhbCcpXG4gICAgfSBcbiAgICBlbHNlIGlmICh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbFwiKSl7XG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJzaG93LW1vZGFsXCIpXG4gICAgfSBlbHNlIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnbWF0ZXJpYWwtaWNvbnMtb3V0bGluZWQnKSkge1xuXG4gICAgICAgIGxldCBlZGl0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWRpdC1tb2RhbCcpXG4gICAgICAgIGVkaXRNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LW1vZGFsJylcbiAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdFRpdGxlJylcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdERlc2NyaXB0aW9uJylcbiAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0RGF0ZScpXG4gICAgICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXRQcmlvcml0eScpXG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdFByb2plY3QnKVxuXG4gICAgICAgIGNvbnN0IHRhc2sgPSBmaW5kVGFza0J5SWQodGhpcy5wYXJlbnRFbGVtZW50Lm5leHRFbGVtZW50U2libGluZy5pbm5lclRleHQpXG4gICAgICAgIGNvbnN0IHRhc2tJZCA9IHRoaXMucGFyZW50RWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcuaW5uZXJUZXh0XG4gICAgICAgIHRpdGxlLnZhbHVlID0gdGFzay50aXRsZVxuICAgICAgICBkZXNjcmlwdGlvbi52YWx1ZSA9IHRhc2suZGVzY3JpcHRpb25cbiAgICAgICAgZHVlRGF0ZS52YWx1ZSA9IHRhc2suZHVlRGF0ZVxuICAgICAgICBwcmlvcml0eS52YWx1ZSA9IHRhc2sucHJpb3JpdHlcbiAgICAgICAgcHJvamVjdC52YWx1ZSA9IHRhc2sucHJvamVjdFxuXG4gICAgICAgIGNvbnN0IGNsaWNrRnVuY3Rpb24gPSAoKSA9PiBlZGl0VGFzayh0YXNrSWQpXG4gICAgICAgIGVkaXRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGNsaWNrRnVuY3Rpb24se29uY2U6dHJ1ZX0pXG5cblxuXG5cblxuICAgIH0gXG4gICAgXG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJzaG93LW1vZGFsXCIpXG4gICAgfVxufVxuXG5mdW5jdGlvbiB3aW5kb3dPbkNsaWNrKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gbW9kYWwpIHtcbiAgICAgICAgdG9nZ2xlTW9kYWwoKTtcbiAgICB9XG59XG5cbnRyaWdnZXIuZm9yRWFjaChidG4gPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVNb2RhbCkpO1xuY2xvc2VCdXR0b24uZm9yRWFjaChidG4gPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVNb2RhbCkpO1xuLy8gc3VibWl0QnV0dG9uLmZvckVhY2goYnRuID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0b2dnbGVNb2RhbCkpXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHdpbmRvd09uQ2xpY2spO1xuXG5cblxuXG5leHBvcnQgeyB0cmlnZ2VyLCBjbG9zZUJ1dHRvbiwgdG9nZ2xlTW9kYWwsIG1vZGFsLHN1Ym1pdEJ1dHRvbixlZGl0VGFza0J1dHRvbiB9IiwiaW1wb3J0IHsgdHJpZ2dlciwgY2xvc2VCdXR0b24sIHRvZ2dsZU1vZGFsLCBtb2RhbCB9IGZyb20gJy4vbW9kYWwuanMnXG5pbXBvcnQgeyBzaG93UHJvamVjdHMgfSBmcm9tICcuL3JlbmRlclByb2plY3RzLmpzJ1xuaW1wb3J0IHsgbGlzdE9mVG9Eb3MgfSBmcm9tICcuL3RvRG9PYmplY3QuanMnXG5cbmNvbnN0IGxpc3RPZlByb2plY3RzID0gW11cblxuaWYgKGxvY2FsU3RvcmFnZS5sZW5ndGggPT0gMCkge1xuXG5sZXQgYWRkUHJvamVjdHMgPSBbe3RpdGxlOiAnQWxsJ30se3RpdGxlOiBcIkluYm94XCJ9XVxuYWRkUHJvamVjdHMuZm9yRWFjaChwcm9qID0+IGxpc3RPZlByb2plY3RzLnB1c2gocHJvaikpXG5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGlzdG9mcHJvamVjdHMnLEpTT04uc3RyaW5naWZ5KGxpc3RPZlByb2plY3RzKSlcbn1cblxuY29uc3QgcHJvamVjdEZhY3RvcnkgPSAodGl0bGUsZGVzY3JpcHRpb24pID0+IHtcblxuICAgIHJldHVybiB7IHRpdGxlLCBkZXNjcmlwdGlvbiB9XG59XG5cbmZ1bmN0aW9uIGFkZFByb2plY3RUb0xpc3QoKSB7XG5cbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LXRpdGxlJylcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWRlc2NyaXB0aW9uJylcbiAgICBsaXN0T2ZQcm9qZWN0cy5wdXNoKHByb2plY3RGYWN0b3J5KHRpdGxlLnZhbHVlLGRlc2NyaXB0aW9uLnZhbHVlKSlcbiAgICBsZXQgbmV3VG9nZ2xlID0gdG9nZ2xlTW9kYWwuYmluZCh0aGlzKVxuICAgIG5ld1RvZ2dsZSgpXG4gICAgc3VibWl0LnJlc2V0KClcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGlzdG9mcHJvamVjdHMnLEpTT04uc3RyaW5naWZ5KGxpc3RPZlByb2plY3RzKSlcblxuICAgIHNob3dQcm9qZWN0cygpXG5cbn1cblxuLy8gY29uc3QgYWRkUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRQcm9qZWN0Jylcbi8vIGFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JyxhZGRQcm9qZWN0VG9MaXN0LmJpbmQoc3VibWl0QnV0dG9uKSlcbmNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRQcm9qZWN0JylcbnN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLGFkZFByb2plY3RUb0xpc3QpXG5cbmNvbnN0IGRpc3BsYXlMaXN0T2ZUb0RvcyA9IFtdXG5cbmZ1bmN0aW9uIHNob3dTcGVjaWZpY1Byb2plY3QocHJvamVjdCkge1xuICAgIC8vIGRpc3BsYXlMaXN0T2ZUb0Rvcy5sZW5ndGggPSAwXG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBsaXN0T2ZUb0Rvcy5maWx0ZXIoIHRvZG8gPT4ge1xuICAgICAgICByZXR1cm4gdG9kby5wcm9qZWN0ID09IHByb2plY3RcbiAgICB9KVxuICAgIHJldHVybiBwcm9qZWN0TGlzdFxufVxuXG5jb25zdCBjdXJyZW50UHJvamVjdCA9IGxpc3RPZlByb2plY3RzWzBdXG5cbmV4cG9ydCB7IGFkZFByb2plY3RUb0xpc3QsIHByb2plY3RGYWN0b3J5LCBsaXN0T2ZQcm9qZWN0cywgc2hvd1NwZWNpZmljUHJvamVjdCwgY3VycmVudFByb2plY3QgfSIsImltcG9ydCB7IGxpc3RPZlByb2plY3RzIH0gZnJvbSAnLi9wcm9qZWN0cy5qcydcbmltcG9ydCB7IHByb2plY3RzRWwgfSBmcm9tICAnLi9lbGVtZW50cy5qcydcbmltcG9ydCB7IHJlbmRlclRhc2tzIH0gZnJvbSAnLi9yZW5kZXJUYXNrcy5qcyc7XG5cbmZ1bmN0aW9uIHNob3dQcm9qZWN0cygpIHtcbiAgICB3aGlsZSAocHJvamVjdHNFbC5maXJzdENoaWxkKSB7XG4gICAgICAgIHByb2plY3RzRWwucmVtb3ZlQ2hpbGQocHJvamVjdHNFbC5maXJzdENoaWxkKTtcbiAgICB9XG5saXN0T2ZQcm9qZWN0cy5mb3JFYWNoKHByb2ogPT4ge1xuXG5cbiAgICBjb25zdCBwcm9qRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpXG4gICAgcHJvakVsLmNsYXNzTGlzdC5hZGQocHJvai50aXRsZSwncHJvamVjdExpc3QnKVxuICAgIHByb2pFbC5pbm5lclRleHQgPSBwcm9qLnRpdGxlXG4gICAgcHJvamVjdHNFbC5hcHBlbmRDaGlsZChwcm9qRWwpXG4gICAgcHJvakVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoZSkgPT4gcmVuZGVyVGFza3MoZS50YXJnZXQuY2xhc3NMaXN0WzBdKSlcblxufSl9XG5cbmV4cG9ydCB7IHNob3dQcm9qZWN0cyB9IiwiLy8gY29uc3QgeyB0YXNrQ2FudmFzIH0gPSByZXF1aXJlKFwiLi9lbGVtZW50c1wiKTtcbi8vIGNvbnN0IHsgc2hvd1NwZWNpZmljUHJvamVjdCwgY3VycmVudFByb2plY3QgfSA9IHJlcXVpcmUoXCIuL3Byb2plY3RzXCIpO1xuXG5pbXBvcnQgeyB0YXNrQ2FudmFzIH0gZnJvbSBcIi4vZWxlbWVudHMuanNcIlxuaW1wb3J0IHsgdG9nZ2xlTW9kYWwgfSBmcm9tIFwiLi9tb2RhbC5qc1wiO1xuaW1wb3J0IHsgc2hvd1NwZWNpZmljUHJvamVjdCwgY3VycmVudFByb2plY3QsIGxpc3RPZlByb2plY3RzIH0gZnJvbSAnLi9wcm9qZWN0cy5qcydcbmltcG9ydCB7IHNob3dQcm9qZWN0cyB9IGZyb20gXCIuL3JlbmRlclByb2plY3RzLmpzXCI7XG5pbXBvcnQgeyBsaXN0T2ZUb0RvcywgcmVtb3ZlVGFza0Zyb21MaXN0IH0gZnJvbSBcIi4vdG9Eb09iamVjdC5qc1wiO1xuXG5mdW5jdGlvbiByZW5kZXJUYXNrcyhwcm9qZWN0KSB7XG4gICAgd2hpbGUgKHRhc2tDYW52YXMuZmlyc3RDaGlsZCkge1xuICAgICAgICB0YXNrQ2FudmFzLmZpcnN0Q2hpbGQucmVtb3ZlKCk7XG4gICAgfVxuXG5cbiAgICBjb25zdCB0YXNrcyA9IHByb2plY3QgPT09ICdBbGwnID8gbGlzdE9mVG9Eb3MgOiBzaG93U3BlY2lmaWNQcm9qZWN0KHByb2plY3QpXG5cblxuICAgIFxuICAgIHRhc2tzLmZvckVhY2goIHRhc2sgPT4ge1xuXG4gICAgICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2tzJylcbiAgICAgICAgdGFza0NhbnZhcy5hcHBlbmRDaGlsZCh0YXNrRGl2KVxuICAgICAgICBjb25zdCBpbmREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBpbmREaXYuY2xhc3NMaXN0LmFkZCgndGFzaycpXG4gICAgICAgIGluZERpdi5kYXRhc2V0LnRpdGxlID0gdGFzay50aXRsZVxuICAgICAgICBjb25zdCBjaGVja2JveERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGNoZWNrYm94RGl2LmNsYXNzTGlzdC5hZGQoJ2NoZWNrYm94JylcbiAgICAgICAgY29uc3QgZWRpdERlbGV0ZUJ1dHRvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGVkaXREZWxldGVCdXR0b25EaXYuY2xhc3NMaXN0LmFkZCgnZWRpdC1kZWxldGUnKVxuXG4gICAgICAgIGNvbnN0IHRhc2tDaGVja0JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICAgICAgdGFza0NoZWNrQm94LnR5cGUgPSAnY2hlY2tib3gnXG4gICAgICAgIHRhc2tDaGVja0JveC5pZCA9IHRhc2sudGl0bGVcbiAgICAgICAgdGFza0NoZWNrQm94Lm5hbWUgPSB0YXNrLmlkXG5cbiAgICAgICAgaWYgKHRhc2suaXNDb21wbGV0ZWQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGFza0NoZWNrQm94LmNoZWNrZWQgPSB0cnVlXG4gICAgICAgIH0gXG5cblxuXG4gICAgICAgIGNvbnN0IHRhc2tMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJylcbiAgICAgICAgdGFza0xhYmVsLmZvciA9IHRhc2sudGl0bGVcbiAgICAgICAgdGFza0xhYmVsLmlubmVyVGV4dCA9IHRhc2sudGl0bGVcblxuICAgICAgICBjaGVja2JveERpdi5hcHBlbmRDaGlsZCh0YXNrQ2hlY2tCb3gpXG4gICAgICAgIGNoZWNrYm94RGl2LmFwcGVuZENoaWxkKHRhc2tMYWJlbClcbiAgICAgICAgXG5cbiAgICAgICAgdGFza0NoZWNrQm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgdGFzay5pc0NvbXBsZXRlZCA9IHRydWVcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGlzdG9mdG9kb3MnLEpTT04uc3RyaW5naWZ5KGxpc3RPZlRvRG9zKSlcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXNrLmlzQ29tcGxldGVkID0gZmFsc2VcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGlzdG9mdG9kb3MnLEpTT04uc3RyaW5naWZ5KGxpc3RPZlRvRG9zKSlcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IGRhdGUgPSB0YXNrLmR1ZURhdGVcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSB0YXNrLmRlc2NyaXB0aW9uXG4gICAgICAgIGNvbnN0IHByaW9yaXR5ID0gdGFzay5wcmlvcml0eVxuICAgICAgICBjb25zdCBwcm9qZWN0ID0gdGFzay5wcm9qZWN0XG4gICAgICAgIGNvbnN0IGlkID0gdGFzay5pZFxuXG4gXG5cbiAgICAgICAgY29uc3QgZGF0ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgY29uc3QgcHJpb3JpdHlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgY29uc3QgaWREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gICAgICAgIGRhdGVEaXYuaW5uZXJUZXh0ID0gZGF0ZVxuICAgICAgICBkYXRlRGl2LmNsYXNzTGlzdC5hZGQoJ2RhdGUnKVxuICAgICAgICBkZXNjcmlwdGlvbkRpdi5pbm5lclRleHQgPSBkZXNjcmlwdGlvblxuICAgICAgICBkZXNjcmlwdGlvbkRpdi5jbGFzc0xpc3QuYWRkKCdkYXRlJylcbiAgICAgICAgcHJpb3JpdHlEaXYuaW5uZXJUZXh0ID0gcHJpb3JpdHlcbiAgICAgICAgcHJpb3JpdHlEaXYuY2xhc3NMaXN0LmFkZCgncHJpb3JpdHknKVxuICAgICAgICBwcm9qZWN0RGl2LmlubmVyVGV4dCA9IHByb2plY3RcbiAgICAgICAgcHJvamVjdERpdi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0JylcbiAgICAgICAgaWREaXYuY2xhc3NMaXN0LmFkZCgnaGlkZGVuLXRhc2snKVxuICAgICAgICBpZERpdi5pbm5lclRleHQgPSBpZFxuXG4gICAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQoaW5kRGl2KVxuICAgICAgICBpbmREaXYuYXBwZW5kKGNoZWNrYm94RGl2KVxuICAgICAgICBpbmREaXYuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25EaXYpXG4gICAgICAgIGluZERpdi5hcHBlbmRDaGlsZChkYXRlRGl2KVxuICAgICAgICBpbmREaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlEaXYpXG4gICAgICAgIGluZERpdi5hcHBlbmRDaGlsZChwcm9qZWN0RGl2KVxuXG4gICAgICAgIGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucy1vdXRsaW5lZCcpXG4gICAgICAgIGVkaXRCdXR0b24uaW5uZXJUZXh0ID0gJ2VkaXQnXG5cbiAgICAgICAgY29uc3QgdHJhc2hCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgdHJhc2hCdXR0b24uY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMtb3V0bGluZWQnKVxuICAgICAgICB0cmFzaEJ1dHRvbi5pbm5lclRleHQgPSAnZGVsZXRlJ1xuICAgICAgICBpbmREaXYuYXBwZW5kQ2hpbGQoZWRpdERlbGV0ZUJ1dHRvbkRpdilcbiAgICAgICAgaW5kRGl2LmFwcGVuZENoaWxkKGlkRGl2KVxuXG4gICAgICAgIGVkaXREZWxldGVCdXR0b25EaXYuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbilcbiAgICAgICAgZWRpdERlbGV0ZUJ1dHRvbkRpdi5hcHBlbmRDaGlsZCh0cmFzaEJ1dHRvbilcblxuICAgICAgICB0cmFzaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICByZW1vdmVUYXNrRnJvbUxpc3QoZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXQudGl0bGUpXG4gICAgICAgICAgICByZW5kZXJUYXNrcyh0YXNrLnByb2plY3QpXG4gICAgICAgICAgICBcbiAgICAgICAgfSlcblxuICAgICAgICBlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGRpdiA9IGUudGFyZ2V0XG4gICAgICAgICAgIGxldCBuZXdNb2RhbCA9IHRvZ2dsZU1vZGFsLmJpbmQoZGl2KVxuICAgICAgICAgICBuZXdNb2RhbCgpXG4gICAgICAgIH0pXG4gICAgICAgIFxuXG4gICAgICAgIFxuICAgIH0pICBcblxuICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgZGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gXCJEZWxldGUgYWxsIHRhc2tzIGFuZCBwcm9qZWN0XCJcbiAgICBpZiAocHJvamVjdCA9PSAnQWxsJyB8fCBwcm9qZWN0ID09ICdJbmJveCcgKSB7XG5cbiAgICB9IGVsc2Uge1xuICAgIHRhc2tDYW52YXMuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKVxuICAgIH1cblxuICAgIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgbmljayA9IGxpc3RPZlRvRG9zLmZpbHRlcih0YXNrID0+IHRhc2sucHJvamVjdCAhPT0gcHJvamVjdClcbiAgICAgICAgbGlzdE9mVG9Eb3Muc3BsaWNlKDAsbGlzdE9mVG9Eb3MubGVuZ3RoKVxuICAgICAgICBuaWNrLmZvckVhY2godGFzayA9PiBsaXN0T2ZUb0Rvcy5wdXNoKHRhc2spKVxuICAgICAgICBsZXQgcHJvamVjdEluZGV4ID0gbGlzdE9mUHJvamVjdHMuZmluZCh0YXNrID0+IGNvbnNvbGUubG9nKHRhc2sudGl0bGUgPT0gcHJvamVjdCkpXG4gICAgICAgIGxpc3RPZlByb2plY3RzLnNwbGljZShwcm9qZWN0SW5kZXgsMSlcbiAgICAgICAgc2hvd1Byb2plY3RzKClcbiAgICAgICAgcmVuZGVyVGFza3MoXCJJbmJveFwiKVxuICAgICAgICBcbiAgICB9KVxuXG5cblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaXN0b2Z0b2RvcycsSlNPTi5zdHJpbmdpZnkobGlzdE9mVG9Eb3MpKVxuXG59XG5cblxuXG5cblxuXG5leHBvcnQgeyByZW5kZXJUYXNrcyB9XG4iLCJpbXBvcnQgeyB0cmlnZ2VyLCBjbG9zZUJ1dHRvbix0b2dnbGVNb2RhbCxtb2RhbCxtb2RhbFByb2osdHJpZ2dlclByb2osY2xvc2VCdXR0b25Qcm9qLGVkaXRUYXNrQnV0dG9uIH0gZnJvbSAnLi9tb2RhbC5qcydcbmltcG9ydCB7IGFkZFByb2plY3RUb0xpc3QsIGxpc3RPZlByb2plY3RzLCBwcm9qZWN0RmFjdG9yeSB9IGZyb20gJy4vcHJvamVjdHMuanMnO1xuaW1wb3J0IHsgc2hvd1Byb2plY3RzIH0gZnJvbSAnLi9yZW5kZXJQcm9qZWN0cy5qcyc7XG5pbXBvcnQgeyByZW5kZXJUYXNrcyB9IGZyb20gJy4vcmVuZGVyVGFza3MuanMnO1xuaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCc7XG5cblxuY29uc3QgdG9Eb0xpc3QgPSBbXTtcblxuXG5cbmNvbnN0IHRvRG9GYWN0b3J5ID0gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QsIGlzQ29tcGxldGVkKSA9PiB7XG5cbiAgICBsZXQgaWQgPSB1dWlkdjQoKVxuXG4gICAgaWYgKHByb2plY3Q9PVwiXCIpIHtcbiAgICAgICAgcHJvamVjdCA9IFwiSW5ib3hcIlxuICAgIH1cblxuICAgIGxldCBwcm9qRXhpc3RzID0gZmFsc2U7XG4gICAgbGlzdE9mUHJvamVjdHMuZm9yRWFjaCggcHJvaiA9PiB7XG4gICAgICAgIGlmIChwcm9qLnRpdGxlID09PSBwcm9qZWN0KSB7XG4gICAgICAgICAgICBwcm9qRXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAocHJvakV4aXN0cyA9PT0gZmFsc2UpIHtcbiAgICAgICAgbGlzdE9mUHJvamVjdHMucHVzaChwcm9qZWN0RmFjdG9yeShwcm9qZWN0LFwiTkFcIikpXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaXN0b2Zwcm9qZWN0cycsSlNPTi5zdHJpbmdpZnkobGlzdE9mUHJvamVjdHMpKVxuXG4gICAgICAgIHNob3dQcm9qZWN0cygpXG4gICAgfVxuXG4gICAgcmV0dXJuIHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCwgaXNDb21wbGV0ZWQsaWQgfVxufVxuXG5jb25zdCBsaXN0T2ZUb0RvcyA9IFtdXG5cbmZ1bmN0aW9uIGFkZFRhc2tUb0xpc3QoKSB7XG5cbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKVxuICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGF0ZScpXG4gICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpb3JpdHknKVxuICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdCcpXG4gICAgbGlzdE9mVG9Eb3MucHVzaCh0b0RvRmFjdG9yeSh0aXRsZS52YWx1ZSxkZXNjcmlwdGlvbi52YWx1ZSxkdWVEYXRlLnZhbHVlLHByaW9yaXR5LnZhbHVlLHByb2plY3QudmFsdWUsZmFsc2UpKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaXN0b2Z0b2RvcycsSlNPTi5zdHJpbmdpZnkobGlzdE9mVG9Eb3MpKVxuXG4gICAgbGV0IG5ld1RvZ2dsZSA9IHRvZ2dsZU1vZGFsLmJpbmQodGhpcylcbiAgICBuZXdUb2dnbGUoKVxuICAgIGxldCBzZXRQcm9qZWN0ID0gcHJvamVjdC52YWx1ZSA9PVwiXCIgPyBcIkluYm94XCIgOiBwcm9qZWN0LnZhbHVlXG5cbiAgICByZW5kZXJUYXNrcyhzZXRQcm9qZWN0KVxuICAgIGFkZFRhc2sucmVzZXQoKVxuICAgIFxuXG5cbn1cblxuY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRUYXNrJylcbmFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JyxhZGRUYXNrVG9MaXN0KVxuXG5cbmZ1bmN0aW9uIHJlbW92ZVRhc2tGcm9tTGlzdCh0aXRsZSkge1xuICAgIGxldCB0YXNrSW5kZXggPSBsaXN0T2ZUb0Rvcy5maW5kSW5kZXgodGFzayA9PiB0YXNrLnRpdGxlID09IHRpdGxlKVxuICAgIGxpc3RPZlRvRG9zLnNwbGljZSh0YXNrSW5kZXgsMSlcbiAgICByZXR1cm4gbGlzdE9mVG9Eb3Ncbn1cblxuZnVuY3Rpb24gZWRpdFRhc2soaWQpIHtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0VGl0bGUnKVxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXREZXNjcmlwdGlvbicpXG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0RGF0ZScpXG4gICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdFByaW9yaXR5JylcbiAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXRQcm9qZWN0JylcblxuICAgIGxldCB0YXNrSW5kZXggPSBsaXN0T2ZUb0Rvcy5maW5kSW5kZXgodGFzayA9PiB0YXNrLmlkID09IGlkKVxuICAgIGxpc3RPZlRvRG9zW3Rhc2tJbmRleF0udGl0bGUgPSB0aXRsZS52YWx1ZVxuICAgIGxpc3RPZlRvRG9zW3Rhc2tJbmRleF0uZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbi52YWx1ZVxuICAgIGxpc3RPZlRvRG9zW3Rhc2tJbmRleF0uZHVlRGF0ZSA9IGR1ZURhdGUudmFsdWVcbiAgICBsaXN0T2ZUb0Rvc1t0YXNrSW5kZXhdLnByaW9yaXR5ID0gcHJpb3JpdHkudmFsdWVcbiAgICBsaXN0T2ZUb0Rvc1t0YXNrSW5kZXhdLnByb2plY3QgPSBwcm9qZWN0LnZhbHVlXG4gICAgXG4gICAgY29uc3QgZWRpdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVkaXQtbW9kYWwnKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaXN0b2Z0b2RvcycsSlNPTi5zdHJpbmdpZnkobGlzdE9mVG9Eb3MpKVxuICAgIGxldCBzZXRQcm9qZWN0ID0gcHJvamVjdC52YWx1ZSA9PVwiXCIgPyBcIkluYm94XCIgOiBwcm9qZWN0LnZhbHVlXG5cbiAgICBsZXQgbmV3VG9nZ2xlID0gdG9nZ2xlTW9kYWwuYmluZChlZGl0TW9kYWwpXG4gICAgbmV3VG9nZ2xlKClcbiAgICByZW5kZXJUYXNrcyhzZXRQcm9qZWN0KVxuICAgIGFkZFRhc2sucmVzZXQoKVxuXG59XG5cblxuXG5mdW5jdGlvbiBmaW5kVGFza0J5SWQoaWQpIHtcbiAgICByZXR1cm4gbGlzdE9mVG9Eb3MuZmluZCh0YXNrID0+IHRhc2suaWQgPT0gaWQpXG59XG5cblxuZXhwb3J0IHsgdG9Eb0ZhY3RvcnksIGxpc3RPZlRvRG9zLCBhZGRUYXNrLCByZW1vdmVUYXNrRnJvbUxpc3QsIGZpbmRUYXNrQnlJZCwgZWRpdFRhc2t9XG5cblxuLy8gY29uc3QgdG9kbzEgPSB0b0RvRmFjdG9yeSgnbmljaycsJ25pY2tcXCdzIGRlc2NyaXB0aW9uJywgJzIwMjEtMDktMDQnLDEsJ2luYm94JyxmYWxzZSkiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGxpc3RPZlRvRG9zLCBhZGRUYXNrLCB0b0RvRmFjdG9yeSxlZGl0VGFza0J1dHRvbn0gZnJvbSAnLi90b0RvT2JqZWN0LmpzJ1xuaW1wb3J0IHsgYWRkUHJvamVjdFRvTGlzdCwgcHJvamVjdEZhY3RvcnksIGxpc3RPZlByb2plY3RzLCBzaG93U3BlY2lmaWNQcm9qZWN0LCBjdXJyZW50UHJvamVjdCB9IGZyb20gJy4vcHJvamVjdHMuanMnXG5pbXBvcnQgeyBzaG93UHJvamVjdHMgfSBmcm9tICcuL3JlbmRlclByb2plY3RzLmpzJ1xuaW1wb3J0IHsgcmVuZGVyVGFza3MgfSBmcm9tICcuL3JlbmRlclRhc2tzLmpzJ1xuXG5cbmlmIChsb2NhbFN0b3JhZ2UubGVuZ3RoID4gMSApIHtcblxuICAgIGxldCBsb2NhbFRvZG9zID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbJ2xpc3RvZnRvZG9zJ10pXG4gICAgbG9jYWxUb2Rvcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBsaXN0T2ZUb0Rvcy5wdXNoKHRhc2spXG4gICAgfSlcbiAgICBsZXQgbG9jYWxQcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlWydsaXN0b2Zwcm9qZWN0cyddKVxuICAgIGxvY2FsUHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICAgICAgbGlzdE9mUHJvamVjdHMucHVzaChwcm9qZWN0KVxuICAgIH0pXG4gICAgc2hvd1Byb2plY3RzKClcbiAgICByZW5kZXJUYXNrcyhcIkluYm94XCIpXG5cbiAgfVxuICBcblxuXG5zaG93UHJvamVjdHMoKVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9