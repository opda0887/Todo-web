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
        dueDate: '2022-09-16',
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

// Rebuild a todo
function rebuildTodo(targetId) {
    todo = todo.filter(function (value) {
        if (value.id.toString() === targetId) {
            document.getElementById('todo-title').value = value.title
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

    if (checkTask(outputTask) !== 0) {
        let date = document.getElementById('todo-date')
        let outputDate = date.value

        creatTodo(outputTask, outputDate)

        render()

        /* 重製input */
        document.getElementById('todo-title').value = ""
        document.getElementById('todo-date').value = ""
    } else {
        alert("任務內容不能為空白\nYour task title can't be none.")
    }
}

function render() {
    todoRender.innerHTML = ' '
                
    todo.forEach(function (todo) {
        // set div
        let eachTodo = document.createElement('div')
        eachTodo.style.cssText = 'margin-bottom: 5px; position: relative; display: flex; align-items: center;'
                    
        // create checkbox
        let checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        checkbox.id = todo.id
        checkbox.onchange = checkFinish
        if (todo.isDone) {
            checkbox.checked = true
            eachTodo.appendChild(checkbox)
        }else {
            checkbox.checked = false
            eachTodo.appendChild(checkbox)
        }                
                    
        // create todo content
        let element = document.createElement('div')

        if (todo.dueDate == '') {
            element.innerText = todo.title
        }else {
            element.innerText = todo.title + '\xa0\xa0\xa0' + '\"' + todo.dueDate + '\"'
        }

        if (todo.isDone) {
            element.style.cssText = 'text-align: center; text-align: left; display: inline-block; font-weight: bold; color: rgb(134, 0, 179); width: 215px; white-space: innitial;'
        }else {
            element.style.cssText = 'text-align: center; text-align: left; display: inline-block; font-weight: bold; width: 215px; white-space: innitial;'
        }

        eachTodo.appendChild(element)

        // create delete button or not
        if (todo.isDone) {
            let button = document.createElement('button')
            button.innerText = 'Delete'

            button.style.cssText = 'position: absolute; right: 0; margin-left: 16px; background-color: red; color: white; border: 0; border-radius: 9999px; padding: 3px 8px; cursor: pointer;'

            button.id = todo.id
            button.onclick = deleteTodo
            eachTodo.appendChild(button)
        } else {
            let button = document.createElement('button')
            button.innerText = '\xa0\xa0Edit\xa0\xa0'

            button.style.cssText = 'position: absolute; right: 0; margin-left: 16px; background-color: rgb(192, 188, 189); color: black; border: 0; border-radius: 9999px; padding: 3px 8px; cursor: pointer;'

            button.id = todo.id
            button.onclick = editTodo
            eachTodo.appendChild(button)
        }

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

function editTodo(event) {
    let buttonTag = event.target
    let buttonId = buttonTag.id
    rebuildTodo(buttonId)

    render()
}

function checkFinish(event) {
    let checkbox = event.target
    let checkboxId = checkbox.id
    let checkboxChange = checkbox.checked

    todo.forEach(function (value) {
        if (value.id.toString() === checkboxId) {
            if (checkboxChange) {
                value.isDone = true
            }else {
                value.isDone = false
            }
        }
    })
    
    saveTodo()

    render()
}

/* 按照日期排序(a前b後：日期由先至後) */
function sortWithDate() {

    todo.sort(function(a,b){
        return a.dueDate.localeCompare(b.dueDate);
    })

    saveTodo()

    render()
}

// 檢查 text-box 內是否為空的
// 是的話，跳出警示
function checkTask(outputTask) {
    // \s is the regex for "whitespace", and g is the "global" flag, meaning match ALL \s
    /* '+' 的差異：
        var str = '  A B  C   D EF ';
        console.log(str.replace(/\s/g, '#'));  // ##A#B##C###D#EF#
        console.log(str.replace(/\s+/g, '#')); // #A#B#C#D#EF#  
    */
    let checkStr = outputTask.replace(/\s+/g, '')
    if (checkStr === '') {
        return 0
    }else {
        return 1
    }
}

// Google Calendar
function addTodoGC() {
    let outputTask = document.getElementById('todo-title').value
    if (checkTask(outputTask) !== 0) {
        let outputDate = document.getElementById('todo-date').value

        let taskModify = outputTask.replace(/\s+/g, '+')
        let dateModify = outputDate.replace(/\-+/g, '')

        document.getElementById('todo-title').value = ''
        document.getElementById('todo-date').value = ''

        if (dateModify == '') {
            let webLink = '"https://calendar.google.com/calendar/u/0/r/eventedit?text=' + taskModify + '"'
            let linkModify = webLink.slice(1, -1);
            window.open(linkModify);
        }else {
            let webLink = '"https://calendar.google.com/calendar/u/0/r/eventedit?text=' + taskModify + '&dates=' + dateModify + '/' + dateModify + '"'
            let linkModify = webLink.slice(1, -1);
            window.open(linkModify);
        }

    }else {
        document.getElementById('todo-date').value = ''
        alert("任務內容不能為空白\nYour task title can't be none.")
    }
    
}