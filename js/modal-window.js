let modalWindowCreate = document.querySelector('.create');
let modalCreate = document.querySelector('.modal.create');
let openModalCreate = document.querySelectorAll('.open-modal');
let closeModalCreate = document.querySelector('.close-create');


openModalCreate.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        modalWindowCreate.classList.add('active');
        modalCreate.classList.add('active');
    })
});

closeModalCreate.addEventListener('click',() => {
    modalWindowCreate.classList.remove('active');
    modalCreate.classList.remove('active');
});

document.addEventListener('click', (e) => {
    if(e.target === modalWindowCreate) {
        modalWindowCreate.classList.remove('active');
        modalCreate.classList.remove('active');
    }
});

let modalWindowArchive = document.querySelector('.archive')
let modalArchive = document.querySelector('.modal.archive')
let openModalArchive = document.querySelectorAll('.open-archive')
let closeModalArchive = document.querySelector('.close-archive')

openModalArchive.forEach((th)=>{
    th.addEventListener('click',(e) => {
        e.preventDefault()
        modalWindowArchive.classList.add('active');
        modalArchive.classList.add('active');
    })
})

closeModalArchive.addEventListener('click',() => {
    modalWindowArchive.classList.remove('active');
    modalArchive.classList.remove('active');
});

document.addEventListener('click', (e) => {
    if(e.target === modalWindowArchive) {
        modalWindowArchive.classList.remove('active');
        modalArchive.classList.remove('active');
    }
});
//i know that is bad practice to code like this(DRY<3) , but right now 2am and I ma want to sleep , help me if u know how to fix