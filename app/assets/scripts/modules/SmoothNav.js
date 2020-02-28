class SmoothNav {
    constructor () {
        this.triggers = document.querySelectorAll('.list--smooth > li')
        this.background = document.querySelector('.dropdownBackground')
        this.nav = document.querySelector('.header__nav')
        this.events()
    }

    events () {
        this.triggers.forEach(trigger => trigger.addEventListener('mouseenter', this.handleEnter))
        this.triggers.forEach(trigger => trigger.addEventListener('mouseleave', this.handleLeave))
    }

    getSIze (el) {
        const {x, y, height, width} = el.getBoundingClientRect();
        console.log(x, y, height, width);
    }

    handleEnter () {
        this.classList.add('trigger-enter');
        setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
        this.background.classList.add('open')

        const dropdown = this.querySelector('.dropdown');
        const dropdownCoords = dropdown.getBoundingClientRect();
        const navCoords = nav.getBoundingClientRect();

        const coords = {
            height: dropdownCoords.height,
            width: dropdownCoords.width,
            top: dropdownCoords.top - navCoords.top,
            left: dropdownCoords.left - navCoords.left,
            right: dropdownCoords.right + navCoords.right,
        };

        this.background.style.setProperty('width', `${coords.width}px`)
        this.background.style.setProperty('height', `${coords.height}px`)
        this.background.style.setProperty('right', `${coords.right}px`)
        this.background.style.setProperty('left', `${coords.left}px`)
        this.background.style.setProperty('top', `${coords.top}px`)
        this.background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`)
    }

    handleLeave () {
        this.classList.remove('trigger-enter', 'trigger-enter-active');
        this.background.classList.remove('open')
    }

}

export default SmoothNav
