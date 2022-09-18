let todoRender = document.getElementById('todo-box')
// if localstorage has an array, then use it
// else use default setting
let todo

// retrive localstorage
// 把 todos 從字串轉為串列
const saveTodos = JSON.parse(localStorage.getItem('todos'))
 // check if it's an array
 if (Array.isArray(saveTodos)) {
    todo = saveTodos
}else {
    todo = [{
        title: 'Find cellphone',
        dueDate: '2022-09/-16',
        isDone: false,
        id: 'id1'
    }, {
        title: 'Open window',
        dueDate: '2022-09-15',
        isDone: false,
        id: 'id2'
    }, {
        title: 'Send message',
        dueDate: '2022-09-09',
        isDone: false,
        id: 'id3'
    }]
}


render()

// Creat a todo
function creatTodo(outputTask, outputDate) {
    let id = new Date().getTime()

    todo.push({
        title: outputTask,
        dueDate: outputDate,
        isDone: false,
        id: id
    })

    saveTodo()
}

// Remove a todo
function removeTodo(targetId) {
    todo = todo.filter(function (value) {
        if (value.id.toString() === targetId) {
            return false
        }else {
            return true
        }
    })

    saveTodo()
} 

// 保存變更後的todo
function saveTodo() {
    localStorage.setItem('todos', JSON.stringify(todo))
}

function addTodo() {
               
    let task = document.getElementById('todo-title')
    let outputTask = task.value
    let date = document.getElementById('todo-date')
    let outputDate = date.value

    creatTodo(outputTask, outputDate)

    render()

    /* 重製input */
    document.getElementById('todo-title').value = ""
    document.getElementById('todo-date').value = ""
}

function render() {
    todoRender.innerHTML = ' '
                
    todo.forEach(function (todo) {
        // set div
        let eachTodo = document.createElement('div')
        eachTodo.style.cssText = 'margin-bottom: 5px; position: relative;'
                    
        // create checkbox
        let checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        checkbox.id = todo.id
        checkbox.onchange = checkFinish
        eachTodo.appendChild(checkbox)                    
                    
        // create todo content
        let element = document.createElement('div')
        if (todo.dueDate == '') {
            element.innerText = todo.title
        }else {
            element.innerText = todo.title + '\xa0\xa0\"' + todo.dueDate + '\"'
        }
        element.style.cssText = 'display: inline-block; font-weight: bold;'
        eachTodo.appendChild(element)

        // create delete button
        let button = document.createElement('button')
        button.innerText = 'Delete'

        button.style.cssText = 'position: absolute; right: 0; margin-left: 16px; background-color: red; color: white; border: 0; border-radius: 9999px; padding: 3px 8px; cursor: pointer;'

        button.id = todo.id
        button.onclick = deleteTodo
        eachTodo.appendChild(button)

        // Final output
        todoRender.appendChild(eachTodo)
    })
}

function deleteTodo(event) {
    let buttonTag = event.target
    let buttonId = buttonTag.id
    removeTodo(buttonId)

    render()
}

function checkFinish(event) {
    let checkbox = event.target
    let checkboxId = checkbox.id
    let checkboxChange = checkbox.checked

    todo.forEach(function (value) {
        if (value.id === checkboxId) {
            if (checkboxChange) {
                value.isDone = true
                console.log("It is true")
            }else {
                value.isDone = false
                console.log("It is false")
            }
        }
    })

    console.log(checkboxChange)
                
}

/* 按照日期排序 */
function sortWithDate() {
    console.log("sort")
    todo.sort(function(a,b){
        return a.dueDate.localeCompare(b.dueDate);
    })
    render()
}

/* const activities = [
    { title: 'Hiking', date: new Date('2019-06-28') },
    { title: 'Shopping', date: new Date('2019-06-10') },
    { title: 'Trekking', date: new Date('2019-06-22') },
    { title: 'Trekking'}
  ]

sortWithDate(activities)

console.log(activities)
*/ 