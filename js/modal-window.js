const modalOpenClose = (windowSelector, formSelector, openSelector, closeSelector) => {
    let modalBack = document.querySelector(windowSelector)
    let modalForm = document.querySelector(formSelector)
    let openModal = document.querySelectorAll(openSelector)
    let closeModal = document.querySelector(closeSelector)

    const removeClasses = () => {
        modalBack.classList.remove('active');
        modalForm.classList.remove('active');
        labelMistake.classList.remove('active')
    }

    openModal.forEach((elem)=>{
        elem.addEventListener('click',(e) => {
            e.preventDefault()
            modalBack.classList.add('active');
            modalForm.classList.add('active');
        })
    })
    closeModal.addEventListener('click',() => {
        removeClasses()
    });

    document.addEventListener('click', (e) => {
        if(e.target === modalBack) {
            removeClasses()
        }
    });
}

modalOpenClose('.archive','.modal.archive', '.open-archive','.close-archive')
modalOpenClose('.create','.modal.create','.open-modal','.close-create')


