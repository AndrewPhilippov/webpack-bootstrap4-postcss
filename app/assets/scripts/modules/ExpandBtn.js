class ExpandBtn {
    constructor() {
        this.btn = document.querySelector('.main-block-btn__expand')
        this.expandText = document.querySelector('.main_advantages_block__longread ')
        this.events()
    }
    events() {
        this.btn.addEventListener('click', () => this.toggleTextHeight())
    }
    toggleTextHeight() {
        this.expandText.classList.toggle("main_advantages_block__longread--is-expanded")
        this.btn.classList.toggle("main-block-btn__expand--is-opened")
        if (this.expandText.classList.contains('main_advantages_block__longread--is-expanded')) {
            this.btn.textContent = 'Свернуть'
        } else {
            this.btn.textContent = 'Развернуть'
        }
    }
}

export default ExpandBtn
