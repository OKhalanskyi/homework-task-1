let createTodoForm = document.querySelector('.modal.create')
let todoList = document.getElementById('todoList')
let archiveList = document.getElementById('archiveList')

let inputName = document.querySelector('.name')
let inputContent = document.querySelector('.content')

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
    let newTodo = {
        id:Date.now(),
        name:inputName.value,
        created:Date.now(),
        category:event.target.elements.rb.value,
        content:inputContent.value,
        dates:'',
        isArchive:false
    }
    todos.push(newTodo)
    localStorage.setItem('todos', JSON.stringify(todos))

    displayTodo(newTodo, todoList)
    console.log(newTodo)
}

function deleteTodo(event){
    if(event.target.dataset.action !== 'delete') return

    let parent = event.target.closest('.todo-item')

    let id = Number(parent.id)
    todos = todos.filter((todo)=> todo.id !== id)
    localStorage.setItem('todos', JSON.stringify(todos))
    parent.remove()
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
                        <th>${todo.dates}</th>
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
                        <th>${todo.dates}</th>
                        <th><div><button class='toDelete' data-action="delete">delete</button><button class='toArchive' data-action="unarchive">Unrchive</button></div></th>
                    </tr>`
    place.insertAdjacentHTML('beforeend',todoArchiveHtml)
}





