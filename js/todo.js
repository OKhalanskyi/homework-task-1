let createTodoForm = document.querySelector('.modal.create')
let todoList = document.getElementById('todoList')
let archiveList = document.getElementById('archiveList')

let inputName = document.querySelector('.name')
let inputContent = document.querySelector('.content')

let modalWindow = document.querySelector('.modal-window')

let todos = []

if (localStorage.getItem('todos')){
    todos = JSON.parse(localStorage.getItem('todos'))
    todos.forEach(todo => {
        if (!todo.isArchive){
            displayTodo(todo,todoList)
        }
        else{
            displayArchiveTodo(todo,archiveList)
        }
    })
}

createTodoForm.addEventListener('submit',createTodo)
todoList.addEventListener('click', deleteTodo)
archiveList.addEventListener('click',deleteTodo)
todoList.addEventListener('click', archiveTodo)
archiveList.addEventListener('click', unarchiveTodo)
todoList.addEventListener('click', editTodo)


function createTodo(event){
    event.preventDefault()
    if (inputValidator(inputName)){
        let newTodo = {
            id:Date.now(),
            name:inputName.value,
            created:setCreatedDate(),
            category:event.target.elements.rb.value,
            content:inputContent.value,
            dates:getDates(inputContent.value),
            isArchive:false
        }
        todos.push(newTodo)
        localStorage.setItem('todos', JSON.stringify(todos))
        displayTodo(newTodo, todoList)
        createTodoForm.classList.remove('active');
        modalWindow.classList.remove('active');
        labelMistake.classList.remove('active')
        inputName.value= ""
        inputContent.value = ""
        displaySummary()
    }
    else{
        labelMistake.classList.add('active')
    }

}

function setCreatedDate(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = today.toLocaleString('default', { month: 'long' });
    let yyyy = today.getFullYear();
    today = mm +" "+ dd + ', ' + yyyy;
    return today
}

function getDates(string){
    return string.match(/\d{2}([\/.-])\d{2}\1\d{4}/g)||[]

}

function displayDatesAfterEdit(dates, id){
    let datesText = document.getElementById(`dates${id}`)
    let html = `${dates}`
    datesText.removeChild(datesText.firstChild)
    datesText.insertAdjacentHTML('beforeend', html)
}

function inputValidator(input){
    return input.value.length !== 0
}

function deleteTodo(event){
    if(event.target.dataset.action !== 'delete') return
    let parent = event.target.closest('.todo-item')
    let id = Number(parent.id)
    todos = todos.filter((todo)=> todo.id !== id)
    localStorage.setItem('todos', JSON.stringify(todos))
    parent.remove()
    displaySummary()
}

function archiveTodo(event){
    if (event.target.dataset.action !== 'archive') return
    let parent = event.target.closest('.todo-item')

    let id = Number(parent.id)
    let todo  = todos.find((todo) => todo.id === id)
    todo.isArchive = !todo.isArchive
    localStorage.setItem('todos', JSON.stringify(todos))
    parent.remove()
    displayArchiveTodo(todo, archiveList)
    displaySummary()
}

function unarchiveTodo(event){
    if (event.target.dataset.action !== 'unarchive') return
    let parent = event.target.closest('.todo-item')
    let id = Number(parent.id)
    let todo = todos.find((todo)=> todo.id === id)
    todo.isArchive = !todo.isArchive
    localStorage.setItem('todos', JSON.stringify(todos))
    parent.remove()
    displayTodo(todo,todoList)
    displaySummary()
}

function editTodo(event){
    if (event.target.dataset.action !== 'edit') return
    let parent = event.target.closest('.todo-item')
    let todo = todos.find((todo)=> todo.id === Number(parent.id))
    let input = document.getElementById(`input${parent.id}`)
    let btn = document.getElementById(`btn${parent.id}`)
    if(btn.innerText==="edit"){
        btn.innerText = "save"
        input.focus()
        input.removeAttribute('readonly')
        input.addEventListener('change',(event)=>{
            todo.content = event.target.value
            todo.dates = getDates(event.target.value)
            displayDatesAfterEdit(getDates(todo.content), todo.id)
            localStorage.setItem('todos', JSON.stringify(todos))
        })
    }
    else{
        btn.innerText = 'edit'
        input.setAttribute('readonly', true)
    }
}

function displayTodo(todo, place){
    let todoHtml = `<tr id="${todo.id}" class="todo-item">
                        <th>${todo.name}</th>
                        <th>${todo.created}</th>
                        <th>${todo.category}</th>
                        <th><input id="input${todo.id}" class="content-todo" readonly value="${todo.content}"></th>
                        <th id="dates${todo.id}"><div>${getDates(todo.content)}</div></th>
                        <th><div><button id="btn${todo.id}" class='toEdit' data-action="edit">edit</button><button class='toDelete' data-action="delete">delete</button><button class='toArchive' data-action="archive">Archive</button></div></th>
                    </tr>`
    place.insertAdjacentHTML('beforeend',todoHtml)
}

function displayArchiveTodo(todo,place){
    let todoArchiveHtml = `<tr id="${todo.id}" class="todo-item">
                        <th>${todo.name}</th>
                        <th>${todo.created}</th>
                        <th>${todo.category}</th>
                        <th><input class="content-todo" readonly value="${todo.content}"></th>
                        <th>${getDates(todo.content)}</th>
                        <th><div><button class='toDelete' data-action="delete">delete</button><button class='toArchive' data-action="unarchive">Unrchive</button></div></th>
                    </tr>`
    place.insertAdjacentHTML('beforeend',todoArchiveHtml)
}

function displaySummary(){
    let totalTodos = JSON.parse(localStorage.getItem('todos')) || []
    let activeTasks = totalTodos.filter(elem => {
        return elem.category === "task" && !elem.isArchive
    })
    let archiveTasks = totalTodos.filter(elem => {
        return elem.category === "task" && elem.isArchive
    })
    let activeThoughts = totalTodos.filter(elem => {
        return elem.category ==="thought" && !elem.isArchive
    })
    let archiveThoughts = totalTodos.filter(elem => {
        return elem.category === "thought" && elem.isArchive
    })
    let activeIdea = totalTodos.filter(elem => {
        return elem.category ==="idea" && !elem.isArchive
    })
    let archiveIdea = totalTodos.filter(elem => {
        return elem.category === "idea" && elem.isArchive
    })
    document.getElementById('active-tasks').innerHTML = activeTasks.length
    document.getElementById('archive-tasks').innerHTML =archiveTasks.length
    document.getElementById('active-thoughts').innerHTML = activeThoughts.length
    document.getElementById('archive-thoughts').innerHTML = archiveThoughts.length
    document.getElementById('active-ideas').innerHTML = activeIdea.length
    document.getElementById('archive-ideas').innerHTML = archiveIdea.length
}
displaySummary()


