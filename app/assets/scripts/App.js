import '../styles/styles.css'
import 'lazysizes'
// new RevealOnScroll(document.querySelectorAll(".feature-item"), 75)
// new RevealOnScroll(document.querySelectorAll(".testimonial"), 60)

import RevealOnScroll from './modules/RevealOnScroll'
import {headSwiper} from './modules/Swiper'
import MobileMenu from './modules/MobileMenu'
import StickyHeader from './modules/StickyHeader'
import SmoothNav from './modules/SmoothNav'
import ExpandBtn from "./modules/ExpandBtn"
import YMap from "./modules/YMap";

new StickyHeader()
new MobileMenu()
new SmoothNav()
new ExpandBtn()
new YMap()

let modal

document.querySelectorAll(".open-modal").forEach(el => {
    el.addEventListener("click", e => {
        e.preventDefault()
        if (typeof modal == "undefined") {
            import(/* webpackChunkName: "modal" */ './modules/Modal').then(x => {
                modal = new x.default()
                setTimeout(() => modal.openTheModal(), 20)
            }).catch(() => console.log("There was a problem."))
        } else {
            modal.openTheModal()
        }
    })
})

if (module.hot) {
    module.hot.accept()
}
