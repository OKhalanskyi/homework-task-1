let modalWindow = document.querySelector('.modal-window')
let createTodoForm = document.querySelector('.modal.create')
let inputName = document.querySelector('.name')
let inputContent = document.querySelector('.content')
let labelMistake = document.querySelector('.label-mistake')


let todos = []
if (localStorage.getItem('key')){
    todos = JSON.parse(localStorage.getItem('key'))
    displayTable(todos)
}
localStorage.setItem('key', JSON.stringify(todos))
const notesData = localStorage.getItem('key')
todos = JSON.parse(notesData)
console.log(todos)

createTodoForm.addEventListener('submit',e=>{
    e.preventDefault()
    if(validateInput(inputName)&&validateInput(inputContent)){
        let todo = {
            name:inputName.value,
            created:Date.now(),
            category:e.target.elements.rb.value,
            content:inputContent.value,
            dates: "",
            isArchive:false,

        }
        todos.push(todo)
        localStorage.setItem('key', JSON.stringify(todos))
        createTodoForm.classList.remove('active');
        modalWindow.classList.remove('active');
        labelMistake.classList.remove('active')
        inputName.value= ""
        inputContent.value = ""
        displayTable(todos)

    }
    else {
        labelMistake.classList.add('active')
    }
})

const validateInput = (input) => {
    return input.value.length !== 0
}

function displayTable(notes) {
    let tableNotes = document.querySelector('.table-notes')
    let html = ''
    notes.forEach((elem, i) => {
        html += `<tr>
                        <th>${elem.name}</th>
                        <th>${elem.created}</th>
                        <th>${elem.category}</th>
                        <th>${elem.content}</th>
                        <th>${elem.dates}</th>
                        <th><div><button class='toEdit icon_${i}'>edit</button><button class='toDelete icon_${i}'>delete</button><button class='toArchive icon_${i}'>Archive</button></div></th>
                    </tr>`
    })
    tableNotes.innerHTML = html
}
displayTable(todos)

