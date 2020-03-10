class SmoothNav {
    constructor () {
        this.triggers = document.querySelectorAll('.list--smooth > li.nav__menu-item--smooth')
        this.background = document.querySelector('.dropdownBackground')
        this.nav = document.querySelector('.header__nav')
        this.events()
    }

    events () {
        const self = this
        this.triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter))
        this.triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave))
        function handleEnter () {
            this.classList.add('trigger-enter')
            setTimeout(() => {this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active')}, 150)
            self.background.classList.add('open')

            const dropdown = this.querySelector('.dropdown')
            const dropdownCoords = dropdown.getBoundingClientRect()
            const navCoords = self.nav.getBoundingClientRect()

            const coords = {
                height: dropdownCoords.height,
                width: dropdownCoords.width,
                top: dropdownCoords.top - navCoords.top,
                left: dropdownCoords.left - navCoords.left
            };
            self.background.style.setProperty('width', `${coords.width}px`);
            self.background.style.setProperty('height', `${coords.height}px`);
            self.background.style.setProperty('right', `${coords.right}px`);
            self.background.style.setProperty('left', `${coords.left}px`);
            self.background.style.setProperty('top', `${coords.top}px`);
        }
        function handleLeave () {
            this.classList.remove('trigger-enter', 'trigger-enter-active');
            self.background.classList.remove('open')
        }

    }
}

export default SmoothNav
