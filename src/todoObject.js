

const toDoFactory = (title, description, dueDate, priority, project, isCompleted) => {


    return { title, description, dueDate, priority, project, isCompleted}
}

export { toDoFactory }


// const todo1 = toDoFactory('nick','nick\'s description', '2021-09-04',1,'inbox',false)