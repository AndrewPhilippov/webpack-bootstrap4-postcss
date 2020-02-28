class MobileMenu {
  constructor() {
    this.menuIcon = document.querySelector(".nav__hamburger")
    this.menuContent = document.querySelector(".mobile__menu-content")
    this.events()
  }

  events() {
    this.menuIcon.addEventListener("click", () => this.toggleTheMenu())
  }

  toggleTheMenu() {
    this.menuContent.classList.toggle("mobile__menu-content--is-visible")
    this.menuIcon.classList.toggle("nav__hamburger--close-x")
  }
}

export default MobileMenu
