console.log('webpack is working')

// import {toDoFactory} from './todoObject.js'

let nick = 'nicktext'


const toDoFactory = (title, description, dueDate, priority, project, isCompleted) => {


    return { title, description, dueDate, priority, project, isCompleted}
}

console.log('test2')
// const todo1 = toDoFactory('nick','nick\'s description', '2021-09-04',1,'inbox',false)