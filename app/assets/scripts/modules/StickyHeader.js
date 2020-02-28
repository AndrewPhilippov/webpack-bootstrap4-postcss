import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class StickyHeader {
  constructor() {
    this.siteHeader = document.querySelector(".header__nav")
    this.pageSections = document.querySelectorAll(".page-section")
    this.browserHeight = window.innerHeight
    this.previousScrollY = window.scrollY
    this.events()
  }

  events() {
    window.addEventListener("scroll", throttle(() => this.runOnScroll(), 200))
    window.addEventListener("resize", debounce(() => {
      this.browserHeight = window.innerHeight
    }, 333))
  }

  runOnScroll() {
    this.determineScrollDirection()

    if (window.scrollY > 0) { // if you need header transformation later, just change '0' to the 'y' height you need
      this.siteHeader.classList.add("header__nav--dark")
    } else {
      this.siteHeader.classList.remove("header__nav--dark")
    }

    // this.pageSections.forEach(el => this.calcSection(el)) // todo uncomment for menu highlighting on scroll to certain page-section
  }

  determineScrollDirection() {
    if (window.scrollY > this.previousScrollY) {
      this.scrollDirection = 'down'
    } else {
      this.scrollDirection = 'up'
    }
    this.previousScrollY = window.scrollY
  }

/*  calcSection(el) { // todo if you need highlight menu section on scroll
    if (window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight) {
      let scrollPercent = el.getBoundingClientRect().top / this.browserHeight * 100
      if (scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection == 'down' || scrollPercent < 33 && this.scrollDirection == 'up') {
        let matchingLink = el.getAttribute("data-matching-link")
        document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(el => el.classList.remove("is-current-link"))
        document.querySelector(matchingLink).classList.add("is-current-link")
      }
    }
  }*/
}

export default StickyHeader
